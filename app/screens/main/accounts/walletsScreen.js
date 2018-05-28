import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import {
  fetchAccounts,
  resetSend,
  setSendWallet,
  viewWallet,
  hideWallet,
} from './../../../redux/actions';

import Header from './../../../components/header';
// import Wallet from './../../../components/wallet';
import { Output, PopUpGeneral } from '../../../components/common';
import {
  standardizeString,
  performDivisibility,
} from './../../../util/general';
import HeaderWallet from '../../../components/HeaderWallet';
import TransactionList from './../../../components/TransactionList';
import CardList from './../../../components/CardList';

class WalletsScreen extends Component {
  static navigationOptions = {
    title: 'Wallets',
  };

  state = {
    showModal: false,
    wallet: null,
  };

  componentDidMount() {
    this.props.fetchAccounts();
    this.props.hideWallet();
  }

  showModal = item => {
    console.log(item);

    this.setState({ showModal: true, wallet: item });
  };

  hideModal = () => {
    this.setState({ showModal: false, wallet: null });
  };

  // showDetails(wallet) {
  //   this.setState({
  //     showDetails: true,
  //     wallet: wallet,
  //   });
  // }

  // hideDetails = () => {
  //   this.setState({
  //     showDetails: false,
  //     wallet: null,
  //     headerRightIcon: '',
  //     headerRightOnPress: () => {},
  //   });
  // };

  send = item => {
    console.log(item);
    this.props.resetSend();
    this.props.setSendWallet(item);
    this.props.navigation.navigate('Send');
  };

  renderContent(item) {
    const balance =
      item.currency.currency.symbol +
      ' ' +
      performDivisibility(
        item.currency.balance,
        item.currency.currency.divisibility,
      ).toFixed(item.currency.currency.divisibility);
    const available =
      item.currency.currency.symbol +
      ' ' +
      performDivisibility(
        item.currency.available_balance,
        item.currency.currency.divisibility,
      ).toFixed(item.currency.currency.divisibility);

    return (
      <View style={styles.viewStyleContainer}>
        <Output label="Balance" value={balance} />
        <Output label="Available" value={available} />
      </View>
    );
  }

  renderDetail(item, navigation) {
    // const { wallet } = this.state;
    return (
      <View style={styles.viewStyleDetailCard}>
        <HeaderWallet
          wallets={[item]}
          buttons={[
            { id: 0, type: 'deposit' },
            { id: 1, type: 'withdraw' },
            { id: 2, type: 'receive' },
            { id: 3, type: 'send' },
          ]}
          navigation={navigation}
          showClose
        />
        <TransactionList
          // updateBalance={this.getBalanceInfo}
          currencyCode={item.currency.currency.code}
          // showDialog={this.showDialog}
          // logout={this.logout}
        />
      </View>
    );
  }

  render() {
    const {
      fetchAccounts,
      loading_accounts,
      wallets,
      hideWallet,
      viewWallet,
      showWallet,
      tempWallet,
    } = this.props;
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          drawer
          title="Wallets"
          headerRightIcon={showWallet ? 'close' : ''}
          headerRightOnPress={showWallet ? () => hideWallet() : () => {}}
        />
        <CardList
          navigation={this.props.navigation}
          data={wallets}
          tempItem={tempWallet}
          // showDetail={showWallet}
          renderContent={this.renderContent}
          renderDetail={(item, navigation) =>
            this.renderDetail(item, navigation)
          }
          saveItem={this.saveCryptoAddress}
          itemActive={item => (item ? item.currency.active : false)}
          textTitleLeft={item => (item ? item.currency.currency.code : '')}
          onPressTitleLeft={item => this.showModal(item)}
          title={item => (item ? item.currency.currency.description : '')}
          subtitle={item => (item ? standardizeString(item.account_name) : '')}
          onPressTitle={tempWallet => () => viewWallet(tempWallet)}
          refreshing={loading_accounts}
          onRefresh={fetchAccounts}
          emptyListMessage="No wallets added yet"
          titleStyle="secondary"
          keyExtractor={item => item.index + item.currency.currency.code}
          textActionOne="Send"
          onPressActionOne={item => () => this.send(item)}
          textActionTwo="Receive"
          onPressActionTwo={() => () =>
            this.props.navigation.navigate('Receive')}
        />
        <PopUpGeneral
          visible={this.state.showModal}
          // iconTitleLeft={iconTitleLeft}
          // title={'Transaction details'}
          // subtitle={'Subtitle?'}
          // titleStyle={titleStyle}
          // iconTitleRight={'close'}
          contentText="This will update your default currency"
          textActionOne="Set default"
          // onPressActionOne={() => this.hideModal()}
          textActionTwo="Cancel"
          onDismiss={() => this.hideModal()}
          onPressActionTwo={() => this.hideModal()}
        />
      </View>
    );
  }
}

const styles = {
  viewStyleContainer: {
    paddingLeft: 16,
  },
  viewStyleDetailCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    // borderRadius: 2,
    // borderColor: '#ffffff',
    // borderWidth: 1,
    shadowColor: 'rgba(0, 0, 0, 0.6)',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    shadowOffset: {
      height: 1,
      width: 2,
    },
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
};

const mapStateToProps = ({ accounts }) => {
  const { wallets, loading_accounts, tempWallet, showWallet } = accounts;
  return { wallets, loading_accounts, tempWallet, showWallet };
};

export default connect(mapStateToProps, {
  fetchAccounts,
  resetSend,
  setSendWallet,
  viewWallet,
  hideWallet,
})(WalletsScreen);
