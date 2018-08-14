import { createAsyncTypes } from '../store/Utilities.js';

export const FETCH_REWARDS_ASYNC = createAsyncTypes('fetch_rewards');
export const fetchRewards = () => {
  return { type: FETCH_REWARDS_ASYNC.pending };
};

export const VIEW_REWARD = 'view_reward';
export const viewReward = reward => {
  return {
    type: VIEW_REWARD,
    payload: reward,
  };
};

export const HIDE_REWARD = 'hide_reward';
export const hideReward = () => {
  return {
    type: HIDE_REWARD,
  };
};

export const CLAIM_REWARD_ASYNC = createAsyncTypes('claim_reward');
export const claimReward = reward => {
  return {
    type: CLAIM_REWARD_ASYNC.pending,
    payload: reward,
  };
};

export const FETCH_CAMPAIGNS_ASYNC = createAsyncTypes('fetch_campaigns');
export const fetchCampaigns = () => {
  return { type: FETCH_CAMPAIGNS_ASYNC.pending };
};

export const VIEW_CAMPAIGN = 'view_campaign';
export const viewCampaign = reward => {
  return {
    type: VIEW_CAMPAIGN,
    payload: reward,
  };
};

export const HIDE_CAMPAIGN = 'hide_campaign';
export const hideCampaign = () => {
  return {
    type: HIDE_CAMPAIGN,
  };
};
