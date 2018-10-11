import { all, call, put, takeEvery } from 'redux-saga/effects';
import { FETCH_CRYPTO_ASYNC } from '../actions';

import * as Rehive from '../../util/rehive';

function* fetchCrypto(action) {
  try {
    const type = action.payload;
    let response;
    let assets = [];
    switch (type) {
      case 'stellar':
        response = yield call(Rehive.getStellarAssets);
        if (response.status === 'success') {
          assets = ['XLM'].concat(
            response.data ? response.data.map(a => a.currency_code) : [],
          );
        }
        break;
      case 'bitcoin':
        response = yield call(Rehive.getBitcoinUser);
        if (response.status === 'success') {
          assets = ['XBT', 'TXBT'];
        }
        break;
      case 'ethereum':
        response = yield call(Rehive.getEthereumUser);
        if (response.status === 'success') {
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

export const cryptoSagas = all([
  takeEvery(FETCH_CRYPTO_ASYNC.pending, fetchCrypto),
]);
