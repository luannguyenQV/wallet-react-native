import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import Colors from './../config/colors';
import { HeaderButton } from './common';
import { performDivisibility } from './../util/general';

const SCREEN_WIDTH = Dimensions.get('window').width;

class HeaderCurrency extends Component {
  getBalanceTextStyle() {
    const { colors } = this.props;
    return [
      styles.textStyleBalance,
      {
        fontSize: 42,
        width: SCREEN_WIDTH - 32,
        color: colors.focus,
      },
    ];
  }

  render() {
    const { detail, showClose, closeWallet, colors, currency } = this.props;
    const { viewStyleContainer, textStyleCode, iconStyleTitleRight } = styles;
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
          { backgroundColor: colors.primary },
        ]}>
        {showClose ? (
          <View style={iconStyleTitleRight}>
            <HeaderButton
              icon="close"
              onPress={closeWallet}
              color="lightgrey"
            />
          </View>
        ) : null}
        <Text style={[textStyleCode, { color: colors.primaryContrast }]}>
          {currency.currency.code}
        </Text>
        {/* {showAccountLabel ? (
          <Text style={[textStyleAccount, { color: colors.primaryContrast }]}>
            {account_name}
          </Text>
        ) : null} */}
        <Text
          adjustsFontSizeToFit
          numberOfLines={1}
          style={this.getBalanceTextStyle(currency)}>
          {currency.currency.symbol}{' '}
          {performDivisibility(
            currency.available_balance,
            currency.currency.divisibility,
          ).toFixed(currency.currency.divisibility)}
        </Text>
      </View>
    );
  }
}

const styles = {
  viewStyleContainer: {
    backgroundColor: Colors.primary,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 8,
    paddingBottom: 16,
  },
  textStyleCode: {
    color: Colors.primaryContrast,
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 0,
  },
  textStyleAccount: {
    color: Colors.primaryContrast,
    fontSize: 16,
    paddingBottom: 8,
  },
  textStyleBalance: {
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  iconStyleTitleRight: {
    right: -8,
    top: -8,
    margin: 0,
    position: 'absolute',
  },
};

export default HeaderCurrency;
