import { all, call, put, takeEvery } from 'redux-saga/effects';
import { FETCH_CRYPTO_ASYNC, CLAIM_REWARD_ASYNC } from '../actions';

import * as Rehive from '../../util/rehive';

function* fetchCrypto(action) {
  try {
    const type = action.payload;
    let response;
    let assets = [];
    switch (type) {
      case 'stellar':
        response = yield call(Rehive.getStellarAssets);
        if (response.ok) {
          assets = ['XLM'].concat(
            response.data ? response.data.map(a => a.currency_code) : [],
          );
        }
        break;
      case 'bitcoin':
        response = yield call(Rehive.getBitcoinUser);
        if (response.ok) {
          assets = ['XBT', 'TXBT'];
        }
        break;
      case 'ethereum':
        response = yield call(Rehive.getEthereumUser);
        if (response.ok) {
          assets = ['ETH'];
        }
        break;
    }

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
