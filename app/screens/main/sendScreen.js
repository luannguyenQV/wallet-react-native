import React, { Component } from 'react';
import {
  View,
  Platform,
  Text,
  ListView,
  TouchableHighlight,
  KeyboardAvoidingView,
} from 'react-native';
import { connect } from 'react-redux';
import {
  setTransactionType,
  setTransactionCurrency,
  setTransactionState,
  validateTransaction,
  updateAccountField,
  send,
  setContactType,
  updateContactField,
  hidePin,
  showPin,
} from '../../redux/actions';
import { contactsSelector } from './../../redux/reducers/ContactsReducer';
import {
  currenciesSelector,
  transactionSelector,
} from './../../redux/reducers/AccountsReducer';

import {
  Input,
  FullScreenForm,
  Output,
  Button,
} from './../../components/common';
import Header from './../../components/header';
import PinModal from './../../components/PinModal';

class SendScreen extends Component {
  static navigationOptions = () => ({
    title: 'Send',
  });

  componentDidMount() {
    const {
      account,
      type,
      currency,
      amount,
      note,
      memo,
      recipient,
    } = this.props.navigation.state.params;

    const {
      currencies,
      setTransactionType,
      updateAccountField,
      validateTransaction,
      updateContactField,
      setContactType,
    } = this.props;

    const tempCurrency = currencies.data.find(
      item => item.currency.code === currency,
    ); // TODO: Add accountRef && if no currency use active
    // console.log('currencies', currencies);

    setTransactionType('send');
    setContactType(
      !type || type === 'rehive'
        ? !recipient || recipient.includes('@') ? 'email' : 'mobile'
        : 'crypto',
    );
    updateAccountField({ prop: 'transactionCurrency', value: tempCurrency });
    updateAccountField({ prop: 'transactionAmount', value: amount });
    updateContactField({ prop: 'contactsSearch', recipient });
    updateAccountField({ prop: 'transactionRecipient', value: recipient });
    updateAccountField({ prop: 'transactionMemo', value: memo });
    updateAccountField({ prop: 'transactionNote', value: note });

    if (tempCurrency && recipient && amount) {
      setTransactionState('confirm');
    }

    // if(amount ||)
    validateTransaction('send');
  }

  goToBarcodeScanner = () => {
    this.props.navigation.navigate('QRCodeScanner');
  };

  performSend() {
    const { transaction } = this.props;

    let data = {
      type: transaction.type,
      amount: transaction.amount,
      recipient: transaction.recipient,
      note: transaction.note,
      memo: transaction.memo,
      currency: transaction.currency,
    };
    this.props.send(data);
  }

  renderMainContainer() {
    const {
      transaction,
      setTransactionState,
      validateTransaction,
      company_config,
    } = this.props;
    // console.log(transaction);
    const { viewStyleInputContainer } = styles;

    let textFooterRight = '';
    let onPressFooterRight = () => {};

    switch (transaction.state) {
      case 'confirm':
        textFooterRight = 'Confirm';
        onPressFooterRight = () => {
          if (company_config.pin.send) {
            this.props.showPin();
          } else {
            this.performSend();
          }
        };
        break;
      case 'success':
        textFooterRight = 'Close';
        onPressFooterRight = () => this.props.navigation.goBack();
        break;
      case 'fail':
        textFooterRight = 'Close';
        onPressFooterRight = () => this.props.navigation.goBack();
        break;
      default:
        onPressFooterRight = () => {
          validateTransaction('confirm');
          // setTransactionState('confirm');
        };
        textFooterRight =
          transaction.amount && transaction.recipient ? 'Next' : '';
        break;
    }

    return (
      <FullScreenForm
        textFooterRight={textFooterRight}
        onPressFooterRight={onPressFooterRight}
        loading={transaction.loading}
        color={'focus'}>
        {transaction.state ? (
          this.renderTop()
        ) : (
          <View style={viewStyleInputContainer}>
            {this.renderAmount()}
            {this.renderRecipient()}
            {transaction.currency && transaction.currency.crypto === 'stellar'
              ? this.renderMemo()
              : null}
            {this.renderNote()}
          </View>
        )}
      </FullScreenForm>
    );
  }

