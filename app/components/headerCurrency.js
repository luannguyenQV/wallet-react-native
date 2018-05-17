import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Colors from './../config/colors';
import { performDivisibility } from './../util/general';

class HeaderCurrency extends Component {
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
            {performDivisibility(
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
    flex: 1,
    flexDirection: 'column',
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
