import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
// import {} from './../redux/actions';

import UserInfoService from './../../../services/userInfoService';
import AccountService from './../../../services/accountService';
import Header from './../../../components/header';
import Wallet from './../../../components/wallet';
import Colors from './../../../config/colors';
import { CardContainer, Card } from '../../../components/common';

class WalletsScreen extends Component {
  static navigationOptions = {
    title: 'Wallets',
  };

  renderAccounts() {
    const { accounts } = this.props;
    if (accounts.results.length === 1) {
      return this.renderAccount(accounts.results[0]);
    } else if (accounts.results.length > 1) {
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
    if (account.currencies.length > 0) {
      return (
        <Card key={account.name} textHeader={account.label}>
          <FlatList
            data={account.currencies}
            renderItem={({ item }) =>
              this.renderWallet(item, account.reference)
            }
            keyExtractor={item => item.currency.code}
          />
        </Card>
      );
    }
    return (
      <Card key={account.name} textHeader={account.label}>
        <Card textHeader="No currencies" />
      </Card>
    );
  }

  renderWallet(currency, accountReference) {
    return (
      <Wallet
        accountReference={accountReference}
        navigation={this.props.navigation}
        // reference={this.state.reference}
        // setActiveCurrency={this.setActiveCurrency}
        currency={currency}
      />
    );
  }

  render() {
    console.log(this.props.accounts);
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation} drawer title="Wallets" />
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            // backgroundColor: 'white',
          }}>
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
    // backgroundColor: 'white',
  },
};

const mapStateToProps = ({ rehive }) => {
  const { accounts } = rehive;
  return { accounts };
};

export default connect(mapStateToProps, {})(WalletsScreen);
