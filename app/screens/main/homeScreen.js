import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { logoutUser, setCurrentIndex } from './../../redux/actions';
import _ from 'lodash';
import Swiper from 'react-native-swiper';

import Header from './../../components/header';
import Colors from './../../config/colors';
import HomeCard from './../../components/homeCard';

import TransactionPopUp from './../../components/wallet/TransactionPopUp';
import HeaderAccount from '../../components/headerAccount';
import headerAccount from '../../components/headerAccount';
import Transactions from './../../components/transactions';
import { CardContainer, Card } from '../../components/common';

const renderPagination = (index, total, context) => {
  return (
    <View style={styles.paginationStyle}>
      <Text style={{ color: 'grey' }} />
    </View>
  );
};

class HomeScreen extends Component {
  static navigationOptions = {
    label: 'Home',
  };

  showDialog = item => {
    this.setState({ dataToShow: item });
    this.popupDialog.show();
  };

  renderAccounts() {
    const account = this.props.accounts.results[0];
    return (
      <FlatList
        onViewableItemsChanged={({ viewableItems }) => {
          this.setCurrentIndex(viewableItems[0].index);
        }}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
        style={{ height: 0 }}
        data={account.currencies}
        horizontal
        pagingEnabled
        renderItem={({ item }) => (
          <HeaderAccount currency={item} accountLabel={account.name} />
        )}
        keyExtractor={item => account.name + item.currency.code}
        showsHorizontalScrollIndicator={false}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          drawer
          // noAccounts={this.state.noAccounts}
        />
        {this.renderAccounts()}
        {/* <Swiper renderPagination={renderPagination} loop={false}> */}
        <View style={{ flex: 1 }} />
        {/* <CardContainer>
          <Card
            key={0}
            textHeader="Welcome to Rehive"
            image={require('./../../../assets/icons/new_logo.png')}
            textActionOne="Cool">
            <Text>Put your logo and brand here.</Text>
          </Card>
        </CardContainer> */}
        <Transactions
          updateBalance={this.getBalanceInfo}
          currency={this.state.code}
          showDialog={this.showDialog}
          logout={this.logout}
        />
        {/* </Swiper> */}
        {/* <TransactionPopUp
          popupDialog={popupDialog => {
            this.popupDialog = popupDialog;
          }}
          transactionDetails={this.state.dataToShow}
        /> */}
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
  paginationStyle: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
};

const mapStateToProps = ({ auth, rehive }) => {
  const { token } = auth;
  const { user, accounts, tempCurrency, loadingAccounts } = rehive;
  return { token, user, accounts, tempCurrency, loadingAccounts };
};

export default connect(mapStateToProps, { logoutUser, setCurrentIndex })(
  HomeScreen,
);
