import React, { Component } from 'react';
import { View, RefreshControl, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { fetchCryptoAccounts } from './../../../redux/actions';

import Account from './../../../components/bankAccount';
import Colors from './../../../config/colors';
import Header from './../../../components/header';
import { EmptyListMessage } from './../../../components/common';

class CryptoAddressesScreen extends Component {
  static navigationOptions = {
    title: 'Crypto addresses',
  };

  componentDidMount() {
    this.props.fetchCryptoAccounts();
  }

  goToEdit = reference => {
    this.props.navigation.navigate('EditCryptoAddress', { reference });
  };

  render() {
    const {
      cryptoAccounts,
      loadingCryptoAccounts,
      fetchCryptoAccounts,
    } = this.props;
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          back
          title="Crypto addresses"
          headerRightTitle="Add"
          headerRightOnPress={() =>
            this.props.navigation.navigate('AddCryptoAddress', {
              parentRoute: 'Settings',
              nextRoute: 'SettingsCryptoAddresses',
            })
          }
        />
        {cryptoAccounts.length > 0 ? (
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={loadingCryptoAccounts}
                onRefresh={fetchCryptoAccounts}
              />
            }
            data={cryptoAccounts}
            renderItem={({ item }) => (
              <Account
                onPress={this.goToEdit}
                reference={item}
                name={item.address}
              />
            )}
            keyExtractor={item => item.id}
          />
        ) : (
          <EmptyListMessage text="No crypto addresses added yet" />
        )}
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
  const { cryptoAccounts, loadingCryptoAccounts } = user;
  return { cryptoAccounts, loadingCryptoAccounts };
};

export default connect(mapStateToProps, { fetchCryptoAccounts })(
  CryptoAddressesScreen,
);
