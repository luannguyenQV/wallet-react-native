import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Colors from './../config/colors';

class HeaderCurrency extends Component {
  setBalance = (balance, divisibility) => {
    for (let i = 0; i < divisibility; i++) {
      balance = balance / 10;
    }
    let balanceString = balance.toString();
    return balance;
  };

  render() {
    const { accountLabel, currency } = this.props;
    const {
      viewStyleContainer,
      viewStyleCurrency,
      textStyleCode,
      textStyleAccount,
      textStyleSymbol,
      textStyleAmount,
    } = styles;
    return (
      <View style={viewStyleContainer}>
        <Text style={textStyleCode}>{currency.currency.code}</Text>
        <Text style={textStyleAccount}>{accountLabel}</Text>
        <View style={viewStyleCurrency}>
          <Text style={textStyleSymbol}>{currency.currency.symbol}</Text>
          <Text style={textStyleAmount}>
            {' '}
            {this.setBalance(
              currency.available_balance,
              currency.currency.divisibility,
            ).toFixed(currency.currency.divisibility)}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = {
  viewStyleContainer: {
    // margin: 8,
    // marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewStyleCurrency: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingBottom: 16,
  },
  textStyleCode: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 2,
  },
  textStyleAccount: {
    color: 'white',
    fontSize: 16,
    // fontWeight: 'bold',
    paddingBottom: 4,
  },
  textStyleSymbol: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    paddingRight: 8,
  },
  textStyleAmount: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
  },
};

export default HeaderCurrency;
