import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { fetchAccounts } from './../../../redux/actions';

import Header from './../../../components/header';
import Wallet from './../../../components/wallet';
import { CardContainer, EmptyListMessage } from '../../../components/common';
import HeaderWallet from '../../../components/HeaderWallet';
import TransactionList from './../../../components/TransactionList';

class WalletsScreen extends Component {
  static navigationOptions = {
    title: 'Wallets',
  };

  state = {
    showDetails: false,
    wallet: null,
    headerRightIcon: '',
    headerRightOnPress: () => {},
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
      headerRightIcon: 'md-close',
      headerRightOnPress: () => this.hideDetails(),
    });
  }

  hideDetails = () => {
    this.setState({
      showDetails: false,
      wallet: null,
      headerRightIcon: '',
      headerRightOnPress: () => {},
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
      <View style={styles.viewStyleDetailCard}>
        <HeaderWallet
          wallets={[wallet]}
          buttons={[
            { id: 0, type: 'deposit' },
            { id: 1, type: 'withdraw' },
            { id: 2, type: 'receive' },
            { id: 3, type: 'send' },
          ]}
          navigation={this.props.navigation}
        />
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
    const { headerRightIcon, headerRightOnPress, showDetails } = this.state;
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          drawer
          title="Wallets"
          headerRightIcon={headerRightIcon}
          headerRightOnPress={headerRightOnPress}
        />
        {showDetails ? (
          this.renderDetails()
        ) : (
          <CardContainer>{this.renderWallets()}</CardContainer>
        )}
      </View>
    );
  }
}

const styles = {
  viewStyleDetailCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    // borderRadius: 2,
    // borderColor: '#ffffff',
    // borderWidth: 1,
    shadowColor: 'rgba(0, 0, 0, 0.6)',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    margin: 8,
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
  const { wallets, loadingAccounts } = accounts;
  return { wallets, loadingAccounts };
};

export default connect(mapStateToProps, { fetchAccounts })(WalletsScreen);
