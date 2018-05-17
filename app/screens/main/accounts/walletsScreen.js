import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { fetchAccounts } from './../../../redux/actions';

import Header from './../../../components/header';
import Wallet from './../../../components/wallet';
import { CardContainer, Card, Spinner } from '../../../components/common';

class WalletsScreen extends Component {
  static navigationOptions = {
    title: 'Wallets',
  };

  componentDidMount() {
    this.refreshAccounts();
  }

  refreshAccounts() {
    // this.props.fetchAccounts();
  }

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
        accountReference={accountReference}
        accountLabel={accountLabel}
        navigation={this.props.navigation}
        currency={currency}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation} drawer title="Wallets" />
        <View style={{ flex: 1 }}>
          {/* {this.props.loadingAccounts ? <Spinner size="small" /> : null} */}
          <CardContainer>{this.renderAccounts()}</CardContainer>
        </View>
      </View>
    );
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
