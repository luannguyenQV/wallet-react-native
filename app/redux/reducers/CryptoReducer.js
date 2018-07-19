import { PERSIST_REHYDRATE } from 'redux-persist/es/constants';
import {
  FETCH_CRYPTO_ASYNC,
  CLAIM_REWARD_ASYNC,
  VIEW_REWARD,
  HIDE_REWARD,
} from '../actions/';

const INITIAL_STATE = {
  stellar: [],
  ethereum: [],
  bitcoin: [],
};

export default (state = INITIAL_STATE, action) => {
  // console.log(action);
  switch (action.type) {
    case PERSIST_REHYDRATE:
      return action.payload.auth || INITIAL_STATE;

    case FETCH_CRYPTO_ASYNC.pending:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CRYPTO_ASYNC.success:
      const { type, assets } = action.payload;
      return {
        ...state,
        [type]: ['XLM'].concat(assets),
        loading: false,
        error: '',
      };
    case FETCH_CRYPTO_ASYNC.error:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // case VIEW_REWARD:
    //   return {
    //     ...state,
    //     tempReward: action.payload,
    //     showDetail: true,
    //   };
    // case HIDE_REWARD:
    //   return {
    //     ...state,
    //     tempReward: null,
    //     showDetail: false,
    //   };

    // case CLAIM_REWARD_ASYNC.pending:
    //   return {
    //     ...state,
    //     claimError: '',
    //     claimLoading: true,
    //   };
    // case CLAIM_REWARD_ASYNC.success:
    //   return {
    //     ...state,
    //     claimError: '',
    //     claimLoading: false,
    //   };
    // case CLAIM_REWARD_ASYNC.error:
    //   return {
    //     ...state,
    //     claimError: action.payload,
    //     claimLoading: false,
    //   };

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
