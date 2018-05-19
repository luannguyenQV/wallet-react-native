import React, { Component } from 'react';
import { View, RefreshControl, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { fetchBankAccounts } from './../../../redux/actions';

import Account from './../../../components/bankAccount';
import Colors from './../../../config/colors';
import Header from './../../../components/header';
import { EmptyListMessage } from './../../../components/common';

class BankAccountsScreen extends Component {
  static navigationOptions = {
    title: 'Bank accounts',
  };

  componentDidMount() {
    this.props.fetchBankAccounts();
  }

  goToEdit = reference => {
    this.props.navigation.navigate('EditBankAccount', { reference });
  };

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
        {bankAccounts.length > 0 ? (
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={loadingBankAccounts}
                onRefresh={fetchBankAccounts}
              />
            }
            data={bankAccounts}
            renderItem={({ item }) => (
              <Account
                onPress={this.goToEdit}
                reference={item}
                name={item.bank_name}
              />
            )}
            keyExtractor={item => item.id}
          />
        ) : (
          <EmptyListMessage text="No bank accounts added yet" />
        )}
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
