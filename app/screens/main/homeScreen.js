import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import {
  logoutUser,
  fetchAccounts,
  setHomeAccount,
  setHomeCurrency,
} from './../../redux/actions';
import {
  walletsSelector,
  homeSelector,
} from './../../redux/reducers/AccountsReducer';
import Swiper from 'react-native-swiper';

import Header from './../../components/header';
import TransactionList from './../../components/TransactionList';
import HomeCards from './../../components/HomeCards';
import WalletBalanceList from '../../components/WalletBalanceList';
import WalletActionList from '../../components/WalletActionList';

const renderPagination = (index, total, context) => {
  return (
    <View style={styles.paginationStyle}>
      {/* <Text style={{ color: 'grey' }} /> */}
    </View>
  );
};

class HomeScreen extends Component {
  static navigationOptions = {
    label: 'Home',
  };

  render() {
    const { wallets, home, setHomeAccount, setHomeCurrency } = this.props;
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation} drawer right noShadow />
        <WalletBalanceList
          currencies={wallets.currencies}
          activeCurrency={home.currency}
          setHomeAccount={setHomeAccount}
          setHomeCurrency={setHomeCurrency}
        />
        <WalletActionList
          buttons={[
            { id: 0, type: 'receive' },
            { id: 1, type: 'send' },
            { id: 2, type: 'more' },
          ]}
          navigation={this.props.navigation}
          account={home.account}
          currency={home.currency}
        />
        <Swiper renderPagination={renderPagination} loop={false}>
          <HomeCards navigation={this.props.navigation} />
          <TransactionList
            transactions={wallets.transactions}
            // fetchAccounts={fetchAccounts}
            loading={wallets.transactionsLoading}
            currencyCode={home.currency}
            accountRef={home.account}
          />
        </Swiper>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
};

const mapStateToProps = state => {
  return {
    wallets: walletsSelector(state),
    home: homeSelector(state),
  };
};

export default connect(mapStateToProps, {
  logoutUser,
  fetchAccounts,
  setHomeAccount,
  setHomeCurrency,
})(HomeScreen);
