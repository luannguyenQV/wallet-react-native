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

import { standardizeString } from './../../util/general';
import Header from './../../components/header';
import { Input, Output } from './../../components/common';
import CardList from './../../components/CardList';

class CryptoAddressesScreen extends Component {
  static navigationOptions = {
    title: 'Crypto addresses',
  };

  renderContent = item => {
    const { viewStyleContent } = styles;
    const { address } = item;
    return (
      <View style={viewStyleContent}>
        {address ? <Output label="Address" value={address} /> : null}
      </View>
    );
  };

  renderDetail = () => {
    const { temp_crypto_address, updateError, updateInputField } = this.props;
    const { address } = temp_crypto_address;

    return (
      <Input
        label="Address"
        placeholder="e.g. 78weiytuyiw3begnf3i4uheyrt43"
        autoCapitalize="none"
        value={address}
        inputError={updateError}
        onChangeText={input =>
          updateInputField('crypto_address', 'address', input)
        }
      />
    );
  };

  render() {
    const {
      crypto_address,
      loading_crypto_address,
      temp_crypto_address,
      newItem,
      updateItem,
      showDetail,
    } = this.props;
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          back
          title="Crypto addresses"
          headerRightIcon={showDetail ? 'done' : 'add'}
          headerRightOnPress={
            showDetail
              ? () => updateItem('crypto_address', temp_crypto_address)
              : () => newItem('crypto_address')
          }
        />
        <CardList
          type="crypto_address"
          data={crypto_address}
          tempItem={temp_crypto_address}
          loadingData={loading_crypto_address}
          identifier="address"
          renderContent={this.renderContent}
          renderDetail={this.renderDetail}
          emptyListMessage="No crypto accounts added yet"
          canDelete
          canEdit
        />
      </View>
    );
  }
}

const styles = {
  viewStyleContent: {
    padding: 8,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
};

const mapStateToProps = ({ user }) => {
  const {
    crypto_address,
    loading_crypto_address,
    temp_crypto_address,
    showDetail,
    updateError,
  } = user;
  return {
    crypto_address,
    loading_crypto_address,
    temp_crypto_address,
    showDetail,
    updateError,
  };
};

export default connect(mapStateToProps, {
  newItem,
  editItem,
  updateItem,
  deleteItem,
  updateInputField,
})(CryptoAddressesScreen);
