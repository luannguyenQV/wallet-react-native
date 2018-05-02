import React, { Component } from 'react';
import { View, Alert, Text, StyleSheet } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import UserInfoService from './../../services/userInfoService';
import { Input, InputForm } from './../../components/common';
import Colors from './../../config/colors';
import Header from './../../components/header';
import ResetNavigation from './../../util/resetNavigation';

class AddressScreen extends Component {
  static navigationOptions = {
    title: 'Address',
  };

  constructor(props) {
    super(props);
    this.state = {
      routeName: this.props.navigation.state.params
        ? this.props.navigation.state.params.name
        : null,
      line_1: '',
      line_2: '',
      city: '',
      state_province: '',
      country: 'US',
      postal_code: '',
    };
  }

  componentDidMount() {
    this.getAddress();
  }

  getAddress = async () => {
    let responseJson = await UserInfoService.getAddress();
    if (responseJson.status === 'success') {
      const address = responseJson.data;
      this.setState({
        line_1: address.line_1,
        line_2: address.line_2,
        city: address.city,
        state_province: address.state_province,
        country: user.nationality !== '' ? user.nationality : 'US',
        postal_code: address.postal_code,
      });
    } else {
      Alert.alert('Error', responseJson.message, [{ text: 'OK' }]);
    }
  };

  save = async () => {
    let responseJson = await UserInfoService.updateAddress(this.state);
    //console.log(responseJson)
    if (responseJson.status === 'success') {
      this.reload();
    } else {
      Alert.alert('Error', responseJson.message, [{ text: 'OK' }]);
    }
  };

  reload = () => {
    ResetNavigation.dispatchToDrawerRoute(
      this.props.navigation,
      this.state.routeName != null ? 'GetVerified' : 'Settings',
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          back
          title="Address"
          headerRightTitle="Save"
          headerRightOnPress={this.save}
        />
        <InputForm>
          <Input
            label="Address Line 1"
            placeholder="e.g. Plot-02, Road-08"
            autoCapitalize="none"
            value={this.state.line_1}
            onChangeText={line_1 => this.setState({ line_1 })}
          />

          <Input
            label="Address Line 2"
            placeholder="e.g. Mohakhali C/A, Dhaka"
            autoCapitalize="none"
            value={this.state.line_2}
            onChangeText={line_2 => this.setState({ line_2 })}
          />

          <Input
            label="City"
            placeholder="e.g. Capetown"
            autoCapitalize="none"
            value={this.state.city}
            onChangeText={city => this.setState({ city })}
          />

          <Input
            label="State province"
            placeholder="e.g. Western Cape"
            autoCapitalize="none"
            value={this.state.state_province}
            onChangeText={state_province => this.setState({ state_province })}
          />

          <View style={styles.pickerContainer}>
            <Text style={[styles.text, { flex: 4 }]}>Country</Text>
            <View style={{ flex: 5, alignItems: 'flex-end' }}>
              <CountryPicker
                onChange={value => {
                  this.setState({ country: value.cca2 });
                }}
                cca2={this.state.country}
                closeable
                filterable
                translation="eng"
                styles={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            </View>
          </View>

          {/* <View style={[styles.pickerContainer, { paddingVertical: 20 }]}>
            <Text style={[styles.text, { flex: 4 }]}>Country</Text>
            <View style={{ flex: 5, alignItems: 'flex-end' }}>
              <CountryPicker
                onChange={value => {
                  this.setState({ nationality: value.cca2 });
                }}
                closeable
                filterable
                translation="eng"
                styles={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            </View>
          </View> */}

          <Input
            label="Postal code"
            placeholder="e.g. 1212"
            autoCapitalize="none"
            value={this.state.postal_code}
            onChangeText={postal_code => this.setState({ postal_code })}
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
  text: {
    fontSize: 16,
    color: Colors.black,
  },
  pickerContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
  },
};

export default AddressScreen;
