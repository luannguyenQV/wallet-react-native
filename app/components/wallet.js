import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import { setSendCurrency, resetSend } from './../redux/actions';

import Colors from './../config/colors';
import IconF from 'react-native-vector-icons/Ionicons';

import { Card } from './../components/common';

class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: this.props.currency,
      active: false,
      balance: 0,
      code: this.props.code,
      reference: this.props.reference,
    };
  }

  componentWillMount() {
    let i = 0,
      j = 0;
    this.setState({
      balance: this.setBalance(
        this.state.currency.available_balance,
        this.state.currency.currency.divisibility,
      ),
      active: this.state.currency.active,
    });
  }

  setBalance = (balance, divisibility) => {
    for (let i = 0; i < divisibility; i++) {
      balance = balance / 10;
    }
    let balanceString = balance.toString();
    return balance;
  };

  send() {
    this.props.resetSend();
    this.props.setSendCurrency(
      this.state.currency,
      this.props.accountReference,
    );
    this.props.navigation.navigate('Send');
  }

  render() {
    const { key, currency } = this.props;
    return (
      <Card
        key={key}
        textHeader={currency.currency.description}
        textActionOne="Send"
        onPressActionOne={() => this.send()}
        textActionTwo="Receive"
        onPressActionTwo={() => this.props.navigation.navigate('Receive')}
        loading={this.props.loadingDefaultAccountChange}>
        <View>
          <Text>
            Balance: {currency.currency.symbol}
            {this.setBalance(
              currency.balance,
              currency.currency.divisibility,
            ).toFixed(currency.currency.divisibility)}
          </Text>
          <Text>
            Available balance: {currency.currency.symbol}
            {this.setBalance(
              currency.available_balance,
              currency.currency.divisibility,
            ).toFixed(currency.currency.divisibility)}
          </Text>
        </View>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  options: {
    height: 50,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightgray,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  optionsElement: {
    flex: 1,
    flexDirection: 'row',
  },
  icon: {
    flex: 1,
    justifyContent: 'center',
  },
  type: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

const mapStateToProps = ({}) => {
  return {};
};

export default connect(mapStateToProps, {
  setSendCurrency,
  resetSend,
})(Wallet);
