import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { connect } from 'react-redux';
import {
  logoutUser,
  setActiveWalletIndex,
  fetchAccounts,
} from './../../redux/actions';
import _ from 'lodash';
import Swiper from 'react-native-swiper';

import Header from './../../components/header';

import TransactionPopUp from './../../components/wallet/TransactionPopUp';
import HeaderWallet from '../../components/HeaderWallet';
import TransactionList from './../../components/TransactionList';
import HomeCards from './../../components/HomeCards';

import * as rehive from './../../util/rehive';

const renderPagination = (index, total, context) => {
  return (
    <View style={styles.paginationStyle}>
      <Text style={{ color: 'grey' }} />
    </View>
  );
};

class HomeScreen extends Component {
  static navigationOptions = {
    label: 'Home',
  };

  showDialog = item => {
    this.setState({ dataToShow: item });
    this.popupDialog.show();
  };

  render() {
    const { wallets, activeWalletIndex, fetchAccounts } = this.props;
    // console.log(accounts);
    // console.log(rehive.rehive);
    // console.log('rehive.getEmails', rehive.getEmails);
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          drawer
          // noAccounts={this.state.noAccounts}
        />
        <HeaderWallet
          wallets={wallets}
          buttons={[
            { id: 0, type: 'receive' },
            { id: 1, type: 'send' },
            { id: 2, type: 'more' },
          ]}
          navigation={this.props.navigation}
        />
        {/* currency={item} accountLabel={account.name} /> */}
        {/* {this.renderAccounts()} */}
        <Swiper renderPagination={renderPagination} loop={false}>
          {/* <View style={{ flex: 1 }} /> */}
          <HomeCards navigation={this.props.navigation} />
          <TransactionList
            // updateBalance={this.getBalanceInfo}
            // fetchAccounts={fetchAccounts}
            currencyCode={wallets[activeWalletIndex].currency.currency.code}
            // showDialog={this.showDialog}
            // logout={this.logout}
          />
        </Swiper>
        {/* <TransactionPopUp
          popupDialog={popupDialog => {
            this.popupDialog = popupDialog;
          }}
          transactionDetails={this.state.dataToShow}
        /> */}
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
  paginationStyle: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
};

const mapStateToProps = ({ auth, accounts }) => {
  const { token } = auth;
  const { wallets, activeWalletIndex, loadingAccounts } = accounts;
  return { token, wallets, activeWalletIndex, loadingAccounts };
};

export default connect(mapStateToProps, { logoutUser, fetchAccounts })(
  HomeScreen,
);
