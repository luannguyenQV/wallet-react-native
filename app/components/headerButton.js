import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Colors from './../config/colors';
import Icon from 'react-native-vector-icons/Ionicons';

class HeaderAccount extends Component {
  setBalance = (balance, divisibility) => {
    for (let i = 0; i < divisibility; i++) {
      balance = balance / 10;
    }
    let balanceString = balance.toString();
    return balance;
  };

  render() {
    const { icon, label } = this.props;
    const { viewStyleContainer, iconStyle, textStyleLabel } = styles;
    return (
      <View style={viewStyleContainer}>
        <Icon style={iconStyle} name={icon} size={32} color="white" />
        <Text style={textStyleLabel}>{label}</Text>
      </View>
    );
  }
}

const styles = {
  viewStyleContainer: {
    paddingBottom: 8,
    flexDirection: 'column',
    // marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyleLabel: {
    color: 'white',
    fontSize: 12,
    // fontWeight: 'bold',
    // paddingTop: 4,
  },
};

export default HeaderAccount;
