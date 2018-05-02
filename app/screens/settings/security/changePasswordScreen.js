import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import AuthService from './../../../services/authService';
import { Input, InputForm, Button } from './../../../components/common';
import Header from './../../../components/header';

class ChangePasswordScreen extends Component {
  static navigationOptions = {
    label: 'Change password',
  };

  constructor() {
    super();

    this.state = {
      old_password: '',
      new_password1: '',
      new_password2: '',
    };
  }

  save = async () => {
    let responseJson = await AuthService.changePassword(this.state);
    if (responseJson.status === 'success') {
      Alert.alert('Success', responseJson.message, [
        {
          text: 'OK',
          onPress: () => this.props.navigation.goBack(),
        },
      ]);
    } else {
      Alert.alert('Error', responseJson.message, [{ text: 'OK' }]);
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          navigation={this.props.navigation}
          back
          title="Change password"
        />
        <InputForm>
          <Input
            type="password"
            label="Old password"
            placeholder="e.g. 12345678"
            autoCapitalize="none"
            value={this.state.old_password}
            underlineColorAndroid="white"
            onChangeText={old_password => this.setState({ old_password })}
          />
          <Input
            type="password"
            label="New password"
            autoCapitalize="none"
            placeholder="e.g. 123dr321"
            value={this.state.line_2}
            onChangeText={new_password1 => this.setState({ new_password1 })}
            underlineColorAndroid="white"
          />

          <Input
            type="password"
            label="Confirm new password"
            autoCapitalize="none"
            placeholder="e.g. 123dr321"
            value={this.state.new_password2}
            underlineColorAndroid="white"
            onChangeText={new_password2 => this.setState({ new_password2 })}
          />

          <Button label="CONFIRM" onPress={() => this.save()} />
        </InputForm>
      </View>
    );
  }
}

export default ChangePasswordScreen;
