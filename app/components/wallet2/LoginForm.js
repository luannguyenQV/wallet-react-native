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

class LoginForm extends Component {
  state = {
    email: '',
    company: '',
    password: '',
    loading: false,
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
    const { email, company, password } = this.state;
    const {
      containerStyle,
      containerStyleInputs,
      touchableStyleForgotPassword,
      touchableStyleClear,
    } = styles;

    return (
      <View style={containerStyle}>
        {/* <TouchableHighlight
          style={touchableStyleClear}
          onPress={this.clearInputs()}>
          <Text style={{ color: Colors.lightblue }}>Clear</Text>
        </TouchableHighlight> */}
        <KeyboardAvoidingView
          style={containerStyleInputs}
          behavior={'padding'}
          keyboardVerticalOffset={85}>
          <ScrollView
            keyboardDismissMode={'interactive'}
            keyboardShouldPersistTaps="always">
            <Input
              placeholder="e.g. user@gmail.com"
              label="Email"
              value={email}
              onChangeText={email => this.setState({ email })}
            />
            <Input
              placeholder="e.g. Rehive"
              label="Company"
              value={company}
              onChangeText={company => this.setState({ company })}
            />
            <Input
              placeholder="Password"
              label="Password"
              value={password}
              password={true}
              onChangeText={password => this.setState({ password })}
            />
          </ScrollView>
        </KeyboardAvoidingView>
        <Button label="Login" onPress={this.onButtonPress.bind(this)} />
        <TouchableHighlight
          style={touchableStyleForgotPassword}
          onPress={() => this.props.navigation.navigate('ForgetPassword')}>
          <Text style={{ color: Colors.lightblue }}>Forgot Password?</Text>
        </TouchableHighlight>
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
  touchableStyleClear: {
    padding: 10,
    height: 20,
    backgroundColor: 'white',
    width: '100%',
    borderColor: Colors.lightblue,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
};

export default LoginForm;
