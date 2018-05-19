import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { fetchAccounts } from './../../../redux/actions';

import Header from './../../../components/header';
import Wallet from './../../../components/wallet';
import { CardContainer, EmptyListMessage } from '../../../components/common';
import HeaderWallet from '../../../components/headerWallet';
import TransactionList from './../../../components/TransactionList';

class WalletsScreen extends Component {
  static navigationOptions = {
    title: 'Wallets',
  };

  state = {
    showDetails: false,
    wallet: null,
  };

  componentDidMount() {
    this.refreshAccounts();
  }

  refreshAccounts() {
    // this.props.fetchAccounts();
  }

  showDetails(wallet) {
    this.setState({
      showDetails: true,
      wallet: wallet,
    });
  }

  hideDetails = () => {
    this.setState({
      showDetails: false,
      wallet: null,
    });
  };

  renderWallets() {
    const { wallets } = this.props;
    if (wallets.length > 0) {
      return (
        <FlatList
          data={wallets}
          renderItem={({ item }) => this.renderWallet(item)}
          keyExtractor={item => item.account_name + item.currency.currency.code}
        />
      );
    }
    return <EmptyListMessage text="No wallets" />;
  }

  renderWallet(wallet) {
    return (
      <Wallet
        onCardPress={() => this.showDetails(wallet)}
        wallet={wallet}
        navigation={this.props.navigation}
      />
    );
  }

  renderDetails() {
    const { wallet } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <HeaderWallet wallet={wallet} />
        <TransactionList
          // updateBalance={this.getBalanceInfo}
          currencyCode={wallet.currency.currency.code}
          // showDialog={this.showDialog}
          // logout={this.logout}
        />
      </View>
    );
  }

  render() {
    if (this.state.showDetails) {
      return (
        <View style={styles.container}>
          <Header
            navigation={this.props.navigation}
            drawer
            title="Wallets"
            headerRightIcon="md-close"
            headerRightOnPress={this.hideDetails}
          />
          {this.renderDetails()}
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Header navigation={this.props.navigation} drawer title="Wallets" />
          {/* <View style={{ flex: 1 }}> */}
          <CardContainer>{this.renderWallets()}</CardContainer>
          {/* {this.props.loadingAccounts ? <Spinner size="small" /> : null} */}
          {/* </View> */}
        </View>
      );
    }
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
  },
};

const mapStateToProps = ({ accounts }) => {
  const { wallets, loadingAccounts } = accounts;
  return { wallets, loadingAccounts };
};

export default connect(mapStateToProps, { fetchAccounts })(WalletsScreen);
