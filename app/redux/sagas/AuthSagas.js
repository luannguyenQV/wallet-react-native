/* AUTH SAGAS */
/* This file contains all the flows related to user auth 
These flows are broken down into:
1. init - contains the logic to decide which state the app should start in when first opening
2. auth - contains the logic for switching between the screens up until a server request is made to rehive and a token returned. 
3. postAuth - once a token has been returned from Rehive, it is only stored after a set of conditions are met. 
              These conditions are obtained from the company config and include require contact details being verified, extra user information, 
              multi-factor authentication and setting of a local pin for securing actions in the app
4. other - there are also small helper sagas for handling other auth actions like logging out a user, changing a user's password/pin etc.
*/

import {
  select,
  take,
  all,
  call,
  put,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import {
  INIT,
  LOGIN_USER_ASYNC,
  REGISTER_USER_ASYNC,
  NEXT_AUTH_FORM_STATE,
  UPDATE_AUTH_FORM_STATE,
  APP_LOAD_FINISH,
  CHANGE_PASSWORD_ASYNC,
  RESET_PASSWORD_ASYNC,
  LOGOUT_USER_ASYNC,
  AUTH_COMPLETE,
  LOADING,
  SET_COMPANY,
  PIN_SUCCESS,
  ACTIVATE_FINGERPRINT,
  SET_PIN,
  POST_LOADING,
  POST_NOT_LOADING,
  INIT_MFA,
  RESET_MFA,
  NEXT_STATE_MFA,
  UPDATE_MFA_STATE,
  UPDATE_MFA_TOKEN,
  UPDATE_MFA_ERROR,
  VERIFY_MFA,
} from './../actions/AuthActions';
import { Toast } from 'native-base';
import {
  FETCH_DATA_ASYNC,
  FETCH_ACCOUNTS_ASYNC,
  FETCH_PHONE_CONTACTS_ASYNC,
} from './../actions';

import * as Rehive from './../../util/rehive';
import NavigationService from './../../util/navigation';
import {
  validateEmail,
  validateMobile,
  validatePassword,
} from './../../util/validation';
import default_config from './../../config/default_company_config';
import { getToken, getCompany, getAuth } from './selectors';

/* 
Init function called when app starts up to see what state the app should be in
*/
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
            // yield call(Rehive.verifyToken, token);
            yield call(Rehive.initWithToken, token);
            if (company_config.pin.appLoad) {
              const { pin, fingerprint } = yield select(getAuth);
              if (pin || fingerprint) {
                if (fingerprint) {
                  yield call(initialAuthState, 'pin', 'fingerprint');
                } else {
                  yield call(initialAuthState, 'pin', 'pin');
                }
                yield take(PIN_SUCCESS); // waits for pin success
              }
            }
            // successful app start while logged in
            yield call(appLoad);
          } else {
            yield call(initialAuthState, 'landing', 'landing');
          }
        } catch (error) {
          console.log('token error', error);
          yield call(initialAuthState, 'landing', 'landing');
        }
      } else {
        yield call(initialAuthState, 'company', 'company');
      }
    } catch (error) {
      console.log('company error', error);
      yield call(initialAuthState, 'company', 'company');
    }
  } catch (error) {
    console.log('sdk init error:', error);
    yield put({ type: INIT.error, error });
  }
}

/* sets initial auth state */
function* initialAuthState(mainState, detailState) {
  try {
    yield put({
      type: UPDATE_AUTH_FORM_STATE,
      payload: { mainState, detailState },
    });
    yield put({ type: INIT.success });
    if (mainState !== 'pin') {
      // starts auth flow saga
      yield call(authFlow);
    }
  } catch (error) {
    console.log(error);
  }
}

