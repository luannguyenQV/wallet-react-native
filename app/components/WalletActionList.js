import React, { Component } from 'react';
import { View, FlatList, Dimensions, Animated, Text } from 'react-native';

import WalletAction from './WalletAction';
import HeaderCurrency from './HeaderCurrency';
import { EmptyListMessage } from './common';

const SCREEN_WIDTH = Dimensions.get('window').width;

class WalletActionList extends Component {
  onButtonPress(type) {
    const {
      resetSend,
      navigation,
      resetWithdraw,
      currencyCode,
      accountRef,
    } = this.props;

    switch (type) {
      case 'send': {
        resetSend();
        navigation.navigate('Send', { accountRef, currencyCode });
        break;
      }
      case 'receive': {
        navigation.navigate('Receive', { currencyCode });
        break;
      }
      case 'withdraw': {
        resetWithdraw();
        navigation.navigate('Withdraw', { accountRef, currencyCode });
        break;
      }
      case 'deposit': {
        navigation.navigate('Deposit');
        break;
      }
      case 'more':
        // navigation.navigate('Wallets', { wallet });
        break;
      default:
        console.log('Error: unknown button type');
    }
  }

  render() {
    const { viewStyleButtons } = styles;
    return (
      <View>
        <FlatList
          contentContainerStyle={viewStyleButtons}
          data={this.props.buttons}
          horizontal
          scrollEnabled={false}
          renderItem={({ item }) => (
            <WalletAction
              type={item.type}
              onPress={() => this.onButtonPress(item.type)}
              color={this.props.colors.primaryContrast}
            />
          )}
          keyExtractor={item => item.id.toString()}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }
}

const styles = {
  viewStyleContainer: {
    flexDirection: 'column',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 5,
    shadowOpacity: 0.3,
    zIndex: 10,
  },
  viewStyleButtons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    padding: 8,
  },
  viewStyleBox: {
    flexDirection: 'column',
    padding: 16,
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 18,
    fontWeight: 'normal',
  },
};

export default WalletActionList;
