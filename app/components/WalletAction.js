import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import context from './common/context';

import { CustomIcon } from './../components/common';

class WalletAction extends Component {
  renderButton() {
    const { type, colors } = this.props;
    const { viewStyleContainer, iconStyle, textStyleLabel } = styles;
    let label = '';

    switch (type) {
      case 'send':
        label = 'Send';
        // source = require('./../../assets/icons/send.png');
        break;
      case 'receive':
        // source = require('./../../assets/icons/receive.png');
        label = 'Receive';
        break;
      case 'deposit':
        // source = require('./../../assets/icons/deposit.png');
        label = 'Deposit';
        break;
      case 'withdraw':
        // source = require('./../../assets/icons/withdraw.png');
        label = 'Withdraw';
        break;
      case 'more':
        // source = require('./../../assets/icons/more.png');
        label = 'More';
        break;
      default:
        label = 'unknown';
    }
    return (
      <View style={[viewStyleContainer, { backgroundColor: colors.header }]}>
        <CustomIcon name={type} size={48} color={colors.headerContrast} />
        <Text style={[textStyleLabel, { color: colors.headerContrast }]}>
          {label}
        </Text>
      </View>
    );
  }

  render() {
    const { onPress } = this.props;
    return (
      <TouchableOpacity
        onPress={onPress}
        // style={this.buttonStyle()}
        // ref={reference}
      >
        {this.renderButton()}
      </TouchableOpacity>
    );
  }
}

const styles = {
  viewStyleContainer: {
    paddingBottom: 8,
    paddingTop: 8,
    paddingVertical: 16,
    flexDirection: 'column',
    // marginRight: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 10,
  },
  iconStyle: {
    height: 48,
    width: 48,
    marginBottom: 4,
  },
  textStyleLabel: {
    fontSize: 14,
  },
};

export default context(WalletAction);