/* MAIN AUTH FLOW */
/* 
  This code runs in a loop, evaluating what state to transition to next depending on provided inputs
  If external calls are made (login / register / server validation) the saga pauses and waits for response, then updates accordingly
*/
function* authFlow() {
  console.log('authFlow');
  try {
    let token = '';
    let user = {};
    while (true) {
      // permanent loop that waits for a state transition action from the auth screen
      const action = yield take(NEXT_AUTH_FORM_STATE);
      const { nextFormState } = action.payload;
      const {
        mainState,
        detailState,
        tempCompany,
        company,
        email,
        mobile,
        password,
        company_config,
      } = yield select(getAuth);
      // if no state changes are made stay in current state
      let nextMainState = mainState;
      let nextDetailState = detailState;
      let authError = '';
      let skip = false;

      // Decide which state to transition to next
      switch (mainState) {
        case 'company':
          try {
            // Tries to dummy register a user for company which validates if company exists
            // TODO: this should be revised, but requires platform improvements
            yield put({ type: LOADING });
            yield call(Rehive.register, { company: tempCompany });
          } catch (error) {
            if (error.data.company) {
              // This error is returned if no company by this ID exists in rehive
              authError = 'Please enter a valid company ID';
            } else {
              // fetches company config for company, if none exists use default
              temp_config = yield call(Rehive.getCompanyConfig, tempCompany);
              temp_config = temp_config ? temp_config : default_config;
              // stores company ID and config in redux state
              yield put({
                type: SET_COMPANY,
                payload: { tempCompany, temp_config },
              });
              // sets next state to landing
              nextMainState = 'landing';
              nextDetailState = 'landing';
            }
          }
          break;
        case 'landing':
          nextMainState = nextFormState; // either register / login depending on button pressed
          nextDetailState = company_config.auth.identifier; // ensures user is prompted for the correct info
          break;
        case 'login':
          if (nextFormState === 'forgot') {
            nextMainState = 'forgot';
            // TODO: update this to handle forgot password to other identifiers (mobile?)
            nextDetailState = 'email';
          } else {
            switch (detailState) {
              case 'email':
                authError = validateEmail(email); // validation function returns empty if successful
                if (!authError) {
                  nextDetailState = 'password';
                  user = email;
                }
                break;
              case 'mobile':
                authError = validateMobile(mobile);
                if (!authError) {
                  nextDetailState = 'password';
                  user = mobile;
                }
                break;
              case 'password':
                authError = validatePassword(password);
                if (!authError) {
                  data = { company, user, password };
                  try {
                    yield put({ type: LOADING });
                    ({ user, token } = yield call(Rehive.login, data));
                    yield call(Rehive.initWithToken, token); // initialises sdk with new token
                    if (yield call(postAuthFlow)) {
                      // waits for postAuthFlow to complete, when complete stores token and exists auth flow
                      yield put({ type: AUTH_COMPLETE, payload: token });
                      return;
                    }
                    break;
                  } catch (error) {
                    authError = error.message;
                    nextDetailState = company_config.auth.identifier;
                  }
                }
                break;
            }
          }
          break;
        case 'register':
          switch (detailState) {
            case 'email':
              authError = validateEmail(email);
              if (!authError) {
                nextDetailState = 'password';
                user = email;
              }
              break;
            case 'mobile':
              authError = validateMobile(mobile);
              if (!authError) {
                nextDetailState = 'password';
                user = mobile;
              }
              break;
            case 'password':
              authError = validatePassword(password);
              if (!authError) {
                data = {
                  company,
                  email,
                  password1: password,
                  password2: password,
                };
                try {
                  yield put({ type: LOADING });
                  ({ user, token } = yield call(Rehive.register, data));
                  yield call(Rehive.initWithToken, token);
                  if (yield call(postAuthFlow)) {
                    yield put({ type: AUTH_COMPLETE, payload: token });
                    return;
                  }
                } catch (error) {
                  authError = error.message;
                  nextDetailState = company_config.auth.identifier;
                }
              }
              break;
          }
      }

      // execute transition
      yield put({
        type: UPDATE_AUTH_FORM_STATE,
        payload: {
          mainState: nextMainState,
          detailState: nextDetailState,
          authError,
          skip,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
}

/* POST AUTH FLOW */
/* 
  This This code runs from top down, pausing for user input or server responses where
  If external calls are made (login / register / server validation) the saga pauses and waits for response, then updates accordingly
*/
function* postAuthFlow() {
  try {
    while (true) {
      const { mainState, detailState, company_config } = yield select(getAuth);
      let nextMainState = mainState;
      let nextDetailState = detailState;
      let authError = '';
      let skip = false;
      yield put({ type: POST_LOADING });

      // Decide which state to transition to next
      switch (mainState) {
        case 'login':
        case 'register':
          const mfa = yield call(Rehive.getMFA);
          nextMainState = 'mfa';
          if (mfa.token) {
            nextDetailState = 'token';
          } else if (mfa.sms) {
            nextDetailState = 'sms';
            // TODO: add call to get number that sms was sent to here
          } else {
            nextDetailState = '';
          }
          break;
        case 'mfa':
          yield put({ type: POST_NOT_LOADING });
          switch (detailState) {
            case 'token':
            case 'sms':
              while (true) {
                try {
                  const action = yield take(VERIFY_MFA);
                  yield call(Rehive.verifyMFA, action.payload);
                  break;
                } catch (error) {
                  yield put({
                    type: UPDATE_AUTH_FORM_STATE,
                    payload: {
                      authError: error.message,
                    },
                  });
                }
              }
            default:
              nextMainState = 'verification';
              nextDetailState = 'mobile';
              if (company_config.auth.mobile === 'optional') {
                skip = true;
              }
          }
          break;
        case 'verification':
          switch (detailState) {
            case 'mobile':
              if (
                company_config.auth.mobile &&
                (yield call(Rehive.getMobiles)).filter(
                  item => item.verified === true,
                ).length === 0
              ) {
                yield put({ type: POST_NOT_LOADING });
                yield take(NEXT_AUTH_FORM_STATE);
              } else {
                nextDetailState = 'email';
                if (company_config.auth.email === 'optional') {
                  skip = true;
                }
              }
              break;
            case 'email':
              if (
                company_config.auth.email &&
                (yield call(Rehive.getEmails)).filter(
                  item => item.verified === true,
                ).length === 0
              ) {
                yield put({ type: POST_NOT_LOADING });
                yield take(NEXT_AUTH_FORM_STATE);
              } else {
                nextDetailState = 'first_name';
              }
              break;
            case 'first_name':
              if (
                company_config.auth.first_name &&
                !(yield call(Rehive.getProfile)).first_name
              ) {
                yield put({ type: POST_NOT_LOADING });
                yield take(NEXT_AUTH_FORM_STATE);
                const { first_name } = yield select(getAuth);
                if (first_name) {
                  yield call(Rehive.updateProfile, { first_name });
                }
              } else {
                nextDetailState = 'last_name';
              }
              break;
            case 'last_name':
              if (
                company_config.auth.last_name &&
                !(yield call(Rehive.getProfile)).last_name
              ) {
                yield put({ type: POST_NOT_LOADING });
                yield take(NEXT_AUTH_FORM_STATE);
                const { last_name } = yield select(getAuth);
                if (last_name) {
                  yield call(Rehive.updateProfile, { last_name });
                }
              } else {
                nextDetailState = 'country';
              }
              break;
            case 'country':
              if (
                company_config.auth.country &&
                !(yield call(Rehive.getProfile)).country
              ) {
                yield put({ type: POST_NOT_LOADING });
                yield take(NEXT_AUTH_FORM_STATE);
                const { country } = yield select(getAuth);
                if (country) {
                  yield call(Rehive.updateProfile, { country });
                }
              } else {
                nextMainState = 'pin';
                nextDetailState = 'set_pin';
                if (Expo.Fingerprint.hasHardwareAsync()) {
                  if (Expo.Fingerprint.isEnrolledAsync()) {
                    nextDetailState = 'set_fingerprint';
                  }
                }
                if (company_config.auth.pin === 'optional') {
                  skip = true;
                }
              }
              break;
          }
          break;
        case 'pin':
          if (company_config.auth.pin) {
            console.log('pin');
            let response;
            yield put({ type: POST_NOT_LOADING });
            switch (detailState) {
              case 'set_fingerprint':
                response = yield take([
                  NEXT_AUTH_FORM_STATE,
                  ACTIVATE_FINGERPRINT,
                ]);
                if (response.type === ACTIVATE_FINGERPRINT) {
                  return true;
                } else {
                  if (response.payload.nextFormState === 'skip') {
                    return true;
                  }
                  nextDetailState = 'set_pin';
                }
                break;
              case 'set_pin':
                response = yield take(NEXT_AUTH_FORM_STATE);
                nextDetailState = 'confirm_pin';
                break;
              case 'confirm_pin':
                response = yield take([SET_PIN, NEXT_AUTH_FORM_STATE]);
                if (response.type === SET_PIN) {
                  return true;
                } else {
                  nextDetailState = 'set_pin';
                  authError = 'Pin and confirm do not match, please try again';
                }
            }
          } else {
            return true;
          }
          break;
      }
      yield put({ type: POST_LOADING });

      // execute transition
      yield put({
        type: UPDATE_AUTH_FORM_STATE,
        payload: {
          mainState: nextMainState,
          detailState: nextDetailState,
          authError,
          skip,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
}

/* fetches data to ensure redux state contains latest version of information */
function* appLoad() {
  console.log('appLoad');
  try {
    yield all([
      put({ type: POST_LOADING }),
      put({ type: FETCH_ACCOUNTS_ASYNC.pending }),
      put({ type: FETCH_DATA_ASYNC.pending, payload: 'profile' }),
      put({ type: FETCH_DATA_ASYNC.pending, payload: 'mobile' }),
      put({ type: FETCH_DATA_ASYNC.pending, payload: 'email' }),
      // put({ type: FETCH_DATA_ASYNC.pending, payload: 'crypto_account' }),
      put({ type: FETCH_DATA_ASYNC.pending, payload: 'bank_account' }),
      put({ type: FETCH_DATA_ASYNC.pending, payload: 'address' }),
      put({ type: FETCH_DATA_ASYNC.pending, payload: 'document' }),
      put({ type: FETCH_DATA_ASYNC.pending, payload: 'company' }),
      put({ type: FETCH_DATA_ASYNC.pending, payload: 'company_bank_account' }),
      put({ type: FETCH_DATA_ASYNC.pending, payload: 'company_currency' }),
      put({ type: FETCH_PHONE_CONTACTS_ASYNC.pending }),
    ]);
    // TODO: add timeout and re=fetch any failed api calls
    for (let i = 0; i < 11; i++) {
      yield take([
        FETCH_ACCOUNTS_ASYNC.success,
        FETCH_DATA_ASYNC.success,
        FETCH_PHONE_CONTACTS_ASYNC.success,
      ]);
    }
    yield put({ type: APP_LOAD_FINISH });
    yield call(NavigationService.navigate, 'App');
  } catch (error) {
    console.log(error);
    yield put({ type: LOGIN_USER_ASYNC.error, payload: error.message });
  }
}

function* logoutUser() {
  try {
    yield call(Rehive.logout);
    yield put({
      type: LOGOUT_USER_ASYNC.success,
    });
    yield call(NavigationService.navigate, 'AuthScreen');
    yield call(init);
  } catch (error) {
    console.log(error);
    yield put({ type: LOGOUT_USER_ASYNC.error, payload: error.message });
  }
}

function* changePassword(action) {
  try {
    yield call(Rehive.changePassword, action.payload);
    yield put({
      type: CHANGE_PASSWORD_ASYNC.success,
    });
    Toast.show({
      text: 'Password changed',
    });
    yield call(NavigationService.goBack);
  } catch (error) {
    console.log(error);
    yield put({ type: CHANGE_PASSWORD_ASYNC.error, payload: error.message });
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
    yield put({ type: RESET_PASSWORD_ASYNC.error, payload: error.message });
  }
}

/* 
Init function called when app starts up to see what state the app should be in
*/
function* mfaFlow() {
  try {
    const mfa = yield call(Rehive.getMFA);
    console.log(mfa);
    let nextState = '';
    if (mfa.token || mfa.sms) {
      yield put({ type: UPDATE_MFA_STATE, payload: 'enabled' });
      yield take(NEXT_STATE_MFA);
      if (mfa.token) {
        nextState = 'verifyToken';
      } else if (mfa.sms) {
        nextState = 'verifySMS';
      }
      yield put({ type: UPDATE_MFA_STATE, payload: nextState });
      let flag = true;
      while (flag) {
        const action = yield take(VERIFY_MFA);
        try {
          yield call(Rehive.verifyMFA, action.payload);
          break;
        } catch (error) {
          console.log('mfa verification', error);
          yield put({ type: UPDATE_MFA_ERROR, payload: error.message });
        }
      }
      if (mfa.token) {
        yield call(Rehive.disableAuthToken);
      } else if (mfa.sms) {
        yield call(Rehive.disableAuthSMS);
      }
    }
    yield put({ type: RESET_MFA });
    while (true) {
      let action = yield take(NEXT_STATE_MFA);
      if (action.payload === 'token') {
        yield call(Rehive.enableAuthToken);
        const response = yield call(Rehive.getMFA_Token);
        console.log(response);
        yield put({ type: UPDATE_MFA_TOKEN, payload: response });
        yield put({ type: UPDATE_MFA_STATE, payload: 'token' });
        action = yield take(NEXT_STATE_MFA);
        if (action.payload === 'back') {
          yield call(Rehive.disableAuthToken);
          yield put({ type: UPDATE_MFA_STATE, payload: 'landing' });
        } else {
          yield put({ type: UPDATE_MFA_STATE, payload: 'verifyToken' });
          yield call(verifyMFA);
          break;
        }
      } else if (action.payload === 'sms') {
        try {
          const response = yield call(Rehive.getMFA_SMS);
          console.log(response);
          yield put({
            type: AUTH_FIELD_CHANGED,
            payload: { prop: mfaMobile, value: response.mobile_number },
          });
        } catch (error) {
          console.log(error);
        }
        yield put({ type: UPDATE_MFA_STATE, payload: 'sms' });
        action = yield take(NEXT_STATE_MFA);
        console.log(action);
        if (action.payload === 'back') {
          yield put({ type: UPDATE_MFA_STATE, payload: 'landing' });
        } else {
          const { mfaMobile } = yield select(getAuth);
          console.log(mfaMobile);
          yield call(Rehive.enableAuthSMS, mfaMobile);
          yield put({ type: UPDATE_MFA_STATE, payload: 'verifySMS' });
          yield call(verifyMFA);
          break;
        }
      }
      // yield take([FETCH_ACCOUNTS_ASYNC.success, FETCH_DATA_ASYNC.success]);
      // take next action
    }
  } catch (error) {
    console.log('mfa flow', error);
    // yield put({ type: LOGOUT_USER_ASYNC.error, payload: error.message });
  }
}

function* verifyMFA() {
  try {
    while (true) {
      const action = yield take(VERIFY_MFA);
      try {
        yield call(Rehive.verifyMFA, action.payload);
        break;
      } catch (error) {
        console.log('mfa verification', error);
        yield put({ type: UPDATE_MFA_ERROR, payload: error.message });
      }
    }
    Toast.show({
      text: 'MFA enabled!',
    });
    yield call(NavigationService.goBack);
  } catch (error) {
    console.log('mfa verify', error);
    // yield put({ type: LOGOUT_USER_ASYNC.error, payload: error.message });
  }
}

export const authSagas = all([
  takeEvery(INIT.pending, init),
  takeLatest(INIT_MFA, mfaFlow),
  takeEvery(LOGIN_USER_ASYNC.success, postAuthFlow),
  takeEvery(REGISTER_USER_ASYNC.success, postAuthFlow),
  takeLatest(AUTH_COMPLETE, appLoad),
  takeEvery(CHANGE_PASSWORD_ASYNC.pending, changePassword),
  takeEvery(LOGOUT_USER_ASYNC.pending, logoutUser),
  takeEvery(RESET_PASSWORD_ASYNC.pending, resetPassword),
]);
