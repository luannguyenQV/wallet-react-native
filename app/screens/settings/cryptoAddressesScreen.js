import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { newItem, updateItem } from './../../redux/actions';

import Header from './../../components/header';
import CardListUserSettings from './../../components/cards/CardListUserSettings';
import { userCryptoAddressesSelector } from '../../redux/reducers/UserReducer';

class CryptoAddressesScreen extends Component {
  static navigationOptions = {
    title: 'Crypto accounts',
  };

  render() {
    const { cryptoAddresses, tempItem, newItem, updateItem } = this.props;
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          back
          title="Crypto accounts"
          headerRightIcon={cryptoAddresses.showDetail ? 'done' : 'add'}
          headerRightOnPress={
            cryptoAddresses.showDetail
              ? () => updateItem('crypto_account')
              : () => newItem('crypto_account')
          }
        />
        <CardListUserSettings
          type="crypto_account"
          data={cryptoAddresses}
          navigation={this.props.navigation}
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

const mapStateToProps = state => {
  return {
    cryptoAddresses: userCryptoAddressesSelector(state),
  };
};

export default connect(mapStateToProps, {
  newItem,
  updateItem,
})(CryptoAddressesScreen);
