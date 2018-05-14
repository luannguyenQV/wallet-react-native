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
import { setSendCurrency } from './../redux/actions';

import Colors from './../config/colors';
import IconF from 'react-native-vector-icons/Ionicons';

import { Card } from './../components/common';

class AccountCurrency extends Component {
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
    this.props.setSendCurrency(this.state.currency);
    this.props.navigation.navigate('SendTo');
  }

  render() {
    const { currency } = this.state;
    console.log('currency: ', this.props.currency);
    return (
      <Card
        textHeader={currency.currency.description}
        textActionOne="Send"
        onPressActionOne={() => this.send()}
        textActionTwo="Receive"
        // onPressActionTwo={() =>
        //   this.setState({
        //     showModal: false,
        //   })
        // }
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
        {/* <Output label="Company" value={this.props.company} /> */}
      </Card>
      // <View
      //   style={{
      //     height: 60,
      //     padding: 10,
      //     paddingHorizontal: 20,
      //     borderBottomWidth: 2,
      //     borderBottomColor: Colors.lightgray,
      //     justifyContent: 'center',
      //     alignItems: 'center',
      //     backgroundColor: 'white',
      //   }}>
      //   <View
      //     style={{
      //       flexDirection: 'row',
      //       flex: 1,
      //       justifyContent: 'center',
      //       alignItems: 'center',
      //     }}>
      //     <View style={{ flex: 1, justifyContent: 'center' }}>
      //       <Text style={{ color: Colors.darkestgray, fontSize: 14 }}>
      //         {this.state.currencies.currency.description}
      //       </Text>
      //       <Text style={{ color: Colors.black, fontSize: 18 }}>
      //         {this.state.currencies.currency.symbol}
      //         {this.state.balance.toFixed(4).replace(/0{0,2}$/, '')}
      //       </Text>
      //     </View>
      //     <TouchableWithoutFeedback
      //       onPress={() => {
      //         this.props.setActiveCurrency(
      //           this.state.reference,
      //           this.state.currencies.currency.code,
      //         );
      //       }}
      //       style={{ justifyContent: 'center', alignItems: 'center' }}>
      //       <IconF
      //         name="md-checkbox"
      //         size={30}
      //         color={this.state.active ? Colors.green : Colors.lightgray}
      //       />
      //     </TouchableWithoutFeedback>
      //   </View>
      // </View>
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
})(AccountCurrency);