  renderTop() {
    const { transaction } = this.props;

    const {
      viewStyleTopContainer,
      buttonStyleOutput,
      viewStyleError,
      textStyleError,
    } = styles;

    return (
      <View style={viewStyleTopContainer}>
        {transaction.state === 'success' ? (
          <View style={viewStyleError}>
            <Text style={textStyleError}>Send successful!</Text>
          </View>
        ) : null}
        {transaction.state === 'confirm' ? (
          <View style={viewStyleError}>
            <Text style={textStyleError}>Please confirm details</Text>
          </View>
        ) : null}
        {transaction.state === 'confirm' || transaction.state === 'success' ? (
          <TouchableHighlight
            onPress={() =>
              transaction.state === 'confirm' ? setTransactionState('') : {}
            }
            underlayColor="lightgrey"
            style={buttonStyleOutput}>
            <View>
              <Output
                label="Amount"
                value={
                  transaction.currency.currency.symbol +
                  ' ' +
                  parseFloat(transaction.amount).toFixed(
                    transaction.currency.currency.divisibility,
                  )
                }
              />
              <Output label="Recipient" value={transaction.recipient} />
              {transaction.memo ? (
                <Output label="Memo" value={transaction.memo} />
              ) : null}
              {transaction.note ? (
                <Output label="Note" value={transaction.note} />
              ) : null}
            </View>
          </TouchableHighlight>
        ) : null}
        {transaction.state === 'fail' ? (
          <View style={viewStyleError}>
            <Text style={textStyleError}>Send failed</Text>
            <Text style={textStyleError}>{transaction.state}</Text>
          </View>
        ) : null}
      </View>
    );
  }

