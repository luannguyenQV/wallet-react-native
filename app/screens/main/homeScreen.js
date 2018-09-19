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
  currenciesSelector,
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
    const { currencies, home, setHomeAccount, setHomeCurrency } = this.props;
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation} drawer right noShadow />
        <WalletBalanceList
          currencies={currencies.data}
          activeCurrency={home.currency}
          setHomeCurrency={setHomeCurrency}
        />
        <WalletActionList
          buttons={[
            { id: 0, type: 'receive' },
            { id: 1, type: 'send' },
            { id: 2, type: 'more' },
          ]}
          navigation={this.props.navigation}
          currency={home.currency}
        />
        <Swiper renderPagination={renderPagination} loop={false}>
          <HomeCards navigation={this.props.navigation} />
          <TransactionList currency={home.currency} />
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
    currencies: currenciesSelector(state),
    home: homeSelector(state),
    transactions: state.accounts.transactions,
  };
};

export default connect(mapStateToProps, {
  logoutUser,
  fetchAccounts,
  setHomeAccount,
  setHomeCurrency,
})(HomeScreen);
