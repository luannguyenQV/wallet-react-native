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

import Header from './../../components/header';
// import Wallet from './../../components/wallet';
import { Output, MyView } from '../../components/common';
import { standardizeString, performDivisibility } from './../../util/general';
import WalletHeader from './../../components/WalletHeader';
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
    let wallet = null;
    if (this.props.navigation.state.params) {
      wallet = this.props.navigation.state.params.wallet;
      this.props.navigation.state.params.wallet = null;
    }
    if (wallet) {
      this.props.viewWallet(wallet);
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
    this.props.resetSend();
    this.props.setSendWallet(item);
    this.props.navigation.navigate('Send');
  };

  renderContent(item) {
    const balance =
      item.currency.currency.symbol +
      ' ' +
      performDivisibility(
        item.currency.balance,
        item.currency.currency.divisibility,
      ).toFixed(item.currency.currency.divisibility);
    const available =
      item.currency.currency.symbol +
      ' ' +
      performDivisibility(
        item.currency.available_balance,
        item.currency.currency.divisibility,
      ).toFixed(item.currency.currency.divisibility);

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
        <WalletHeader
          wallets={[item]}
          buttons={buttons}
          navigation={navigation}
          showClose
          colors={this.props.company_config.colors}
        />
        <TransactionList currencyCode={item.currency.currency.code} />
      </View>
    );
  }

  render() {
    const {
      fetchAccounts,
      loading_accounts,
      wallets,
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
          data={wallets}
          tempItem={tempWallet}
          loadingData={loading_accounts}
          identifier="reference"
          onRefresh={fetchAccounts}
          activeItem={item => showModal('wallet', item, 'active')}
          // showDetail={showWallet}
          renderContent={this.renderContent}
          renderDetail={(item, navigation) =>
            this.renderDetail(item, navigation)
          }
          itemActive={item => (item ? item.currency.active : false)}
          textTitleLeft={item => (item ? item.currency.currency.code : '')}
          // onPressTitleLeft={item => this.showModal(item)}
          title={item => (item ? item.currency.currency.description : '')}
          subtitle={item => (item ? standardizeString(item.account_name) : '')}
          onPressTitle={item => viewWallet(item)}
          onPressContent={item => viewWallet(item)}
          emptyListMessage="No wallets added yet"
          titleStyle="secondary"
          keyExtractor={item => item.index.toString()}
          textActionOne="SEND"
          onPressActionOne={item => this.send(item)}
          textActionTwo="RECEIVE"
          onPressActionTwo={item =>
            this.props.navigation.navigate('Receive', {
              currencyCode: item.currency.currency.code,
            })
          }
          canActive
        />
      </MyView>
    );
  }
}

const mapStateToProps = ({ accounts, user, auth }) => {
  const { wallets, loading_accounts, tempWallet, showWallet } = accounts;
  const { company_bank_account } = user;
  const { company_config } = auth;
  return {
    wallets,
    loading_accounts,
    tempWallet,
    showWallet,
    company_bank_account,
    company_config,
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
