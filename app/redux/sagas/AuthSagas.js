import { take, all, call, put, takeEvery } from 'redux-saga/effects';

import AuthService from './../../services/authService';

function* loginUser(action) {
  try {
    let responseJson = yield call(AuthService.login, action.payload);

    if (responseJson.status === 'success') {
      yield put({
        type: 'LOGIN_USER_SUCCESS',
        payload: responseJson.data.token,
      });
    } else {
      yield put({
        type: 'LOGIN_USER_ERROR',
        payload: responseJson.error,
      });
      yield put({
        type: 'UPDATE_AUTH_FORM_STATE',
        payload: {
          inputState: 'email',
          authState: 'login',
        },
      });
    }
  } catch (error) {
    yield put({ type: 'LOGIN_USER_ERROR', error });
  }
  // let twoFactorResponse = await AuthService.twoFactorAuth();
  // if (twoFactorResponse.status === 'success') {
  //   const authInfo = twoFactorResponse.data;
  //   if (authInfo.sms === true || authInfo.token === true) {
  //     this.props.navigation.navigate('AuthVerifySms', {
  //       loginInfo: loginInfo,
  //       isTwoFactor: true,
  //     });
  //   } else {
  //     Auth.login(this.props.navigation, loginInfo);
  //   }
  // } else {
  //   Alert.alert('Error', twoFactorResponse.message, [{ text: 'OK' }]);
  // }
}

function* registerUser(action) {
  try {
    let responseJson = yield call(AuthService.signup, action.payload);

    if (responseJson.status === 'success') {
      yield put({
        type: 'REGISTER_USER_SUCCESS',
        payload: responseJson.data.token,
      });
    } else {
      yield put({
        type: 'REGISTER_USER_FAIL',
        payload: responseJson.error,
      });
      yield put({
        type: 'UPDATE_AUTH_FORM_STATE',
        payload: {
          inputState: 'email',
          authState: 'register',
        },
      });
    }
  } catch (error) {
    yield put({ type: 'REGISTER_USER_FAIL', error });
  }
}

function* appLoad() {
  try {
    yield all([
      put({ type: 'FETCH_ACCOUNTS_PENDING' }),
      put({ type: 'FETCH_DATA_PENDING', payload: 'profile' }),
      put({ type: 'FETCH_DATA_PENDING', payload: 'mobile_numbers' }),
      put({ type: 'FETCH_DATA_PENDING', payload: 'email_addresses' }),
      put({ type: 'FETCH_DATA_PENDING', payload: 'crypto_addresses' }),
      put({ type: 'FETCH_DATA_PENDING', payload: 'bank_accounts' }),
      put({ type: 'FETCH_DATA_PENDING', payload: 'addresses' }),
      put({ type: 'FETCH_DATA_PENDING', payload: 'documents' }),
    ]);
    for (let i = 0; i < 8; i++) {
      yield take(['FETCH_ACCOUNTS_SUCCESS', 'FETCH_DATA_SUCCESS']);
    }
    yield put({ type: 'APP_LOAD_FINISH' });
  } catch (error) {
    yield put({ type: 'LOGIN_USER_FAIL', error });
  }
}

export const authSagas = all([
  takeEvery('LOGIN_USER_SUCCESS', appLoad),
  takeEvery('LOGIN_USER_PENDING', loginUser),
  takeEvery('REGISTER_USER_SUCCESS', appLoad),
  takeEvery('REGISTER_USER_PENDING', registerUser),
]);
