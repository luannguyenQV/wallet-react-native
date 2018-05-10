import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import SettingsService from './../../../services/settingsService';
import { Input, InputForm } from './../../../components/common';
import Header from './../../../components/header';
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

class AddMobileNumberScreen extends Component {
  static navigationOptions = {
    title: 'Add mobile number',
  };

  constructor(props) {
    super(props);
    this.state = {
      routeName: this.props.navigation.state.params.routeName,
      number: '',
      code: '+1',
      primary: false,
    };
  }

  changeCountryCode = code => {
    this.setState({ code: '+' + code });
  };

  add = async () => {
    let responseJson = await SettingsService.addMobile({
      number: this.state.code + this.state.number,
      primary: this.state.primary,
    });

    if (responseJson.status === 'success') {
      this.props.navigation.navigate('VerifyMobileNumber', {
        routeName: this.state.routeName,
      });
    } else {
      Alert.alert('Error', responseJson.message, [{ text: 'OK' }]);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          back
          title="Add mobile number"
          headerRightTitle="Save"
          headerRightOnPress={this.add}
        />
        <InputForm>
          <Input
            label="Enter number"
            autoCapitalize="none"
            type="mobile"
            value={this.state.number}
            onChangeText={number => this.setState({ number })}
            changeCountryCode={this.changeCountryCode}
            countryCode={this.state.code}
            // countryName={countryName}
          />
        </InputForm>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
};

export default AddMobileNumberScreen;
