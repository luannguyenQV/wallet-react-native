import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import {
  fetchAccounts,
  resetSend,
  setSendWallet,
  viewWallet,
  hideWallet,
  showModal,
  setActiveCurrency,
} from './../../redux/actions';
import { currenciesSelector } from './../../redux/reducers/AccountsReducer';

import Header from './../../components/header';
// import Wallet from './../../components/wallet';
import { Output, MyView } from '../../components/common';
import { standardizeString, performDivisibility } from './../../util/general';
import WalletBalance from '../../components/WalletBalance';
import WalletActionList from '../../components/WalletActionList';
import TransactionList from './../../components/TransactionList';
import CardList from './../../components/CardList';
import CardListUserSettings from '../../components/cards/CardListUserSettings';

class WalletsScreen extends Component {
  static navigationOptions = {
    title: 'Wallets',
  };

  state = {
    showModal: false,
    wallet: null,
  };

  componentDidMount() {
    if (this.props.navigation.state.params) {
      const currency = this.props.navigation.state.params.currency;
      this.props.viewWallet(currency);
    } else {
      this.props.hideWallet();
    }
  }

  showModal = item => {
    this.setState({ showModal: true, wallet: item });
  };

  hideModal = () => {
    this.setState({ showModal: false, wallet: null });
  };

  send = item => {};

  render() {
    const {
      fetchAccounts,
      loading_accounts,
      currencies,
      viewWallet,
      showModal,
      tempWallet,
    } = this.props;
    return (
      <MyView f>
        <Header navigation={this.props.navigation} drawer title="Wallets" />
        <CardListUserSettings
          type="wallet"
          data={currencies}
          navigation={this.props.navigation}
        />
        {/* <CardList
          type="wallet"
          navigation={this.props.navigation}
          data={currencies.data}
          tempItem={tempWallet}
          loadingData={currencies.loading}
          identifier="reference"
          onRefresh={fetchAccounts}
          activeItem={item => showModal('wallet', item, 'active')}
          // showDetail={showWallet}
          renderContent={this.renderContent}
          renderDetail={(item, navigation) =>
            this.renderDetail(item, navigation)
          }
          itemActive={item => (item ? item.active : false)}
          textTitleLeft={item =>
            item && item.currency ? item.currency.code : ''
          }
          // onPressTitleLeft={item => this.showModal(item)}
          titleStyle="secondary"
          keyExtractor={item => item.account + item.currency.code}
          
          canActive
        /> */}
      </MyView>
    );
  }
}

const mapStateToProps = state => {
  const { loading_accounts, tempWallet, showWallet } = state.accounts;
  const { company_bank_account } = state.user;
  return {
    currencies: currenciesSelector(state),
    loading_accounts,
    tempWallet,
    showWallet,
    company_bank_account,
  };
};

export default connect(mapStateToProps, {
  fetchAccounts,
  resetSend,
  setSendWallet,
  viewWallet,
  hideWallet,
  showModal,
  setActiveCurrency,
})(WalletsScreen);
