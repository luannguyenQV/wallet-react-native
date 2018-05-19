import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import {
  setSendWallet,
  resetSend,
  setActiveCurrency,
} from './../redux/actions';

import Colors from './../config/colors';

import { Card } from './../components/common';

class Wallet extends Component {
  getBalance = (balance, divisibility) => {
    for (let i = 0; i < divisibility; i++) {
      balance = balance / 10;
    }
    let balanceString = balance.toString();
    return balance;
  };

  send() {
    this.props.resetSend();
    this.props.setSendWallet(this.props.wallet);
    this.props.navigation.navigate('Send');
  }

  setActiveCurrency = () => {
    this.props.setActiveCurrency(this.props.wallet);
  };

  render() {
    const { wallet, onCardPress } = this.props;
    const {
      textStyleLabel,
      textStyleBalance,
      textStyleAvailable,
      viewStyleContainer,
      textStyleDescription,
    } = styles;
    const header =
      wallet.currency.currency.code + ' ' + wallet.account_label.toLowerCase();
    const balance =
      wallet.currency.currency.symbol +
      ' ' +
      this.getBalance(
        wallet.currency.balance,
        wallet.currency.currency.divisibility,
      ).toFixed(wallet.currency.currency.divisibility);
    const available =
      wallet.currency.currency.symbol +
      ' ' +
      this.getBalance(
        wallet.currency.available_balance,
        wallet.currency.currency.divisibility,
      ).toFixed(wallet.currency.currency.divisibility);
    return (
      <Card
        onCardPress={onCardPress}
        textHeader={header}
        textActionOne="Send"
        onPressActionOne={() => this.send()}
        textActionTwo="Receive"
        onPressActionTwo={() => this.props.navigation.navigate('Receive')}
        walletCodeHeaderRight={wallet.currency.currency.code}
        walletCodeActive={wallet.currency.active}
        onPressHeaderRight={() => this.setActiveCurrency()}
        loading={this.props.loadingDefaultAccountChange}>
        <View style={viewStyleContainer}>
          <Text style={textStyleDescription}>
            {wallet.currency.currency.description}
          </Text>
          <Text style={textStyleLabel}>Balance</Text>
          <Text style={textStyleBalance}>{balance}</Text>
          <Text style={textStyleLabel}>Available</Text>
          <Text style={textStyleAvailable}>{available}</Text>
        </View>
      </Card>
    );
  }
}

const styles = {
  viewStyleContainer: {
    paddingLeft: 16,
  },
  textStyleLabel: {
    color: 'grey',
    fontSize: 12,
    paddingBottom: 4,
  },
  textStyleBalance: {
    color: 'black',
    fontWeight: 'normal',
    fontSize: 16,
    paddingBottom: 16,
  },
  textStyleAvailable: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  textStyleDescription: {
    color: 'black',
    fontSize: 16,
    paddingBottom: 16,
  },
};

const mapStateToProps = ({}) => {
  return {};
};

export default connect(mapStateToProps, {
  setSendWallet,
  resetSend,
  setActiveCurrency,
})(Wallet);
