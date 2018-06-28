/* AUTH ACTIONS */

/* 
This file contains all the TYPE declarations and ACTION functions 
that relate to the auth flows
*/
import { authValidation } from './../../util/validation';
import { createAsyncTypes } from './../store/Utilities';

export const APP_LOAD_START = 'APP_LOAD_START';
export const APP_LOAD_FINISH = 'APP_LOAD_FINISH';
export const initialLoad = props => async dispatch => {
  dispatch({ type: APP_LOAD_START });

  if (props.token) {
    dispatch({ type: LOGIN_USER_ASYNC.success, payload: props.token });
  } else {
    dispatch({
      type: AUTH_FIELD_ERROR,
      payload: '',
    });
    if (props.company) {
      dispatch({
        type: UPDATE_AUTH_FORM_STATE,
        payload: {
          iconHeaderLeft: 'arrow-back',
          mainState: 'landing',
        },
      });
    } else {
      dispatch({
        type: UPDATE_AUTH_FORM_STATE,
        payload: {
          textFooterRight: 'Next',
          mainState: 'company',
          detailState: 'company',
        },
      });
    }
  }
};

export const AUTH_FIELD_CHANGED = 'auth_field_changed';
export const authFieldChange = ({ prop, value }) => {
  return {
    type: AUTH_FIELD_CHANGED,
    payload: { prop, value },
  };
};

export const AUTH_FIELD_ERROR = 'auth_field_error';
export const LOGIN_USER_ASYNC = createAsyncTypes('login_user');
export const REGISTER_USER_ASYNC = createAsyncTypes('register_user');
export const VALIDATE_COMPANY_ASYNC = createAsyncTypes('validate_company');
export const UPDATE_AUTH_FORM_STATE = 'update_auth_form_state';
export const nextAuthFormState = (props, nextFormState, companyConfig) => {
  const { mainState, detailState, company, password, email } = props;

  let nextMainState = mainState;
  let nextDetailState = '';
  let data = {};

  if (nextFormState) {
    nextMainState = nextFormState;
    nextDetailState = 'email';
  } else {
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
};
export const previousAuthFormState = props => {
  const { mainState, detailState } = props;

  let nextMainState = mainState;
  let nextDetailState = '';

  switch (mainState) {
    case 'landing':
      nextMainState = 'company';
      nextDetailState = 'company';
      break;
    case 'forgot':
      nextMainState = 'login';
      nextDetailState = 'email';
      break;
    case 'login':
    case 'register':
      switch (detailState) {
        case 'email':
          nextMainState = 'landing';
          break;
        case 'password':
          nextDetailState = 'email';
          break;
      }
      break;
    default:
      nextMainState = 'company';
      nextDetailState = 'company';
  }
  return {
    type: UPDATE_AUTH_FORM_STATE,
    payload: {
      detailState: nextDetailState,
      mainState: nextMainState,
    },
  };
};

export const CHANGE_PASSWORD_ASYNC = createAsyncTypes('change_password');
export const changePassword = (old_password, new_password) => {
  // console.log(old_password, new_password);
  if (!old_password || old_password.length < 8) {
    error = 'Password must be at least 8 characters in length';
    return {
      type: AUTH_FIELD_ERROR,
      payload: {
        prop: 'old_password',
        error,
      },
    };
  }

  // if (!new_password || new_password.length < 8) {
  //   error = 'Password must be at least 8 characters in length';
  //   return {
  //     type: AUTH_FIELD_ERROR,
  //     payload: {
  //       prop: 'new_password',
  //       error,
  //     },
  //   };
  // }

  // return {
  //   type: CHANGE_PASSWORD_ASYNC,
  //   payload: {
  //     old_password,
  //     new_password1: new_password,
  //     new_password2: new_password,
  //   },
  // };
};

export const RESET_PASSWORD_ASYNC = createAsyncTypes('reset_password');
export const resetPassword = (company, email) => {
  return {
    type: RESET_PASSWORD_ASYNC.pending,
    payload: { user: email, company },
  };
};

export const LOGOUT_USER_ASYNC = createAsyncTypes('logout_user');
export const logoutUser = () => {
  return {
    type: LOGOUT_USER_ASYNC.pending,
  };
};

export const RESET_AUTH = 'reset_auth';
export const resetAuth = () => {
  return {
    type: RESET_AUTH,
  };
};

export const CHECK_PIN = 'check_pin';
export const checkPin = () => {
  return {
    type: DEACTIVATE_FINGERPRINT,
  };
};

export const SET_PIN = 'set_pin';
export const setPin = pin => {
  return {
    type: SET_PIN,
    payload: pin,
  };
};

export const ACTIVATE_FINGERPRINT = 'activate_fingerprint';
export const activateFingerprint = () => {
  return {
    type: ACTIVATE_FINGERPRINT,
  };
};

export const RESET_PIN = 'reset_pin';
export const resetPin = () => {
  return {
    type: RESET_PIN,
  };
};
