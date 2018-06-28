import { take, all, call, put, takeEvery } from 'redux-saga/effects';
import {
  AUTH_FIELD_ERROR,
  LOGIN_USER_ASYNC,
  REGISTER_USER_ASYNC,
  UPDATE_AUTH_FORM_STATE,
  APP_LOAD_FINISH,
  CHANGE_PASSWORD_ASYNC,
  VALIDATE_COMPANY_ASYNC,
  RESET_PASSWORD_ASYNC,
  LOGOUT_USER_ASYNC,
  RESET_AUTH,
} from './../actions/AuthActions';

import { FETCH_DATA_ASYNC } from './../actions/UserActions';
import { FETCH_ACCOUNTS_ASYNC } from './../actions/AccountsActions';

import * as Rehive from './../../util/rehive';
import NavigationService from './../../util/navigation';

function* loginUser(action) {
  try {
    let response = yield call(Rehive.login, action.payload);
    yield put({
      type: LOGIN_USER_ASYNC.success,
      payload: response.token,
    });
  } catch (error) {
    console.log(error);
    yield put({ type: LOGIN_USER_ASYNC.error, error });
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
    let response = yield call(Rehive.register, action.payload);

    yield put({
      type: REGISTER_USER_ASYNC.success,
      payload: response.token,
    });
  } catch (error) {
    console.log(error);
    yield put({ type: REGISTER_USER_ASYNC.error, error });
    yield put({
      type: UPDATE_AUTH_FORM_STATE,
      payload: {
        inputState: 'email',
        authState: 'register',
        textFooterRight: 'Next',
      },
    });
    yield put({
      type: AUTH_FIELD_ERROR,
      payload: { prop: 'email', error: error.message },
    });
  }
}

function* logoutUser() {
  try {
    yield call(Rehive.logout);
    yield put({
      type: LOGOUT_USER_ASYNC.success,
    });
    yield put({
      type: UPDATE_AUTH_FORM_STATE,
      payload: {
        iconHeaderLeft: 'arrow-back',
        authState: 'landing',
      },
    });
  } catch (error) {
    console.log(error);
    yield put({ type: LOGOUT_USER_ASYNC.error, error });
  }
}

function* resetAuth() {
  try {
    yield put({
      type: RESET_AUTH,
    });
    NavigationService.navigate('AuthScreen');
  } catch (error) {
    console.log(error);
  }
}

function* navigateHome() {
  try {
    NavigationService.navigate('Home');
  } catch (error) {
    console.log(error);
  }
}

function* nextAuthFormState(action) {
  const {
    mainState,
    detailState,
    company,
    password,
    email,
    company_config,
  } = action.props;

  let nextMainState = mainState;
  let nextDetailState = '';
  let data = {};

  switch (nextFormState) {
    case 'login':
    case 'register':
      nextMainState = nextFormState;
      nextDetailState = 'email';
      break;
    default:
      let error = authValidation(props);
      if (error) {
        return {
          type: AUTH_FIELD_ERROR,
          payload: { prop: detailState, error },
        };
      } else {
        switch (mainState) {
          case 'company':
            return {
              type: VALIDATE_COMPANY_ASYNC.pending,
              payload: company,
            };
          case 'login':
            switch (detailState) {
              case 'email':
                nextDetailState = 'password';
                break;
              case 'password':
                data = { company, user: email, password };
                return {
                  type: LOGIN_USER_ASYNC.pending,
                  payload: data,
                };
            }
            break;
          case 'register':
            switch (detailState) {
              case 'email':
                nextDetailState = 'password';
                break;
              case 'password':
                data = {
                  company,
                  email,
                  password1: password,
                  password2: password,
                };
                return {
                  type: REGISTER_USER_ASYNC.pending,
                  payload: data,
                };
            }
            break;
          // case '2FA':
          //   switch (detailState) {
          //     case 'email':
          //       nextDetailState = 'password';
          //       break;
          //     case 'password':
          //       data = {
          //         company,
          //         email,
          //         password1: password,
          //         password2: password,
          //       };
          //       return {
          //         // type: REGISTER_USER_ASYNC.pending,
          //         payload: data,
          //       };
          //   }
          //   break;
          // case 'user':
          //   switch (detailState) {
          //     case 'email':
          //       nextDetailState = 'password';
          //       break;
          //     case 'password':
          //       data = {
          //         company,
          //         email,
          //         password1: password,
          //         password2: password,
          //       };
          //       return {
          //         // type: REGISTER_USER_ASYNC.pending,
          //         payload: data,
          //       };
          //   }
          //   break;
          // case 'onboard':
          //   switch (detailState) {
          //     case 'email':
          //       nextDetailState = 'password';
          //       break;
          //     case 'password':
          //       data = {
          //         company,
          //         email,
          //         password1: password,
          //         password2: password,
          //       };
          //       return {
          //         // type: REGISTER_USER_ASYNC.pending,
          //         payload: data,
          //       };
          //   }
          //   break;
          default:
            nextMainState = 'company';
            nextDetailState = 'company';
        }
      }
  }
  return {
    type: UPDATE_AUTH_FORM_STATE,
    payload: {
      detailState: nextDetailState,
      mainState: nextMainState,
    },
  };
}

