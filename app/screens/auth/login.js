import React, { Component } from 'react';
import { View } from 'react-native';

import Header from './../../components/header';
import LogInForm from './../../components/wallet2/LogInForm';

export default class Login extends Component {
  static navigationOptions = {
    title: 'Login',
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header navigation={this.props.navigation} back title="Log In" />
        <LogInForm navigation={this.props.navigation} />
      </View>
    );
  }
}
