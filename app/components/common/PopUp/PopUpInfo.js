import React from 'react';
import { Text, View } from 'react-native';
import Colors from './../../../config/colors';

const PopUpInfo = ({ label, value, textSize, currency }) => {
  const { textStyleSign, viewStyleRow, viewStyleValue } = styles;

  getTextStyleLabel = () => {
    return {
      flex: 4,
      fontSize: textSize,
      color: Colors.black,
      textAlign: 'right',
    };
  };

  getTextStyleValue = () => {
    return {
      flex: 4,
      fontSize: textSize,
      color: Colors.black,
    };
  };

  getAmount = (amount = 0, divisibility) => {
    for (let i = 0; i < divisibility; i++) {
      amount = amount / 10;
    }

    return amount.toFixed(8).replace(/\.?0+$/, '');
  };

  renderValue = () => {
    if (currency) {
      return (
        currency.symbol + Math.abs(this.getAmount(value, currency.divisibility))
      );
    }
    // return value;
  };

  return (
    <View style={viewStyleRow}>
      <Text style={getTextStyleLabel()}>{label}</Text>
      <View style={viewStyleValue}>
        <Text style={textStyleSign}>{value < 0 ? '-' : ''}</Text>
        <Text style={getTextStyleValue()}>{value}</Text>
      </View>
    </View>
  );
};

const styles = {
  textStyleSign: {
    color: Colors.black,
  },
  viewStyleRow: {
    flexDirection: 'row',
    paddingTop: 10,
  },
  viewStyleValue: {
    flex: 4,
    flexDirection: 'row',
    paddingLeft: 12,
    alignItems: 'center',
  },
};

export { PopUpInfo };
