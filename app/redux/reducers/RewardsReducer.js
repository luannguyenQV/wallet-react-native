import { PERSIST_REHYDRATE } from 'redux-persist/es/constants';
import {
  FETCH_REWARDS_ASYNC,
  CLAIM_REWARD_ASYNC,
  VIEW_REWARD,
  HIDE_REWARD,
  FETCH_CLAIMED_REWARDS_ASYNC,
  VIEW_CLAIMED_REWARD,
  HIDE_CLAIMED_REWARD,
} from '../actions/RewardsActions';

const INITIAL_STATE = {
  user: null,
};

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
        showDetail: false,
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
        showDetail: true,
      };
    case HIDE_REWARD:
      return {
        ...state,
        tempReward: null,
        showDetail: false,
      };

    case CLAIM_REWARD_ASYNC.pending:
      return {
        ...state,
        claimError: '',
        claimLoading: true,
      };
    case CLAIM_REWARD_ASYNC.success:
      return {
        ...state,
        claimError: '',
        claimLoading: false,
      };
    case CLAIM_REWARD_ASYNC.error:
      return {
        ...state,
        claimError: action.payload,
        claimLoading: false,
      };

    case FETCH_CLAIMED_REWARDS_ASYNC.pending:
      return {
        ...state,
        claimedRewardsLoading: true,
        claimedRewardsError: '',
        showClaimedDetail: false,
        tempClaimedReward: null,
      };
    case FETCH_CLAIMED_REWARDS_ASYNC.success:
      return {
        ...state,
        claimedRewards: action.payload,
        claimedRewardsLoading: false,
        claimedRewardsError: '',
      };
    case FETCH_CLAIMED_REWARDS_ASYNC.error:
      return {
        ...state,
        claimedRewardsLoading: false,
        claimedRewardsError: action.payload,
      };

    case VIEW_CLAIMED_REWARD:
      return {
        ...state,
        tempClaimedReward: action.payload,
        showClaimedDetail: true,
      };
    case HIDE_CLAIMED_REWARD:
      return {
        ...state,
        tempClaimedReward: null,
        showClaimedDetail: false,
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
    detail: store.rewards.showDetail,
    loadingDetail: store.rewards.claimLoading,
  };
  return rewards;
}

export function getClaimedRewards(store) {
  const claimedRewards = {
    data: store.rewards.claimedRewards,
    loading: store.rewards.claimedRewardsLoading,
    error: store.rewards.claimedRewardsError,
    tempItem: store.rewards.tempClaimedReward,
    detail: store.rewards.showClaimedDetail,
  };
  return claimedRewards;
}
