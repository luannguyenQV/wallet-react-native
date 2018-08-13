import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import {
  fetchRewards,
  claimReward,
  viewReward,
  hideReward,
  fetchClaimedRewards,
  viewClaimedReward,
  hideClaimedReward,
} from './../../redux/actions';
import { Container, Content, Tab, Tabs } from 'native-base';
import {
  getRewards,
  getClaimedRewards,
} from './../../redux/reducers/RewardsReducer';

import Header from './../../components/header';
// import Wallet from './../../components/wallet';
import { Output, PopUpGeneral } from '../../components/common';
import CardList from './../../components/CardList';
import { performDivisibility, standardizeString } from './../../util/general';

class RewardsScreen extends Component {
  static navigationOptions = {
    title: 'Rewards',
  };

  state = {
    showModal: false,
    wallet: null,
  };

  componentDidMount() {
    this.props.fetchRewards();
  }

  renderContent(item) {
    return (
      <View style={styles.viewStyleContainer}>
        <Output label="" value={item.description} />
        <Output
          label="Amount"
          value={
            item.currency.symbol +
            ' ' +
            performDivisibility(item.reward_amount, item.currency.divisibility)
          }
        />
      </View>
    );
  }

  renderDetail(item) {
    return (
      <View style={styles.viewStyleContainer}>
        <Output label="" value={item.description} />
        <Output
          label="Amount"
          value={
            item.currency.symbol +
            ' ' +
            performDivisibility(item.reward_amount, item.currency.divisibility)
          }
        />
        <Output label="Start date" value={item.start_date} />
        <Output label="End date" value={item.end_date} />
      </View>
    );
  }

  renderClaimedContent(item) {
    return (
      <View style={styles.viewStyleContainer}>
        <Output label="" value={item.campaign.description} />
        <Output
          label="Amount"
          value={
            item.currency.symbol +
            ' ' +
            performDivisibility(item.amount, item.currency.divisibility)
          }
        />
      </View>
    );
  }

  renderClaimedDetail(item) {
    console.log(item);
    return (
      <View style={styles.viewStyleContainer}>
        <Output label="" value={item.campaign.description} />
        <Output
          label="Amount"
          value={
            item.currency.symbol +
            ' ' +
            performDivisibility(item.amount, item.currency.divisibility)
          }
        />
        <Output label="Type" value={item.reward_type} />
        <Output label="Status" value={standardizeString(item.status)} />
        {/* <Output label="Start date" value={item.start_date} />
        <Output label="End date" value={item.end_date} /> */}
      </View>
    );
  }

  render() {
    const {
      company_config,
      rewards,
      fetchRewards,
      viewReward,
      hideReward,
      claimReward,
      claimedRewards,
      fetchClaimedRewards,
      viewClaimedReward,
      hideClaimedReward,
    } = this.props;
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          colors={company_config.colors}
          drawer
          title="Rewards"
        />
        <Container>
          <Tabs
            tabBarUnderlineStyle={{
              backgroundColor: company_config.colors.focus,
            }}>
            <Tab
              heading="Campaigns"
              activeTextStyle={{ color: company_config.colors.focus }}>
              <CardList
                colors={company_config.colors}
                type="rewards"
                navigation={this.props.navigation}
                data={rewards.data}
                tempItem={rewards.tempItem}
                loadingData={rewards.loading}
                identifier="identifier"
                onRefresh={fetchRewards}
                renderContent={this.renderContent}
                showReward={rewards.detail}
                renderDetail={this.renderDetail}
                title={item => (item ? item.name : '')}
                // subtitle={item =>
                //   item ? standardizeString(item.account_name) : ''
                // }
                onPressTitle={item => viewReward(item)}
                onPressContent={item => viewReward(item)}
                emptyListMessage="No rewards available"
                titleStyle="secondary"
                keyExtractor={item => item.identifier}
                textActionOne="CLAIM"
                onPressActionOne={item => claimReward(item)}
                onPressActionTwo={() => hideReward()}
                loadingDetail={rewards.loadingDetail}
              />
            </Tab>
            <Tab
              heading="Rewards"
              activeTextStyle={{ color: company_config.colors.focus }}>
              <CardList
                colors={company_config.colors}
                type="claimedRewards"
                navigation={this.props.navigation}
                data={claimedRewards.data}
                tempItem={claimedRewards.tempItem}
                loadingData={claimedRewards.loading}
                identifier="identifier"
                onRefresh={fetchClaimedRewards}
                renderContent={this.renderClaimedContent}
                showReward={claimedRewards.detail}
                renderDetail={this.renderClaimedDetail}
                title={item => (item ? item.campaign.name : '')}
                // subtitle={item =>
                //   item ? standardizeString(item.account_name) : ''
                // }
                onPressTitle={item => viewClaimedReward(item)}
                onPressContent={item => viewClaimedReward(item)}
                emptyListMessage="No claimed rewards"
                titleStyle="secondary"
                keyExtractor={item => item.identifier}
                // textActionOne="CLAIM"
                // onPressActionOne={item => claimReward(item)}
                onPressActionTwo={() => hideClaimedReward()}
                loadingDetail={claimedRewards.loadingDetail}
              />
            </Tab>
          </Tabs>
        </Container>
      </View>
    );
  }
}

const styles = {
  viewStyleContainer: {
    paddingLeft: 8,
  },
  viewStyleDetailCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    // borderRadius: 2,
    // borderColor: '#ffffff',
    // borderWidth: 1,
    shadowColor: 'rgba(0, 0, 0, 0.6)',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    shadowOffset: {
      height: 1,
      width: 2,
    },
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
};

const mapStateToProps = store => {
  const { company_config } = store.auth;
  return {
    company_config,
    rewards: getRewards(store),
    claimedRewards: getClaimedRewards(store),
  };
};

export default connect(mapStateToProps, {
  fetchRewards,
  claimReward,
  viewReward,
  hideReward,
  fetchClaimedRewards,
  viewClaimedReward,
  hideClaimedReward,
})(RewardsScreen);
