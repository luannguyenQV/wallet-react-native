import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import {
  FETCH_REWARDS_ASYNC,
  CLAIM_REWARD_ASYNC,
  FETCH_CAMPAIGNS_ASYNC,
} from '../actions';
import { Toast } from 'native-base';
// import Big from 'big.js';

import * as Rehive from '../../util/rehive';
import { userSelector, rewardSelector } from './selectors';

function* fetchRewards() {
  try {
    const response = yield call(Rehive.getRewards);
    if (response.status === 'error') {
      yield put({
        type: FETCH_REWARDS_ASYNC.success,
        payload: null,
      });
    } else {
      yield put({
        type: FETCH_REWARDS_ASYNC.success,
        payload: response.data,
      });
    }
  } catch (error) {
    console.log(error);
    yield put({ type: FETCH_REWARDS_ASYNC.error, payload: error.message });
  }
}

function* claimReward(action) {
  try {
    console.log(action);
    const rewardState = yield select(rewardSelector);
    const campaign = rewardState.campaigns[action.payload];
    console.log('campaign', campaign);
    const response = yield call(Rehive.claimReward, {
      campaign: campaign.id,
    });
    console.log(response);
    if (response.status === 'success') {
      yield put({ type: CLAIM_REWARD_ASYNC.success });
      Toast.show({
        text:
          'Your reward has been requested and it will reflect in your wallet balance upon admin approval',
        duration: 3000,
      });
    } else {
      yield put({
        type: CLAIM_REWARD_ASYNC.error,
        payload: response.message,
      });
      Toast.show({
        text: 'Error posting reward claim',
        duration: 3000,
      });
    }
  } catch (error) {
    console.log(error);
    Toast.show({
      text: 'Unable to request reward: ' + error.message,
      duration: 3000,
    });
    yield put({ type: CLAIM_REWARD_ASYNC.error, payload: error.message });
  }
}

function* fetchCampaigns() {
  try {
    const response = yield call(Rehive.getCampaigns);
    if (response.status === 'error') {
      yield put({
        type: FETCH_CAMPAIGNS_ASYNC.success,
        payload: null,
      });
    } else {
      yield put({
        type: FETCH_CAMPAIGNS_ASYNC.success,
        payload: response.data,
      });
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: FETCH_CAMPAIGNS_ASYNC.error,
      payload: error.message,
    });
  }
}

// function*

export const rewardsSagas = all([
  takeEvery(FETCH_REWARDS_ASYNC.pending, fetchRewards),
  takeEvery(CLAIM_REWARD_ASYNC.pending, claimReward),
  takeEvery(FETCH_CAMPAIGNS_ASYNC.pending, fetchCampaigns),
]);
