import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import {
  FETCH_ACCOUNTS_ASYNC,
  SET_ACTIVE_CURRENCY_ASYNC,
  SEND_ASYNC,
  HIDE_MODAL,
  LOGOUT_USER_ASYNC,
  SET_SEND_WALLET,
  SET_SEND_TYPE,
  FETCH_TRANSACTIONS_ASYNC,
} from '../actions';
import { Toast } from 'native-base';
// import Big from 'big.js';
import * as Rehive from '../../util/rehive';
import { getCrypto } from './selectors';

function* fetchAccounts() {
  try {
    const response = yield call(Rehive.getAccounts);

    yield put({
      type: FETCH_ACCOUNTS_ASYNC.success,
      payload: response.results,
    });
  } catch (error) {
    console.log('accountsFetch', error);
    if (error.status === 401) {
      yield put({
        type: LOGOUT_USER_ASYNC.success,
      });
    }
    yield put({ type: FETCH_ACCOUNTS_ASYNC.error, payload: error.message });
  }
}

function* fetchTransactions(action) {
  try {
    const response = yield call(Rehive.getTransactions, action.payload);
    yield put({
      type: FETCH_TRANSACTIONS_ASYNC.success,
      payload: { filters: action.payload, transactions: response.results },
    });
  } catch (error) {
    console.log('fetchTransactions', error);
    if (error.status === 401) {
      yield put({
        type: LOGOUT_USER_ASYNC.success,
      });
    }
    yield put({ type: FETCH_TRANSACTIONS_ASYNC.error, payload: error.message });
  }
}

function* setActiveCurrency(action) {
  try {
    // console.log(action);
    yield call(
      Rehive.setActiveCurrency,
      action.payload.account_reference,
      action.payload.currency.currency.code,
    );
    Toast.show({
      text: action.payload.currency.currency.code + ' set as active currency',
    });
    yield all([
      put({ type: SET_ACTIVE_CURRENCY_ASYNC.success }),
      put({ type: HIDE_MODAL }),
      put({ type: FETCH_ACCOUNTS_ASYNC.pending }),
    ]);
  } catch (error) {
    console.log(error);
    yield put({
      type: SET_ACTIVE_CURRENCY_ASYNC.error,
      payload: error.message,
    });
  }
}

function* checkSendServices(action) {
  try {
    let service = 'rehive';
    const services = yield select(getCrypto);
    if (services.stellar.includes(action.payload.currency.currency.code)) {
      service = 'stellar';
    } else if (
      action.payload.currency.currency.code === 'XBT'
      // services.bitcoin.includes(action.payload.currency.currency.code)
    ) {
      service = 'bitcoin';
    } else if (
      action.payload.currency.currency.code === 'ETH'
      // services.ethereum.includes(action.payload.currency.currency.code)
    ) {
      service = 'ethereum';
    }

    yield put({
      type: SET_SEND_TYPE,
      payload: service,
    });
  } catch (error) {
    console.log('checkSendServices', error);
    // yield put({ type: FETCH_ACCOUNTS_ASYNC.error, payload: error.message });
  }
}

export const accountsSagas = all([
  takeEvery(FETCH_ACCOUNTS_ASYNC.pending, fetchAccounts),
  takeEvery(SEND_ASYNC.success, fetchAccounts),
  takeEvery(FETCH_TRANSACTIONS_ASYNC.pending, fetchTransactions),
  takeEvery(SET_ACTIVE_CURRENCY_ASYNC.pending, setActiveCurrency),
  takeEvery(SET_SEND_WALLET, checkSendServices),
]);
