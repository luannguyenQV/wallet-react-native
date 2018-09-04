import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import {
  logoutUser,
  fetchAccounts,
  setHomeAccount,
  setHomeCurrency,
} from './../../redux/actions';
import { walletsSelector } from './../../redux/reducers/AccountsReducer';
import Swiper from 'react-native-swiper';

import Header from './../../components/header';
import WalletHeader from '../../components/WalletHeader';
import TransactionList from './../../components/TransactionList';
import HomeCards from './../../components/HomeCards';
import WalletBalanceList from '../../components/WalletBalanceList';
import WalletActionList from '../../components/WalletActionList';

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
    const {
      wallets,
      activeWalletIndex,
      fetchAccounts,
      company_config,
      accounts,
      setHomeAccount,
      setHomeCurrency,
    } = this.props;
    console.log('wallets', wallets);
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          drawer
          right
          noShadow
          // noAccounts={this.state.noAccounts}
        />
        <WalletBalanceList
          currencies={wallets.currencies}
          activeCurrency={wallets.activeCurrency}
          setHomeAccount={setHomeAccount}
          setHomeCurrency={setHomeCurrency}
        />
        <WalletActionList
          buttons={[
            { id: 0, type: 'receive' },
            { id: 1, type: 'send' },
            { id: 2, type: 'more' },
          ]}
          navigation={this.props.navigation}
          accountRef={wallets.activeAccount}
          currencyCode={wallets.activeCurrency}
        />
        <Swiper renderPagination={renderPagination} loop={false}>
          <HomeCards navigation={this.props.navigation} />
          <TransactionList
            transactions={wallets.transactions}
            // fetchAccounts={fetchAccounts}
            loading={wallets.transactionsLoading}
            currencyCode={wallets.homeCurrency}
            accountRef={wallets.homeAccount}
            // showDialog={this.showDialog}
            // logout={this.logout}
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

const mapStateToProps = state => {
  const { token, company_config } = state.auth;
  const { activeWalletIndex, accounts, loadingAccounts } = state.accounts;
  return {
    token,
    company_config,
    wallets: walletsSelector(state),
    accounts,
    activeWalletIndex,
    loadingAccounts,
  };
};

export default connect(mapStateToProps, {
  logoutUser,
  fetchAccounts,
  setHomeAccount,
  setHomeCurrency,
})(HomeScreen);
