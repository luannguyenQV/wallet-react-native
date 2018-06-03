import { all, call, put, takeEvery, take } from 'redux-saga/effects';

import {
  FETCH_DATA_ASYNC,
  REFRESH_PROFILE_ASYNC,
  UPDATE_ASYNC,
  DELETE_ASYNC,
  VERIFY_ASYNC,
  SHOW_MODAL,
} from './../types';

import UserInfoService from './../../services/userInfoService';
import SettingsService from './../../services/settingsService';

import * as rehive from './../../util/rehive';

function* fetchData(action) {
  try {
    let responseJson = null;
    switch (action.payload) {
      case 'mobile_number':
        // responseJson = yield call(rehive.getMobiles);
        responseJson = yield call(SettingsService.getAllMobiles);
        break;
      case 'email_address':
        // responseJson = yield call(rehive.getEmails);
        responseJson = yield call(SettingsService.getAllEmails);
        break;
      case 'crypto_address':
        // responseJson = yield call(rehive.getCryptoAccounts);
        responseJson = yield call(SettingsService.getAllCryptoAddresses);
        break;
      case 'bank_account':
        // responseJson = yield call(rehive.getBankAccounts);
        responseJson = yield call(SettingsService.getAllBankAccounts);
        break;
      case 'profile':
        // responseJson = yield call(rehive.getEmails);
        responseJson = yield call(UserInfoService.getUserDetails);
        break;
      case 'address':
        // responseJson = yield call(rehive.getAddress);
        responseJson = yield call(UserInfoService.getAddress);
        break;
      case 'document':
        // responseJson = yield call(rehive.getDocuments);
        responseJson = yield call(UserInfoService.getAllDocuments);
        break;
    }
    // console.log(responseJson);
    if (responseJson && responseJson.status === 'success') {
      yield put({
        type: FETCH_DATA_ASYNC.success,
        payload: { data: responseJson.data, prop: action.payload },
      });
    } else {
      // console.log(responseJson);
      yield put({
        type: FETCH_DATA_ASYNC.error,
        payload: { data: responseJson.message, prop: action.payload },
      });
    }
  } catch (error) {
    console.log(error);
    yield put({ type: FETCH_DATA_ASYNC.error, error });
  }
}

function* refreshProfile() {
  try {
    yield all([
      put({ type: FETCH_DATA_ASYNC.pending, payload: 'profile' }),
      put({ type: FETCH_DATA_ASYNC.pending, payload: 'mobile_number' }),
      put({ type: FETCH_DATA_ASYNC.pending, payload: 'email_address' }),
      put({ type: FETCH_DATA_ASYNC.pending, payload: 'address' }),
      put({ type: FETCH_DATA_ASYNC.pending, payload: 'document' }),
    ]);
    for (let i = 0; i < 5; i++) {
      yield take(FETCH_DATA_ASYNC.success);
    }
    yield put({ type: REFRESH_PROFILE_ASYNC.success });
  } catch (error) {
    console.log(error);
    yield put({ type: REFRESH_PROFILE_ASYNC.error, error });
  }
}

