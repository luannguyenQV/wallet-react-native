import React, { Component } from 'react';
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  AsyncStorage,
  RefreshControl,
  TouchableHighlight,
  Text,
  Alert,
  ListView,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import {
  setSendCurrency,
  validateSendAmount,
  validateSendRecipient,
  validateSendNote,
  setSendState,
  sendFieldUpdate,
  send,
} from '../../../redux/actions';

import Contact from './../../../components/contact';
import {
  Input,
  Button,
  CardContainer,
  Card,
} from './../../../components/common';
import ContactService from './../../../services/contactService';
import UserInfoService from './../../../services/userInfoService';
import Auth from './../../../util/auth';
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

  async componentWillMount() {
    let balance = await AsyncStorage.getItem('balance');
    this.setState({
      balance: parseFloat(balance),
    });
    // this.showContactsAsync();
    let responseJson = await UserInfoService.getUserDetails();
    if (responseJson.status === 'success') {
      AsyncStorage.removeItem('user');
      AsyncStorage.setItem('user', JSON.stringify(responseJson.data));
    } else {
      Auth.logout(this.props.navigation);
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

  send = async () => {
    if (this.state.searchText === '') {
      Alert.alert('Error', 'Enter a reference..');
      return;
    } else {
      this.setState({ reference: this.state.searchText });
    }

    this.props.navigation.navigate('SendAmountEntry', {
      recipient: this.state.searchText,
      memo: '',
      balance: this.state.balance,
    });
  };

  goToBarcodeScanner = () => {
    this.props.navigation.navigate('QRcodeScanner');
  };

  performSend() {
    const data = {
      amount: this.props.sendAmount,
      recipient: this.props.sendRecipient,
      note: this.props.sendNote,
      currency: this.props.sendCurrency,
      reference: this.props.sendReference,
    };
    this.props.send(data);
  }

  setSendState(nextState) {
    this.props.setSendState(nextState);
  }

  renderAmount() {
    const {
      sendState,
      sendAmount,
      sendCurrency,
      tempCurrency,
      sendFieldUpdate,
      validateSendAmount,
      inputError,
      accounts,
    } = this.props;

    if (sendCurrency === null) {
      this.props.setSendCurrency(tempCurrency, accounts.results[0].reference);
    } else if (
      sendState !== 'confirm' &&
      sendState !== 'success' &&
      sendState !== 'fail'
    ) {
      if (sendState === 'amount') {
        return (
          <Card
            textHeader="Amount"
            textActionOne="Next"
            onPressActionOne={() =>
              validateSendAmount(sendCurrency, sendAmount)
            }>
            <View>
              <Input
                key="amount"
                placeholder="e.g. 10"
                label={sendCurrency.currency.symbol}
                prefix={sendCurrency.currency.symbol}
                requiredError={inputError}
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
                onSubmitEditing={() =>
                  validateSendAmount(sendCurrency, sendAmount)
                }
              />
            </View>
          </Card>
        );
      }
      return (
        <Card
          // textHeader="Amount"
          textActionOne="Change"
          onPressActionOne={() => this.setSendState('amount')}>
          <View>
            <Text>
              You are about to send {sendCurrency.currency.symbol} {sendAmount}
            </Text>
          </View>
        </Card>
      );
    }
    return;
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

  renderRecipient() {
    const {
      sendState,
      sendRecipient,
      sendFieldUpdate,
      validateSendRecipient,
      inputError,
    } = this.props;

    if (sendState === 'recipient' || sendState === 'note') {
      if (sendState === 'recipient') {
        return (
          <Card
            // textHeader="Recipient"
            textActionOne="Next"
            onPressActionOne={() => validateSendRecipient(sendRecipient)}
            textActionTwo={this.state.contactButtonText}
            onPressActionTwo={() => this.toggleContacts()}>
            <View>
              <Input
                key="recipient"
                placeholder="e.g. user@rehive.com"
                label={'Please enter email, crypto address or mobile number'}
                value={sendRecipient}
                onChangeText={value =>
                  sendFieldUpdate({ prop: 'sendRecipient', value })
                }
                requiredError={inputError}
                reference={input => {
                  this.input = input;
                }}
                keyboardType="numeric"
                returnKeyType="next"
                autoFocus
                onSubmitEditing={() => validateSendRecipient(sendRecipient)}
              />
              {this.renderContacts()}
            </View>
          </Card>
        );
      }
      return (
        <Card
          // textHeader="Amount"
          textActionOne="Change"
          onPressActionOne={() => this.setSendState('recipient')}>
          <View>
            <Text>To: {sendRecipient}</Text>
          </View>
        </Card>
      );
    }
    return;
  }

  renderContacts() {
    const { showContacts } = this.state;
    if (showContacts) {
      if (this.state.ready) {
        return (
          <View style={styles.spinner}>
            <Text>Loading Contacts</Text>
            <ActivityIndicator animating style={{ height: 80 }} size="large" />
          </View>
        );
      } else {
        return (
          <View style={{ flex: 1, marginHorizontal: 20, marginTop: 10 }}>
            <ListView
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.showContactsAsync.bind(this)}
                />
              }
              dataSource={this.state.contacts}
              enableEmptySections
              renderRow={rowData => (
                <Contact selected={this.selectAContact} rowData={rowData} />
              )}
            />
          </View>
        );
      }
    }
  }

  renderNote() {
    const {
      sendState,
      sendNote,
      validateSendNote,
      sendFieldUpdate,
      inputError,
    } = this.props;

    if (sendState === 'note') {
      return (
        <Card
          // textHeader="Note"
          textActionOne="Next"
          onPressActionOne={() => validateSendNote(sendNote)}>
          <View>
            <Input
              key="note"
              placeholder="e.g. Rent"
              label="Note:"
              value={sendNote}
              onChangeText={value =>
                sendFieldUpdate({ prop: 'sendNote', value })
              }
              requiredError={inputError}
              reference={input => {
                this.input = input;
              }}
              returnKeyType="next"
              autoFocus
              onSubmitEditing={() => validateSendNote(sendNote)}
            />
          </View>
        </Card>
      );
    }
    return;
  }

  renderConfirm() {
    const {
      sendAmount,
      sendCurrency,
      sendRecipient,
      sendNote,
      sendState,
      sending,
    } = this.props;

    if (sendState === 'confirm') {
      return (
        <Card
          textHeader="Confirm"
          textActionOne="Yes"
          onPressActionOne={() => this.performSend()}
          textActionTwo="Change"
          onPressActionTwo={() => this.setSendState('note')}
          loading={sending}>
          <View>
            <Text>
              You are about to send {sendCurrency.currency.symbol} {sendAmount}
            </Text>
            <Text>to {sendRecipient}</Text>
            <Text>with note {sendNote}</Text>
          </View>
        </Card>
      );
    }
    if (sendState === 'success') {
      return (
        <Card textHeader="Success">
          <View>
            <Text>
              You sent {sendCurrency.currency.symbol} {sendAmount}
            </Text>
            <Text>to {sendRecipient}</Text>
            <Text>with note {sendNote}</Text>
          </View>
        </Card>
      );
    }
    if (sendState === 'fail') {
      return (
        <Card textHeader="Fail">
          <View>
            <Text>Unable to send</Text>
          </View>
        </Card>
      );
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header navigation={this.props.navigation} title="To" back right />
        <CardContainer>
          {this.renderAmount()}
          {this.renderRecipient()}
          {this.renderNote()}
          {this.renderConfirm()}
        </CardContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingTop: 10,
  },
  spinner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submit: {
    marginBottom: 10,
    marginHorizontal: 20,
    borderRadius: 25,
    height: 50,
    backgroundColor: Colors.lightblue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 60,
    width: '100%',
    padding: 10,
    marginTop: 20,
    borderColor: 'white',
    borderWidth: 1,
  },
  contact: {
    height: 40,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = ({ rehive }) => {
  const {
    user,
    accounts,
    sendAmount,
    sendCurrency,
    sendRecipient,
    sendNote,
    sendReference,
    sendState,
    tempCurrency,
    inputError,
    sending,
  } = rehive;
  return {
    user,
    accounts,
    tempCurrency,
    sendAmount,
    sendCurrency,
    sendRecipient,
    sendNote,
    sendReference,
    sendState,
    inputError,
    sending,
  };
};

export default connect(mapStateToProps, {
  sendFieldUpdate,
  setSendCurrency,
  validateSendAmount,
  validateSendRecipient,
  validateSendNote,
  setSendState,
  send,
})(SendScreen);
