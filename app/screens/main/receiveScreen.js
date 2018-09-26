import React, { Component } from 'react';
import {
  View,
  Platform,
  Image,
  Dimensions,
  TouchableHighlight,
  Clipboard,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import {
  setTransactionType,
  setTransactionCurrency,
  setTransactionState,
  updateAccountField,
  setReceiveType,
  toggleAccountField,
  resetReceive,
} from '../../redux/actions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Toast } from 'native-base';
import Header from './../../components/header';
import { Output, Input, Button, Checkbox } from './../../components/common';
import {
  currenciesSelector,
  receiveSelector,
} from './../../redux/reducers/AccountsReducer';

const SCREEN_WIDTH = Dimensions.get('window').width;

class ReceiveScreen extends Component {
  static navigationOptions = {
    title: 'Receive',
  };

  state = {
    imageURI:
      'https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=undefined&choe=UTF-8',
    crypto: false,
  };

  componentDidMount() {
    const { currency } = this.props.navigation.state.params;

    this.props.resetReceive();
    this.props.updateAccountField({
      prop: 'receiveCurrency',
      value: currency,
    });
    this.props.toggleAccountField('receiveCurrency');
  }

  _copyQR(receive) {
    Clipboard.setString(receive.value);
    Toast.show({
      text:
        receive.value +
        ' copied.' +
        (receive.type === 'stellar'
          ? ' Please remember to include your memo when sending to this address.'
          : ''),
      duration: 3000,
    });
  }

  render() {
    const { receive, updateAccountField, setReceiveType } = this.props;
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation} back title="Receive" />
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={{ padding: 8 }}
          extraScrollHeight={80}
          keyboardOpeningTime={150}>
          <View style={{ flex: 1 }}>
            <Output label={''} value={receive.value} copy />
            <TouchableHighlight
              underlayColor={'white'}
              activeOpacity={0.2}
              onPress={() => this._copyQR(receive)}>
              <Image
                style={{
                  width: SCREEN_WIDTH - 64,
                  height: 220,
                  alignSelf: 'center',
                }}
                source={{
                  uri:
                    'https://chart.googleapis.com/chart?chs=250x250&cht=qr&choe=UTF-8&chl=' +
                    encodeURIComponent(receive.value),
                }}
              />
            </TouchableHighlight>
            {receive.buttons ? (
              <View style={{ flexDirection: 'row' }}>
                {receive.email ? (
                  <View style={{ flex: 1 }}>
                    <Button
                      color={receive.type === 'email' ? 'primary' : 'secondary'}
                      onPress={() => setReceiveType('email')}
                      label="EMAIL"
                      size="small"
                      round
                      containerStyle={{ marginBottom: 0 }}
                    />
                  </View>
                ) : null}
                {receive.mobile ? (
                  <View style={{ flex: 1 }}>
                    <Button
                      color={
                        receive.type === 'mobile' ? 'primary' : 'secondary'
                      }
                      onPress={() => setReceiveType('mobile')}
                      label="MOBILE"
                      size="small"
                      round
                      containerStyle={{ marginBottom: 0 }}
                    />
                  </View>
                ) : null}
                {receive.crypto ? (
                  <View style={{ flex: 1 }}>
                    <Button
                      color={
                        receive.type === 'crypto' ? 'primary' : 'secondary'
                      }
                      onPress={() => setReceiveType('crypto')}
                      label="CRYPTO"
                      size="small"
                      round
                      containerStyle={{ marginBottom: 0 }}
                    />
                  </View>
                ) : null}
              </View>
            ) : null}
            <Input
              key="amount"
              placeholder="e.g. 10"
              label={
                'Amount' +
                (receive && receive.currency && receive.currency.currency
                  ? ' [' + receive.currency.currency.symbol + ']'
                  : '')
              }
              reference={input => (this.amountInput = input)}
              keyboardType={Platform.OS === 'ios' ? 'decimal-pad' : 'phone-pad'}
              value={receive.amount}
              onChangeText={value =>
                updateAccountField({ prop: 'receiveAmount', value })
              }
              returnKeyType="next"
              onSubmitEditing={() =>
                receive.currency && receive.currency.crypto === 'stellar'
                  ? this.memoInput.focus()
                  : this.noteInput.focus()
              }
              type={'money'}
              // precision={transaction.currency.currency.divisibility}
              // unit={transaction.currency.currency.symbol + ' '}
              toggleCheck={() => this.props.toggleAccountField('receiveAmount')}
              checked={receive.amountSelected}
            />
            {receive.currency && receive.currency.crypto === 'stellar' ? (
              <Input
                key="memo"
                placeholder="Memo"
                label="Memo"
                value={receive.memo}
                onChangeText={value =>
                  updateAccountField({ prop: 'receiveMemo', value })
                }
                reference={input => (this.memoInput = input)}
                returnKeyType="next"
                // autoFocus
                onSubmitEditing={() => this.noteInput.focus()}
                toggleCheck={() => this.props.toggleAccountField('receiveMemo')}
                checked={receive.memoSelected}
              />
            ) : null}
            <Input
              key="note"
              placeholder="e.g. Rent"
              label="Note"
              value={receive.note}
              onChangeText={value =>
                updateAccountField({ prop: 'receiveNote', value })
              }
              // inputError={sendError}
              reference={input => (this.noteInput = input)}
              multiline
              returnKeyType="next"
              toggleCheck={() => this.props.toggleAccountField('receiveNote')}
              checked={receive.noteSelected}
            />
            {receive.currency ? (
              <Checkbox
                title={'Currency: ' + receive.currency.currency.code}
                toggleCheck={() =>
                  this.props.toggleAccountField('receiveCurrency')
                }
                value={receive.currencySelected}
              />
            ) : null}
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
    paddingHorizontal: 8,
  },
};

const mapStateToProps = state => {
  return {
    currencies: currenciesSelector(state),
    receive: receiveSelector(state),
    profile: state.user.profile,
    crypto: state.crypto,
  };
};

export default connect(mapStateToProps, {
  setTransactionType,
  setTransactionCurrency,
  setTransactionState,
  updateAccountField,
  setReceiveType,
  toggleAccountField,
  resetReceive,
})(ReceiveScreen);
