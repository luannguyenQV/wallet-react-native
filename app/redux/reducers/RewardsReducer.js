import { PERSIST_REHYDRATE } from 'redux-persist/es/constants';
import {
  FETCH_REWARDS_ASYNC,
  CLAIM_REWARD_ASYNC,
  VIEW_REWARD,
  HIDE_REWARD,
} from '../actions/RewardsActions';

const INITIAL_STATE = {
  user: null,
};

export default (state = INITIAL_STATE, action) => {
  // console.log(action);
  switch (action.type) {
    case PERSIST_REHYDRATE:
      return action.payload.auth || [];

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
