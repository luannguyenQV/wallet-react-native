import React, { Component } from 'react';
import { View, FlatList, Text, RefreshControl } from 'react-native';

import TransactionService from './../services/transactionService';
import TransactionListItem from './TransactionListItem';
import { Spinner, EmptyListMessage } from './common';

class TransactionList extends Component {
  state = {
    previousCurrencyCode: null,
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
    if (this.state.previousCurrencyCode !== currencyCode) {
      this.setState({ transactions: [] });
    }
    this.setState({ loading: true });
    let responseJson = await TransactionService.getAllTransactionsByCurrency(
      currencyCode,
    );
    this.setState({
      previousCurrencyCode: currencyCode,
      transactions: responseJson.data.results,
      loading: false,
    });
  }

  renderTransactions() {
    const { transactions, loading } = this.state;
    return (
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => this.getTransactions(this.props.currencyCode)}
          />
        }
        data={transactions}
        renderItem={({ item }) => this.renderItem(item)}
        keyExtractor={item => item.id}
        ListEmptyComponent={this.renderEmptyList()}
      />
    );
  }

  renderEmptyList() {
    const { loading } = this.state;
    if (!loading) {
      return <EmptyListMessage text="No transactions" />;
    }
    return;
  }

  renderItem = item => {
    return <TransactionListItem item={item} />;
  };

  render() {
    return (
      <View style={styles.containerStyle}>{this.renderTransactions()}</View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    padding: 8,
  },
};

export default TransactionList;
