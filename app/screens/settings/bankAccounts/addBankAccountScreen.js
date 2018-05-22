import React, { Component } from 'react';
import { View, Alert, StyleSheet } from 'react-native';

import AddBankAccountComponent from './../../../components/bankAccountComponent';
import SettingsService from './../../../services/settingsService';
import ResetNavigation from './../../../util/resetNavigation';
import Header from './../../../components/header';

class AddBankAccountScreen extends Component {
  static navigationOptions = {
    title: 'Add new bank account',
  };

  constructor() {
    super();
    this.state = {
      name: '',
      number: '',
      type: '',
      bank_name: '',
      branch_code: '',
      swift: '',
      iban: '',
      bic: '',
    };
  }

  updateInputField = (prop, value) => {
    this.setState({ [prop]: value });
  };

  updateName = name => {
    this.setState({ name });
  };
  updateNumber = number => {
    this.setState({ number });
  };
  updateType = type => {
    this.setState({ type });
  };
  updateBank = bank_name => {
    this.setState({ bank_name });
  };
  updateBranch = branch_code => {
    this.setState({ branch_code });
  };
  updateSwift = swift => {
    this.setState({ swift });
  };
  updateIBAN = iban => {
    this.setState({ iban });
  };
  updateBIC = bic => {
    this.setState({ bic });
  };
  goToHome = () => {
    const params = this.props.navigation.state.params;
    ResetNavigation.dispatchUnderDrawer(
      this.props.navigation,
      params.parentRoute,
      params.nextRoute,
    );
  };

  add = async () => {
    let responseJson = await SettingsService.addBankAccount(this.state);

    if (responseJson.status === 'success') {
      this.goToHome();
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
          title="Add bank account"
          headerRightTitle="Save"
          headerRightOnPress={this.add}
        />
        <AddBankAccountComponent
          values={this.state}
          updateInputField={this.updateInputField}
          updateNumber={this.updateNumber}
          updateType={this.updateType}
          updateBank={this.updateBank}
          updateBranch={this.updateBranch}
          updateSwift={this.updateSwift}
          updateIBAN={this.updateIBAN}
          updateBIC={this.updateBIC}
        />
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

export default AddBankAccountScreen;
