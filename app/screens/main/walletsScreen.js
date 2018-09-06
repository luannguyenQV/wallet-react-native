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
      const { currencies } = this.props;
      const currency = currencies.data.find(
        item =>
          item.currency.code === this.props.navigation.state.params.currency,
      );
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

  send = item => {
    this.props.navigation.navigate('Send', {
      account: item.account,
      currency: item.currency.code,
    });
  };

  renderContent(item) {
    const balance =
      item.currency.symbol +
      ' ' +
      performDivisibility(item.balance, item.currency.divisibility).toFixed(
        item.currency.divisibility,
      );
    const available =
      item.currency.symbol +
      ' ' +
      performDivisibility(
        item.available_balance,
        item.currency.divisibility,
      ).toFixed(item.currency.divisibility);

    return (
      <MyView p={0.5}>
        <Output label="Balance" value={balance} />
        <Output label="Available" value={available} />
      </MyView>
    );
  }

  renderDetail(item, navigation) {
    // const { wallet } = this.state;
    let i = 0;
    let buttons = [];
    if (this.props.company_bank_account.length > 0) {
      buttons[i] = { id: i++, type: 'deposit' };
    }
    // buttons[i] = { id: i++, type: 'withdraw' };
    buttons[i] = { id: i++, type: 'receive' };
    buttons[i] = { id: i++, type: 'send' };
    return (
      <View>
        <WalletBalance detail currency={item} onClose={this.props.hideWallet} />
        <WalletActionList
          buttons={buttons}
          navigation={this.props.navigation}
          account={item.account}
          currency={item.currency.code}
        />
        <TransactionList
          accountRef={item.account}
          currencyCode={item.currency.code}
        />
      </View>
    );
  }

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
        <CardList
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
          textTitleLeft={item => (item ? item.currency.code : '')}
          // onPressTitleLeft={item => this.showModal(item)}
          title={item => (item ? item.currency.description : '')}
          subtitle={item => (item ? standardizeString(item.account_name) : '')}
          onPressTitle={item => viewWallet(item)}
          onPressContent={item => viewWallet(item)}
          emptyListMessage="No currencies added yet"
          titleStyle="secondary"
          keyExtractor={item => item.account + item.currency.code}
          textActionOne="SEND"
          onPressActionOne={item => this.send(item)}
          textActionTwo="RECEIVE"
          onPressActionTwo={item =>
            this.props.navigation.navigate('Receive', {
              currency: item.currency.code,
            })
          }
          canActive
        />
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
