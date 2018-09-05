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
  validateTransaction,
  updateAccountField,
  send,
  setContactType,
  updateContactField,
} from '../../redux/actions';
import { contactsSelector } from './../../redux/reducers/ContactsReducer';
import {
  walletsSelector,
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
    console.log('params', this.props.navigation.state.params);
    const {
      currencyCode,
      accountRef,
      amount,
      note,
      memo,
      recipient,
    } = this.props.navigation.state.params;

    const {
      wallets,
      setTransactionType,
      updateAccountField,
      validateTransaction,
    } = this.props;
    const currencies = wallets.currencies.filter(
      item => item.currency.code === currencyCode,
    ); // TODO: Add accountRef
    console.log('currencies', currencies);
    setTransactionType('send');
    updateAccountField({ prop: 'transactionCurrency', value: currencies[0] });
    updateAccountField({ prop: 'transactionRecipient', value: recipient });
    updateAccountField({ prop: 'transactionAmount', value: amount });
    updateAccountField({ prop: 'transactionMemo', value: memo });
    updateAccountField({ prop: 'transactionNote', value: note });

    validateTransaction('send');

    // const currency = wallets.c
    // setTransactionCurrency();

    // set acc + code
  }

  goToBarcodeScanner = () => {
    this.props.navigation.navigate('QRCodeScanner');
  };

  performSend() {
    const {
      sendWallet,
      sendAmount,
      sendRecipient,
      sendNote,
      sendType,
      sendMemo,
    } = this.props;

    let data = {
      type: sendType,
      amount: sendAmount,
      recipient: sendRecipient,
      note: sendNote,
      memo: sendMemo,
      currency: sendWallet.currency.currency,
      reference: sendWallet.account_reference,
    };
    this.props.send(data);
  }

  renderMainContainer() {
    const {
      transaction,
      sendState,
      sendWallet,
      validateSendAmount,
      validateSendRecipient,
      validateSendNote,
      validateSendMemo,
      sendAmount,
      contactsSearch,
      contactsType,
      sendType,
      sendMemo,
      sendNote,
      sendError,
      setSendState,
      updateAccountField,
      company_config,
    } = this.props;

    const { viewStyleInputContainer } = styles;

    let textFooterRight = 'Next';
    let onPressFooterRight = () => {};

    // switch (sendState) {
    //   case 'amount':
    //     onPressFooterRight = () => validateSendAmount(sendWallet, sendAmount);
    //     break;
    //   case 'recipient':
    //     onPressFooterRight = () => {
    //       updateAccountField({
    //         prop: 'sendRecipient',
    //         value: contactsSearch,
    //       });
    //       validateSendRecipient(sendType, contactsType, contactsSearch);
    //     };
    //     break;
    //   case 'memo':
    //     onPressFooterRight = () => validateSendMemo(sendMemo);
    //     break;
    //   case 'note':
    //     onPressFooterRight = () => validateSendNote(sendNote);
    //     break;
    //   case 'confirm':
    //     textFooterRight = 'Confirm';
    //     onPressFooterRight = () => {
    //       if (company_config.pin.send) {
    //         this.setState({ pinVisible: true });
    //       } else {
    //         this.performSend();
    //       }
    //     };
    //     break;
    //   case 'success':
    //     textFooterRight = 'Close';
    //     onPressFooterRight = () => this.props.navigation.goBack();
    //     break;
    //   case 'fail':
    //     textFooterRight = 'Close';
    //     onPressFooterRight = () => this.props.navigation.goBack();
    //     break;
    // }

    return (
      <FullScreenForm
        textFooterRight={textFooterRight}
        onPressFooterRight={onPressFooterRight}
        loading={transaction.loading}
        color={'focus'}>
        <View style={viewStyleInputContainer}>
          {this.renderAmount()}
          {this.renderRecipient()}
          {transaction.currency.crypto === 'stellar' ? this.renderMemo() : null}
          {this.renderNote()}
        </View>
      </FullScreenForm>
    );
  }

  renderTop() {
    const {
      sendState,
      sendWallet,
      sendAmount,
      sendRecipient,
      sendMemo,
      sendNote,
      sendError,
      setSendState,
    } = this.props;
    const currency = sendWallet.currency.currency;

    const {
      viewStyleTopContainer,
      buttonStyleOutput,
      viewStyleError,
      textStyleError,
    } = styles;
    return (
      <View style={viewStyleTopContainer}>
        {sendState === 'success' ? (
          <View style={viewStyleError}>
            <Text style={textStyleError}>Send successful!</Text>
          </View>
        ) : null}
        {sendState === 'confirm' ? (
          <View style={viewStyleError}>
            <Text style={textStyleError}>Please confirm details</Text>
          </View>
        ) : null}
        {sendState === 'note' ||
        sendState === 'recipient' ||
        sendState === 'memo' ||
        sendState === 'confirm' ||
        sendState === 'success' ? (
          <TouchableHighlight
            onPress={() => setSendState('amount')}
            underlayColor="lightgrey"
            style={buttonStyleOutput}>
            <Output
              label="Amount"
              value={
                currency.symbol +
                ' ' +
                parseFloat(sendAmount).toFixed(currency.divisibility)
              }
            />
          </TouchableHighlight>
        ) : null}
        {sendState === 'note' ||
        sendState === 'memo' ||
        sendState === 'confirm' ||
        sendState === 'success' ? (
          <TouchableHighlight
            onPress={() => setSendState('recipient')}
            underlayColor="lightgrey"
            style={buttonStyleOutput}>
            <Output label="Recipient" value={sendRecipient} />
          </TouchableHighlight>
        ) : null}
        {(sendState === 'note' ||
          sendState === 'confirm' ||
          sendState === 'success') &&
        sendMemo ? (
          <TouchableHighlight
            onPress={() => setSendState('memo')}
            underlayColor="lightgrey"
            style={buttonStyleOutput}>
            <Output label="Memo" value={sendMemo} />
          </TouchableHighlight>
        ) : null}
        {(sendState === 'confirm' || sendState === 'success') && sendNote ? (
          <TouchableHighlight
            onPress={() => setSendState('note')}
            underlayColor="lightgrey"
            style={buttonStyleOutput}>
            <Output label="Note" value={sendNote} />
          </TouchableHighlight>
        ) : null}
        {sendState === 'fail' ? (
          <View style={viewStyleError}>
            <Text style={textStyleError}>Send failed</Text>
            <Text style={textStyleError}>{sendError}</Text>
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
    } = this.props;
    console.log(transaction);
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
        label = label + sendType + ' address';
        placeholder = 'GAQGVZYIZ2DX56EB6TZYGBD...';
        break;
    }
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            // alignItems: 'center',
            // justifyContent: 'center',
          }}>
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
          {transaction.currency.crypto ? (
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
          inputError={contacts.error}
          reference={input => {
            this.input = input;
          }}
          returnKeyType="next"
          // autoFocus
          onSubmitEditing={() => {
            // updateAccountField({
            //   prop: 'sendRecipient',
            //   value: contacts.search,
            // });
            // validateSendRecipient(sendType, contacts.type, contacts.search);
          }}
          popUp
          multiline={contacts.type === 'crypto' ? true : false}
          data={contacts.data}
          loadingData={contacts.loading}
          title="name"
          subtitle="contact"
          // onPressListItem={item => {
          //   updateAccountField({
          //     prop: 'sendRecipient',
          //     value: item.contact,
          //   });
          //   validateSendRecipient(
          //     transaction.type,
          //     contacts.type,
          //     item.contact,
          //   );
          // }}
        />
      </View>
    );
  }

  renderAmount() {
    const { transaction, updateAccountField } = this.props;
    console.log('trans', transaction);

    return (
      <Input
        key="amount"
        placeholder="e.g. 10"
        label={'Amount [' + transaction.currency.currency.symbol + ']'}
        // prefix={transaction.currency.currency.symbol}
        inputError={transaction.amountError}
        reference={input => {
          this.input = input;
        }}
        keyboardType={Platform.OS === 'ios' ? 'decimal-pad' : 'phone-pad'}
        value={transaction.amount}
        onChangeText={value =>
          updateAccountField({ prop: 'transactionAmount', value })
        }
        returnKeyType="next"
        autoFocus
        // onSubmitEditing={() => validateSendAmount(sendWallet, sendAmount)}
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
          this.input = input;
        }}
        multiline
        returnKeyType="next"
        // autoFocus
        // onSubmitEditing={() => validateSendMemo(sendMemo)}
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
          this.input = input;
        }}
        multiline
        returnKeyType="next"
        // autoFocus
        // onSubmitEditing={() => validateSendNote(sendNote)}
      />
    );
  }

  render() {
    const { pin, fingerprint } = this.props;
    // console.log(pin, fingerprint);
    return (
      <View style={{ flex: 1 }}>
        <Header navigation={this.props.navigation} title="Send" back right />
        <KeyboardAvoidingView
          keyboardShouldPersistTaps={'always'}
          style={styles.viewStyleContainer}
          behavior={'padding'}>
          {/* {this.state.pinVisible ? (
            <PinModal
              pin={pin}
              fingerprint={fingerprint}
              modalVisible={this.state.pinVisible}
              onSuccess={() => {
                this.setState({ pinVisible: false });
                this.performSend();
              }}
              onDismiss={() => this.setState({ pinVisible: false })}
            />
          ) : null} */}
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
  const { pin, fingerprint, company_config } = state.auth;
  return {
    wallets: walletsSelector(state),
    transaction: transactionSelector(state),
    pin,
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
})(SendScreen);