function* updateItem(action) {
  try {
    const { data, type } = action.payload;
    console.log(data);
    let responseJson = null;
    switch (type) {
      case 'mobile_numbers':
        if (data.id) {
          responseJson = yield call(
            SettingsService.makeMobilePrimary,
            data.id,
            data,
          );
        } else {
          responseJson = yield call(SettingsService.addMobile, data);
        }
        break;
      case 'email_address':
        if (data.id) {
          responseJson = yield call(
            SettingsService.makeEmailPrimary,
            data.id,
            data,
          );
        } else {
          responseJson = yield call(SettingsService.addEmail, data);
        }
        break;
      case 'crypto_address':
        if (data.id) {
          responseJson = yield call(
            SettingsService.editCryptoAddresses,
            data.id,
            data,
          );
        } else {
          responseJson = yield call(SettingsService.addCryptoAddresses, data);
        }
        break;
      case 'bank_account':
        if (data.id) {
          responseJson = yield call(
            SettingsService.editBankAccount,
            data.id,
            data,
          );
        } else {
          responseJson = yield call(SettingsService.addBankAccount, data);
        }
        break;
      case 'profile':
        console.log('data', data);
        responseJson = yield call(UserInfoService.updateUserDetails, data);
        break;
      case 'address':
        console.log('data', data);
        responseJson = yield call(UserInfoService.updateAddress, data);
        break;
      // case 'documents':
      //   responseJson = yield call(UserInfoService.getAllDocuments, data);
      //   break;
    }
    console.log('responseJson', responseJson);
    if (responseJson && responseJson.status === 'success') {
      yield all([
        put({ type: UPDATE_ASYNC.success }),
        put({ type: FETCH_DATA_ASYNC.pending, payload: type }),
      ]);
    } else {
      console.log(responseJson.message);
      yield put({
        type: UPDATE_ASYNC.error,
        payload: responseJson.message,
      });
    }
  } catch (error) {
    console.log(error);
    yield put({ type: UPDATE_ASYNC.error, error });
  }
}

function* deleteItem(action) {
  try {
    const { data, type } = action.payload;
    let responseJson = null;
    switch (type) {
      case 'mobile_number':
        responseJson = yield call(SettingsService.deleteMobile, data.id);
        break;
      case 'email_address':
        responseJson = yield call(SettingsService.deleteEmail, data.id);
        break;
      case 'crypto_address':
        responseJson = yield call(SettingsService.deleteCryptoAddress, data.id);
        break;
      case 'bank_account':
        responseJson = yield call(SettingsService.deleteBankAccount, data.id);
        break;
    }
    console.log(responseJson);
    if (responseJson && responseJson.status === 'success') {
      yield all([
        put({ type: DELETE_ASYNC.success }),
        put({ type: FETCH_DATA_ASYNC.pending, payload: type }),
      ]);
    } else {
      yield put({
        type: DELETE_ASYNC.error,
        payload: responseJson.error,
      });
    }
  } catch (error) {
    console.log(error);
    yield put({ type: DELETE_ASYNC.error, error });
  }
}

function* verifyItem(action) {
  try {
    const { type, value, company } = action.payload;
    let responseJson = null;
    let message = '';
    let data;
    console.log(action);
    switch (type) {
      case 'mobile_number':
        data = {
          mobile: value,
          company,
        };
        responseJson = yield call(
          SettingsService.resendMobileVerification,
          data,
        );
        // message =
        break;
      case 'email_address':
        data = {
          email: value,
          company,
        };
        console.log(data);
        responseJson = yield call(
          SettingsService.resendEmailVerification,
          data,
        );
        break;
    }
    console.log(responseJson);
    if (responseJson && responseJson.status === 'success') {
      yield all([
        put({ type: VERIFY_ASYNC.success }),
        // put({ type: FETCH_DATA_ASYNC.pending, payload: type }),
      ]);
    } else {
      yield put({
        type: VERIFY_ASYNC.error,
        payload: responseJson.error,
      });
    }
  } catch (error) {
    console.log(error);
    yield put({ type: VERIFY_ASYNC.error, error });
  }
}

export const userSagas = all([
  takeEvery(FETCH_DATA_ASYNC.pending, fetchData),
  takeEvery(REFRESH_PROFILE_ASYNC.pending, refreshProfile),
  takeEvery(UPDATE_ASYNC.pending, updateItem),
  takeEvery(DELETE_ASYNC.pending, deleteItem),
  takeEvery(VERIFY_ASYNC.pending, verifyItem),
]);

// function* apiSaga(fn, args, successAction, errorAction) {
//   try {
//     const { response } = yield call(fn, ...args)
//     yield put(successAction(response)
//   } catch({ error }) {
//     yield put(errorAction(error)
//   }
// }

// // this one is used on many places
// function* fetchUser(userId) {
//   yield* apiSaga(api.fetchUser, [userId], actions.userFetchSuccess, actions.userFetchError)
// }
