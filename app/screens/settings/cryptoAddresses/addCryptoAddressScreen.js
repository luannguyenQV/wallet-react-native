import React, { Component } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import AddCryptoAddressComponent from './../../../components/cryptoAddressComponent';
import SettingsService from './../../../services/settingsService';
import ResetNavigation from './../../../util/resetNavigation';
import Header from './../../../components/header';

class AddCryptoAddressScreen extends Component {
  static navigationOptions = {
    title: 'Add new address',
  };

  constructor() {
    super();
    this.state = {
      address: '',
    };
  }

  updateAddress = address => {
    this.setState({ address });
  };

  reload = () => {
    const params = this.props.navigation.state.params;
    ResetNavigation.dispatchUnderDrawer(
      this.props.navigation,
      params.parentRoute,
      params.nextRoute,
    );
  };

  add = async () => {
    let responseJson = await SettingsService.addCryptoAddresses(this.state);

    if (responseJson.status === 'success') {
      this.reload();
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
          title="Add new address"
          headerRightTitle="Save"
          headerRightOnPress={this.add}
        />
        <AddCryptoAddressComponent
          updateAddress={this.updateAddress}
          values={this.state}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default AddCryptoAddressScreen;
