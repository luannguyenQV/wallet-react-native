import {
  AUTH_FIELD_CHANGED,
  AUTH_FIELD_ERROR,
  TERMS_CHANGED,
  LOGIN_USER_ASYNC,
  REGISTER_USER_ASYNC,
  UPDATE_AUTH_FORM_STATE,
  LOGOUT_USER,
  LOADING,
  APP_LOAD_START,
} from './../types';

import clientConfig from './../../config/client';

import { IsEmail } from './../../util/validation';
import AuthService from './../../services/authService';

export const initialLoad = props => async dispatch => {
  dispatch({ type: APP_LOAD_START });

  if (props.token) {
    dispatch({ type: LOGIN_USER_ASYNC.SUCCESS, payload: props.token });
  } else {
    dispatch({
      type: AUTH_FIELD_ERROR,
      payload: '',
    });
    if (props.company) {
      dispatch({
        type: UPDATE_AUTH_FORM_STATE,
        payload: {
          iconHeaderLeft: 'md-arrow-back',
          authState: 'landing',
        },
      });
    } else {
      dispatch({
        type: UPDATE_AUTH_FORM_STATE,
        payload: {
          textFooterRight: 'Next',
          authState: 'company',
          inputState: 'company',
        },
      });
    }
  }
};

export const authFieldChange = ({ prop, value }) => {
  return {
    type: AUTH_FIELD_CHANGED,
    payload: { prop, value },
  };
};

export const nextAuthFormState = (props, nextFormState) => async dispatch => {
  const { authState, inputState, company, password, email } = props;

  let error = validation(props);
  let textFooterRight = '';
  let nextAuthState = '';
  let nextInputState = '';
  let iconHeaderLeft = '';
  let data = {};

  let skip = false;

  if (error) {
    dispatch({
      type: AUTH_FIELD_ERROR,
      payload: { error },
    });
  } else {
    switch (authState) {
      case 'company':
        dispatch({
          type: LOADING,
        });
        error = await performCompanyServerValidation(company);
        if (error) {
          dispatch({
            type: AUTH_FIELD_ERROR,
            payload: { error },
          });
        } else {
          nextAuthState = 'landing';
          iconHeaderLeft = 'md-arrow-back';
        }
        break;
      case 'landing':
        iconHeaderLeft = 'md-arrow-back';
        nextAuthState = nextFormState;
        nextInputState = 'email';
        textFooterRight = 'Next';
        break;
      case 'login':
        switch (inputState) {
          case 'email':
            nextInputState = 'password';
            textFooterRight = 'Log in';
            break;
          case 'password':
            data = { company, user: email, password };
            dispatch({
              type: LOGIN_USER_ASYNC.PENDING,
              payload: data,
            });
            skip = true;
            break;
        }
        break;
      case 'register':
        switch (inputState) {
          case 'email':
            nextInputState = 'password';
            textFooterRight = 'Register';
            break;
          case 'password':
            data = {
              company,
              email,
              password1: password,
              password2: password,
            };
            await performRegister(dispatch, data);
            skip = true;
            break;
        }
        break;
      default:
        nextAuthState = 'company';
        nextInputState = 'company';
    }
    if (!nextAuthState) {
      nextAuthState = authState;
    }
    if (!skip) {
      dispatch({
        type: UPDATE_AUTH_FORM_STATE,
        payload: {
          textFooterRight,
          iconHeaderLeft,
          inputState: nextInputState,
          authState: nextAuthState,
        },
      });
    }
  }
  return;
};

export const previousAuthFormState = props => {
  const { authState, inputState } = props;

  let iconHeaderLeft = '';
  let textFooterRight = '';
  let nextAuthState = '';
  let nextInputState = '';

  switch (authState) {
    case 'landing':
      nextAuthState = 'company';
      nextInputState = 'company';
      textFooterRight = 'Next';
      break;
    case 'login':
    case 'register':
      iconHeaderLeft = 'md-arrow-back';
      switch (inputState) {
        case 'email':
          nextAuthState = 'landing';
          break;
        case 'password':
          nextInputState = 'email';
          textFooterRight = 'Next';
          break;
      }
      break;
    default:
      nextAuthState = 'company';
      nextInputState = 'company';
      textFooterRight = 'Next';
  }
  if (!nextAuthState) {
    nextAuthState = authState;
  }
  return {
    type: UPDATE_AUTH_FORM_STATE,
    payload: {
      iconHeaderLeft,
      textFooterRight,
      inputState: nextInputState,
      authState: nextAuthState,
    },
  };

  return;
};

validation = props => {
  let error = '';

  switch (props.inputState) {
    case 'email':
      if (!IsEmail(props.email)) {
        error = 'Please enter a valid email address';
      }
      break;
    case 'password':
      if (props.password.length < 8) {
        error = 'Password must be at least 8 characters in length';
      }
      break;
    case 'company':
      if (!props.company) {
        error = 'Please enter a company ID';
      }
      break;
    // case 'mobile':
    //   if (!value) {
    //     error = 'Please enter a company ID';
    //   }
    //   break;
    default:
      error = '';
  }
  return error;
};

performCompanyServerValidation = async company => {
  let responseJson = await AuthService.signup({ company });
  if (responseJson.data.company) {
    return 'Please enter a valid company ID';
  }
  return '';
};

export const termsChanged = ({ prop, value }) => {
  return {
    type: TERMS_CHANGED,
    payload: { prop, value: !value },
  };
};

performRegister = data => {
  return {
    type: REGISTER_USER_ASYNC.PENDING,
    payload: data,
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
  };
};
