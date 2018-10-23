import {
  all,
  call,
  put,
  takeEvery,
  take,
  takeLatest,
  select,
} from 'redux-saga/effects';

import { LOGOUT_USER_ASYNC } from '../actions/AuthActions';

import {
  FETCH_DATA_ASYNC,
  REFRESH_PROFILE_ASYNC,
  UPDATE_ASYNC,
  RESEND_VERIFICATION_ASYNC,
  VERIFY_ASYNC,
  CONFIRM_DELETE_ASYNC,
  UPLOAD_PROFILE_PHOTO_ASYNC,
  UPLOAD_DOCUMENT_ASYNC,
  CACHE_COMPANY,
  CONFIRM_PRIMARY_ASYNC,
} from '../actions';

import NavigationService from '../../util/navigation';

import * as Rehive from '../../util/rehive';
import { validateMobile } from '../../util/validation';
import { userSelector } from './selectors';
import { Toast } from 'native-base';
import { standardizeString } from '../../util/general';

function* fetchData(action) {
  try {
    let response = null;
    switch (action.payload) {
      case 'mobile':
        response = yield call(Rehive.getMobiles);
        break;
      case 'email':
        response = yield call(Rehive.getEmails);
        break;
      // case 'crypto_account':
      //   response = yield call(Rehive.getCryptoAccounts);
      //   break;
      case 'bank_account':
        response = yield call(Rehive.getBankAccounts);
        break;
      case 'profile':
        response = [yield call(Rehive.getProfile)];
        break;
      case 'address':
        response = yield call(Rehive.getAddresses);
        break;
      case 'document':
        response = yield call(Rehive.getDocuments);
        break;
      case 'company':
        response = yield call(Rehive.getCompany);
        yield put({
          type: CACHE_COMPANY,
          payload: response,
        });
        break;
      case 'public_companies':
        response = yield call(Rehive.getPublicCompanies);
        break;
      case 'company_bank_account':
        response = yield call(Rehive.getCompanyBankAccounts);
        break;
      case 'company_currency':
        response = yield call(Rehive.getCompanyCurrencies);
        break;
      case 'company_config':
        response = yield call(Rehive.getCompanyConfig);
        break;
      case 'wallet':
        return;
      default:
        console.log('Unhandled fetchData type: ', action.payload);
        return;
    }
    // console.log(action.payload);
    let data = response;
    if (action.payload === ('email' || 'mobile') && data && data.length > 0) {
      const primaryIndex = data.findIndex(item => item.primary === true);
      const primaryItem = data[primaryIndex];
      data[primaryIndex] = data[0];
      data[0] = primaryItem;
    }
    if (data.results) {
      data = data.results;
    }
    yield put({
      type: FETCH_DATA_ASYNC.success,
      payload: { data, prop: action.payload },
    });
  } catch (error) {
    console.log(error);
    if (error && error.status && error.status === 403) {
      yield put({
        type: LOGOUT_USER_ASYNC.success,
      });
    }
    yield put({
      type: FETCH_DATA_ASYNC.error,
      payload: { prop: action.payload, message: error.message },
    });
  }
}

// function* fetchCompanyConfig() {
//   try {
//     yield all([
//       put({ type: FETCH_DATA_ASYNC.pending, payload: 'company_config' }),
//     ]);
//   } catch (error) {
//     console.log(error);
//     yield put({ type: LOGIN_USER_ASYNC.error, error });
//   }
// }

function* refreshProfile() {
  try {
    yield all([
      put({ type: FETCH_DATA_ASYNC.pending, payload: 'profile' }),
      put({ type: FETCH_DATA_ASYNC.pending, payload: 'mobile' }),
      put({ type: FETCH_DATA_ASYNC.pending, payload: 'email' }),
      put({ type: FETCH_DATA_ASYNC.pending, payload: 'address' }),
      put({ type: FETCH_DATA_ASYNC.pending, payload: 'document' }),
    ]);
    for (let i = 0; i < 5; i++) {
      yield take(FETCH_DATA_ASYNC.success);
    }
    yield put({ type: REFRESH_PROFILE_ASYNC.success });
  } catch (error) {
    console.log(error);
    yield put({ type: REFRESH_PROFILE_ASYNC.error, payload: error.message });
  }
}

function* updateItem(action) {
  try {
    const type = action.payload;
    const userState = yield select(userSelector);
    let data = {};
    if (action.type === CONFIRM_PRIMARY_ASYNC.pending) {
      data = {
        id: userState[type][userState[type + 'Index']].id,
        primary: true,
      };
    } else {
      data = userState.tempItem;
    }
    switch (type) {
      case 'mobile':
        if (data.id) {
          response = yield call(Rehive.updateMobile, data.id, data);
        } else {
          response = yield call(Rehive.createMobile, data);
        }
        break;
      case 'address':
        if (data.id) {
          response = yield call(Rehive.updateAddress, data);
        } else {
          response = yield call(Rehive.createAddress, data);
        }
        break;
      case 'email':
        if (data.id) {
          response = yield call(Rehive.updateEmail, data.id, data);
        } else {
          response = yield call(Rehive.createEmail, data);
        }
        break;
      case 'crypto_account':
        if (data.id) {
          response = yield call(Rehive.updateCryptoAccount, data.id, data);
        } else {
          response = yield call(Rehive.createCryptoAccount, data);
        }
        break;
      case 'bank_account':
        if (data.id) {
          response = yield call(Rehive.updateBankAccount, data.id, data);
        } else {
          response = yield call(Rehive.createBankAccount, data);
        }
        break;
      case 'profile':
        response = yield call(Rehive.updateProfile, {
          first_name: data.first_name,
          last_name: data.last_name,
          id_number: data.id_number,
        });
        break;
      case 'address':
        response = yield call(Rehive.updateAddress, data);
        break;
      // case 'documents':
      //   response = yield call(Rehive.getAllDocuments, data);
      //   break;
    }

    if (data.id) {
      Toast.show({ text: standardizeString(type) + ' updated' });
    } else {
      Toast.show({ text: standardizeString(type) + ' added' });
    }
    yield put({ type: UPDATE_ASYNC.success });
    if (type === 'mobile') {
      yield put({
        type: RESEND_VERIFICATION_ASYNC.success,
        payload: data.number,
      });
    } else {
      yield put({ type: FETCH_DATA_ASYNC.pending, payload: type });
    }
  } catch (error) {
    console.log(error);
    yield put({ type: UPDATE_ASYNC.error, payload: error.message });
  }
}

