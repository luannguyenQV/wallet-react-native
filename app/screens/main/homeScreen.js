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
import TransactionList from './../../components/TransactionList';
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
      <View style={{ flex: 1 }}>
        <FlatList
          onViewableItemsChanged={this.handleViewableItemsChanged}
          viewabilityConfig={this.viewabilityConfig}
          // style={{ height: 0 }}
          data={account.currencies}
          horizontal
          pagingEnabled
          renderItem={({ item }) => (
            <HeaderAccount currency={item} accountLabel={account.name} />
          )}
          keyExtractor={item => account.name + item.currency.code}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }

  handleViewableItemsChanged = info => {
    // console.log(;
    if (info.viewableItems.length > 0) {
      this.props.setCurrentIndex(info.viewableItems[0].index);
    }
  };

  viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  render() {
    const { accounts, currentIndex } = this.props;
    // console.log(accounts);
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          drawer
          // noAccounts={this.state.noAccounts}
        />
        {this.renderAccounts()}
        {/* <Swiper renderPagination={renderPagination} loop={false}> */}
        {/* <View style={{ flex: 1 }} /> */}
        {/* <CardContainer>
          <Card
            key={0}
            textHeader="Welcome to Rehive"
            image={require('./../../../assets/icons/new_logo.png')}
            textActionOne="Cool">
            <Text>Put your logo and brand here.</Text>
          </Card>
        </CardContainer> */}
        <TransactionList
          // updateBalance={this.getBalanceInfo}
          currencyCode={
            accounts.results[0].currencies[currentIndex].currency.code
          }
          // showDialog={this.showDialog}
          // logout={this.logout}
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
  const { user, accounts, currentIndex, loadingAccounts } = rehive;
  return { token, user, accounts, currentIndex, loadingAccounts };
};

export default connect(mapStateToProps, { logoutUser, setCurrentIndex })(
  HomeScreen,
);
