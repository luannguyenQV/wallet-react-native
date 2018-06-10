import React, { Component } from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import {
  setActiveWalletIndex,
  setSendWallet,
  resetSend,
  setWithdrawWallet,
  resetWithdraw,
  viewWallet,
  hideWallet,
} from './../redux/actions';

import Colors from './../config/colors';
import WalletAction from './WalletAction';
import HeaderCurrency from './HeaderCurrency';

const SCREEN_WIDTH = Dimensions.get('window').width;

class HeaderWallet extends Component {
  componentDidMount() {
    if (this.props.wallets.length > 1) {
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
    const { wallets, showClose, hideWallet } = this.props;
    if (wallets.length === 1) {
      return (
        <HeaderCurrency
          detail
          wallet={wallets[0]}
          showClose={showClose}
          closeWallet={hideWallet}
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
          data={this.props.wallets}
          horizontal
          pagingEnabled
          getItemLayout={this.getItemLayout}
          renderItem={({ item }) => <HeaderCurrency wallet={item} />}
          keyExtractor={item => item.account_name + item.currency.currency.code}
          showsHorizontalScrollIndicator={false}
        />
      );
    }
  }

  handleViewableItemsChanged = info => {
    if (info.viewableItems && info.viewableItems.length > 0) {
      this.props.setActiveWalletIndex(info.viewableItems[0].index);
    }
  };

  viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  renderButtons() {
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
            />
          )}
          keyExtractor={item => item.id.toString()}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }

  onButtonPress(type) {
    const {
      wallets,
      activeWalletIndex,
      tempWallet,
      resetSend,
      setSendWallet,
      navigation,
    } = this.props;
    switch (type) {
      case 'send': {
        resetSend();
        setSendWallet(
          wallets.length > 1 ? wallets[activeWalletIndex] : wallets[0],
        );
        navigation.navigate('Send');
        break;
      }
      case 'receive': {
        navigation.navigate('Receive');
        break;
      }
      case 'withdraw': {
        resetWithdraw();
        setWithdrawWallet(tempWallet);
        navigation.navigate('Withdraw');
        break;
      }
      case 'deposit': {
        navigation.navigate('Deposit');
        break;
      }
      case 'more':
        navigation.navigate('Wallets', {
          wallet: wallets[activeWalletIndex],
        });
        break;
      default:
        console.log('Error: unknown button type');
    }
  }

  render() {
    const { viewStyleContainer } = styles;
    return (
      <View style={viewStyleContainer}>
        {this.renderWallets()}
        {this.renderButtons()}
      </View>
    );
  }
}

const styles = {
  viewStyleContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.primary,
    // minHeight: 86,
    // height: '100%',
  },
  // viewStyleHeader: {
  //   paddingTop: 16,
  //   // backgroundColor: Colors.secondary,
  // },
  viewStyleButtons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    backgroundColor: Colors.primary,
    padding: 8,
  },
};

const mapStateToProps = ({ accounts }) => {
  const { user, activeWalletIndex, tempWallet } = accounts;
  return {
    user,
    activeWalletIndex,
    tempWallet,
  };
};

export default connect(mapStateToProps, {
  setActiveWalletIndex,
  setSendWallet,
  resetSend,
  setWithdrawWallet,
  resetWithdraw,
  viewWallet,
  hideWallet,
})(HeaderWallet);
