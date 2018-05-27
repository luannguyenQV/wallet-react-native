import React, { Component } from 'react';
import { View, FlatList, Text, RefreshControl } from 'react-native';

import TransactionService from './../services/transactionService';
import TransactionListItem from './TransactionListItem';
import { Card, EmptyListMessage, PopUpGeneral, Output } from './common';

class TransactionList extends Component {
  state = {
    previousCurrencyCode: null,
    transactions: [],
    loading: true,
    showDetail: false,
    transaction: null,
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

  showModal = item => {
    console.log(item);

    this.setState({ showDetail: true, transaction: item });
  };

  hideModal = () => {
    this.setState({ showDetail: false, transaction: null });
  };

  renderItem = item => {
    return (
      <TransactionListItem item={item} onPress={item => this.showModal(item)} />
    );
  };

  // renderDetail() {
  //   const { showDetail, transaction } = this.state;
  //   console.log(transaction);

  //   let iconName = '';
  //   let headerText = '';
  //   let color = '';

  //   switch (transaction.tx_type) {
  //     case 'debit':
  //       // console.log('Debit');
  //       iconName = 'call-made';
  //       headerTextOne = 'Sent';
  //       if (item.destination_transaction) {
  //         headerTextOne = headerTextOne + ' to ';
  //         headerTextTwo = transaction.destination_transaction.user.email;
  //       }
  //       color = Colors.positive;
  //       break;
  //     case 'credit':
  //       // console.log('Credit');
  //       iconName = 'call-received';
  //       headerTextOne = 'Received';
  //       if (transaction.source_transaction) {
  //         headerTextOne = headerTextOne + ' from ';
  //         headerTextTwo = transaction.source_transaction.user.email;
  //       }
  //       color = Colors.negative;
  //       break;
  //     default:
  //       iconName = 'question';
  //       headerText = 'Unknown transaction type';
  //       color = Colors.warning;
  //   }

  //   if (transaction) {
  //     return (
  //       <PopUpGeneral
  //         visible={showDetail}
  //         // iconTitleLeft={iconTitleLeft}
  //         title={'Transaction details'}
  //         subtitle={'Subtitle?'}
  //         // titleStyle={titleStyle}
  //         iconTitleRight={'close'}
  //         onPressTitleRight={() => this.hideModal()}>
  //         <Output label="Transaction type" value={transaction.label} />
  //       </PopUpGeneral>
  //     );
  //   }
  // }

  render() {
    return (
      <View style={styles.containerStyle}>
        {this.renderTransactions()}
        {/* {this.renderDetail()} */}
      </View>
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
