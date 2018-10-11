import { PERSIST_REHYDRATE } from 'redux-persist/es/constants';
import {
  FETCH_REWARDS_ASYNC,
  CLAIM_REWARD_ASYNC,
  VIEW_REWARD,
  HIDE_REWARD,
  FETCH_CAMPAIGNS_ASYNC,
  VIEW_CAMPAIGN,
  HIDE_CAMPAIGN,
} from '../actions/RewardsActions';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  // console.log(action);
  switch (action.type) {
    case PERSIST_REHYDRATE:
      return action.payload.auth || INITIAL_STATE;

    case FETCH_REWARDS_ASYNC.pending:
      return {
        ...state,
        rewardsLoading: true,
        rewardsError: '',
        showRewardDetail: false,
        tempReward: null,
      };
    case FETCH_REWARDS_ASYNC.success:
      return {
        ...state,
        rewards: action.payload,
        rewardsLoading: false,
        rewardsError: '',
      };
    case FETCH_REWARDS_ASYNC.error:
      return {
        ...state,
        rewardsLoading: false,
        rewardsError: action.payload,
      };

    case VIEW_REWARD:
      return {
        ...state,
        tempReward: action.payload,
        showRewardDetail: true,
      };
    case HIDE_REWARD:
      return {
        ...state,
        tempReward: null,
        showRewardDetail: false,
      };

    case CLAIM_REWARD_ASYNC.pending:
      return {
        ...state,
        claimRewardError: '',
        claimRewardLoading: true,
      };
    case CLAIM_REWARD_ASYNC.success:
      return {
        ...state,
        claimRewardError: '',
        claimRewardLoading: false,
      };
    case CLAIM_REWARD_ASYNC.error:
      return {
        ...state,
        claimRewardError: action.payload,
        claimRewardLoading: false,
      };

    case FETCH_CAMPAIGNS_ASYNC.pending:
      return {
        ...state,
        campaignsLoading: true,
        campaignsError: '',
        showCampaignDetail: false,
        tempCampaign: null,
      };
    case FETCH_CAMPAIGNS_ASYNC.success:
      return {
        ...state,
        campaigns: action.payload,
        campaignsLoading: false,
        campaignsError: '',
      };
    case FETCH_CAMPAIGNS_ASYNC.error:
      return {
        ...state,
        campaignsLoading: false,
        campaignsError: action.payload,
      };

    case VIEW_CAMPAIGN:
      return {
        ...state,
        tempCampaign: action.payload,
        showCampaignDetail: true,
      };
    case HIDE_CAMPAIGN:
      return {
        ...state,
        tempCampaign: null,
        showCampaignDetail: false,
      };

    default:
      return state;
  }
};

export function getRewards(store) {
  const rewards = {
    data: store.rewards.rewards,
    loading: store.rewards.rewardsLoading,
    error: store.rewards.rewardsError,
    tempItem: store.rewards.tempReward,
    detail: store.rewards.showRewardDetail,
  };
  return rewards;
}

export function getCampaigns(store) {
  const campaigns = {
    data: store.rewards.campaigns,
    loading: store.rewards.campaignsLoading,
    error: store.rewards.campaignsError,
    tempItem: store.rewards.tempCampaign,
    detail: store.rewards.showCampaignDetail,
    loadingDetail: store.rewards.claimRewardLoading,
  };
  return campaigns;
}
