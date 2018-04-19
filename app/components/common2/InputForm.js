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
import { IsEmail } from './../../util/validation';

class InputForm extends Component {
  render() {
    const { children } = this.props;

    const {
      containerStyle,
      containerStyleInputs,
      touchableStyleForgotPassword,
    } = styles;

    return (
      <KeyboardAvoidingView
        style={containerStyleInputs}
        behavior={'padding'}
        keyboardVerticalOffset={85}>
        <ScrollView
          keyboardDismissMode={'interactive'}
          keyboardShouldPersistTaps="always">
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 10,
    justifyContent: 'center',
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

export { InputForm };
