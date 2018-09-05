import {
  all,
  call,
  put,
  takeEvery,
  takeLatest,
  select,
} from 'redux-saga/effects';
import {
  FETCH_ACCOUNTS_ASYNC,
  SET_ACTIVE_CURRENCY_ASYNC,
  SEND_ASYNC,
  HIDE_MODAL,
  LOGOUT_USER_ASYNC,
  SET_SEND_WALLET,
  SET_SEND_TYPE,
  FETCH_TRANSACTIONS_ASYNC,
  SET_TRANSACTION_CURRENCY,
  VALIDATE_TRANSACTION,
} from '../actions';
import { Toast } from 'native-base';
// import Big from 'big.js';
import * as Rehive from '../../util/rehive';
import { cryptoSelector } from './selectors';
import { transactionSelector } from '../reducers/AccountsReducer';
import { contactsSelector } from '../reducers/ContactsReducer';

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
    const services = yield select(cryptoSelector);
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

function* validateTransaction(action) {
  try {
    console.log('validateTransaction');
    const type = action.payload;
    const transaction = yield select(transactionSelector);
    const contacts = yield select(contactsSelector);
    console.log('contacts', contacts);
    console.log('currency', currency);
    // switch(type) {
    //   case 'send':

    // }
    // Amount validation
    const currency = transaction.currency;
    let transactionAmountError = '';
    let amount = parseInt(transaction.amount, 10);
    for (let i = 0; i < currency.currency.divisibility; i++) {
      amount = amount * 10;
    }
    if (amount) {
      if (amount > currency.available_balance) {
        transactionAmountError = 'Amount must be less than available balance';
      }
    }

    // Recipient validation
    const recipient = transaction.recipient;
    let transactionRecipientError = '';
    if (recipient) {
      if (contacts.type == 'email') {
        transactionRecipientError = validateEmail(recipient);
      } else if (contacts.type == 'mobile') {
        transactionRecipientError = validateMobile(recipient);
      } else if (contacts.type == 'crypto') {
        transactionRecipientError = validateCrypto(recipient, sendType);
      }
    }

    yield put({
      type: VALIDATE_TRANSACTION.success,
      payload: { transactionAmountError, transactionRecipientError },
    });
  } catch (error) {
    console.log('validateTransaction', error);
    yield put({ type: VALIDATE_TRANSACTION.error, payload: error.message });
  }
}

export const accountsSagas = all([
  takeEvery(FETCH_ACCOUNTS_ASYNC.pending, fetchAccounts),
  takeEvery(SEND_ASYNC.success, fetchAccounts),
  takeEvery(FETCH_TRANSACTIONS_ASYNC.pending, fetchTransactions),
  takeEvery(SET_ACTIVE_CURRENCY_ASYNC.pending, setActiveCurrency),
  takeEvery(SET_TRANSACTION_CURRENCY, checkSendServices),
  takeLatest(VALIDATE_TRANSACTION.pending, validateTransaction),
]);
