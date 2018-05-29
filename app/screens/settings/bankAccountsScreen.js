import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import {
  fetchData,
  newItem,
  editItem,
  updateItem,
  deleteItem,
  updateInputField,
} from './../../redux/actions';

import { standardizeString } from './../../util/general';

import Header from './../../components/header';
import { Output, Input, InputContainer } from './../../components/common';
import CardList from './../../components/CardList';

class BankAccountsScreen extends Component {
  static navigationOptions = {
    title: 'Bank accounts',
  };

  updateInputField = (prop, value) => {
    this.setState({ [prop]: value });
  };

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
    // if (bank_account) {
    const {
      name,
      number,
      type,
      bank_name,
      bank_code,
      branch_code,
      swift,
      iban,
      bic,
    } = item;

    const updateInputField = this.props.updateInputField;

    return (
      <InputContainer>
        <Input
          label="Account holder"
          placeholder="e.g. John Snow"
          autoCapitalize="none"
          value={name}
          onChangeText={input =>
            updateInputField('bank_account', 'name', input)
          }
        />
        <Input
          label="Account number"
          placeholder="e.g. 4083764677"
          autoCapitalize="none"
          value={number}
          onChangeText={input =>
            updateInputField('bank_account', 'number', input)
          }
        />
        <Input
          label="Account type"
          placeholder="e.g. Cheque account"
          autoCapitalize="none"
          value={type}
          onChangeText={input =>
            updateInputField('bank_account', 'type', input)
          }
        />
        <Input
          label="Bank name"
          placeholder="e.g. Bank of World"
          autoCapitalize="none"
          value={bank_name}
          onChangeText={input =>
            updateInputField('bank_account', 'bank_name', input)
          }
        />
        <Input
          label="Bank code"
          placeholder="e.g. 12324"
          autoCapitalize="none"
          value={bank_code}
          onChangeText={input =>
            updateInputField('bank_account', 'bank_code', input)
          }
        />
        <Input
          label="Branch code"
          placeholder="e.g. 46589"
          autoCapitalize="none"
          value={branch_code}
          onChangeText={input =>
            updateInputField('bank_account', 'branch_code', input)
          }
        />
        <Input
          label="Swift code"
          placeholder="Usually 8 or 11 characters"
          autoCapitalize="none"
          value={swift}
          onChangeText={input =>
            updateInputField('bank_account', 'swift', input)
          }
        />
        <Input
          label="IBAN number"
          placeholder="34 alphanumeric characters"
          autoCapitalize="none"
          value={iban}
          onChangeText={input =>
            updateInputField('bank_account', 'iban', input)
          }
        />
        <Input
          label="BIC number"
          placeholder="Usually 8 or 11 characters"
          autoCapitalize="none"
          value={bic}
          onChangeText={input => updateInputField('bank_account', 'bic', input)}
        />
      </InputContainer>
    );
    // }
    return;
  }

  render() {
    const {
      bank_account,
      loading_bank_account,
      fetchData,
      temp_bank_account,
      newItem,
      editItem,
      updateItem,
      deleteItem,
      showDetail,
    } = this.props;
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          back
          title="Bank accounts"
          headerRightIcon={showDetail ? 'save' : 'add'}
          headerRightOnPress={
            showDetail
              ? () => updateItem('bank_account', temp_bank_account)
              : () => newItem('bank_account')
          }
        />
        <CardList
          type="bank_account"
          data={bank_account}
          tempItem={temp_bank_account}
          loadingData={loading_bank_account}
          title={item => (item ? item.name : 'New bank account')}
          subtitle={item => (item ? standardizeString(item.status) : '')}
          // onPressTitle={item => () => editItem('bank_account', item)}
          renderContent={this.renderContent}
          // showDetail={showDetail}
          // titleDetail="Edit bank account"
          renderDetail={tempItem => this.renderDetail(tempItem)}
          // iconTitleRightDetail="close"
          // onPressTitleRightDetail={() => fetchData('bank_account')}
          // refreshing={loading_bank_account}
          // onRefresh={() => fetchData('bank_account')}
          emptyListMessage="No bank accounts added yet"
          // deleteItem={item => () => deleteItem('bank_account', item)}
          deletable
          // editing
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
};

const mapStateToProps = ({ user }) => {
  const {
    bank_account,
    loading_bank_account,
    temp_bank_account,
    showDetail,
  } = user;
  return {
    bank_account,
    loading_bank_account,
    temp_bank_account,
    showDetail,
  };
};

export default connect(mapStateToProps, {
  fetchData,
  newItem,
  editItem,
  updateItem,
  deleteItem,
  updateInputField,
})(BankAccountsScreen);
