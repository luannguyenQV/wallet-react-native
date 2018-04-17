import React, { Component } from 'react';
import { View } from 'react-native';
import Header from './../../components/header';
import LoginForm from './../../components/wallet2/LoginForm';

export default class Login extends Component {
  static navigationOptions = {
    title: 'Login',
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header navigation={this.props.navigation} back title="Login" />
        <LoginForm navigation={this.props.navigation} />
      </View>
    );
  }
}
