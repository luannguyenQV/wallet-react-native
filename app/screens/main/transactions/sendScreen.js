import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  AsyncStorage,
  RefreshControl,
  Text,
  ListView,
  ActivityIndicator,
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
  sendFieldUpdate,
  send,
} from '../../../redux/actions';

import Contact from './../../../components/contact';
import { Input, AuthForm, Spinner } from './../../../components/common';
import ContactService from './../../../services/contactService';
import Colors from './../../../config/colors';
import Header from './../../../components/header';

class SendScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
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
  };

  componentDidMount() {
    if (this.props.sendWallet === null) {
      this.props.setSendWallet(wallets[activeWalletIndex]);
    }
  }

  showContactsAsync = async () => {
    //await AsyncStorage.removeItem('contacts')
    if (this.state.ready === false) {
      let contacts = await AsyncStorage.getItem('contacts');
      if (contacts) {
        let data = JSON.parse(contacts);
        this.setState({
          ready: true,
          data,
          contacts: this.state.contacts.cloneWithRows(data),
        });
      } else {
        this.refreshContactsAsync();
      }
    } else {
      this.setState({ refreshing: true });
      this.refreshContactsAsync();
    }
  };

  refreshContactsAsync = async () => {
    let data = await ContactService.getAllContacts();
    this.setState({
      refreshing: false,
      ready: true,
      data,
      contacts: this.state.contacts.cloneWithRows(data),
    });

    await AsyncStorage.removeItem('contacts');
    await AsyncStorage.setItem('contacts', JSON.stringify(data));
  };

  selectAContact = contact => {
    this.setState({ searchText: contact });
  };

  searchTextChanged = event => {
    let searchText = event.nativeEvent.text;
    this.setState({ searchText });

    if (searchText === '') {
      this.setState({
        contacts: this.state.contacts.cloneWithRows(this.state.data),
      });
      return;
    }

    let contacts = this.state.data.filter(node => {
      if (typeof node.name == 'undefined') {
        return false;
      }
      let name = node.name.toLowerCase();
      if (typeof node.contact == 'undefined') {
        return false;
      }
      if (name.indexOf(searchText) !== -1) {
        return true;
      } else if (node.contact.indexOf(searchText) !== -1) {
        return true;
      }

      return false;
    });

    this.setState({
      contacts: this.state.contacts.cloneWithRows(contacts),
    });
  };

  goToBarcodeScanner = () => {
    this.props.navigation.navigate('QRcodeScanner');
  };

  setSendState(nextState) {
    this.props.setSendState(nextState);
  }

  toggleContacts() {
    if (this.state.showContacts) {
      this.setState({
        showContacts: false,
        contactButtonText: 'Show contacts',
      });
    } else {
      this.setState({
        showContacts: true,
        contactButtonText: 'Hide contacts',
      });
    }
  }

  // renderRecipient() {
  //   const {
  //     sendState,
  //     sendRecipient,
  //     sendFieldUpdate,
  //     validateSendRecipient,
  //     sendError,
  //   } = this.props;

  //   const { textStyleOutput } = styles;

  //   if (sendState === 'recipient' || sendState === 'note') {
  //     if (sendState === 'recipient') {
  //       return (
  //         <Card
  //           // textHeader="Recipient"
  //           textActionOne="Next"
  //           onPressActionOne={}
  //           // textActionTwo={this.state.contactButtonText}
  //           // onPressActionTwo={() => this.toggleContacts()}
  //         >
  //           <View>
  //
  //             {this.renderContacts()}
  //           </View>
  //         </Card>
  //       );
  //     }
  //     return (
  //       <Card
  //         // textHeader="Amount"
  //         textActionOne="Change"
  //         onPressActionOne={() => this.setSendState('recipient')}>
  //         <View>
  //           <Text style={textStyleOutput}>To: {sendRecipient}</Text>
  //         </View>
  //       </Card>
  //     );
  //   }
  //   return;
  // }

  // renderContacts() {
  //   const { showContacts } = this.state;
  //   if (showContacts) {
  //     if (this.state.ready) {
  //       return (
  //         <View style={styles.spinner}>
  //           <Text>Loading Contacts</Text>
  //           <ActivityIndicator animating style={{ height: 80 }} size="large" />
  //         </View>
  //       );
  //     } else {
  //       return (
  //         <View style={{ flex: 1, marginHorizontal: 20, marginTop: 10 }}>
  //           <ListView
  //             refreshControl={
  //               <RefreshControl
  //                 refreshing={this.state.refreshing}
  //                 onRefresh={this.showContactsAsync.bind(this)}
  //               />
  //             }
  //             dataSource={this.state.contacts}
  //             enableEmptySections
  //             renderRow={rowData => (
  //               <Contact selected={this.selectAContact} rowData={rowData} />
  //             )}
  //           />
  //         </View>
  //       );
  //     }
  //   }
  // }

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
      sendRecipient,
      sendNote,
      sendError,
    } = this.props;

    const { viewStyleBottomContainer } = styles;

    let textFooterRight = 'Next';
    let textHeaderRight = '';
    let onPressFooterRight = () => {};
    let onPressHeaderRight = () => {};

    switch (sendState) {
      case 'amount':
        onPressFooterRight = () => validateSendAmount(sendWallet, sendAmount);
        break;
      case 'recipient':
        textHeaderRight = 'Edit';
        onPressHeaderRight = () => this.setSendState('amount');
        onPressFooterRight = () => validateSendRecipient(sendRecipient);
        break;
      case 'note':
        textHeaderRight = 'Edit';
        onPressHeaderRight = () => this.setSendState('amount');
        onPressFooterRight = () => validateSendNote(sendNote);
        break;
      case 'confirm':
        textHeaderRight = 'Edit';
        onPressHeaderRight = () => this.setSendState('amount');
        textFooterRight = 'Confirm';
        onPressFooterRight = () => this.performSend();
        break;
      case 'success':
        // textHeaderRight = 'Close';
        textFooterRight = 'Close';
        onPressFooterRight = () => this.props.navigation.goBack();
        break;
      case 'fail':
        // textHeaderRight = 'Close';
        textFooterRight = 'Close';
        onPressFooterRight = () => this.props.navigation.goBack();
        break;
    }

    return (
      <AuthForm
        textHeaderRight={textHeaderRight}
        onPressHeaderRight={onPressHeaderRight}
        textFooterRight={textFooterRight}
        onPressFooterRight={onPressFooterRight}
        loading={sending}>
        {this.renderTop()}
        <View style={viewStyleBottomContainer}>{this.renderBottom()}</View>
      </AuthForm>
    );
  }

  renderTop() {
    const {
      sendState,
      sendWallet,
      sendAmount,
      sendRecipient,
      sendNote,
    } = this.props;

    const {
      viewStyleTopContainer,
      textStyleOutput,
      textStyleOutputValue,
    } = styles;
    return (
      <View style={viewStyleTopContainer}>
        {sendState === 'note' ||
        sendState === 'recipient' ||
        sendState === 'confirm' ||
        sendState === 'success' ? (
          <Text style={textStyleOutput}>
            {sendState !== 'success' ? (
              <Text>You are about to send </Text>
            ) : (
              <Text>You sent </Text>
            )}
            <Text style={textStyleOutputValue}>
              {sendWallet.currency.currency.symbol} {sendAmount}
            </Text>
          </Text>
        ) : null}
        {sendState === 'note' ||
        sendState === 'confirm' ||
        sendState === 'success' ? (
          <Text style={textStyleOutput}>
            <Text>to </Text>
            <Text style={textStyleOutputValue}>{sendRecipient}</Text>
          </Text>
        ) : null}
        {(sendState === 'confirm' || sendState === 'success') && sendNote ? (
          <Text style={textStyleOutput}>
            <Text>with note </Text>
            <Text style={textStyleOutputValue}>{sendNote}</Text>
          </Text>
        ) : null}
        {sendState === 'failed' ? (
          <Text style={textStyleOutputValue}>
            <Text>Send failed</Text>
            <Text>{sendError}</Text>
          </Text>
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
      sendFieldUpdate,
      sendNote,
      validateSendAmount,
      validateSendRecipient,
      validateSendNote,
      sendError,
    } = this.props;

    switch (sendState) {
      case 'amount':
        return (
          <Input
            key="amount"
            placeholder="e.g. 10"
            label={'Amount [' + sendWallet.currency.currency.symbol + ']'}
            prefix={sendWallet.currency.currency.symbol}
            requiredError={sendError}
            reference={input => {
              this.input = input;
            }}
            keyboardType="numeric"
            value={sendAmount}
            onChangeText={value =>
              sendFieldUpdate({ prop: 'sendAmount', value })
            }
            returnKeyType="next"
            autoFocus
            onSubmitEditing={() => validateSendAmount(sendWallet, sendAmount)}
          />
        );
      case 'recipient':
        return (
          <Input
            key="recipient"
            placeholder="e.g. user@rehive.com"
            label={'Please enter email, crypto address or mobile number'}
            value={sendRecipient}
            onChangeText={value =>
              sendFieldUpdate({ prop: 'sendRecipient', value })
            }
            requiredError={sendError}
            reference={input => {
              this.input = input;
            }}
            // keyboardType="numeric"
            returnKeyType="next"
            autoFocus
            onSubmitEditing={() => validateSendRecipient(sendRecipient)}
          />
        );
      case 'note':
        return (
          <Input
            key="note"
            placeholder="e.g. Rent"
            label="Note:"
            value={sendNote}
            onChangeText={value => sendFieldUpdate({ prop: 'sendNote', value })}
            requiredError={sendError}
            reference={input => {
              this.input = input;
            }}
            returnKeyType="next"
            autoFocus
            onSubmitEditing={() => validateSendNote(sendNote)}
          />
        );
      default:
        return <View />;
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header navigation={this.props.navigation} title="Send" back right />
        <KeyboardAvoidingView
          keyboardShouldPersistTaps={'never'}
          style={styles.viewStyleContainer}
          behavior={'padding'}>
          <TouchableWithoutFeedback
            style={{ flex: 1 }}
            onPress={Keyboard.dismiss}
            accessible={false}>
            {this.renderMainContainer()}
          </TouchableWithoutFeedback>
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
    paddingTop: 10,
  },
  viewStyleTopContainer: {
    justifyContent: 'center',
    flex: 2,
  },
  viewStyleBottomContainer: {
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    flex: 1,
    borderRadius: 2,
  },
  contact: {
    height: 40,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyleOutput: {
    fontSize: 16,
    alignSelf: 'center',
    padding: 8,
    paddingBottom: 0,
  },
  textStyleOutputValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
};

const mapStateToProps = ({ accounts }) => {
  const {
    user,
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
    user,
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
  };
};

export default connect(mapStateToProps, {
  sendFieldUpdate,
  setSendWallet,
  validateSendAmount,
  validateSendRecipient,
  validateSendNote,
  setSendState,
  send,
})(SendScreen);
