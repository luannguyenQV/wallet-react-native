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
import {
  userCampaignsSelector,
  userRewardsSelector,
} from './../../redux/reducers/RewardsReducer';
import { companyConfigSelector } from './../../redux/sagas/selectors';

import Header from './../../components/header';
import { Tabs } from '../../components/common';
import CardListUserSettings from '../../components/cards/CardListUserSettings';

class RewardsScreen extends Component {
  static navigationOptions = {
    title: 'Rewards',
  };

  render() {
    const { rewards, campaigns, company_config } = this.props;
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          drawer
          noShadow
          title="Rewards"
        />
        <Tabs>
          <CardListUserSettings
            tabLabel="Available"
            type="campaign"
            data={campaigns}
          />
          <CardListUserSettings
            tabLabel="Claimed"
            type="reward"
            data={rewards}
          />
        </Tabs>
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
    campaigns: userCampaignsSelector(store),
    rewards: userRewardsSelector(store),
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
