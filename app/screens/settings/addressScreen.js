import React, { Component } from 'react';
import { View, Alert, Text, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import {
  fetchData,
  editItem,
  updateItem,
  updateInputField,
} from './../../redux/actions';

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

  componentDidMount() {
    this.props.fetchData('address');
    this.props.editItem('address', this.props.address);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.showDetail) {
      this.props.navigation.goBack();
    }
  }

  render() {
    const {
      loading_address,
      fetchData,
      temp_address,
      updateItem,
      updateInputField,
    } = this.props;
    const {
      line_1,
      line_2,
      city,
      state_province,
      postal_code,
      country,
    } = temp_address;
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          back
          title="Address"
          headerRightIcon="save"
          headerRightOnPress={() => updateItem('address', temp_address)}
        />
        <InputContainer
          refreshControl={
            <RefreshControl
              refreshing={loading_address}
              onRefresh={() => fetchData('address')}
            />
          }>
          <Input
            label="Address Line 1"
            placeholder="e.g. 158 Kloof Street"
            autoCapitalize="none"
            value={line_1}
            onChangeText={input => updateInputField('address', 'line_1', input)}
          />

          <Input
            label="Address Line 2"
            placeholder="e.g. Gardens"
            autoCapitalize="none"
            value={line_2}
            onChangeText={input => updateInputField('address', 'line_2', input)}
          />

          <Input
            label="City"
            placeholder="e.g. Cape Town"
            autoCapitalize="none"
            value={city}
            onChangeText={input => updateInputField('address', 'city', input)}
          />

          <Input
            label="State province"
            placeholder="e.g. Western Cape"
            autoCapitalize="none"
            value={state_province}
            onChangeText={input =>
              updateInputField('address', 'state_province', input)
            }
          />

          <Input
            label="Postal code"
            placeholder="e.g. 9001"
            autoCapitalize="none"
            value={postal_code}
            onChangeText={input =>
              updateInputField('address', 'postal_code', input)
            }
          />

          {/* <View style={styles.pickerContainer}>
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
          </View> */}
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
  const { address, loading_address, temp_address, showDetail } = user;
  return { address, loading_address, temp_address, showDetail };
};

export default connect(mapStateToProps, {
  fetchData,
  editItem,
  updateItem,
  updateInputField,
})(AddressScreen);
