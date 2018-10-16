import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { newItem, updateItem } from './../../redux/actions';

import { standardizeString } from './../../util/general';

import Header from './../../components/header';
import { Output, Input, InputContainer } from './../../components/common';
import CardListUserSettings from './../../components/cards/CardListUserSettings';
import { userBankAccountsSelector } from '../../redux/reducers/UserReducer';

class BankAccountsScreen extends Component {
  static navigationOptions = {
    title: 'Bank accounts',
  };

  render() {
    const { bankAccounts, tempItem, newItem, updateItem } = this.props;
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          back
          title="Bank accounts"
          headerRightIcon={bankAccounts.showDetail ? 'done' : 'add'}
          headerRightOnPress={
            bankAccounts.showDetail
              ? () => updateItem('bank_account', tempItem)
              : () => newItem('bank_account')
          }
        />
        <CardListUserSettings
          // onRefresh={() => console.log('refreshing')}
          type="bank_account"
          data={bankAccounts}
          // tempItem={tempItem}
          identifier="bank_name"
          // renderItem={<Text>Hello World </Text>}
          emptyListMessage="No bank accounts added yet"
          // canDelete
          // canEdit
          // canVerify
          // canPrimary
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
};

const mapStateToProps = state => {
  return {
    bankAccounts: userBankAccountsSelector(state),
  };
};

export default connect(mapStateToProps, {
  newItem,
  updateItem,
})(BankAccountsScreen);
