import React, { Component } from 'react';
import { View, RefreshControl, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { fetchData, updateInputField } from './../../../redux/actions';

import { standardizeString } from './../../../util/general';

import Account from './../../../components/bankAccount';
import Colors from './../../../config/colors';
import Header from './../../../components/header';
import {
  CardList,
  Input,
  Output,
  InputContainer,
} from './../../../components/common';

class CryptoAddressesScreen extends Component {
  static navigationOptions = {
    title: 'Crypto addresses',
  };

  goToEdit = reference => {
    this.props.navigation.navigate('EditCryptoAddress', { reference });
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

    // this.setState({
    //   address: item ? address : '',
    // });

    let tempAddress = address;

    return (
      <InputContainer>
        <Input
          label="Address"
          placeholder="e.g. 78weiytuyiw3begnf3i4uhtqueyrt43"
          autoCapitalize="none"
          value={tempAddress}
          onChangeText={input => this.props.updateInputField('address', input)}
        />
      </InputContainer>
    );
  };

  saveCryptoAddress() {
    // update = async () => {
    //   let responseJson = await SettingsService.editCryptoAddresses(
    //     this.state.id,
    //     this.state,
    //   );
    //   if (responseJson.status === 'success') {
    //     this.reload();
    //   } else {
    //     Alert.alert('Error', responseJson.message, [{ text: 'OK' }]);
    //   }
    // };
    // let responseJson = await SettingsService.addCryptoAddresses(this.state);
  }

  render() {
    const {
      crypto_addresses,
      loading_crypto_addresses,
      fetchData,
    } = this.props;
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          back
          title="Crypto addresses"
          headerRightTitle="Add"
          // headerRightOnPress={() =>
          //   // this.setState({})
          // }
        />
        <CardList
          navigation={this.props.navigation}
          data={crypto_addresses}
          renderContent={this.renderContent}
          titleDetail="Edit bank account"
          renderDetail={item => this.renderDetail(item)}
          onPressActionOneDetail={() => console.log('save')}
          textActionOneDetail="Save"
          saveItem={this.saveCryptoAddress}
          title={item => (item ? standardizeString(item.crypto_type) : '')}
          subtitle={item => (item ? standardizeString(item.status) : '')}
          refreshing={loading_crypto_addresses}
          onRefresh={() => fetchData('crypto_addresses')}
          emptyListMessage="No mobile numbers added yet"
          deleteItem={this.delete}
          deletable
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
  submit: {
    marginBottom: 10,
    marginHorizontal: 20,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.lightblue,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const mapStateToProps = ({ user }) => {
  const { crypto_addresses, loading_crypto_addresses } = user;
  return { crypto_addresses, loading_crypto_addresses };
};

export default connect(mapStateToProps, { fetchData, updateInputField })(
  CryptoAddressesScreen,
);
