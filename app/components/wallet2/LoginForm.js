import React, { Component } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Text,
  TouchableHighlight,
  Alert,
  AsyncStorage,
} from 'react-native';

import { Input, Spinner, Button, InputForm } from './../common2';
import Colors from './../../config/colors';
import AuthService from './../../services/authService';
import Auth from './../../util/auth';
import { IsEmail } from './../../util/validation';

class LogInForm extends Component {
  state = {
    email: '',
    emailError: '',
    company: '',
    companyError: '',
    password: '',
    passwordError: '',
    loading: false,
    toFocus: null,
  };

  componentDidMount() {
    this.checkLoggedIn();
    this.getStoredValues();
  }

  clearInputs() {
    this.setState({
      email: '',
      company: '',
      password: '',
    });
  }

  getStoredValues = async () => {
    let storedEmail = '';
    let storedCompany = '';
    try {
      storedEmail = await AsyncStorage.getItem('email');
      storedCompany = await AsyncStorage.getItem('company');
    } catch (error) {}

    this.setState({
      email: storedEmail,
      company: storedCompany,
    });
  };

  checkLoggedIn = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token != null) {
        ResetNavigation.dispatchToSingleRoute(this.props.navigation, 'Home');
      }
      return token;
    } catch (error) {}
  };

  onButtonPress() {
    if (this.validation()) {
      let data = {
        user: this.state.email,
        company: this.state.company,
        password: this.state.password,
      };
      console.log(data);
      this.performLogin(data);
    }
  }

  validation() {
    const { email, company, password } = this.state;

    let emailStatus = false;
    let emailError = null;
    let companyStatus = false;
    let companyError = null;
    let passwordStatus = false;
    let passwordError = null;

    if (email != null && IsEmail(email)) {
      emailStatus = true;
    } else {
      emailError = 'Please enter a valid email address';
    }

    if (company != null && company.length > 0) {
      companyStatus = true;
    } else {
      companyError = 'Please enter a company ID';
    }

    if (password != null && password.length >= 8) {
      passwordStatus = true;
    } else {
      passwordError = 'Password must be at least 8 characters';
    }

    this.setState({
      emailError,
      companyError,
      passwordError,
    });

    if (emailStatus && companyStatus && passwordStatus) {
      return true;
    }
    return false;
  }

  performLogin = async data => {
    console.log(data);
    let responseJson = await AuthService.login(data);
    console.log(responseJson);

    if (responseJson.status === 'success') {
      const loginInfo = responseJson.data;
      await AsyncStorage.setItem('token', loginInfo.token);
      console.log('1');
      let twoFactorResponse = await AuthService.twoFactorAuth();
      console.log('2');
      if (twoFactorResponse.status === 'success') {
        console.log('3');
        const authInfo = twoFactorResponse.data;
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('company', company);
        if (authInfo.sms === true || authInfo.token === true) {
          this.props.navigation.navigate('AuthVerifySms', {
            loginInfo: loginInfo,
            isTwoFactor: true,
          });
        } else {
          Auth.login(this.props.navigation, loginInfo);
        }
      } else {
        Alert.alert('Error', twoFactorResponse.message, [{ text: 'OK' }]);
      }
    } else {
      Alert.alert(
        'Invalid Credentials',
        'Unable to log in with provided credentials.',
        [{ text: 'OK' }],
      );
    }
  };

  // renderButton() {
  //   if (this.state.loading) {
  //     return <Spinner size="small" />;
  //   }

  //   return <Button onPress={this.onButtonPress.bind(this)}>Log In</Button>;
  // }

  render() {
    const {
      email,
      emailError,
      company,
      companyError,
      password,
      passwordError,
    } = this.state;

    const {
      containerStyle,
      containerStyleInputs,
      touchableStyleForgotPassword,
    } = styles;

    return (
      <KeyboardAvoidingView
        style={containerStyle}
        behavior={'padding'}
        keyboardVerticalOffset={85}>
        <InputForm
          reference={scrollView => {
            this.myScrollView = scrollView;
          }}>
          <Input
            placeholder="e.g. user@gmail.com"
            label="Email"
            value={email}
            required
            requiredError={emailError}
            keyboardType="email-address"
            onChangeText={email => this.setState({ email })}
            returnKeyType="next"
            autoFocus
            onSubmitEditing={() => {
              this.company.focus();
            }}
          />
          <Input
            placeholder="e.g. Rehive"
            label="Company"
            required
            requiredError={companyError}
            value={company}
            onChangeText={company => this.setState({ company })}
            reference={input => {
              this.company = input;
            }}
            onSubmitEditing={() => {
              this.password.focus();
            }}
            returnKeyType="next"
          />
          <Input
            type="password"
            placeholder="Password"
            label="Password"
            required
            requiredError={passwordError}
            value={password}
            password={true}
            onChangeText={password => this.setState({ password })}
            returnKeyType="done"
            reference={input => {
              this.password = input;
            }}
            onSubmitEditing={this.onButtonPress.bind(this)}
          />
        </InputForm>
        <Button label="LOG IN" onPress={this.onButtonPress.bind(this)} />
        <Button
          label="Forgot Password?"
          onPress={() => this.props.navigation.navigate('ForgetPassword')}
        />
        {/* <TouchableHighlight
          style={touchableStyleForgotPassword}
          onPress={() => this.props.navigation.navigate('ForgetPassword')}>
          <Text style={{ color: Colors.lightblue }}>Forgot Password?</Text>
        </TouchableHighlight> */}
      </KeyboardAvoidingView>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 10,
    justifyContent: 'flex-start',
  },
  containerStyleInputs: {
    paddingRight: 25,
    paddingBottom: 15,
  },
  touchableStyleForgotPassword: {
    padding: 10,
    height: 50,
    backgroundColor: 'white',
    width: '100%',
    borderColor: Colors.lightblue,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default LogInForm;
