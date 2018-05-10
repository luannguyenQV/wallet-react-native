import { AsyncStorage } from 'react-native';
import {
  AUTH_FIELD_CHANGED,
  AUTH_FIELD_ERROR,
  TERMS_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  UPDATE_COMPANY_SUCCESS,
  UPDATE_COMPANY_FAIL,
  UPDATE_COMPANY,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER,
  UPDATE_AUTH_FORM_FIELD,
  UPDATE_AUTH_FORM_STATE,
  UPDATE_REGISTER_FORM_STATE,
  LOGOUT_USER,
} from './types';

import store from './../store';
import clientConfig from './../../config/client';

import { IsEmail } from './../../util/validation';
import AuthService from './../../services/authService';

export const initialLoad = props => async dispatch => {
  // console.log(props);
  if (props.token) {
    dispatch({ type: LOGIN_USER_SUCCESS, payload: token });
  } else {
    if (props.company) {
      dispatch({ type: LOGIN_USER_FAIL });
    } else {
      dispatch({ type: UPDATE_AUTH_FORM_STATE, payload: 'invalidCompany' });
    }
  }
};

export const updateAuthFormState = ({ nextState }) => {
  return {
    type: UPDATE_AUTH_FORM_STATE,
    payload: nextState,
  };
};

export const updateRegisterFormState = ({ state, value }) => {
  let actionText = '';
  let nextState = '';
  if (state === 'initial') {
    if (clientConfig.requireEmail) {
      nextState = 'email';
    } else if (clientConfig.requireMobile) {
      nextState = 'mobile';
    }
    actionText = 'Next';
  } else {
    console.log(state, value);
    let error = validation(state, value);
    if (error) {
      return {
        type: AUTH_FIELD_ERROR,
        payload: { prop: state, value, error },
      };
    } else {
      return dispatch => {
        dispatch({ type: UPDATE_AUTH_FORM_FIELD });
        let data = { state, value };
        performUpdateAuthFormField(dispatch, data);
      };
      if (state === 'email') {
        if (clientConfig.requireMobile) {
          nextState = 'mobile';
          actionText = 'Next';
        } else if (clientConfig.requireTerms) {
          nextState = 'terms';
          actionText = 'Next';
        } else {
          nextState = 'password';
          actionText = 'Register';
        }
      } else if (state === 'mobile') {
        if (clientConfig.requireTerms) {
          nextState = 'terms';
          actionText = 'Next';
        } else {
          nextState = 'password';
          actionText = 'Register';
        }
      } else if (state === 'terms') {
        nextState = 'password';
        actionText = 'Register';
      }
    }
  }

  return {
    type: UPDATE_REGISTER_FORM_STATE,
    payload: { nextState, actionText },
  };
};

performUpdateAuthFormField = async (dispatch, data) => {
  console.log(data.state);
  let responseJson = await AuthService.signup(data);
  console.log(responseJson.data);
  if (responseJson.data.company) {
    dispatch({
      type: UPDATE_COMPANY_FAIL,
      payload: responseJson.data.company[0],
    });
  } else {
    // if (responseJson.data.email)
    // const data = { requireEmail, requireMobile };
    dispatch({
      type: UPDATE_COMPANY_SUCCESS,
    });
  }
};

export const saveCompany = ({ company }) => {
  return dispatch => {
    dispatch({ type: UPDATE_COMPANY });
    let data = { company };
    performUpdateCompany(dispatch, data);
  };
};

performUpdateCompany = async (dispatch, data) => {
  console.log(data);
  let responseJson = await AuthService.signup(data);
  console.log(responseJson.data);
  if (responseJson.data.company) {
    dispatch({
      type: UPDATE_COMPANY_FAIL,
      payload: responseJson.data.company[0],
    });
  } else {
    // if (responseJson.data.email)
    // const data = { requireEmail, requireMobile };
    dispatch({
      type: UPDATE_COMPANY_SUCCESS,
    });
  }
};

export const authFieldChange = ({ prop, value }) => {
  // let error = validation(prop, value);
  return {
    type: AUTH_FIELD_CHANGED,
    payload: { prop, value },
  };
};

export const authFieldSave = ({ prop, value }) => {
  let error = validation(prop, value);
  return {
    type: AUTH_FIELD_SAVE,
    payload: { prop, value, error },
  };
};

export const termsChanged = ({ prop, value }) => {
  return {
    type: TERMS_CHANGED,
    payload: { prop, value: !value },
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
  };
};

export const loginUser = ({ email, company, password }) => {
  return dispatch => {
    let error = '';
    let prop = 'email';
    error = validation(prop, email);
    if (error) {
      dispatch({
        type: AUTH_FIELD_ERROR,
        payload: { prop, error },
      });
    }
    prop = 'company';
    error = validation(prop, company);
    if (error) {
      dispatch({
        type: AUTH_FIELD_ERROR,
        payload: { prop, error },
      });
    }
    prop = 'password';
    error = validation(prop, password);
    if (error) {
      dispatch({
        type: AUTH_FIELD_ERROR,
        payload: { prop, error },
      });
    }

    if (!error) {
      dispatch({ type: LOGIN_USER });
      let data = { user: email, company, password };
      performLogin(dispatch, data);
    }
  };
};

performLogin = async (dispatch, data) => {
  let responseJson = await AuthService.login(data);

  if (responseJson.status === 'success') {
    const loginInfo = responseJson.data;
    loginUserSuccess(dispatch, loginInfo.token);
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
  } else {
    console.log('fail');
    loginUserFail(dispatch);
  }
};

const loginUserFail = dispatch => {
  dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, token) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: token,
  });
};

validation = (prop, value) => {
  console.log(prop, value);
  let error = '';
  switch (prop) {
    case 'email':
      if (!IsEmail(value)) {
        error = 'Please enter a valid email address';
      }
      break;
    case 'password':
      if (value.length < 8) {
        error = 'Password must be at least 8 characters in length';
      }
      break;
    case 'company':
      if (!value) {
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
