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
import { setSendCurrency, setSendAmount } from '../../../redux/actions';

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

  updateSendAmount() {
    this.props.setSendAmount(this.state.input);
  }

  renderAmount() {
    const {
      send_amount,
      send_currency,
      send_recipient,
      send_note,
      send_reference,
      tempCurrency,
    } = this.props;
    // console.log('send', send);
    if (send_currency === null) {
      this.props.setSendCurrency(tempCurrency);
    } else {
      if (!send_amount) {
        return (
          <Card
            textHeader="Amount"
            textActionOne="Next"
            onPressActionOne={() => this.updateSendAmount()}>
            <View>
              <Input
                key="amount"
                placeholder="e.g. 10"
                label={'Enter amount (' + send_currency.currency.symbol + ')'}
                prefix={send_currency.currency.symbol}
                value={this.state.input}
                // requiredError={inputError}
                reference={input => {
                  this.input = input;
                }}
                keyboardType="numeric"
                onChangeText={value => this.setState({ input: value })}
                returnKeyType="next"
                autoFocus
                onSubmitEditing={() => this.updateAuthInputField()}
              />
            </View>
          </Card>
        );
      }
      return (
        <Card textHeader="Amount">
          <View>
            <Text>
              Currency: {send_currency.currency.symbol}
              {send_amount}
            </Text>
          </View>
        </Card>
      );
    }
    return;
  }

  renderRecipient() {
    return <Card textHeader="Recipient" />;
  }

  renderNote() {
    return <Card textHeader="Note" />;
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header navigation={this.props.navigation} title="To" back right />
        <CardContainer>
          {this.renderAmount()}
          {this.renderRecipient()}
          {this.renderNote()}
        </CardContainer>
        {/* <KeyboardAvoidingView
          style={styles.container}
          behavior={'padding'}
          keyboardVerticalOffset={75}>
          <View style={{ flex: 1 }}>
            <Input
              label="Recipient"
              placeholder="Enter email, stellar address or mobile"
              autoCapitalize="none"
              value={this.state.searchText}
              onChangeText={this.searchTextChanged}
            />
            {!this.state.ready ? (
              <View style={styles.spinner}>
                <Text>Loading Contacts</Text>
                <ActivityIndicator
                  animating
                  style={{ height: 80 }}
                  size="large"
                />
              </View>
            ) : (
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
            )}
          </View>
          <Button label="Next" onPress={this.send} />
        </KeyboardAvoidingView> */}
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
    send_amount,
    send_currency,
    send_recipient,
    send_note,
    send_reference,
    tempCurrency,
  } = rehive;
  return {
    user,
    accounts,
    tempCurrency,
    send_amount,
    send_currency,
    send_recipient,
    send_note,
    send_reference,
  };
};

export default connect(mapStateToProps, {
  setSendCurrency,
  setSendAmount,
})(SendScreen);
