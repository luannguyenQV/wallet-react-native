import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { fetchAccounts } from './../../../redux/actions';

import Header from './../../../components/header';
import Wallet from './../../../components/wallet';
import { CardContainer, Card, Spinner } from '../../../components/common';
import HeaderAccount from '../../../components/headerAccount';
import TransactionList from './../../../components/TransactionList';

class WalletsScreen extends Component {
  static navigationOptions = {
    title: 'Wallets',
  };

  state = {
    showDetails: false,
    currency: null,
    accountReference: '',
    accountLabel: '',
  };

  componentDidMount() {
    this.refreshAccounts();
  }

  refreshAccounts() {
    // this.props.fetchAccounts();
  }

  showDetails(currency, accountReference, accountLabel) {
    this.setState({
      showDetails: true,
      currency: currency,
      accountReference: accountReference,
      accountLabel: accountLabel,
    });
  }

  hideDetails = () => {
    this.setState({
      showDetails: false,
      currency: null,
      accountReference: '',
      accountLabel: '',
    });
  };

  renderAccounts() {
    const { accounts } = this.props;
    if (accounts.results.length > 0) {
      return (
        <FlatList
          data={accounts.results}
          renderItem={({ item }) => this.renderAccount(item)}
          keyExtractor={item => item.name}
        />
      );
    }
    return <Card textHeader="No accounts" />;
  }

  renderAccount(account) {
    return (
      <FlatList
        data={account.currencies}
        renderItem={({ item }) =>
          this.renderWallet(item, account.reference, account.name)
        }
        keyExtractor={item => item.currency.code}
      />
    );
    // if (account.currencies.length > 0) {
    // }
    // return (
    //   <Card key={account.name} textHeader={account.label}>
    //     <Card textHeader="No currencies" />
    //   </Card>
    // );
  }

  renderWallet(currency, accountReference, accountLabel) {
    return (
      <Wallet
        onCardPress={() =>
          this.showDetails(currency, accountReference, accountLabel)
        }
        accountReference={accountReference}
        accountLabel={accountLabel}
        navigation={this.props.navigation}
        currency={currency}
      />
    );
  }

  renderDetails() {
    const { currency, accountReference, accountLabel } = this.state;
    console.log('currency', currency);
    console.log('accountLabel', accountLabel);
    return (
      <View style={{ flex: 1 }}>
        <HeaderAccount currency={currency} accountLabel={accountLabel} />
        <TransactionList
          // updateBalance={this.getBalanceInfo}
          currencyCode={currency.currency.code}
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
          <CardContainer>{this.renderAccounts()}</CardContainer>
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

const mapStateToProps = ({ rehive }) => {
  const { accounts, loadingAccounts } = rehive;
  return { accounts, loadingAccounts };
};

export default connect(mapStateToProps, { fetchAccounts })(WalletsScreen);
