import React, { Component } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import EditCryptoAddressComponent from './../../../components/cryptoAddressComponent';
import SettingsService from './../../../services/settingsService';
import ResetNavigation from './../../../util/resetNavigation';
import Header from './../../../components/header';

class EditCryptoAddressScreen extends Component {
  static navigationOptions = {
    title: 'Edit Crypto address',
  };

  constructor(props) {
    super(props);
    const params = this.props.navigation.state.params.reference;
    this.state = {
      id: params.id,
      address: params.address,
    };
  }

  updateAddress = address => {
    this.setState({ address });
  };
  reload = () => {
    ResetNavigation.dispatchUnderDrawer(
      this.props.navigation,
      'Settings',
      'SettingsCryptoAddresses',
    );
  };

  update = async () => {
    let responseJson = await SettingsService.editCryptoAddresses(
      this.state.id,
      this.state,
    );
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
          title="Edit Crypto address"
          headerRightTitle="Save"
          headerRightOnPress={this.update}
        />
        <EditCryptoAddressComponent
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

export default EditCryptoAddressScreen;
