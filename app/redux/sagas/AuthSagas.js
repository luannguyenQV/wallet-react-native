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
  PIN_SUCCESS,
  AUTH_COMPLETE,
  LOADING_TRUE,
  LOADING_FALSE,
} from './../actions/AuthActions';

import { FETCH_DATA_ASYNC } from './../actions/UserActions';
import { FETCH_ACCOUNTS_ASYNC } from './../actions/AccountsActions';

import * as Rehive from './../../util/rehive';
import NavigationService from './../../util/navigation';
import {
  validateEmail,
  validateMobile,
  validatePassword,
} from './../../util/validation';

import { getToken, getCompany, getAuth, getUser } from './selectors';

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
            const { pin, fingerprint } = yield select(getAuth);
            console.log(pin, fingerprint);
            if (pin || fingerprint) {
              if (fingerprint) {
                yield call(goToAuth, 'pin', 'fingerprint');
              } else {
                yield call(goToAuth, 'pin', 'pin');
              }
              yield take(PIN_SUCCESS);
            }
            yield call(appLoad);

            // go to auth for pin/2FA/announcements when done
          } else {
            yield call(goToAuth, 'landing', 'landing');
          }
        } catch (error) {
          console.log('company error', error);
          yield call(goToAuth, 'landing', 'landing');
        }
      } else {
        yield call(goToAuth, 'company', 'company');
      }
    } catch (error) {
      console.log('company error', error);
      yield call(goToAuth, 'company', 'company');
    }
  } catch (error) {
    console.log('init error:', error);
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
    yield call(authFlow);
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

function* resetAuth() {
  try {
    yield put({ type: RESET_AUTH });
    NavigationService.navigate('AuthScreen');
  } catch (error) {
    console.log(error);
  }
}

function* authFlow() {
  try {
    let token = '';
    while (true) {
      const action = yield take(NEXT_AUTH_FORM_STATE);
      const { nextFormState } = action.payload;
      console.log(nextFormState);
      const {
        mainState,
        detailState,
        tempCompany,
        company,
        email,
        mobile,
        password,
        first_name,
        last_name,
        country,
      } = yield select(getAuth);
      const { company_config } = yield select(getUser);
      let nextMainState = mainState;
      let nextDetailState = detailState;
      let authError = '';

      // Decide which state to transition to next
      switch (mainState) {
        case 'company':
          try {
            yield put({ type: VALIDATE_COMPANY_ASYNC.pending });
            yield call(Rehive.register, { company: tempCompany });
          } catch (error) {
            if (error.data.company) {
              authError = 'Please enter a valid company ID';
            } else {
              yield put({
                type: VALIDATE_COMPANY_ASYNC.success,
                payload: tempCompany,
              });
              nextMainState = 'landing';
              nextDetailState = 'landing';
            }
          }
          break;
        case 'landing':
          nextMainState = nextFormState;
          nextDetailState = company_config.auth.identifier;
          break;
        case 'login':
          if (nextFormState === 'forgot') {
            nextMainState = nextFormState;
            nextDetailState = 'email';
          } else {
            switch (detailState) {
              case 'email':
                authError = validateEmail(email);
                if (!authError) {
                  nextDetailState = 'password';
                }
                break;
              case 'mobile':
                authError = validateMobile(mobile);
                if (!authError) {
                  nextDetailState = 'password';
                }
                break;
              case 'password':
                authError = validatePassword(password);
                if (!authError) {
                  data = {
                    company,
                    user:
                      company_config.auth.identifier === 'mobile'
                        ? mobile
                        : email,
                    password,
                  };
                  try {
                    yield put({ type: LOADING_TRUE });
                    token = yield call(Rehive.login, data);
                    yield put({ type: LOADING_FALSE });
                  } catch (error) {
                    authError = result.message;
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
                yield put({ type: REGISTER_USER_ASYNC.pending });
                const result = yield call(registerUser, data);
                if (result) {
                  authError = result.message;
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
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function* postAuthFlow() {
  try {
    // const action = yield take(LOGIN_USER_ASYNC.su);
    while (true) {
      console.log('post');
      const action = yield take(NEXT_AUTH_FORM_STATE);
      const { nextFormState } = action.payload;
      console.log(nextFormState);
      const {
        mainState,
        detailState,
        tempCompany,
        company,
        email,
        mobile,
        password,
        first_name,
        last_name,
        country,
      } = yield select(getAuth);
      const { company_config } = yield select(getUser);
      let nextMainState = mainState;
      let nextDetailState = detailState;
      let authError = '';
      let skip = false;

      // Decide which state to transition to next
      switch (mainState) {
        case 'register':
        case 'login':
          const mfa = yield call(Rehive.getMFA);
          if (mfa.token) {
            nextDetailState = 'token';
            nextMainState = 'mfa';
          } else if (mfa.sms) {
            nextDetailState = 'sms';
            nextMainState = 'mfa';
          } else {
            if (company_config.auth.mobile) {
              if (company_config.auth.mobile === 'optional') {
                skip = true;
              }
              nextDetailState = 'verification';
              nextMainState = 'mobile';
            } else if (company_config.auth.email) {
              if (company_config.auth.mobile === 'optional') {
                skip = true;
              }
              nextDetailState = 'verification';
              nextMainState = 'email';
            } else if (company_config.auth.first_name) {
              nextDetailState = 'verification';
              nextMainState = 'first_name';
            } else if (company_config.auth.last_name) {
              nextDetailState = 'verification';
              nextMainState = 'last_name';
            } else if (company_config.auth.country) {
              nextDetailState = 'verification';
              nextMainState = 'country';
            } else if (company_config.auth.pin) {
              nextDetailState = 'pin';
              nextMainState = 'fingerprint';
            } else if (company_config.auth.mfa) {
              nextDetailState = 'verification';
              nextMainState = 'mobile';
            } else {
              yield put({ type: AUTH_COMPLETE, payload: token });
            }
          }
          break;
        case 'mfa':
          switch (detailState) {
            case 'token':
              authError = validateEmail(email);
              break;
            case 'mobile':
              authError = validateMobile(mobile);
              break;
          }
        case 'verification':
          switch (detailState) {
            case 'email':
              authError = validateEmail(email);
              break;
            case 'mobile':
              authError = validateMobile(mobile);
              break;
          }
        case 'user':
          switch (detailState) {
            case 'first_name':
              authError = validateEmail(email);
              break;
            case 'last_name':
              authError = validateMobile(mobile);
              break;
            case 'country':
              authError = validateMobile(mobile);
              break;
          }
        case 'pin':
          switch (detailState) {
            case 'fingerprint':
              authError = validateEmail(email);
              break;
            case 'pin':
              authError = validateMobile(mobile);
              break;
          }
        case 'welcome':
          switch (detailState) {
            case 'fingerprint':
              authError = validateEmail(email);
              break;
          }
      }

      console.log('nextMainState', nextMainState);
      console.log('nextDetailState', nextDetailState);
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

function* loginUser(data) {
  try {
    let response = yield call(Rehive.login, data);
    yield put({
      type: LOGIN_USER_ASYNC.success,
      payload: response.token,
    });
    return;
  } catch (error) {
    console.log(error);
    return error;
  }
}

function* registerUser(data) {
  try {
    let response = yield call(Rehive.register, data);
    yield put({
      type: REGISTER_USER_ASYNC.success,
      payload: response.token,
    });
    return;
  } catch (error) {
    console.log(error);
    return error;
  }
}

function* logoutUser() {
  try {
    yield call(Rehive.logout);
    yield put({
      type: LOGOUT_USER_ASYNC.success,
    });
    goToAuth('landing', 'landing');
  } catch (error) {
    console.log(error);
    yield put({ type: LOGOUT_USER_ASYNC.error, error });
  }
}

/* POST LOGIN */
/* 
  2FA
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

// POST ALL FLOWS (onboarding and such)

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
    yield put({ type: RESET_PASSWORD_ASYNC.error, payload: error.message });
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
  takeEvery(LOGIN_USER_ASYNC.success, postAuthFlow),
  takeEvery(REGISTER_USER_ASYNC.success, postAuthFlow),
  takeEvery(AUTH_COMPLETE, appLoad),
  takeEvery(CHANGE_PASSWORD_ASYNC.pending, changePassword),
  takeEvery(LOGOUT_USER_ASYNC.pending, logoutUser),
  takeEvery(LOGOUT_USER_ASYNC.success, resetAuth),
  takeEvery(VALIDATE_COMPANY_ASYNC.success, fetchCompanyConfig),
  takeEvery(RESET_PASSWORD_ASYNC.pending, resetPassword),
]);
