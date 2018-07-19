import { createAsyncTypes } from '../store/Utilities.js';

export const FETCH_CRYPTO_ASYNC = createAsyncTypes('fetch_crypto');
export const fetchCrypto = type => {
  return { type: FETCH_CRYPTO_ASYNC.pending, payload: type };
};

// export const VIEW_REWARD = 'view_reward';
// export const viewReward = reward => {
//   console.log(reward);
//   return {
//     type: VIEW_REWARD,
//     payload: reward,
//   };
// };

// export const HIDE_REWARD = 'hide_reward';
// export const hideReward = () => {
//   return {
//     type: HIDE_REWARD,
//   };
// };

// export const CLAIM_REWARD_ASYNC = createAsyncTypes('claim_reward');
// export const claimReward = reward => {
//   return {
//     type: CLAIM_REWARD_ASYNC.pending,
//     payload: reward,
//   };
// };
