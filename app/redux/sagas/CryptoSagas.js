import { all, call, put, takeEvery } from 'redux-saga/effects';
import { FETCH_CRYPTO_ASYNC, CLAIM_REWARD_ASYNC } from '../actions';
import { Toast } from 'native-base';
// import Big from 'big.js';

import * as Rehive from '../../util/rehive';

function* fetchCrypto(action) {
  try {
    let route = '';
    const type = action.payload;
    let response;
    switch (type) {
      case 'stellar':
        response = yield call(Rehive.getStellarAssets, 'GET', route);
        break;
      // case 'bitcoin':
      //   route = bitcoin_service_url + '/company/assets/';
      //   break;
      // case 'ethereum':
      //   route = ethereum_service_url + '/company/assets/';
      //   break;
    }
    const assets = response.data
      ? response.data.map(a => a.currency_code)
      : null;
    yield put({
      type: FETCH_CRYPTO_ASYNC.success,
      payload: { assets, type },
    });
  } catch (error) {
    console.log(error);
    yield put({ type: FETCH_CRYPTO_ASYNC.error, payload: error.message });
  }
}

// function* claimReward(action) {
//   try {
//     const route =
//       rewards_service_url + 'user/rewards/request/' + action.payload.identifier;
//     yield call(Rehive.callApi, 'POST', route);

//     Toast.show({
//       text:
//         'Your reward has been requested and it will reflect in your wallet balance upon admin approval',
//       duration: 3000,
//     });

//     yield put({
//       type: CLAIM_REWARD_ASYNC.success,
//     });
//   } catch (error) {
//     console.log(error);
//     Toast.show({
//       text: 'Unable to request reward: ' + error.message,
//       duration: 3000,
//     });
//     yield put({ type: CLAIM_REWARD_ASYNC.error, payload: error.message });
//   }
// }

// function*

export const cryptoSagas = all([
  takeEvery(FETCH_CRYPTO_ASYNC.pending, fetchCrypto),
  // takeEvery(CLAIM_REWARD_ASYNC.pending, claimReward),
]);
