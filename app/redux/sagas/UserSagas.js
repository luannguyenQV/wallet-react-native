import {
  all,
  call,
  put,
  takeEvery,
  take,
  takeLatest,
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
} from '../actions/UserActions';

import NavigationService from '../../util/navigation';

import * as Rehive from '../../util/rehive';
import { validateMobile } from '../../util/validation';

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
        response = yield call(Rehive.getProfile);
        break;
      case 'address':
        response = yield call(Rehive.getAddresses);
        break;
      case 'document':
        response = yield call(Rehive.getDocuments);
        break;
      case 'company':
        response = yield call(Rehive.getCompany);
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
    if (data && data.length > 0 && action.payload === ('email' || 'mobile')) {
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
    yield put({ type: FETCH_DATA_ASYNC.error, payload: error.message });
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
    const { data, type } = action.payload;
    // console.log(data);
    let response = null;
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
          response = yield call(Rehive.updateAddress, data.id, data);
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
        response = yield call(Rehive.updateProfile, data);
        break;
      case 'address':
        response = yield call(Rehive.updateAddress, data);
        break;
      // case 'documents':
      //   response = yield call(Rehive.getAllDocuments, data);
      //   break;
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
    const { data, type } = action.payload;
    let response = null;
    switch (type) {
      case 'mobile':
        response = yield call(Rehive.deleteMobile, data.id);
        break;
      case 'address':
        response = yield call(Rehive.deleteAddress, data.id);
        break;
      case 'email':
        response = yield call(Rehive.deleteEmail, data.id);
        break;
      case 'crypto_account':
        response = yield call(Rehive.deleteCryptoAccount, data.id);
        break;
      case 'bank_account':
        response = yield call(Rehive.deleteBankAccount, data.id);
        break;
    }
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
    const { type, data, company } = action.payload;
    switch (type) {
      case 'mobile':
        yield call(Rehive.resendMobileVerification, data, company);
        break;
      case 'email':
        yield call(Rehive.resendEmailVerification, data, company);
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
    let response = null;
    // console.log()
    switch (type) {
      case 'mobile':
        response = yield call(Rehive.submitOTP, otp);
        break;
    }
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
    yield call(Rehive.updateProfileImage, action.payload);
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
    NavigationService.navigate('GetVerified');
  } catch (error) {
    console.log(error);
    yield put({ type: UPLOAD_DOCUMENT_ASYNC.error, payload: error.message });
  }
}

export const userSagas = all([
  takeEvery(FETCH_DATA_ASYNC.pending, fetchData),
  takeEvery(REFRESH_PROFILE_ASYNC.pending, refreshProfile),
  takeEvery(UPDATE_ASYNC.pending, updateItem),
  takeEvery(CONFIRM_DELETE_ASYNC.pending, deleteItem),
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
