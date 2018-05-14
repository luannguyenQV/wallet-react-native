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
import { switchTempCurrency, setActiveCurrency } from './../redux/actions';

import Colors from './../config/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { PopUpGeneral, CardContainer, Card } from './../components/common';

class HomeHeader extends Component {
  state = {
    showModal: false,
  };

  setBalance = (balance, divisibility) => {
    for (let i = 0; i < divisibility; i++) {
      balance = balance / 10;
    }
    let balanceString = balance.toString();
    return balance;
  };

  changeActiveCurrency = () => {
    this.setState({ showModal: true });
    //get modal working here
    // Alert.alert('Are you sure?', 'Set it as active currency?', [
    //   { text: 'Yes', onPress: () => this.changeAccount() },
    //   {
    //     text: 'No',
    //     style: 'cancel',
    //   },
    // ]);
  };

  changeAccount = () => {
    this.props.setActiveCurrency(
      this.props.accounts.results[0].reference,
      this.props.tempCurrency.currency.code,
    );

    // let responseJson = await AccountService.setActiveCurrency(
    //   this.state.reference,
    //   this.state.currencies[this.state.selectedCurrency].currency.code,
    // );
    // if (responseJson.status === 'success') {
    //   Alert.alert(
    //     'Success',
    //     'Your active currency has been changed successfully.',
    //     [{ text: 'OK' }],
    //   );
    // }
  };

  switchTempCurrency = () => {
    this.props.switchTempCurrency(
      this.props.accounts,
      this.props.tempCurrency,
      this.props.tempCurrencyIndex,
    );
  };

  render() {
    const { tempCurrency } = this.props;
    return (
      <View style={styles.balance}>
        <View
          style={{
            flex: 4,
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                fontSize: 23,
                color: 'white',
              }}>
              {tempCurrency.currency.symbol}
            </Text>
            <Text
              onPress={() => this.switchTempCurrency()}
              onLongPress={() => this.changeActiveCurrency()}
              style={{
                paddingLeft: 5,
                fontSize: 40,
                color: 'white',
              }}>
              {this.setBalance(
                tempCurrency.available_balance,
                tempCurrency.currency.divisibility,
              )
                .toFixed(4)
                .replace(/0{0,2}$/, '')}
            </Text>
          </View>
        </View>
        <PopUpGeneral visible={this.state.showModal}>
          <CardContainer>
            <Card
              textHeader="Change active currency"
              textActionOne="Confirm"
              onPressActionOne={() => this.changeAccount()}
              textActionTwo="Cancel"
              onPressActionTwo={() =>
                this.setState({
                  showModal: false,
                })
              }
              loading={this.props.loadingDefaultAccountChange}>
              <View>
                <Text>
                  Set {tempCurrency.currency.code} as active currency?
                </Text>
              </View>
              {/* <Output label="Company" value={this.props.company} /> */}
            </Card>
          </CardContainer>
        </PopUpGeneral>
      </View>
    );
  }
}

const styles = {
  balance: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.lightblue,
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
})(HomeHeader);
