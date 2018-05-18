import React, { Component } from 'react';
import { View, FlatList, Text, RefreshControl } from 'react-native';

import TransactionService from './../services/transactionService';
import TransactionListItem from './TransactionListItem';
import { Spinner } from './common/Spinner';

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

  // setData = async responseJson => {
  //   if (responseJson.status === 'success') {
  //     const data = this.state.data.concat(responseJson.data.results);
  //     this.setState({
  //       data,
  //       noTransaction: false,
  //       initialLoading: false,
  //       nextUrl: responseJson.data.next,
  //     });
  //   } else {
  //     console.log('logout2');
  //     // this.props.logout();
  //   }

  //   // if (this.state.data.length === 0) {
  //   //   let responseJson = await UserInfoService.getCompany();
  //   //   let responseEmails = await SettingsService.getAllEmails();
  //   //   if (
  //   //     responseJson.status === 'success' &&
  //   //     responseEmails.status === 'success'
  //   //   ) {
  //   //     let emails = responseEmails.data;
  //   //     let verified = emails.filter(function(node) {
  //   //       return node.verified === true;
  //   //     });
  //   //     if (verified.length !== 0) {
  //   //       this.setState({
  //   //         company: responseJson.data,
  //   //         noTransaction: true,
  //   //         verified: true,
  //   //       });
  //   //     } else {
  //   //       this.setState({
  //   //         company: responseJson.data,
  //   //         noTransaction: true,
  //   //         verified: false,
  //   //       });
  //   //     }
  //   //   } else {
  //   //     console.log('logout3');
  //   //     // this.props.logout();
  //   //   }
  //   // }
  //   // if (this.state.data.length > 0) {
  //   //   this.setState({
  //   //     noTransaction: false,
  //   //   });
  //   // }
  // };

  renderTransactions() {
    const { transactions, loading } = this.state;
    if (transactions.length > 0) {
      return (
        <FlatList
          // style={{ height: 0 }}

          // refreshControl={
          //   <RefreshControl
          //     refreshing={loading}
          //     onRefresh={() => this.getTransactions(this.props.currencyCode)}
          //   />
          // }
          data={transactions}
          renderItem={({ item }) => this.renderItem(item)}
          keyExtractor={item => item.id}
        />
      );
    }
    return <Text>No Transactions</Text>;
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
    // if (this.state.noTransaction) {
    //   return (
    //     <View
    //       style={{
    //         flex: 1,
    //         backgroundColor: Colors.lightgray,
    //         paddingHorizontal: 10,
    //       }}>
    //       {this.state.initialLoading && (
    //         <View
    //           style={{
    //             flex: 1,
    //             justifyContent: 'center',
    //             alignItems: 'center',
    //           }}>
    //           <ActivityIndicator size="large" />
    //         </View>
    //       )}
    //       {!this.state.initialLoading && (
    //         <ScrollView
    //           refreshControl={
    //             <RefreshControl
    //               refreshing={this.state.refreshing}
    //               onRefresh={this.handleRefresh.bind(this)}
    //             />
    //           }>
    //           <View
    //             style={{
    //               marginTop: 10,
    //               flexDirection: 'column',
    //               backgroundColor: 'white',
    //               padding: 20,
    //             }}>
    //             <Text
    //               style={{
    //                 fontSize: 18,
    //                 fontWeight: 'normal',
    //                 color: Colors.black,
    //               }}>
    //               {this.state.verified
    //                 ? 'No transactions yet.'
    //                 : 'Please verify your email address to redeem any unclaimed transactions. Pull to refresh your balance.'}
    //             </Text>
    //           </View>
    //           <View
    //             style={{
    //               marginTop: 30,
    //               alignItems: 'center',
    //               justifyContent: 'center',
    //               flex: 1,
    //             }}>
    //             <Text
    //               style={{
    //                 fontSize: 18,
    //                 fontWeight: 'normal',
    //                 color: Colors.black,
    //               }}>
    //               Swipe down to refresh
    //             </Text>
    //             <Icon
    //               name="ios-arrow-down-outline"
    //               size={40}
    //               color={Colors.black}
    //               style={{ paddingTop: 20 }}
    //             />
    //           </View>
    //         </ScrollView>
    //       )}
    //     </View>
    //   );
    // } else {
    //   return (
    //     <View style={{ flex: 1, backgroundColor: Colors.lightgray }}>
    //       {this.state.initialLoading && (
    //         <View
    //           style={{
    //             flex: 1,
    //             justifyContent: 'center',
    //             alignItems: 'center',
    //           }}>
    //           <ActivityIndicator size="large" />
    //         </View>
    //       )}
    //       {!this.state.initialLoading && (
    //         <FlatList
    //           data={this.state.data}
    //           renderItem={this.renderItem}
    //           // <ListItem
    //           //   avatar={
    //           //     this.state.profile.profile != null
    //           //       ? this.state.profile.profile
    //           //       : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgmT5tM-IGcFDpqZ87p9zKGaWQuzpvAcDKfOTPYfx5A9zOmbTh8RMMFg'
    //           //   }
    //           //   title={item.tx_type === 'credit' ? 'Received' : 'Sent'}
    //           //   subtitle={moment(item.created).fromNow()}
    //           //   rightTitle={`${item.currency.symbol}${this.getAmount(
    //           //     item.amount,
    //           //     item.currency.divisibility,
    //           //   )}`}
    //           //   rightTitleStyle={{ color: '#bdc6cf' }}
    //           //   containerStyle={{ paddingRight: 20 }}
    //           //   hideChevron
    //           //   roundAvatar
    //           //   onPress={() => {
    //           //     this.state.showDialog(item);
    //           //   }}
    //           //   //containerStyle={{'backgroundColor':'#FAFBFC'}}
    //           // />
    //           // )}
    //           keyExtractor={tx => tx.id}
    //           onRefresh={this.handleRefresh.bind(this)}
    //           refreshing={this.state.refreshing}
    //           onEndReached={this.handleLoadMore.bind(this)}
    //           onEndReachedThreshold={50}
    //         />
    //       )}
    //     </View>
    // );
    // }
  }
}

const styles = {
  containerStyle: {
    flex: 1,
  },
};

export default TransactionList;
