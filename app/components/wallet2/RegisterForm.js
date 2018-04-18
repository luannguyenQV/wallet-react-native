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

import { Input, Spinner, Button } from './../common2';
import Colors from './../../config/colors';
import AuthService from './../../services/authService';
import Auth from './../../util/auth';
import MobileInput from './../../components/mobileNumberInput';

class RegisterForm extends Component {
  state = {
    first_name: '',
    last_name: '',
    email: '',
    email_status: true,
    mobile_number: '+1',
    mobile_number_status: true,
    company: '',
    password: '',
    password_status: true,
    password2: '',
    password2_status: true,
    password_matching: true,
    terms_and_conditions: false,
    password_error: null,
    mobile_error: null,
    email_error: null,
    company_error: null,
    inputNumber: '',
    countryCode: '+1',
    countryName: '',
    loading: false,
  };

  // componentDidMount() {
  //   this.checkLoggedIn();
  // }

  clearInputs() {
    this.setState({
      email: '',
      company: '',
      password: '',
    });
  }

  checkLoggedIn = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token != null) {
        ResetNavigation.dispatchToSingleRoute(this.props.navigation, 'Home');
      }
      return token;
    } catch (error) {}
  };

  onButtonPress = async () => {
    const { email, company, password } = this.state;

    var body = {
      user: email,
      company: company,
      password: password,
    };
    let responseJson = await AuthService.login(body);
    console.log(responseJson);
    if (responseJson.status === 'success') {
      const loginInfo = responseJson.data;
      await AsyncStorage.setItem('token', loginInfo.token);
      let twoFactorResponse = await AuthService.twoFactorAuth();
      if (twoFactorResponse.status === 'success') {
        const authInfo = twoFactorResponse.data;
        if (authInfo.sms === true || authInfo.token === true) {
          this.props.navigation.navigate('AuthVerifySms', {
            loginInfo: loginInfo,
            isTwoFactor: true,
          });
        } else {
          await AsyncStorage.setItem('email', email);
          await AsyncStorage.setItem('company', company);
          Auth.login(this.props.navigation, loginInfo);
        }
      } else {
        Alert.alert('Error', twoFactorResponse.message, [{ text: 'OK' }]);
      }
    } else {
      Alert.alert('Error', responseJson.message, [{ text: 'OK' }]);
    }
  };

  // onLoginFail() {
  //   this.setState({ error: 'Authentication Failed', loading: false });
  // }

  // onLoginSuccess() {
  //   this.setState({
  //     email: '',
  //     password: '',
  //     error: '',
  //     loading: false,
  //   });
  // }

  // renderButton() {
  //   if (this.state.loading) {
  //     return <Spinner size="small" />;
  //   }

  //   return <Button onPress={this.onButtonPress.bind(this)}>Log In</Button>;
  // }

  render() {
    const {
      first_name,
      last_name,
      email,
      email_status,
      mobile_number,
      mobile_number_status,
      company,
      password,
      password_status,
      password2,
      password2_status,
      password_matching,
      terms_and_conditions,
      password_error,
      mobile_error,
      email_error,
      company_error,
      inputNumber,
      countryCode,
      countryName,
    } = this.state;
    const {
      containerStyle,
      containerStyleInputs,
      touchableStyleForgotPassword,
      touchableStyleClear,
    } = styles;

    return (
      <View style={containerStyle}>
        <KeyboardAvoidingView
          style={containerStyleInputs}
          behavior={'padding'}
          keyboardVerticalOffset={85}>
          <ScrollView
            keyboardDismissMode={'interactive'}
            keyboardShouldPersistTaps="always">
            <Input
              label="First name"
              placeholder="e.g. John"
              onChangeText={first_name => this.setState({ first_name })}
              value={email}
            />
            <Input
              label="Last name"
              placeholder="e.g. Snow"
              onChangeText={last_name => this.setState({ last_name })}
              value={company}
            />
            <Input
              title="Email"
              required
              placeholder="e.g john@gmail.com"
              keyboardType="email-address"
              onChangeText={email => this.setState({ email })}
              error={this.state.email_error}
              ref={ref => (this.email = ref)}
              value={company}
            />
            <MobileInput
              title="Mobile"
              required
              autoCapitalize="none"
              keyboardType="numeric"
              value={this.state.inputNumber}
              underlineColorAndroid="white"
              onChangeText={mobile_number =>
                this.setState({ inputNumber: mobile_number })
              }
              changeCountryCode={this.changeCountryCode}
              error={this.state.mobile_error}
              ref={ref => (this.mobile_number = ref)}
              reference="mobile_number"
              onSubmitEditing={() => this.company.refs.company.focus()}
              code={this.state.countryCode}
            />
            <Input
              title="Company"
              required
              placeholder="e.g rehive"
              onChangeText={company => this.setState({ company })}
              error={this.state.company_error}
              value={company}
            />
            <Input
              placeholder="Password"
              label="Password"
              value={password}
              password={true}
              onChangeText={password => this.setState({ password })}
            />
            <Input
              placeholder="Confirm password"
              label="Confirm password"
              value={password2}
              password={true}
              onChangeText={password2 => this.setState({ password2 })}
            />
          </ScrollView>
        </KeyboardAvoidingView>
        <Button label="Register" onPress={this.onButtonPress.bind(this)} />
      </View>
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

export default RegisterForm;