  renderRecipient() {
    const {
      transaction,
      contacts,
      updateAccountField,
      setContactType,
      updateContactField,
      validateTransaction,
    } = this.props;
    // console.log(transaction);
    let label = 'Please enter ';
    let placeholder = '';
    switch (contacts.type) {
      case 'mobile':
        label = label + 'recipient name or mobile number';
        placeholder = 'e.g +27821234567';
        break;
      case 'email':
        label = label + 'recipient name or email';
        placeholder = 'e.g. user@rehive.com';
        break;
      case 'crypto':
        label = label + transaction.currency.crypto + ' address';
        placeholder = 'GAQGVZYIZ2DX56EB6TZYGBD...';
        break;
    }
    return (
      <View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Button
              color={contacts.type === 'email' ? 'primary' : 'secondary'}
              onPress={() => setContactType('email')}
              label="EMAIL"
              size="small"
              round
              containerStyle={{ marginBottom: 0 }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Button
              color={contacts.type === 'mobile' ? 'primary' : 'secondary'}
              onPress={() => setContactType('mobile')}
              label="MOBILE"
              size="small"
              round
              containerStyle={{ marginBottom: 0 }}
            />
          </View>
          {transaction.currency && transaction.currency.crypto ? (
            <View style={{ flex: 1 }}>
              <Button
                color={contacts.type === 'crypto' ? 'primary' : 'secondary'}
                onPress={() => setContactType('crypto')}
                label="CRYPTO"
                size="small"
                round
                containerStyle={{ marginBottom: 0 }}
              />
            </View>
          ) : null}
        </View>

        <Input
          key="contactsSearch"
          placeholder={placeholder}
          label={label}
          value={contacts.search}
          onChangeText={value =>
            updateContactField({ prop: 'contactsSearch', value })
          }
          inputError={transaction.recipientError}
          reference={input => {
            this.recipientInput = input;
          }}
          returnKeyType="next"
          // autoFocus
          onSubmitEditing={() => {
            updateAccountField({
              prop: 'transactionRecipient',
              value: contacts.search,
            });
            transaction.currency.crypto === 'stellar'
              ? this.memoInput.focus()
              : this.noteInput.focus();
            validateTransaction();
          }}
          onBlur={() => {
            updateAccountField({
              prop: 'transactionRecipient',
              value: contacts.search,
            });
            validateTransaction();
          }}
          popUp
          multiline={contacts.type === 'crypto' ? true : false}
          data={contacts.data}
          loadingData={contacts.loading}
          title="name"
          subtitle="contact"
          onPressListItem={item => {
            updateAccountField({
              prop: 'transactionRecipient',
              value: item.contact,
            });
            updateContactField({ prop: 'contactsSearch', value: item.contact });
            transaction.currency.crypto === 'stellar'
              ? this.memoInput.focus()
              : this.noteInput.focus();
            validateTransaction();
          }}
        />
      </View>
    );
  }

  renderAmount() {
    const { transaction, updateAccountField, validateTransaction } = this.props;
    // console.log('amount transaction', transaction);
    return (
      <Input
        key="amount"
        placeholder="e.g. 10"
        label={
          'Amount' +
          (transaction && transaction.currency && transaction.currency.currency
            ? ' [' + transaction.currency.currency.symbol + ']'
            : '')
        }
        // prefix={transaction.currency.currency.symbol}
        inputError={transaction.amountError}
        reference={input => {
          this.amountInput = input;
        }}
        keyboardType={Platform.OS === 'ios' ? 'decimal-pad' : 'phone-pad'}
        value={transaction.amount}
        onChangeText={value =>
          updateAccountField({ prop: 'transactionAmount', value })
        }
        returnKeyType="next"
        autoFocus
        onSubmitEditing={() => {
          // validateTransaction();
          this.recipientInput.focus();
        }}
        onBlur={() => validateTransaction()}
        type={'money'}
        // precision={transaction.currency.currency.divisibility}
        // unit={transaction.currency.currency.symbol + ' '}
      />
    );
  }

  renderMemo() {
    const { transaction, updateAccountField } = this.props;

    return (
      <Input
        key="memo"
        placeholder="Memo"
        label="Memo"
        value={transaction.memo}
        onChangeText={value =>
          updateAccountField({ prop: 'transactionMemo', value })
        }
        // inputError={sendError}
        reference={input => {
          this.memoInput = input;
        }}
        multiline
        returnKeyType="next"
        // autoFocus
        onSubmitEditing={() => this.noteInput.focus()}
      />
    );
  }

  renderNote() {
    const { transaction, updateAccountField } = this.props;

    return (
      <Input
        key="note"
        placeholder="e.g. Rent"
        label="Note"
        value={transaction.note}
        onChangeText={value =>
          updateAccountField({ prop: 'transactionNote', value })
        }
        // inputError={sendError}
        reference={input => {
          this.noteInput = input;
        }}
        multiline
        returnKeyType="next"
        onSubmitEditing={() => validateTransaction()}
      />
    );
  }

  render() {
    const { pin, fingerprint, pinVisible, hidePin } = this.props;
    // console.log(pin, fingerprint);
    return (
      <View style={{ flex: 1 }}>
        <Header navigation={this.props.navigation} title="Send" back right />
        <KeyboardAvoidingView
          keyboardShouldPersistTaps={'always'}
          style={styles.viewStyleContainer}
          behavior={'padding'}>
          {pinVisible ? (
            <PinModal
              modal
              pin={pin}
              fingerprint={fingerprint}
              modalVisible={pinVisible}
              onSuccess={() => {
                hidePin();
                this.performSend();
              }}
              onDismiss={() => hidePin()}
            />
          ) : null}
          {this.renderMainContainer()}
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = {
  viewStyleContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  buttonStyleOutput: { width: '100%', borderRadius: 3, marginHorizontal: 8 },
  viewStyleInputContainer: {
    flex: 1,
    borderRadius: 2,
    padding: 8,
  },
  textStyleOutput: {
    fontSize: 16,
    // alignSelf: 'center',
    padding: 8,
    paddingBottom: 0,
  },
  viewStyleError: {
    width: '100%',
    paddingTop: 16,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyleError: {
    fontSize: 20,
    fontWeight: 'bold',
  },
};

const mapStateToProps = state => {
  const { pin, fingerprint, pinVisible, company_config } = state.auth;
  return {
    currencies: currenciesSelector(state),
    transaction: transactionSelector(state),
    pin,
    pinVisible,
    fingerprint,
    company_config,
    contacts: contactsSelector(state),
  };
};

export default connect(mapStateToProps, {
  updateAccountField,
  setTransactionType,
  setTransactionCurrency,
  validateTransaction,
  send,
  setContactType,
  updateContactField,
  setTransactionState,
  hidePin,
  showPin,
})(SendScreen);