function* deleteItem(action) {
  try {
    const type = action.payload;
    const userState = yield select(userSelector);
    const id = userState[type][userState[type + 'Index']].id;

    let response = null;
    switch (type) {
      case 'mobile':
        response = yield call(Rehive.deleteMobile, id);
        break;
      case 'address':
        response = yield call(Rehive.deleteAddress, id);
        break;
      case 'email':
        response = yield call(Rehive.deleteEmail, id);
        break;
      case 'crypto_account':
        response = yield call(Rehive.deleteCryptoAccount, id);
        break;
      case 'bank_account':
        response = yield call(Rehive.deleteBankAccount, id);
        break;
    }
    Toast.show({ text: standardizeString(type) + ' deleted' });
    yield all([
      put({ type: CONFIRM_DELETE_ASYNC.success }),
      put({ type: FETCH_DATA_ASYNC.pending, payload: type }),
    ]);
  } catch (error) {
    console.log(error);
    yield put({ type: CONFIRM_DELETE_ASYNC.error, payload: error.message });
  }
}

function* resendVerification(action) {
  try {
    const { type, index } = action.payload;
    const userState = yield select(userSelector);
    const data = userState[type][index];
    const company = userState.company.id;

    switch (type) {
      case 'mobile':
        yield call(Rehive.resendMobileVerification, data.number, company);
        break;
      case 'email':
        yield call(Rehive.resendEmailVerification, data.email, company);
        break;
    }
    yield all([
      put({ type: RESEND_VERIFICATION_ASYNC.success }),
      // put({ type: FETCH_DATA_ASYNC.pending, payload: type }),
    ]);
  } catch (error) {
    console.log(error);
    yield put({
      type: RESEND_VERIFICATION_ASYNC.error,
      payload: error.message,
    });
  }
}

function* verifyItem(action) {
  try {
    const { type, otp } = action.payload;
    switch (type) {
      case 'mobile':
        response = yield call(Rehive.submitOTP, otp);
        break;
    }

    Toast.show({ text: 'Mobile verified' });
    yield all([
      put({ type: VERIFY_ASYNC.success }),
      put({ type: FETCH_DATA_ASYNC.pending, payload: type }),
    ]);
  } catch (error) {
    console.log(error);
    yield put({ type: VERIFY_ASYNC.error, payload: error.message });
  }
}

function* uploadProfilePhoto(action) {
  try {
    const resp = yield call(Rehive.updateProfileImage, action.payload);
    console.log(resp);
    yield put({ type: UPLOAD_PROFILE_PHOTO_ASYNC.success });
    yield put({ type: FETCH_DATA_ASYNC.pending, payload: 'profile' });
  } catch (error) {
    console.log(error);
    yield put({
      type: UPLOAD_PROFILE_PHOTO_ASYNC.error,
      payload: error.message,
    });
  }
}

function* uploadDocument(action) {
  try {
    yield call(Rehive.createDocument, action.payload);
    yield put({ type: UPLOAD_DOCUMENT_ASYNC.success });
    yield put({ type: FETCH_DATA_ASYNC.pending, payload: 'document' });
    NavigationService.navigate('Profile');
  } catch (error) {
    console.log(error);
    const message = error
      ? error.non_field_errors && error.non_field_errors.length > 0
        ? error.non_field_errors[0]
        : ''
      : error.message ? error.message : '';
    yield put({ type: UPLOAD_DOCUMENT_ASYNC.error, payload: message });
  }
}

export const userSagas = all([
  takeEvery(FETCH_DATA_ASYNC.pending, fetchData),
  takeEvery(REFRESH_PROFILE_ASYNC.pending, refreshProfile),
  takeEvery(UPDATE_ASYNC.pending, updateItem),
  takeEvery(CONFIRM_DELETE_ASYNC.pending, deleteItem),
  takeEvery(CONFIRM_PRIMARY_ASYNC.pending, updateItem),
  takeEvery(RESEND_VERIFICATION_ASYNC.pending, resendVerification),
  takeEvery(VERIFY_ASYNC.pending, verifyItem),
  takeEvery(UPLOAD_PROFILE_PHOTO_ASYNC.pending, uploadProfilePhoto),
  takeEvery(UPLOAD_DOCUMENT_ASYNC.pending, uploadDocument),
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
