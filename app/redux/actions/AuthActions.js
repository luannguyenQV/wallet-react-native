import {
  AUTH_FIELD_CHANGED,
  AUTH_FIELD_ERROR,
  TERMS_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  UPDATE_AUTH_FORM_FIELD,
  UPDATE_AUTH_FORM_FIELD_SUCCESS,
  UPDATE_AUTH_FORM_FIELD_FAIL,
  UPDATE_AUTH_FORM_STATE,
  LOGOUT_USER,
} from './types';

import clientConfig from './../../config/client';

import { IsEmail } from './../../util/validation';
import AuthService from './../../services/authService';

export const initialLoad = props => async dispatch => {
  if (props.token) {
    dispatch({ type: LOGIN_USER_SUCCESS, payload: token });
  } else {
    if (props.company) {
      dispatch(
        updateAuthFormState({ nextFormState: 'landing', inputState: '' }),
      );
    } else {
      dispatch(
        updateAuthFormState({ nextFormState: 'company', inputState: '' }),
      );
    }
  }
};

export const updateAuthFormState = ({
  authState,
  inputState,
  nextFormState,
}) => {
  console.log('updateAuthInputState');
  console.log('inputState: ', inputState);
  console.log('authState: ', authState);
  console.log('nextFormState: ', nextFormState);
  let actionText = '';
  let nextInputState = '';
  if (nextFormState === 'landing') {
    nextInputState = '';
  } else if (nextFormState === 'company') {
    actionText = 'Save';
    nextInputState = 'company';
  } else if (nextFormState === 'register') {
    if (clientConfig.requireEmail) {
      nextInputState = 'email';
    } else if (clientConfig.requireMobile) {
      nextInputState = 'mobile';
    } else {
      nextInputState = 'email';
    }
    actionText = 'Next';
  } else if (nextFormState === 'login') {
    if (clientConfig.requireEmail) {
      nextInputState = 'email';
    } else if (clientConfig.requireMobile) {
      nextInputState = 'mobile';
    } else {
      nextInputState = 'email';
    }
    actionText = 'Next';
  } else {
    if (authState === 'company') {
      nextInputState = '';
      nextFormState = 'landing';
    } else if (authState === 'login') {
      if (inputState === '') {
        actionText = 'Next';
        nextInputState = 'email';
      } else if (inputState === 'email') {
        actionText = 'Log in';
        nextInputState = 'password';
      } else if (inputState === 'password') {
        nextInputState = '';
        nextFormState = 'landing';
      }
    } else if (authState === 'register') {
      if (inputState === 'email') {
        if (clientConfig.requireMobile) {
          nextInputState = 'mobile';
          actionText = 'Next';
        } else if (clientConfig.requireTerms) {
          nextInputState = 'terms';
          actionText = 'Next';
        } else {
          nextInputState = 'password';
          actionText = 'Register';
        }
      } else if (inputState === 'mobile') {
        if (clientConfig.requireTerms) {
          nextInputState = 'terms';
          actionText = 'Next';
        } else {
          nextInputState = 'password';
          actionText = 'Register';
        }
      } else if (inputState === 'terms') {
        nextState = 'password';
        actionText = 'Register';
      }
    }
    if (!nextFormState) {
      nextFormState = authState;
    }
  }
  console.log('UPDATE_AUTH_FORM_STATE');
  console.log('actionText: ', actionText);
  console.log('nextInputState: ', nextInputState);
  console.log('nextFormState: ', nextFormState);
  return {
    type: UPDATE_AUTH_FORM_STATE,
    payload: {
      actionText,
      authFormInputState: nextInputState,
      authFormState: nextFormState,
    },
  };
  // console.log({ nextState, actionText });
  // dispatch({
  //   type: UPDATE_AUTH_INPUT_STATE,
  //   payload: { actionText, nextState },
  // });
  // return {
  //   type: UPDATE_AUTH_INPUT_STATE,
  //   payload: { nextState, actionText },
  // };
};

export const updateAuthInputField = props => async dispatch => {
  let authState = props.authFormState;
  let inputState = props.authFormInputState;
  let value = props.input;
  let error = validation(inputState, value);
  if (error) {
    dispatch({
      type: AUTH_FIELD_ERROR,
      payload: { error },
    });
  } else {
    dispatch({
      type: UPDATE_AUTH_FORM_FIELD,
    });

    if (inputState === 'password') {
      if (authState === 'login') {
        dispatch({ type: LOGIN_USER });
        let data = {
          user: props.email,
          company: props.company,
          password: value,
        };
        performLogin(dispatch, data);
      } else if (authState === 'register') {
        dispatch({ type: REGISTER_USER });
        let data = {
          email: props.email,
          company: props.company,
          password1: value,
          password2: value,
        };
        performRegister(dispatch, data);
      }
    } else {
      let response = await performCompanyServerValidation(props);

      console.log('response', response);
      if (!response) {
        dispatch({
          type: UPDATE_AUTH_FORM_FIELD_SUCCESS,
          payload: { prop: inputState, value },
        });
        dispatch(updateAuthFormState({ authState, inputState }));
      } else {
        dispatch({
          type: UPDATE_AUTH_FORM_FIELD_FAIL,
          payload: { inputError: response },
        });
      }
    }
  }
};

performCompanyServerValidation = async props => {
  let authState = props.authFormState;
  let inputState = props.authFormInputState;
  let value = props.input;

  if (authState === 'company') {
    let responseJson = await AuthService.signup({ company: value });
    console.log(responseJson.data);
    if (responseJson.data.company) {
      return 'Please enter a valid company ID';
    }
  }
  return '';
};

export const authFieldChange = ({ prop, value }) => {
  return {
    type: AUTH_FIELD_CHANGED,
    payload: { prop, value },
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
    loginUserFail(dispatch);
  }
};

const loginUserFail = dispatch => {
  dispatch(updateAuthFormState({ nextFormState: 'login', inputState: '' }));
  dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, token) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: token,
  });
};

performRegister = async (dispatch, data) => {
  let responseJson = await AuthService.signup(data);

  if (responseJson.status === 'success') {
    const loginInfo = responseJson.data;
    registerUserSuccess(dispatch, loginInfo.token);
  } else {
    registerUserFail(dispatch);
  }
};

const registerUserFail = dispatch => {
  dispatch(updateAuthFormState({ nextFormState: 'register', inputState: '' }));
  dispatch({ type: REGISTER_USER_FAIL });
};

const registerUserSuccess = (dispatch, token) => {
  dispatch({
    type: REGISTER_USER_SUCCESS,
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
