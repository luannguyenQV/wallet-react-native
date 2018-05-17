import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { switchTempCurrency, setActiveCurrency } from './../redux/actions';

import Colors from './../config/colors';
import HeaderCurrency from './headerCurrency';
import HeaderButton from './headerButton';

const SCREEN_WIDTH = Dimensions.get('window').width;

class HeaderAccount extends Component {
  changeAccount = () => {
    this.props.setActiveCurrency(
      this.props.accounts.results[0].reference,
      this.props.tempCurrency.currency.code,
    );
  };

  switchTempCurrency = () => {
    this.props.switchTempCurrency(
      this.props.accounts,
      this.props.tempCurrency,
      this.props.tempCurrencyIndex,
    );
  };

  render() {
    const { accountLabel, currency } = this.props;
    const { viewStyleContainer, viewStyleButtons } = styles;
    return (
      <View style={viewStyleContainer}>
        <HeaderCurrency accountLabel={accountLabel} currency={currency} />
        <View style={viewStyleButtons}>
          <HeaderButton icon="md-arrow-dropleft-circle" label="Receive" />
          <HeaderButton icon="md-arrow-dropright-circle" label="Send" />
        </View>
      </View>
    );
  }
}

const styles = {
  viewStyleContainer: {
    flex: 1,
    backgroundColor: Colors.primary,
    width: SCREEN_WIDTH,
    // minHeight: 86,
  },
  viewStyleButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.primary,
  },
};

const mapStateToProps = ({ rehive }) => {
  const {
    user,
    accounts,
    tempCurrency,
    loadingAccounts,
    tempCurrencyIndex,
  } = rehive;
  return { user, accounts, tempCurrency, loadingAccounts, tempCurrencyIndex };
};

export default connect(mapStateToProps, {
  switchTempCurrency,
  setActiveCurrency,
})(HeaderAccount);
