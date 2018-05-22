import React, { Component } from 'react';
import { View, Alert, Text, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { fetchData } from './../../redux/actions';

import CountryPicker from 'react-native-country-picker-modal';
import UserInfoService from './../../services/userInfoService';
import { Input, InputContainer } from './../../components/common';
import Colors from './../../config/colors';
import Header from './../../components/header';
import ResetNavigation from './../../util/resetNavigation';

class AddressScreen extends Component {
  static navigationOptions = {
    title: 'Address',
  };

  state = {
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

  componentDidMount() {
    this.props.fetchData('addresses');
    this.updateAddressFields(this.props.addresses);
  }

  componentWillReceiveProps(nextProps) {
    this.updateAddressFields(nextProps.addresses);
  }

  updateAddressFields(address) {
    if (address) {
      this.setState({
        line_1: address.line_1,
        line_2: address.line_2,
        city: address.city,
        state_province: address.state_province,
        country: address.country !== '' ? address.country : 'US',
        postal_code: address.postal_code,
      });
    }
  }

  save = async () => {
    let responseJson = await UserInfoService.updateAddress(this.state);
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
    const { fetchData, loading_addresses } = this.props;
    const {
      line_1,
      line_2,
      city,
      state_province,
      postal_code,
      country,
    } = this.state;
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          back
          title="Address"
          headerRightTitle="Save"
          headerRightOnPress={this.save}
        />
        <InputContainer
          refreshControl={
            <RefreshControl
              refreshing={loading_addresses}
              onRefresh={fetchData}
            />
          }>
          <Input
            label="Address Line 1"
            placeholder="e.g. 158 Kloof Street"
            autoCapitalize="none"
            value={line_1}
            onChangeText={line_1 => this.setState({ line_1 })}
          />

          <Input
            label="Address Line 2"
            placeholder="e.g. Gardens"
            autoCapitalize="none"
            value={line_2}
            onChangeText={line_2 => this.setState({ line_2 })}
          />

          <Input
            label="City"
            placeholder="e.g. Cape Town"
            autoCapitalize="none"
            value={city}
            onChangeText={city => this.setState({ city })}
          />

          <Input
            label="State province"
            placeholder="e.g. Western Cape"
            autoCapitalize="none"
            value={state_province}
            onChangeText={state_province => this.setState({ state_province })}
          />

          <Input
            label="Postal code"
            placeholder="e.g. 9001"
            autoCapitalize="none"
            value={postal_code}
            onChangeText={postal_code => this.setState({ postal_code })}
          />

          <View style={styles.pickerContainer}>
            <Text style={[styles.text, { flex: 4 }]}>Country</Text>
            <View style={{ flex: 5, alignItems: 'flex-end' }}>
              <CountryPicker
                onChange={value => {
                  this.setState({ country: value.cca2 });
                }}
                cca2={country}
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
        </InputContainer>
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
    fontSize: 14,
    color: Colors.black,
  },
  pickerContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: 'lightgray',
  },
};

const mapStateToProps = ({ user }) => {
  const { profile, addresses, loading_addresses } = user;
  return { profile, addresses, loading_addresses };
};

export default connect(mapStateToProps, { fetchData })(AddressScreen);
