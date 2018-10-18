import React, { Component } from 'react';
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
import { Output, View } from '../../components/common';
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

  render() {
    const { currencies } = this.props;
    console.log('in wallletsScreen:render');
    return (
      <View>
        <Header navigation={this.props.navigation} drawer title="Wallets" />
        <CardListUserSettings
          type="wallet"
          data={currencies}
          navigation={this.props.navigation}
        />
        {/* <CardList

          activeItem={item => showModal('wallet', item, 'active')}

          itemActive={item => (item ? item.active : false)}
          textTitleLeft={item =>
            item && item.currency ? item.currency.code : ''
          }
          // onPressTitleLeft={item => this.showModal(item)}
          titleStyle="secondary"
          keyExtractor={item => item.account + item.currency.code}
          
          canActive
        /> */}
      </View>
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
