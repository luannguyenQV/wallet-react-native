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
import {
  CardList,
  Input,
  Output,
  InputContainer,
} from './../../components/common';

class CryptoAddressesScreen extends Component {
  static navigationOptions = {
    title: 'Crypto addresses',
  };

  renderContent(item) {
    const { viewStyleContent } = styles;
    const { address } = item;
    return (
      <View style={viewStyleContent}>
        {address ? <Output label="Address" value={address} /> : null}
      </View>
    );
  }

  renderDetail = item => {
    const { address } = item;

    const updateInputField = this.props.updateInputField;

    return (
      <InputContainer>
        <Input
          label="Address"
          placeholder="e.g. 78weiytuyiw3begnf3i4uhtqueyrt43"
          autoCapitalize="none"
          value={address}
          onChangeText={input =>
            updateInputField('crypto_address', 'address', input)
          }
        />
      </InputContainer>
    );
  };

  render() {
    const {
      crypto_address,
      loading_crypto_address,
      fetchData,
      temp_crypto_address,
      newItem,
      editItem,
      updateItem,
      deleteItem,
      showDetail,
    } = this.props;
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          back
          title="Crypto addresses"
          headerRightIcon={showDetail ? 'save' : 'add'}
          headerRightOnPress={
            showDetail
              ? () => updateItem('crypto_address', temp_crypto_address)
              : () => newItem('crypto_address')
          }
        />
        <CardList
          data={crypto_address}
          tempItem={temp_crypto_address}
          titleDetail="Edit crypto address"
          title={item => (item ? standardizeString(item.crypto_type) : '')}
          subtitle={item => (item ? standardizeString(item.status) : '')}
          onPressTitle={item => () => editItem('crypto_address', item)}
          renderContent={this.renderContent}
          showDetail={showDetail}
          renderDetail={tempItem => this.renderDetail(tempItem)}
          iconTitleRightDetail="close"
          onPressTitleRightDetail={() => fetchData('crypto_address')}
          // textActionOneDetail="Save"
          // onPressActionOneDetail={() =>
          //   updateItem('crypto_address', temp_crypto_address)
          // }
          refreshing={loading_crypto_address}
          onRefresh={() => fetchData('crypto_address')}
          emptyListMessage="No crypto accounts added yet"
          deleteItem={item => () => deleteItem('crypto_address', item)}
          deletable
          editing
          titleStyle="secondary"
        />
      </View>
    );
  }
}

const styles = {
  viewStyleContent: {
    paddingLeft: 16,
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
  } = user;
  return {
    crypto_address,
    loading_crypto_address,
    temp_crypto_address,
    showDetail,
  };
};

export default connect(mapStateToProps, {
  fetchData,
  newItem,
  editItem,
  updateItem,
  deleteItem,
  updateInputField,
})(CryptoAddressesScreen);
