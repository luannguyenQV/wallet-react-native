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
import { userSelector, rewardsSelector } from './../sagas/selectors';
import { createSelector } from '../../../node_modules/reselect';

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
        claimRewardLoading: false,
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

export const userRewardsSelector = createSelector(
  [rewardsSelector, userSelector],
  (rewardsState, userState) => {
    const { rewards, rewardsLoading, rewardsError } = rewardsState;
    const { rewardIndex, showDetail, type } = userState;
    return {
      data:
        showDetail && type === 'reward'
          ? [rewards[rewardIndex]]
          : rewards ? rewards : [],
      index: rewardIndex ? rewardIndex : 0,
      loading: rewardsLoading ? rewardsLoading : false,
      indexLoading: false,
      error: rewardsError ? rewardsError : '',
    };
  },
);

export const userCampaignsSelector = createSelector(
  [rewardsSelector, userSelector],
  (rewardsState, userState) => {
    const {
      campaigns,
      campaignsLoading,
      campaignsError,
      claimRewardLoading,
    } = rewardsState;
    const { campaignIndex, showDetail, type } = userState;
    console.log(campaignsLoading);
    return {
      data:
        showDetail && type === 'campaign'
          ? [campaigns[campaignIndex]]
          : campaigns ? campaigns : [],
      index: campaignIndex ? campaignIndex : 0,
      loading: campaignsLoading ? campaignsLoading : false,
      indexLoading: claimRewardLoading ? claimRewardLoading : false,
      error: campaignsError ? campaignsError : '',
    };
  },
);
