import React, { Component } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Text,
  TouchableHighlight,
  Alert,
  AsyncStorage,
  findNodeHandle,
} from 'react-native';

import { Input, Spinner, Button } from './../common2';
import Colors from './../../config/colors';
import AuthService from './../../services/authService';
import Auth from './../../util/auth';
import MobileInput from './../../components/mobileNumberInput';
import { IsEmail } from './../../util/validation';

const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

class RegisterForm extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    emailError: '',
    mobileNumber: null,
    countryName: 'US',
    countryCode: '+1',
    lineNumber: null,
    company: '',
    companyError: null,
    password: '',
    passwordError: true,
    password2: '',
    password2Error: true,
    terms: false,
    termsError: false,
    loading: false,
  };

  onButtonPress() {
    if (this.validation()) {
      let data = {
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        email: this.state.email,
        company: this.state.company,
        password1: this.state.password,
        password2: this.state.password2,
        mobileNumber: this.state.mobileNumber,
        terms_and_conditions: this.state.terms,
      };

      this.performRegister(data);
    }
  }

  validation() {
    const {
      email,
      company,
      countryName,
      countryCode,
      lineNumber,
      password,
      password2,
    } = this.state;

    let emailStatus = false;
    let emailError = null;
    let companyStatus = false;
    let companyError = null;
    let passwordStatus = false;
    let passwordError = null;
    let password2Status = false;
    let password2Error = null;
    let mobileNumberStatus = true;
    let mobileNumberError = null;

    if (email != null && IsEmail(email)) {
      emailStatus = true;
    } else {
      emailError = 'Please enter a valid email address';
      this.email.focus();
      this._scrollToInput(findNodeHandle(this.email));
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

    if (password2 == null && password2.length == 0) {
      password2Error = 'Please confirm your password';
    } else if (password2.length < 8) {
      password2Error = 'Password must be at least 8 characters';
    } else if (password != password2) {
      password2Error = 'Passwords do not match';
    } else {
      password2Status = true;
    }

    if (lineNumber) {
      let mobileNumber = countryCode + lineNumber;
      const number = phoneUtil.parseAndKeepRawInput(mobileNumber, countryName);
      passwordStatus = true;
      if (!phoneUtil.isValidNumber(number)) {
        mobileNumberStatus = false;
        mobileNumberError = 'Please enter a valid mobile number or leave blank';
      }
    }

    this.setState({
      emailError,
      companyError,
      passwordError,
      password2Error,
      mobileNumberError,
    });

    if (
      emailStatus &&
      companyStatus &&
      passwordStatus &&
      password2Status &&
      mobileNumberStatus
    ) {
      return true;
    }
    return false;
  }

  changeCountryCode = (code, cca2) => {
    this.setState({
      countryCode: '+' + code,
      countryName: cca2,
    });
  };

  performRegister = async data => {
    let responseJson = await AuthService.signup(data);
    console.log(responseJson);
    if (responseJson.status === 'success') {
      const loginInfo = responseJson.data;
      if (data.mobile_number) {
        this.props.navigation.navigate('AuthVerifyMobile', {
          loginInfo,
          signupInfo: this.state,
        });
      } else {
        Auth.login(this.props.navigation, loginInfo);
      }
    } else {
      console.log(responseJson.data);
      this.handleFailedResponse(responseJson.data);
    }
  };

  handleFailedResponse(data) {
    if (data.email) {
      this.setState({
        emailError: data.email,
      });
    }
    if (data.mobile_number) {
      this.setState({
        mobileError: data.mobile_number,
      });
    }
    if (data.company) {
      this.setState({
        companyError: data.company,
      });
    }
  }

  _scrollToInput(inputHandle) {
    const scrollResponder = this.myScrollView.getScrollResponder();
    scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
      inputHandle, // The TextInput node handle
      0, // The scroll view's bottom "contentInset" (default 0)
      true, // Prevent negative scrolling
    );
  }

  // renderButton() {
  //   if (this.state.loading) {
  //     return <Spinner size="small" />;
  //   }

  //   return <Button onPress={this.onButtonPress.bind(this)}>Log In</Button>;
  // }

  render() {
    const {
      firstName,
      lastName,
      email,
      emailError,
      lineNumber,
      countryName,
      countryCode,
      mobileNumberError,
      company,
      companyError,
      password,
      passwordError,
      password2,
      password2Error,
      // password_matching,
      termsAndConditions,
    } = this.state;

    const {
      containerStyle,
      containerStyleInputs,
      touchableStyleForgotPassword,
      touchableStyleClear,
    } = styles;

    return (
      <KeyboardAvoidingView
        style={containerStyle}
        behavior={'padding'}
        keyboardVerticalOffset={85}>
        <ScrollView
          keyboardDismissMode={'interactive'}
          reference={scrollView => {
            this.myScrollView = scrollView;
          }}
          keyboardShouldPersistTaps="always">
          <Input
            label="First name"
            placeholder="e.g. John"
            onChangeText={firstName => this.setState({ firstName })}
            value={firstName}
            autoCapitalize={'words'}
            autoFocus
            returnKeyType="next"
            reference={input => {
              this.firstName = input;
            }}
            onSubmitEditing={() => {
              this.lastName.focus();
            }}
          />
          <Input
            label="Last name"
            placeholder="e.g. Snow"
            onChangeText={lastName => this.setState({ lastName })}
            value={lastName}
            autoCapitalize={'words'}
            returnKeyType="next"
            reference={input => {
              this.lastName = input;
            }}
            onSubmitEditing={() => {
              this.email.focus();
            }}
          />
          <Input
            placeholder="e.g. user@gmail.com"
            label="Email"
            value={email}
            required
            requiredError={emailError}
            keyboardType="email-address"
            onChangeText={email => this.setState({ email })}
            returnKeyType="next"
            reference={input => {
              this.email = input;
            }}
            onSubmitEditing={() => {
              this.lineNumber.focus();
            }}
          />
          <Input
            type="mobile"
            placeholder="12345678"
            label="Mobile"
            value={lineNumber}
            requiredError={mobileNumberError}
            keyboardType="numeric"
            onChangeText={lineNumber => this.setState({ lineNumber })}
            returnKeyType="next"
            changeCountryCode={this.changeCountryCode}
            countryCode={countryCode}
            countryName={countryName}
            reference={input => {
              this.lineNumber = input;
            }}
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
            returnKeyType="next"
            reference={input => {
              this.password = input;
            }}
            onSubmitEditing={() => {
              this.password2.focus();
            }}
          />
          <Input
            type="password"
            placeholder="Password"
            label="Confirm password"
            required
            requiredError={password2Error}
            value={password2}
            password={true}
            onChangeText={password2 => this.setState({ password2 })}
            returnKeyType="done"
            reference={input => {
              this.password2 = input;
            }}
            onSubmitEditing={this.onButtonPress.bind(this)}
          />
        </ScrollView>
        <Button label="REGISTER" onPress={this.onButtonPress.bind(this)} />
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
