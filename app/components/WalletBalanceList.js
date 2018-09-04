import React, { Component } from 'react';
import { View, FlatList, Dimensions, Animated, Text } from 'react-native';

import HeaderCurrency from './HeaderCurrency';
import { EmptyListMessage } from './common';
import WalletBalance from './WalletBalance';

const SCREEN_WIDTH = Dimensions.get('window').width;

class WalletBalanceList extends Component {
  scrollX = new Animated.Value(0);

  componentDidMount() {
    if (this.props.accounts.length > 1) {
      this.flatListRef.scrollToIndex({
        animated: false,
        index: this.props.activeWalletIndex || 0,
      });
    }
  }

  getItemLayout = (data, index) => ({
    length: SCREEN_WIDTH,
    offset: SCREEN_WIDTH * index,
    index,
  });

  renderWallets() {
    const { accounts, showClose, hideWallet, colors } = this.props;
    console.log('accounts', accounts);

    const currencies = accounts[0].currencies ? accounts[0].currencies : [];

    if (currencies.length === 1) {
      return (
        <HeaderCurrency
          detail
          wallet={currencies[0]}
          showClose={showClose}
          closeWallet={hideWallet}
          colors={colors}
        />
      );
    } else {
      return (
        <FlatList
          onViewableItemsChanged={this.handleViewableItemsChanged}
          viewabilityConfig={this.viewabilityConfig}
          ref={ref => {
            this.flatListRef = ref;
          }}
          data={currencies}
          horizontal
          pagingEnabled
          getItemLayout={this.getItemLayout}
          renderItem={({ item }) => (
            <WalletBalance currency={item} colors={colors} />
          )}
          keyExtractor={item => item.currency.code}
          showsHorizontalScrollIndicator={false}
        />
      );
    }
  }

  renderItem(item, index) {
    return (
      <Animated.View
        key={item.account_name + item.currency.currency.code}
        // style={{ opacity }}
      >
        <HeaderCurrency wallet={item} />
      </Animated.View>
    );

    return;
  }

  handleViewableItemsChanged = info => {
    if (info.viewableItems && info.viewableItems.length > 0) {
      this.props.setHomeCurrency(info.viewableItems[0].item.currency.code);
    }
  };

  viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  render() {
    const { colors, accounts } = this.props;
    const { viewStyleContainer, viewStyleBox, textStyle } = styles;
    return (
      <View style={[viewStyleContainer, { backgroundColor: colors.primary }]}>
        {accounts && accounts.length > 0 ? (
          <View>{this.renderWallets()}</View>
        ) : (
          <View style={viewStyleBox}>
            <Text style={[textStyle, { color: colors.primaryContrast }]}>
              No accounts available
            </Text>
          </View>
        )}
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

export default WalletBalanceList;
