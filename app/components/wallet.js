import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import {
  setSendCurrency,
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
    this.props.setSendCurrency(
      this.props.currency,
      this.props.accountReference,
    );
    this.props.navigation.navigate('Send');
  }

  setActiveCurrency = () => {
    this.props.setActiveCurrency(
      this.props.accountReference,
      this.props.currency.currency.code,
    );
  };

  render() {
    const { key, currency, accountLabel } = this.props;
    const {
      textStyleLabel,
      textStyleBalance,
      textStyleAvailable,
      viewStyleContainer,
      textStyleDescription,
    } = styles;
    const header = currency.currency.code + ' ' + accountLabel;
    const balance =
      currency.currency.symbol +
      ' ' +
      this.getBalance(currency.balance, currency.currency.divisibility).toFixed(
        currency.currency.divisibility,
      );
    const available =
      currency.currency.symbol +
      ' ' +
      this.getBalance(
        currency.available_balance,
        currency.currency.divisibility,
      ).toFixed(currency.currency.divisibility);
    return (
      <Card
        // key={key}
        textHeader={header}
        textActionOne="Send"
        onPressActionOne={() => this.send()}
        textActionTwo="Receive"
        onPressActionTwo={() => this.props.navigation.navigate('Receive')}
        iconHeaderRight={currency.active ? 'md-star' : 'md-star-outline'}
        walletCodeHeaderRight={currency.currency.code}
        walletCodeActive={currency.active}
        onPressHeaderRight={() => this.setActiveCurrency()}
        loading={this.props.loadingDefaultAccountChange}>
        <View style={viewStyleContainer}>
          <Text style={textStyleDescription}>
            {currency.currency.description}
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
  setSendCurrency,
  resetSend,
  setActiveCurrency,
})(Wallet);
