import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import {
  fetchData,
  newItem,
  editItem,
  updateItem,
  deleteItem,
  updateInputField,
} from './../../redux/actions';

import Header from './../../components/header';
import { Input, Output } from './../../components/common';
import CardList from './../../components/CardList';

class AddressesScreen extends Component {
  static navigationOptions = {
    title: 'Addresses',
  };

  renderContent = item => {
    const { line_1, line_2, city, state_province, postal_code } = item;
    // return <View />;
    return (
      <View style={{ padding: 8 }}>
        {line_1 ? <Output label="Address line 1" value={line_1} /> : null}
        {line_2 ? <Output label="Address line 2" value={line_2} /> : null}
        {city ? <Output label="City" value={city} /> : null}
        {state_province ? (
          <Output label="State province" value={state_province} />
        ) : null}
        {postal_code ? (
          <Output label="Postal code" value={postal_code} />
        ) : null}
      </View>
    );
  };

  renderDetail = () => {
    const {
      tempItem,
      updateError,
      updateInputField,
      company_config,
    } = this.props;
    const { colors } = company_config;

    return (
      <View>
        <Input
          label="Address line 1"
          placeholder="e.g. 158 Kloof Street"
          autoCapitalize="none"
          value={tempItem.line_1}
          onChangeText={input => updateInputField('address', 'line_1', input)}
          colors={colors}
        />

        <Input
          label="Address line 2"
          placeholder="e.g. Gardens"
          autoCapitalize="none"
          value={tempItem.line_2}
          onChangeText={input => updateInputField('address', 'line_2', input)}
          colors={colors}
        />

        <Input
          label="City"
          placeholder="e.g. Cape Town"
          autoCapitalize="none"
          value={tempItem.city}
          onChangeText={input => updateInputField('address', 'city', input)}
          colors={colors}
        />

        <Input
          label="State province"
          placeholder="e.g. Western Cape"
          autoCapitalize="none"
          value={tempItem.state_province}
          onChangeText={input =>
            updateInputField('address', 'state_province', input)
          }
          colors={colors}
        />

        <Input
          label="Postal code"
          placeholder="e.g. 9001"
          autoCapitalize="none"
          value={tempItem.postal_code}
          onChangeText={input =>
            updateInputField('address', 'postal_code', input)
          }
          colors={colors}
        />
      </View>
    );
  };

  render() {
    const {
      address,
      tempItem,
      newItem,
      updateItem,
      showDetail,
      company_config,
    } = this.props;
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          back
          title="Addresses"
          headerRightIcon={showDetail ? 'done' : 'add'}
          headerRightOnPress={
            showDetail
              ? () => updateItem('address', tempItem)
              : () => newItem('address')
          }
          colors={company_config.colors}
        />
        <CardList
          colors={company_config.colors}
          type="address"
          data={address}
          tempItem={tempItem}
          identifier="line_1"
          renderContent={this.renderContent}
          renderDetail={this.renderDetail}
          emptyListMessage="No addresses added yet"
          canDelete
          canEdit
          // canVerify
          // canPrimary
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  viewStyleContent: {
    padding: 8,
  },
};

const mapStateToProps = ({ user, auth }) => {
  const { company_config } = auth;
  const { address, loading_address, tempItem, showDetail, updateError } = user;
  return {
    address,
    loading_address,
    showDetail,
    tempItem,
    updateError,
    company_config,
  };
};

export default connect(mapStateToProps, {
  fetchData,
  newItem,
  editItem,
  updateItem,
  deleteItem,
  updateInputField,
})(AddressesScreen);
