import { all, call, put, takeEvery } from 'redux-saga/effects';
import { FETCH_CRYPTO_ASYNC } from '../actions';

import * as Rehive from '../../util/rehive';
import { getAuth } from './selectors';

function* fetchCrypto(action) {
  try {
    const type = action.payload;
    let response;
    let address = '';
    let memo = '';
    let assets = [];
    switch (type) {
      case 'stellar':
        response = yield call(Rehive.getCryptoUser, 'XLM');
        const data = response.data;
        if (data && data.crypto) {
          memo = data.crypto.memo;
          address = data.crypto.public_address;
        }
        if (data && !data.username) {
          const { user } = yield select(getAuth);
          yield call(Rehive.setStellarUsername, {
            username: user.username,
          });
        }
        response = yield call(Rehive.getStellarAssets);
        if (response.status === 'success') {
          assets = ['XLM'].concat(
            response.data ? response.data.map(a => a.currency_code) : [],
          );
        }
        break;
      case 'bitcoin':
        response = yield call(Rehive.getCryptoUser, 'TXBT');
        address = response.account_id;
        assets = ['XBT', 'TXBT'];
        break;
      case 'ethereum':
        response = yield call(Rehive.getCryptoUser, 'ETH');
        if (response.data && response.data.crypto) {
          address = response.data.crypto.address;
        }
        if (response.status === 'success') {
          assets = ['ETH'];
          address = response.data.crypto.address;
        }
        break;
    }
    console.log(response);

    yield put({
      type: FETCH_CRYPTO_ASYNC.success,
      payload: { address, memo, assets, type },
    });
  } catch (error) {
    console.log(error);
    yield put({ type: FETCH_CRYPTO_ASYNC.error, payload: error.message });
  }
}

export const cryptoSagas = all([
  takeEvery(FETCH_CRYPTO_ASYNC.pending, fetchCrypto),
]);
