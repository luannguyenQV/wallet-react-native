import { AsyncStorage } from 'react-native';
import {
  AUTH_FIELD_CHANGED,
  AUTH_FIELD_ERROR,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  AUTH_FIELD_FOCUS,
  LOGOUT_USER,
} from './types';

import { IsEmail } from './../../util/validation';
import AuthService from './../../services/authService';
import Auth from './../../util/auth';

export const initialLoad = () => async dispatch => {
  let token = await AsyncStorage.getItem('token');

  if (token) {
    dispatch({ type: LOGIN_USER_SUCCESS, payload: token });
  } else {
    let email = await AsyncStorage.getItem('email');
    let company = await AsyncStorage.getItem('company');
    dispatch({
      type: AUTH_FIELD_CHANGED,
      payload: { prop: 'email', value: email },
    });
    dispatch({
      type: AUTH_FIELD_CHANGED,
      payload: { prop: 'company', value: company },
    });
    dispatch({ type: LOGIN_USER_FAIL });
  }
};

export const authFieldChange = ({ prop, value }) => {
  let error = validation(prop, value);
  return {
    type: AUTH_FIELD_CHANGED,
    payload: { prop, value, error },
  };
};

export const logoutUser = () => {
  return async ({ dispatch }) => {
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('token');
    dispatch({
      type: LOGOUT_USER,
    });
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
    await AsyncStorage.setItem('token', loginInfo.token);
    await AsyncStorage.setItem('email', data.user);
    await AsyncStorage.setItem('company', data.company);
    console.log('asyncset');
    console.log(data);
    console.log(loginInfo.token);

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
    default:
      error = '';
  }
  return error;
};
