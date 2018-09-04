import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  fetchRewards,
  claimReward,
  viewReward,
  hideReward,
  fetchCampaigns,
  viewCampaign,
  hideCampaign,
} from './../../redux/actions';
import { Container, Content, Tab, Tabs } from 'native-base';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {
  getRewards,
  getCampaigns,
} from './../../redux/reducers/RewardsReducer';
import { companyConfigSelector } from './../../redux/sagas/selectors';

import Header from './../../components/header';
import { Output } from '../../components/common';
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

  renderCampaignContent(item) {
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

  renderCampaignDetail(item) {
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

  renderRewardContent(item) {
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
        <View style={styles.viewStyleFooter}>
          <View>
            <Text>{moment(item.created).format('lll')}</Text>
          </View>
          <View>
            <Text>{item.status}</Text>
          </View>
        </View>
      </View>
    );
  }

  renderRewardDetail(item) {
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
        <View style={styles.viewStyleFooter}>
          <View>
            <Text>{moment(item.created).format('lll')}</Text>
          </View>
          <View>
            <Text>{item.status}</Text>
          </View>
        </View>
      </View>
    );
  }

  render() {
    const {
      rewards,
      fetchRewards,
      campaigns,
      fetchCampaigns,
      viewCampaign,
      hideCampaign,
      claimReward,
      company_config,
    } = this.props;
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation} drawer title="Rewards" />
        {/* <ScrollableTabView>
          <View tabLabel="Available">
            <CardList
              type="campaigns"
              navigation={this.props.navigation}
              data={campaigns.data}
              tempItem={campaigns.tempItem}
              loadingData={campaigns.loading}
              identifier="name"
              onRefresh={fetchCampaigns}
              renderContent={this.renderCampaignContent}
              showReward={campaigns.detail}
              renderDetail={this.renderCampaignDetail}
              title={item => (item ? item.name : '')}
              // subtitle={item =>
              //   item ? standardizeString(item.account_name) : ''
              // }
              onPressTitle={item => viewCampaign(item)}
              onPressContent={item => viewCampaign(item)}
              emptyListMessage="No rewards available"
              titleStyle="secondary"
              keyExtractor={item => item.identifier}
              textActionOne="CLAIM"
              onPressActionOne={item => claimReward(item)}
              onPressActionTwo={() => hideCampaign()}
              loadingDetail={campaigns.loadingDetail}
            />
          </View>
          <View tabLabel="Claimed">
            <CardList
              type="rewards"
              navigation={this.props.navigation}
              data={rewards.data}
              tempItem={rewards.tempItem}
              loadingData={rewards.loading}
              identifier="identifier"
              onRefresh={fetchRewards}
              renderContent={this.renderRewardContent}
              showReward={rewards.detail}
              renderDetail={this.renderRewardDetail}
              title={item => (item ? item.campaign.name : '')}
              // subtitle={item =>
              //   item ? standardizeString(item.account_name) : ''
              // }
              onPressTitle={item => viewReward(item)}
              onPressContent={item => viewReward(item)}
              emptyListMessage="No rewards claimed"
              titleStyle="secondary"
              keyExtractor={item => item.identifier}
              // textActionOne="CLAIM"
              // onPressActionOne={item => claimReward(item)}
              onPressActionTwo={() => hideReward()}
              loadingDetail={rewards.loadingDetail}
            />
          </View>
        </ScrollableTabView> */}
        <Container>
          <Tabs
            tabStyle={{ backgroundColor: 'white' }}
            tabBarUnderlineStyle={{
              backgroundColor: company_config.colors.focus,
            }}>
            <Tab
              heading="Available"
              activeTextStyle={{ color: company_config.colors.focus }}>
              <CardList
                type="campaigns"
                navigation={this.props.navigation}
                data={campaigns.data}
                tempItem={campaigns.tempItem}
                loadingData={campaigns.loading}
                identifier="name"
                onRefresh={fetchCampaigns}
                renderContent={this.renderCampaignContent}
                showReward={campaigns.detail}
                renderDetail={this.renderCampaignDetail}
                title={item => (item ? item.name : '')}
                // subtitle={item =>
                //   item ? standardizeString(item.account_name) : ''
                // }
                onPressTitle={item => viewCampaign(item)}
                onPressContent={item => viewCampaign(item)}
                emptyListMessage="No rewards available"
                titleStyle="secondary"
                keyExtractor={item => item.identifier}
                textActionOne="CLAIM"
                onPressActionOne={item => claimReward(item)}
                onPressActionTwo={() => hideCampaign()}
                loadingDetail={campaigns.loadingDetail}
              />
            </Tab>
            <Tab
              heading="Claimed"
              activeTextStyle={{ color: company_config.colors.focus }}>
              <CardList
                type="rewards"
                navigation={this.props.navigation}
                data={rewards.data}
                tempItem={rewards.tempItem}
                loadingData={rewards.loading}
                identifier="identifier"
                onRefresh={fetchRewards}
                renderContent={this.renderRewardContent}
                showReward={rewards.detail}
                renderDetail={this.renderRewardDetail}
                title={item => (item ? item.campaign.name : '')}
                // subtitle={item =>
                //   item ? standardizeString(item.account_name) : ''
                // }
                onPressTitle={item => viewReward(item)}
                onPressContent={item => viewReward(item)}
                emptyListMessage="No rewards claimed"
                titleStyle="secondary"
                keyExtractor={item => item.identifier}
                // textActionOne="CLAIM"
                // onPressActionOne={item => claimReward(item)}
                onPressActionTwo={() => hideReward()}
                loadingDetail={rewards.loadingDetail}
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
    padding: 8,
    paddingTop: 0,
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
  viewStyleFooter: {
    // flex: 2,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
};

const mapStateToProps = store => {
  return {
    company_config: companyConfigSelector(store),
    campaigns: getCampaigns(store),
    rewards: getRewards(store),
  };
};

export default connect(mapStateToProps, {
  fetchRewards,
  claimReward,
  viewReward,
  hideReward,
  fetchCampaigns,
  viewCampaign,
  hideCampaign,
})(RewardsScreen);
