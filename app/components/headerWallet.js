import React, { Component } from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import {
  setActiveWalletIndex,
  setSendWallet,
  resetSend,
} from './../redux/actions';

import Colors from './../config/colors';
import HeaderButton from './HeaderButton';
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
    const { wallets } = this.props;
    if (wallets.length === 1) {
      return <HeaderCurrency detail wallet={wallets[0]} />;
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
            <HeaderButton
              type={item.type}
              onPress={() => this.onButtonPress(item.type)}
            />
          )}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }

  onButtonPress(type) {
    console.log(type);
    console.log(this.props);
    switch (type) {
      case 'send': {
        this.props.resetSend();
        this.props.setSendWallet(
          this.props.wallets[this.props.activeWalletIndex],
        );
        this.props.navigation.navigate('Send');
        break;
      }
      case 'receive': {
        this.props.navigation.navigate('Receive');
        break;
      }
      case 'withdraw': {
        this.props.navigation.navigate('Withdraw');
        break;
      }
      case 'deposit': {
        this.props.navigation.navigate('Deposit');
        break;
      }
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
    // flex: 1,
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
  const { user, activeWalletIndex } = accounts;
  return {
    user,
    activeWalletIndex,
  };
};

export default connect(mapStateToProps, {
  setActiveWalletIndex,
  setSendWallet,
  resetSend,
  // tempWallet,
})(HeaderWallet);
