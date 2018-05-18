import {
  AUTH_FIELD_CHANGED,
  AUTH_FIELD_ERROR,
  TERMS_CHANGED,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  UPDATE_AUTH_FORM_STATE,
  LOGOUT_USER,
  LOADING,
} from './../types';

import clientConfig from './../../config/client';

import { IsEmail } from './../../util/validation';
import AuthService from './../../services/authService';

export const initialLoad = props => async dispatch => {
  if (props.token) {
    dispatch({ type: LOGIN_USER_SUCCESS, payload: token });
  } else {
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

  if (error) {
    dispatch({
      type: AUTH_FIELD_ERROR,
      payload: { error },
    });
  } else {
    iconHeaderLeft = 'md-arrow-back';
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
          return;
        } else {
          nextAuthState = 'landing';
        }
        break;
      case 'landing':
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
            await performLogin(dispatch, data);
            return;
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
            return;
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

export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
  };
};

performLogin = async (dispatch, data) => {
  dispatch({
    type: LOGIN_USER,
  });
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
    loginUserFail(dispatch);
  }
};

const loginUserFail = dispatch => {
  dispatch({ type: LOGIN_USER_FAIL });
  dispatch(
    previousAuthFormState({ authState: 'login', inputState: 'password' }),
  );
};

const loginUserSuccess = (dispatch, token) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: token,
  });
};

performRegister = async (dispatch, data) => {
  dispatch({
    type: REGISTER_USER,
  });
  let responseJson = await AuthService.signup(data);

  console.log('responseJson', responseJson);
  if (responseJson.status === 'success') {
    const loginInfo = responseJson.data;
    registerUserSuccess(dispatch, loginInfo.token);
  } else {
    registerUserFail(dispatch, responseJson.message);
  }
};

const registerUserFail = (dispatch, error) => {
  dispatch({ type: REGISTER_USER_FAIL, payload: error });
  dispatch(
    previousAuthFormState({ authState: 'register', inputState: 'password' }),
  );
};

const registerUserSuccess = (dispatch, token) => {
  dispatch({
    type: REGISTER_USER_SUCCESS,
    payload: token,
  });
};
