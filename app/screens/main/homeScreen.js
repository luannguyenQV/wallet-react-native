import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { connect } from 'react-redux';
import {
  logoutUser,
  setActiveWalletIndex,
  fetchAccounts,
} from './../../redux/actions';

import Swiper from 'react-native-swiper';

import Header from './../../components/header';
import HeaderWallet from '../../components/HeaderWallet';
import TransactionList from './../../components/TransactionList';
import HomeCards from './../../components/HomeCards';

const renderPagination = (index, total, context) => {
  return (
    <View style={styles.paginationStyle}>
      {/* <Text style={{ color: 'grey' }} /> */}
    </View>
  );
};

class HomeScreen extends Component {
  static navigationOptions = {
    label: 'Home',
  };

  componentDidMount() {
    // ContactService.getAllContacts();
  }

  showDialog = item => {
    this.setState({ dataToShow: item });
    this.popupDialog.show();
  };

  render() {
    const { wallets, activeWalletIndex, company_config } = this.props;

    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation} drawer right noShadow />
        <HeaderWallet
          wallets={wallets}
          buttons={[
            { id: 0, type: 'receive' },
            { id: 1, type: 'send' },
            { id: 2, type: 'more' },
          ]}
          navigation={this.props.navigation}
          colors={company_config.colors}
        />
        <Swiper renderPagination={renderPagination} loop={false}>
          <HomeCards navigation={this.props.navigation} />
          <TransactionList
            currencyCode={
              wallets && wallets.length
                ? wallets[activeWalletIndex].currency.currency.code
                : ''
            }
          />
        </Swiper>
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
};

const mapStateToProps = ({ auth, accounts }) => {
  const { token, company_config } = auth;
  const { wallets, activeWalletIndex, loadingAccounts } = accounts;
  return { token, company_config, wallets, activeWalletIndex, loadingAccounts };
};

export default connect(mapStateToProps, { logoutUser, fetchAccounts })(
  HomeScreen,
);
