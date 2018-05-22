import React, { Component } from 'react';
import { View, RefreshControl, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { fetchBankAccounts } from './../../../redux/actions';

import { standardizeString } from './../../../util/general';

import Account from './../../../components/bankAccount';
import Colors from './../../../config/colors';
import Header from './../../../components/header';
import {
  CardList,
  Output,
  Input,
  InputContainer,
} from './../../../components/common';

class BankAccountsScreen extends Component {
  static navigationOptions = {
    title: 'Bank accounts',
  };

  state = {
    name: '',
    number: '',
    type: '',
    bank_name: '',
    bank_code: '',
    branch_code: '',
    swift: '',
    iban: '',
    bic: '',
    editing: false,
    addNew: false,
  };

  toggleAdd() {
    this.setState({ addNew: !this.state.addNew });
  }

  updateInputField = (prop, value) => {
    this.setState({ [prop]: value });
  };

  saveBankAccount() {
    console.log('save bank account');
  }

  renderContent(item) {
    const { viewStyleContent } = styles;
    const {
      bank_name,
      bank_code,
      branch_code,
      type,
      number,
      swift,
      iban,
      bic,
    } = item;
    return (
      <View style={viewStyleContent}>
        {bank_name ? <Output label="Bank name" value={bank_name} /> : null}
        {bank_code ? <Output label="Bank code" value={bank_code} /> : null}
        {branch_code ? (
          <Output label="Branch name" value={branch_code} />
        ) : null}
        {type ? <Output label="Type" value={type} /> : null}
        {number ? <Output label="Number" value={number} /> : null}
        {swift ? <Output label="Swift" value={swift} /> : null}
        {iban ? <Output label="IBAN" value={iban} /> : null}
        {bic ? <Output label="BIC" value={bic} /> : null}
      </View>
    );
  }

  renderDetail(item) {
    console.log('this.state', this.state);
    debugger;
    const {
      name,
      bank_name,
      bank_code,
      branch_code,
      type,
      number,
      swift,
      iban,
      bic,
    } = this.state;

    console.log('item', item);
    debugger;

    this.setState({
      name: item ? item.name : '',
      number: item ? item.number : '',
      type: item ? item.type : '',
      bank_name: item ? item.bank_name : '',
      bank_code: item ? item.bank_code : '',
      branch_code: item ? item.branch_code : '',
      swift: item ? item.swift : '',
      iban: item ? item.iban : '',
      bic: item ? item.bic : '',
      editing: item ? true : false,
    });

    return (
      <InputContainer>
        <Input
          label="Account holder"
          placeholder="e.g. John Snow"
          autoCapitalize="none"
          value={name}
          onChangeText={input => this.updateInputField('name', input)}
        />
        <Input
          label="Account number"
          placeholder="e.g. 4083764677"
          autoCapitalize="none"
          value={number}
          onChangeText={input => this.updateInputField('number', input)}
        />
        <Input
          label="Account type"
          placeholder="e.g. Cheque account"
          autoCapitalize="none"
          value={type}
          onChangeText={input => this.updateInputField('type', input)}
        />
        <Input
          label="Bank name"
          placeholder="e.g. Bank of World"
          autoCapitalize="none"
          value={bank_name}
          onChangeText={input => this.updateInputField('bank_name', input)}
        />
        <Input
          label="Bank code"
          placeholder="e.g. 12324"
          autoCapitalize="none"
          value={bank_code}
          onChangeText={input => this.updateInputField('bank_code', input)}
        />
        <Input
          label="Branch code"
          placeholder="e.g. 46589"
          autoCapitalize="none"
          value={branch_code}
          onChangeText={input => this.updateInputField('branch_code', input)}
        />
        <Input
          label="Swift code"
          placeholder="Usually 8 or 11 characters"
          autoCapitalize="none"
          value={swift}
          onChangeText={input => this.updateInputField('swift', input)}
        />
        <Input
          label="IBAN number"
          placeholder="34 alphanumeric characters"
          autoCapitalize="none"
          value={iban}
          onChangeText={input => this.updateInputField('iban', input)}
        />
        <Input
          label="BIC number"
          placeholder="Usually 8 or 11 characters"
          autoCapitalize="none"
          value={bic}
          onChangeText={input => this.props.updateBIC('bic', input)}
        />
      </InputContainer>
    );
  }

  saveBankAccount() {
    // let responseJson = await SettingsService.addBankAccount(this.state);
    // if (responseJson.status === 'success') {
    //   this.goToHome();
    // } else {
    //   Alert.alert('Error', responseJson.message, [{ text: 'OK' }]);
    // }
  }

  render() {
    const { bankAccounts, loadingBankAccounts, fetchBankAccounts } = this.props;
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          back
          title="Bank accounts"
          headerRightTitle="Add"
          headerRightOnPress={() =>
            this.props.navigation.navigate('AddBankAccount', {
              parentRoute: 'Settings',
              nextRoute: 'SettingsBankAccounts',
            })
          }
        />
        <CardList
          data={bankAccounts}
          titleDetail="Edit bank account"
          renderContent={this.renderContent}
          renderDetail={this.renderDetail}
          saveItem={this.saveBankAccount}
          title={item => (item ? item.name : 'New bank account')}
          subtitle={item => (item ? standardizeString(item.status) : '')}
          refreshing={loadingBankAccounts}
          onRefresh={fetchBankAccounts}
          emptyListMessage="No bank accounts added yet"
          deleteItem={this.delete}
          deletable
          editing
          addNew={this.state.addNew}
          titleStyle="secondary"
        />
      </View>
    );
  }
}

const styles = {
  viewStyleContent: {
    paddingLeft: 16,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
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
};

const mapStateToProps = ({ user }) => {
  const { bankAccounts, loadingBankAccounts } = user;
  return { bankAccounts, loadingBankAccounts };
};

export default connect(mapStateToProps, { fetchBankAccounts })(
  BankAccountsScreen,
);
