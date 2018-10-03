import React, { Component } from 'react';
import { View, FlatList, Dimensions, Animated, Text } from 'react-native';

import HeaderCurrency from './HeaderCurrency';
import { EmptyListMessage } from './common';
import WalletBalance from './WalletBalance';
import context from './common/context';

const SCREEN_WIDTH = Dimensions.get('window').width;

class WalletBalanceList extends Component {
  scrollX = new Animated.Value(0);

  componentDidMount() {
    const { currencies, homeAccount, homeCurrency, colors } = this.props;

    // const index = currencies.indexOf(item => item.active);
    // console.log('index', index);

    // if (this.props.accounts.length > 1) {
    //   this.flatListRef.scrollToIndex({
    //     animated: false,
    //     index: 0,
    //   });
    // }
  }

  getItemLayout = (data, index) => ({
    length: SCREEN_WIDTH,
    offset: SCREEN_WIDTH * index,
    index,
  });

  renderAccounts() {
    const { currencies, colors } = this.props;

    if (currencies.length) {
      return (
        <View>
          <FlatList
            onViewableItemsChanged={this.handleViewableItemsChanged}
            viewabilityConfig={this.viewabilityConfig}
            ref={ref => (this.flatListRef = ref)}
            data={currencies}
            horizontal
            pagingEnabled
            getItemLayout={this.getItemLayout}
            renderItem={({ item }) => (
              <WalletBalance
                currency={item}
                // showAccountLabel={currencies.multipleAccounts}
              />
            )}
            keyExtractor={item => item.account + '_' + item.currency.code}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      );
    } else {
      return (
        <Text style={[styles.textStyle, { color: colors.primaryContrast }]}>
          No accounts available
        </Text>
      );
    }
  }

  handleViewableItemsChanged = info => {
    if (info.viewableItems && info.viewableItems.length > 0) {
      this.props.setHomeCurrency(info.viewableItems[0].item);
    }
  };

  viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  render() {
    const { colors } = this.props;
    const { viewStyleContainer } = styles;
    return (
      <View style={[viewStyleContainer, { backgroundColor: colors.header }]}>
        {this.renderAccounts()}
      </View>
    );
  }
}

const styles = {
  viewStyleContainer: {
    flexDirection: 'column',
    elevation: 10,
    // shadowColor: '#000',
    // shadowOffset: { width: 2, height: 2 },
    // shadowRadius: 5,
    // shadowOpacity: 0.3,
    zIndex: 11,
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

export default context(WalletBalanceList);