function* appLoad() {
  try {
    Rehive.initializeSDK();
    yield all([
      put({ type: FETCH_ACCOUNTS_ASYNC.pending }),
      put({ type: FETCH_DATA_ASYNC.pending, payload: 'profile' }),
      put({ type: FETCH_DATA_ASYNC.pending, payload: 'mobile' }),
      put({ type: FETCH_DATA_ASYNC.pending, payload: 'email' }),
      put({ type: FETCH_DATA_ASYNC.pending, payload: 'crypto_account' }),
      put({ type: FETCH_DATA_ASYNC.pending, payload: 'bank_account' }),
      put({ type: FETCH_DATA_ASYNC.pending, payload: 'address' }),
      put({ type: FETCH_DATA_ASYNC.pending, payload: 'document' }),
      put({ type: FETCH_DATA_ASYNC.pending, payload: 'company' }),
      put({ type: FETCH_DATA_ASYNC.pending, payload: 'company_bank_account' }),
      put({ type: FETCH_DATA_ASYNC.pending, payload: 'company_currency' }),
      // put({ type: FETCH_DATA_ASYNC.pending, payload: 'company_config' }),
    ]);
    for (let i = 0; i < 11; i++) {
      yield take([FETCH_ACCOUNTS_ASYNC.success, FETCH_DATA_ASYNC.success]);
    }
    yield put({ type: APP_LOAD_FINISH });
    NavigationService.navigate('Home');
  } catch (error) {
    console.log(error);
    yield put({ type: LOGIN_USER_ASYNC.error, error });
  }
}

function* changePassword(action) {
  try {
    yield call(Rehive.changePassword, action.payload);
    yield put({
      type: CHANGE_PASSWORD_ASYNC.success,
    });
  } catch (error) {
    console.log(error);
    yield put({ type: CHANGE_PASSWORD_ASYNC.error, error });
  }
}

function* resetPassword(action) {
  try {
    yield call(Rehive.resetPassword, action.payload);
    yield put({
      type: RESET_PASSWORD_ASYNC.success,
    });
  } catch (error) {
    console.log(error);
    yield put({ type: RESET_PASSWORD_ASYNC.error, error });
  }
}

function* validateCompany(action) {
  try {
    yield call(Rehive.register, { company: action.payload });
  } catch (error) {
    console.log(error);
    if (error.data.company) {
      yield put({
        type: VALIDATE_COMPANY_ASYNC.error,
        payload: 'Please enter a valid company ID',
      });
    } else {
      yield put({
        type: VALIDATE_COMPANY_ASYNC.success,
        payload: action.payload,
      });
      yield put({ type: RESET_AUTH });
    }
  }
}

function* fetchCompanyConfig(action) {
  try {
    let data = yield call(Rehive.getCompanyConfig, action.payload);
    yield put({
      type: FETCH_DATA_ASYNC.success,
      payload: { data, prop: 'company_config' },
    });
    yield put({ type: RESET_AUTH });
  } catch (error) {
    console.log(error);
    yield put({
      type: VALIDATE_COMPANY_ASYNC.error,
      payload: 'Please enter a valid company ID',
    });
  }
}

export const authSagas = all([
  takeEvery(LOGIN_USER_ASYNC.success, appLoad),
  takeEvery(LOGIN_USER_ASYNC.pending, loginUser),
  takeEvery(REGISTER_USER_ASYNC.success, appLoad),
  takeEvery(REGISTER_USER_ASYNC.pending, registerUser),
  takeEvery(CHANGE_PASSWORD_ASYNC.pending, changePassword),
  takeEvery(LOGOUT_USER_ASYNC.pending, logoutUser),
  takeEvery(LOGOUT_USER_ASYNC.success, resetAuth),
  takeEvery(VALIDATE_COMPANY_ASYNC.pending, validateCompany),
  takeEvery(VALIDATE_COMPANY_ASYNC.success, fetchCompanyConfig),
  takeEvery(RESET_PASSWORD_ASYNC.pending, resetPassword),
  // takeEvery(APP_LOAD_FINISH, navigateHome),
]);
