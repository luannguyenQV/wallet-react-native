import React, { Component } from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import {
  setActiveWalletIndex,
  setSendWallet,
  resetSend,
} from './../redux/actions';

import Colors from './../config/colors';
import HeaderWallet from './headerWallet';
import HeaderButton from './headerButton';

const SCREEN_WIDTH = Dimensions.get('window').width;

class HeaderAccount extends Component {
  componentDidMount() {
    this.flatListRef.scrollToIndex({
      animated: false,
      index: this.props.activeWalletIndex || 0,
    });
  }

  getItemLayout = (data, index) => ({
    length: SCREEN_WIDTH,
    offset: SCREEN_WIDTH * index,
    index,
  });

  renderWallets() {
    return (
      <View>
        <FlatList
          onViewableItemsChanged={this.handleViewableItemsChanged}
          viewabilityConfig={this.viewabilityConfig}
          // style={{ height: 0 }}
          ref={ref => {
            this.flatListRef = ref;
          }}
          // scrollToIndex=(params)
          data={this.props.wallets}
          horizontal
          pagingEnabled
          getItemLayout={this.getItemLayout}
          renderItem={({ item }) => <HeaderWallet wallet={item} />}
          keyExtractor={item => item.account_name + item.currency.currency.code}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }

  handleViewableItemsChanged = info => {
    if (info.viewableItems.length > 0) {
      this.props.setActiveWalletIndex(info.viewableItems[0].index);
    }
  };

  viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  onPressSend() {
    this.props.resetSend();
    this.props.setSendWallet(this.props.wallets[this.props.activeWalletIndex]);
    this.props.navigation.navigate('Send');
  }

  onPressReceive() {
    this.props.navigation.navigate('Receive');
  }

  render() {
    const { viewStyleContainer, viewStyleButtons } = styles;
    return (
      <View style={viewStyleContainer}>
        {this.renderWallets()}
        <View style={viewStyleButtons}>
          <HeaderButton
            icon="md-arrow-dropleft-circle"
            label="Receive"
            onPress={() => this.onPressReceive()}
          />
          <HeaderButton
            icon="md-arrow-dropright-circle"
            label="Send"
            onPress={() => this.onPressSend()}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  viewStyleContainer: {
    // flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.primary,
    // minHeight: 86,
    // height: '100%',
  },
  viewStyleButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.primary,
  },
};

const mapStateToProps = ({ accounts }) => {
  const {
    user,
    wallets,
    loadingAccounts,
    activeWalletIndex,
    currentIndex,
  } = accounts;
  return {
    user,
    wallets,
    loadingAccounts,
    activeWalletIndex,
    currentIndex,
  };
};

export default connect(mapStateToProps, {
  setActiveWalletIndex,
  setSendWallet,
  resetSend,
})(HeaderAccount);
