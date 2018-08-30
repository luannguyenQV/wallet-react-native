import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { logoutUser, fetchAccounts } from './../../redux/actions';
import { walletsSelector } from './../../redux/reducers/AccountsReducer';
import Swiper from 'react-native-swiper';

import Header from './../../components/header';
import WalletHeader from '../../components/WalletHeader';
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
    const {
      wallets,
      activeWalletIndex,
      fetchAccounts,
      company_config,
      accounts,
    } = this.props;
    console.log(wallets);
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          drawer
          colors={company_config.colors}
          right
          noShadow
          // noAccounts={this.state.noAccounts}
        />
        <WalletHeader
          wallets={wallets}
          buttons={[
            { id: 0, type: 'receive' },
            { id: 1, type: 'send' },
            { id: 2, type: 'more' },
          ]}
          navigation={this.props.navigation}
          colors={company_config.colors}
        />
        {/* currency={item} accountLabel={account.name} /> */}
        {/* {this.renderAccounts()} */}
        <Swiper renderPagination={renderPagination} loop={false}>
          {/* <View style={{ flex: 1 }} /> */}
          <HomeCards navigation={this.props.navigation} />
          <TransactionList
            // updateBalance={this.getBalanceInfo}
            // fetchAccounts={fetchAccounts}
            currencyCode={
              wallets && wallets.length
                ? wallets[activeWalletIndex].currency.currency.code
                : accounts[0] && accounts[0].currencies[0]
                  ? accounts[0].currencies[0].currency.code
                  : ''
            }
            accountRef={
              wallets && wallets.length
                ? wallets[activeWalletIndex].reference
                : accounts[0] ? accounts[0].reference : ''
            }
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

export default connect(mapStateToProps, { logoutUser, fetchAccounts })(
  HomeScreen,
);
