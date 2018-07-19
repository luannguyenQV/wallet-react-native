import React, { Component } from 'react';
import {
  View,
  AsyncStorage,
  Text,
  ListView,
  TouchableHighlight,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { connect } from 'react-redux';
import {
  setSendWallet,
  validateSendAmount,
  validateSendRecipient,
  validateSendNote,
  setSendState,
  updateAccountField,
  send,
  setContactType,
  updateContactField,
} from '../../redux/actions';
import TimerCountdown from 'react-native-timer-countdown';
import { getContacts } from './../../redux/reducers/ContactsReducer';

import {
  Input,
  FullScreenForm,
  Output,
  Button,
} from './../../components/common';
import ContactService from './../../services/contactService';
import Colors from './../../config/colors';
import Header from './../../components/header';
import PinModal from './../../components/PinModal';

class SendScreen extends Component {
  static navigationOptions = () => ({
    title: 'Send',
  });

  state = {
    input: '',
    balance: 0,
    ready: false,
    refreshing: false,
    reference: '',
    searchText: '',
    data: [],
    contacts: new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }),

    showContacts: false,
    contactButtonText: 'Show contacts',

    pinVisible: false,
  };

  componentDidMount() {
    if (this.props.sendWallet === null) {
      this.props.setSendWallet(wallets[activeWalletIndex]);
    }
  }

  goToBarcodeScanner = () => {
    this.props.navigation.navigate('QRCodeScanner');
  };

  performSend() {
    const { sendWallet, sendAmount, sendRecipient, sendNote } = this.props;

    let data = {
      amount: sendAmount,
      recipient: sendRecipient,
      note: sendNote,
      currency: sendWallet.currency.currency,
      reference: sendWallet.account_reference,
    };
    this.props.send(data);
  }

  renderMainContainer() {
    const {
      sending,
      sendState,
      sendWallet,
      validateSendAmount,
      validateSendRecipient,
      validateSendNote,
      sendAmount,
      contactsSearch,
      contactsType,
      sendRecipient,
      sendNote,
      sendError,
      setSendState,
      company_config,
    } = this.props;

    const { viewStyleBottomContainer } = styles;

    let textFooterRight = 'Next';
    let textFooterLeft = '';
    let onPressFooterRight = () => {};
    let onPressFooterLeft = () => {};

    switch (sendState) {
      case 'amount':
        onPressFooterRight = () => validateSendAmount(sendWallet, sendAmount);
        break;
      case 'recipient':
        textFooterLeft = 'Edit';
        onPressFooterLeft = () => setSendState('amount');
        onPressFooterRight = () => {
          updateAccountField({
            prop: 'sendRecipient',
            value: contactsSearch,
          });
          validateSendRecipient(contactsType, contactsSearch);
        };
        break;
      case 'note':
        textFooterLeft = 'Edit';
        onPressFooterLeft = () => setSendState('amount');
        onPressFooterRight = () => validateSendNote(sendNote);
        break;
      case 'confirm':
        textFooterLeft = 'Edit';
        onPressFooterLeft = () => setSendState('amount');
        textFooterRight = 'Confirm';
        onPressFooterRight = () => {
          if (company_config.pin.send) {
            this.setState({ pinVisible: true });
          } else {
            this.performSend();
          }
        };
        break;
      case 'success':
        // textFooterLeft = 'Close';
        textFooterRight = 'Close';
        onPressFooterRight = () => this.props.navigation.goBack();
        break;
      case 'fail':
        // textFooterLeft = 'Close';
        textFooterRight = 'Close';
        onPressFooterRight = () => this.props.navigation.goBack();
        break;
    }

    return (
      <FullScreenForm
        // textFooterLeft={textFooterLeft}
        // onPressFooterLeft={onPressFooterLeft}
        textFooterRight={textFooterRight}
        onPressFooterRight={onPressFooterRight}
        loading={sending}>
        {this.renderTop()}
        <View style={viewStyleBottomContainer}>{this.renderBottom()}</View>
      </FullScreenForm>
    );
  }

  renderTop() {
    const {
      sendState,
      sendWallet,
      sendAmount,
      sendRecipient,
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
        {sendState === 'note' ||
        sendState === 'recipient' ||
        sendState === 'confirm' ||
        sendState === 'success' ? (
          <TouchableHighlight
            onPress={() => setSendState('amount')}
            underlayColor={Colors.lightGray}
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
        sendState === 'confirm' ||
        sendState === 'success' ? (
          <TouchableHighlight
            onPress={() => setSendState('recipient')}
            underlayColor={Colors.lightGray}
            style={buttonStyleOutput}>
            <Output label="Recipient" value={sendRecipient} />
          </TouchableHighlight>
        ) : null}
        {(sendState === 'confirm' || sendState === 'success') && sendNote ? (
          <TouchableHighlight
            onPress={() => setSendState('note')}
            underlayColor={Colors.lightGray}
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

  renderBottom() {
    const {
      sendState,
      sendAmount,
      sendWallet,
      sendRecipient,
      updateAccountField,
      sendNote,
      validateSendAmount,
      validateSendRecipient,
      validateSendNote,
      sendError,
      company_config,
      contacts,
      contactsError,
      contactsLoading,
      contactsType,
      contactsSearch,
      updateContactField,
      setContactType,
    } = this.props;
    const { colors } = company_config;
    switch (sendState) {
      case 'amount':
        return (
          <Input
            key={sendState}
            placeholder="e.g. 10"
            label={'Amount [' + sendWallet.currency.currency.symbol + ']'}
            prefix={sendWallet.currency.currency.symbol}
            inputError={sendError}
            reference={input => {
              this.input = input;
            }}
            keyboardType="numeric"
            value={sendAmount}
            onChangeText={value =>
              updateAccountField({ prop: 'sendAmount', value })
            }
            returnKeyType="next"
            autoFocus
            onSubmitEditing={() => validateSendAmount(sendWallet, sendAmount)}
            colors={colors}
          />
        );
      case 'recipient':
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
                  backgroundColor={
                    contactsType === 'email'
                      ? colors.focusContrast
                      : colors.secondary
                  }
                  textColor={
                    contactsType === 'email'
                      ? colors.focus
                      : colors.secondaryContrast
                  }
                  onPress={() => setContactType('email')}
                  label="EMAIL"
                  size="small"
                  round
                  buttonStyle={{ paddingBottom: 0 }}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Button
                  backgroundColor={
                    contactsType === 'mobile'
                      ? colors.focusContrast
                      : colors.secondary
                  }
                  textColor={
                    contactsType === 'mobile'
                      ? colors.focus
                      : colors.secondaryContrast
                  }
                  onPress={() => setContactType('mobile')}
                  label="MOBILE"
                  size="small"
                  round
                  buttonStyle={{ paddingBottom: 0 }}
                />
              </View>
            </View>
            {/* <TimerCountdown
              initialSecondsRemaining={1000 * 60}
              onTick={secondsRemaining => console.log('tick', secondsRemaining)}
              onTimeElapsed={() => console.log('complete')}
              allowFontScaling={true}
              style={{ fontSize: 20 }}
            /> */}

            <Input
              key="contactsSearch"
              placeholder="e.g. user@rehive.com"
              label={
                'Please enter recipient name or ' +
                (contactsType === 'email' ? 'email address' : 'mobile number')
              }
              value={contactsSearch}
              onChangeText={value =>
                updateContactField({ prop: 'contactsSearch', value })
              }
              inputError={sendError}
              reference={input => {
                this.input = input;
              }}
              // keyboardType="numeric"
              returnKeyType="next"
              autoFocus
              onSubmitEditing={() => {
                updateAccountField({
                  prop: 'sendRecipient',
                  value: contactsSearch,
                });
                validateSendRecipient(contactsType, contactsSearch);
              }}
              colors={colors}
              popUp
              data={contacts}
              loadingData={contactsLoading}
              title="name"
              subtitle="contact"
              onPressListItem={item => {
                updateAccountField({
                  prop: 'sendRecipient',
                  value: item.contact,
                });
                validateSendRecipient(contactsType, item.contact);
              }}
            />
          </View>
        );
      case 'note':
        return (
          <Input
            key="note"
            placeholder="e.g. Rent"
            label="Note:"
            value={sendNote}
            onChangeText={value =>
              updateAccountField({ prop: 'sendNote', value })
            }
            inputError={sendError}
            reference={input => {
              this.input = input;
            }}
            multiline
            returnKeyType="next"
            autoFocus
            onSubmitEditing={() => validateSendNote(sendNote)}
            colors={colors}
          />
        );
      default:
        return <View />;
    }
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
          {this.state.pinVisible ? (
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
          ) : null}
          {/* <TouchableWithoutFeedback
            style={{ flex: 1 }}
            onPress={Keyboard.dismiss}
            accessible={false}> */}
          {this.renderMainContainer()}
          {/* </TouchableWithoutFeedback> */}
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = {
  viewStyleContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.focus,
    // paddingTop: 10,
  },
  viewStyleTopContainer: {
    // justifyContent: 'center',
    paddingTop: 16,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    // backgroundColor: 'orange',
    // flex: 2,
    paddingBottom: 0,
  },
  buttonStyleOutput: { width: '100%', borderRadius: 3, marginHorizontal: 8 },
  viewStyleBottomContainer: {
    // justifyContent: 'center',
    // alignSelf: 'flex-end',
    flex: 1,
    // minHeight: 100,
    borderRadius: 2,
    // position: 'absolute',
    // bottom: 0,
  },
  // contact: {
  //   height: 40,
  //   flexDirection: 'column',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
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

const mapStateToProps = ({ accounts, auth, contacts }) => {
  const { pin, fingerprint, company_config } = auth;
  const {
    contactsError,
    contactsLoading,
    contactsType,
    contactsSearch,
  } = contacts;
  const {
    wallets,
    sendAmount,
    sendWallet,
    sendRecipient,
    sendNote,
    sendReference,
    sendState,
    tempCurrency,
    sendError,
    sending,
  } = accounts;
  return {
    wallets,
    tempCurrency,
    sendAmount,
    sendWallet,
    sendRecipient,
    sendNote,
    sendReference,
    sendState,
    sendError,
    sending,
    pin,
    fingerprint,
    company_config,
    contactsError,
    contactsLoading,
    contactsType,
    contactsSearch,
    contacts: getContacts(contacts),
  };
};

export default connect(mapStateToProps, {
  updateAccountField,
  setSendWallet,
  validateSendAmount,
  validateSendRecipient,
  validateSendNote,
  setSendState,
  send,
  setContactType,
  updateContactField,
})(SendScreen);
