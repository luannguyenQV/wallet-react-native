import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import Colors from './../config/colors';
import { performDivisibility } from './../util/general';

const SCREEN_WIDTH = Dimensions.get('window').width;

class HeaderCurrency extends Component {
  render() {
    const { detail, showAccountLabel } = this.props;
    const { currency, account_label } = this.props.wallet;
    const {
      viewStyleContainer,
      viewStyleCurrency,
      textStyleCode,
      textStyleAccount,
      textStyleSymbol,
      textStyleAmount,
    } = styles;
    return (
      <View
        style={[
          viewStyleContainer,
          detail
            ? {
                paddingTop: 12,
                width: SCREEN_WIDTH - 16,
              }
            : { width: SCREEN_WIDTH },
        ]}>
        <Text style={textStyleCode}>{currency.currency.code}</Text>
        {showAccountLabel ? (
          <Text style={textStyleAccount}>{account_label.toLowerCase()}</Text>
        ) : null}
        <View
          style={[viewStyleCurrency, detail ? null : { paddingBottom: 16 }]}>
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
    // flex: 1,
    backgroundColor: Colors.primary,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewStyleCurrency: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyleCode: {
    color: Colors.onPrimary,
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 0,
  },
  textStyleAccount: {
    color: Colors.onPrimary,
    fontSize: 16,
    // fontWeight: 'bold',
    paddingBottom: 8,
  },
  textStyleSymbol: {
    color: Colors.focus,
    fontSize: 42,
    fontWeight: 'bold',
    paddingRight: 4,
  },
  textStyleAmount: {
    color: Colors.focus,
    fontSize: 42,
    fontWeight: 'bold',
  },
};

const mapStateToProps = ({ accounts }) => {
  const { showAccountLabel } = accounts;
  return { showAccountLabel };
};

export default connect(mapStateToProps, {})(HeaderCurrency);
