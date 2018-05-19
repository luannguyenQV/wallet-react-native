import React, { Component } from 'react';
import { View, FlatList, Text, RefreshControl } from 'react-native';

import TransactionService from './../services/transactionService';
import TransactionListItem from './TransactionListItem';
import { Spinner, EmptyListMessage } from './common';

class TransactionList extends Component {
  state = {
    transactions: [],
    loading: true,
  };

  async componentDidMount() {
    await this.getTransactions(this.props.currencyCode);
  }

  async componentWillReceiveProps(nextProps) {
    await this.getTransactions(nextProps.currencyCode);
  }

  async getTransactions(currencyCode) {
    this.setState({
      transactions: [],
      loading: true,
    });
    let responseJson = await TransactionService.getAllTransactionsByCurrency(
      currencyCode,
    );
    this.setState({
      transactions: responseJson.data.results,
      loading: false,
    });
  }

  renderTransactions() {
    const { transactions, loading } = this.state;
    if (transactions.length > 0) {
      return (
        <FlatList
          // style={{ height: 0 }}

          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => this.getTransactions(this.props.currencyCode)}
            />
          }
          data={transactions}
          renderItem={({ item }) => this.renderItem(item)}
          keyExtractor={item => item.id}
        />
      );
    }
    return <EmptyListMessage text="No transactions" />;
  }

  renderItem = item => {
    return (
      <TransactionListItem
        item={item}
        // onPress={() => {
        //   this.state.showDialog(item);
        // }}
      />
    );
  };

  render() {
    const { loading } = this.state;
    return (
      <View style={styles.containerStyle}>
        {loading ? <Spinner size="large" /> : this.renderTransactions()}
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
  },
};

export default TransactionList;
