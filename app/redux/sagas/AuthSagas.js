import { select, take, all, call, put, takeEvery } from 'redux-saga/effects';
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
  NEXT_AUTH_FORM_STATE,
  INIT,
} from './../actions/AuthActions';

import { FETCH_DATA_ASYNC } from './../actions/UserActions';
import { FETCH_ACCOUNTS_ASYNC } from './../actions/AccountsActions';

import * as Rehive from './../../util/rehive';
import NavigationService from './../../util/navigation';
import { authValidation } from './../../util/validation';

import { getToken, getCompany } from './selectors';

function* init() {
  let company_config;
  try {
    Rehive.initWithoutToken();
    try {
      const company = yield select(getCompany);
      if (company) {
        company_config = yield call(Rehive.getCompanyConfig, company);
        try {
          const token = yield select(getToken);
          if (token) {
            Rehive.verifyToken(token);
            Rehive.initWithToken(token);
            // go to auth for pin/2FA/announcements when done
            yield call(appLoad);
          } else {
            yield call(goToAuth, 'landing', 'landing');
          }
        } catch (error) {
          yield call(goToAuth, 'landing', 'landing');
        }
      } else {
        yield call(goToAuth, 'company', 'company');
      }
    } catch (error) {
      yield call(goToAuth, 'company', 'company');
      // console.log(error);
    }
  } catch (error) {
    console.log(error);
    yield put({ type: INIT.error, error });
  }
}

function* goToAuth(mainState, detailState) {
  console.log('go to: ', mainState);
  try {
    yield put({
      type: UPDATE_AUTH_FORM_STATE,
      payload: { mainState, detailState },
    });
    yield put({ type: INIT.success });
    NavigationService.navigate('Auth');
  } catch (error) {
    console.log(error);
  }
}

function* appLoad() {
  try {
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
    ]);
    for (let i = 0; i < 11; i++) {
      yield take([FETCH_ACCOUNTS_ASYNC.success, FETCH_DATA_ASYNC.success]);
    }
    yield put({ type: APP_LOAD_FINISH });
    NavigationService.navigate('App');
  } catch (error) {
    console.log('appLoad', error);
    yield put({ type: LOGIN_USER_ASYNC.error, error });
  }
}

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
        detailState: 'email',
        mainState: 'register',
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
        mainState: 'landing',
      },
    });
  } catch (error) {
    console.log(error);
    yield put({ type: LOGOUT_USER_ASYNC.error, error });
  }
}

function* resetAuth() {
  try {
    yield put({ type: RESET_AUTH });
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
  try {
    const {
      mainState,
      detailState,
      company,
      tempCompany,
      password,
      email,
      company_config,
    } = action.payload.props;
    const nextFormState = action.payload.nextFormState;

    let nextMainState = mainState;
    let nextDetailState = '';
    let data = {};

    switch (mainState) {
      case 'company':
        yield put({
          type: VALIDATE_COMPANY_ASYNC.pending,
          payload: tempCompany,
        });
        break;
      case 'landing':
        nextMainState = nextFormState;
        nextDetailState = 'email';
        break;
      case 'login':
        switch (detailState) {
          case 'email':
            nextDetailState = 'password';
            break;
          case 'password':
            data = { company, user: email, password };
            yield put({
              type: LOGIN_USER_ASYNC.pending,
              payload: data,
            });
        }
    }
    yield put({
      type: UPDATE_AUTH_FORM_STATE,
      payload: {
        mainState: nextMainState,
        detailState: nextDetailState,
      },
    });
  } catch (error) {
    console.log(error);
  }

  // switch (nextFormState) {
  //   case 'login':
  //   case 'register':
  //     nextMainState = nextFormState;
  //     nextDetailState = 'email';
  //     break;
  //   default:
  //     let error = authValidation(props);
  //     if (error) {
  //       return {
  //         type: AUTH_FIELD_ERROR,
  //         payload: { prop: detailState, error },
  //       };
  //     } else {
  //       switch (mainState) {
  //         case 'company':
  //           return {
  //             type: VALIDATE_COMPANY_ASYNC.pending,
  //             payload: company,
  //           };
  //         case 'login':
  //           switch (detailState) {
  //             case 'email':
  //               nextDetailState = 'password';
  //               break;
  //             case 'password':
  //               data = { company, user: email, password };
  //               return {
  //                 type: LOGIN_USER_ASYNC.pending,
  //                 payload: data,
  //               };
  //           }
  //           break;
  //         case 'register':
  //           switch (detailState) {
  //             case 'email':
  //               nextDetailState = 'password';
  //               break;
  //             case 'password':
  //               data = {
  //                 company,
  //                 email,
  //                 password1: password,
  //                 password2: password,
  //               };
  //               return {
  //                 type: REGISTER_USER_ASYNC.pending,
  //                 payload: data,
  //               };
  //           }
  //           break;
  //         // case '2FA':
  //         //   switch (detailState) {
  //         //     case 'email':
  //         //       nextDetailState = 'password';
  //         //       break;
  //         //     case 'password':
  //         //       data = {
  //         //         company,
  //         //         email,
  //         //         password1: password,
  //         //         password2: password,
  //         //       };
  //         //       return {
  //         //         // type: REGISTER_USER_ASYNC.pending,
  //         //         payload: data,
  //         //       };
  //         //   }
  //         //   break;
  //         // case 'user':
  //         //   switch (detailState) {
  //         //     case 'email':
  //         //       nextDetailState = 'password';
  //         //       break;
  //         //     case 'password':
  //         //       data = {
  //         //         company,
  //         //         email,
  //         //         password1: password,
  //         //         password2: password,
  //         //       };
  //         //       return {
  //         //         // type: REGISTER_USER_ASYNC.pending,
  //         //         payload: data,
  //         //       };
  //         //   }
  //         //   break;
  //         // case 'onboard':
  //         //   switch (detailState) {
  //         //     case 'email':
  //         //       nextDetailState = 'password';
  //         //       break;
  //         //     case 'password':
  //         //       data = {
  //         //         company,
  //         //         email,
  //         //         password1: password,
  //         //         password2: password,
  //         //       };
  //         //       return {
  //         //         // type: REGISTER_USER_ASYNC.pending,
  //         //         payload: data,
  //         //       };
  //         //   }
  //         //   break;
  //         default:
  //           nextMainState = 'company';
  //           nextDetailState = 'company';
  //       }
  //     }
  // }
  // return {
  //   type: UPDATE_AUTH_FORM_STATE,
  //   payload: {
  //     detailState: nextDetailState,
  //     mainState: nextMainState,
  //   },
  // };
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
  takeEvery(INIT.pending, init),
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
  takeEvery(NEXT_AUTH_FORM_STATE, nextAuthFormState),
]);

/* 
while true
  take state transition
  get state
  
  to next input state


*/

/* AUTH FLOW */
/* 
while true
  take state transition
  get state


*/

/* LANDING */
/* this is where all the back and forth between login/register flows happens
while true
  take state transition
  get state
  to next input state
  validation
  login
  require mobile
  mobile first / email
  terms and conditions


*/

/* POST LOGIN/REGISTER */
/* NOTE IT SHOULD RE-ENTER THIS FLOW IF APP CLOSES AND RESTARTS -> check in login flow (abstract - companies could update their settings at a later stage)
  require email to be verified (manual / auto recheck) (link to input from external app?)
  require number to be verified (OTP)
  set pin
  enabling 2FA (token / sms - default to inputted number)
  onboarding cards (use component from startup) (individual screens have login/register flags)
  personal info (first name etc)
  (get verified - document uploading before even getting into app)
  welcome screen

*/

/*

*/
