import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import SettingsService from './../../../services/settingsService';
import ResetNavigation from './../../../util/resetNavigation';
import { Input, InputForm } from './../../../components/common';
import Header from './../../../components/header';

class AddEmailAddressScreen extends Component {
  static navigationOptions = {
    title: 'Add email address',
  };

  constructor(props) {
    super(props);
    console.log(
      'addEmailAddress Params: ' + this.props.navigation.state.params.routeName,
    );
    this.state = {
      routeName: this.props.navigation.state.params.routeName,
      email: '',
      primary: false,
    };
  }

  reload = () => {
    ResetNavigation.dispatchUnderDrawer(
      this.props.navigation,
      this.state.routeName ? 'GetVerified' : 'Settings',
      'SettingsEmailAddresses',
    );
  };

  add = async () => {
    let responseJson = await SettingsService.addEmail(this.state);

    if (responseJson.status === 'success') {
      this.reload();
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
          title="Add email address"
          headerRightTitle="Save"
          headerRightOnPress={this.add}
        />
        <InputForm>
          <Input
            label="Email address"
            placeholder="e.g. john1@gmail.com"
            autoCapitalize="none"
            onChangeText={email => this.setState({ email })}
          />
        </InputForm>
      </View>
    );
  }
}

export default AddEmailAddressScreen;
