import { take, call, put, takeEvery } from 'redux-saga/effects';

import UserInfoService from './../../services/userInfoService';
import SettingsService from './../../services/settingsService';

function* fetchData(action) {
  try {
    let responseJson = null;
    switch (action.payload) {
      case 'mobile_numbers':
        responseJson = yield call(SettingsService.getAllMobiles);
        break;
      case 'email_addresses':
        responseJson = yield call(SettingsService.getAllEmails);
        break;
      case 'crypto_addresses':
        responseJson = yield call(SettingsService.getAllCryptoAddresses);
        break;
      case 'bank_accounts':
        responseJson = yield call(SettingsService.getAllBankAccounts);
        break;
      case 'profile':
        responseJson = yield call(UserInfoService.getUserDetails);
        break;
      case 'addresses':
        responseJson = yield call(UserInfoService.getAddress);
        break;
      case 'documents':
        responseJson = yield call(UserInfoService.getAllDocuments);
        break;
    }

    if (responseJson && responseJson.status === 'success') {
      yield put({
        type: 'FETCH_DATA_SUCCESS',
        payload: { data: responseJson.data, prop: action.payload },
      });
    } else {
      yield put({
        type: 'FETCH_DATA_ERROR',
        payload: { data: responseJson.error, prop: action.payload },
      });
    }
    console.log(responseJson);
  } catch (error) {
    yield put({ type: 'FETCH_DATA_ERROR', error });
  }
}

export const userSagas = [takeEvery('FETCH_DATA_PENDING', fetchData)];

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
