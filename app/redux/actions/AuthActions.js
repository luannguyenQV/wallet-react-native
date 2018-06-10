import {
  AUTH_FIELD_CHANGED,
  AUTH_FIELD_ERROR,
  TERMS_CHANGED,
  LOGIN_USER_ASYNC,
  REGISTER_USER_ASYNC,
  UPDATE_AUTH_FORM_STATE,
  LOGOUT_USER_ASYNC,
  LOADING,
  APP_LOAD_START,
  HIDE_MODAL,
  CHANGE_PASSWORD_ASYNC,
  VALIDATE_COMPANY_ASYNC,
  RESET_PASSWORD_ASYNC,
  RESET_AUTH,
} from './../types';

import clientConfig from './../../config/client';

import { IsEmail } from './../../util/validation';

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

export const nextAuthFormState = (props, nextFormState) => {
  const { authState, inputState, company, password, email } = props;

  let nextAuthState = authState;
  let nextInputState = '';
  let data = {};

  if (nextFormState) {
    nextAuthState = nextFormState;
    nextInputState = 'email';
  } else {
    let error = validation(props);
    if (error) {
      return {
        type: AUTH_FIELD_ERROR,
        payload: { prop: inputState, error },
      };
    } else {
      switch (authState) {
        case 'company':
          return {
            type: VALIDATE_COMPANY_ASYNC.pending,
            payload: company,
          };
        // case 'landing':
        //   nextAuthState = nextFormState;
        //   nextInputState = 'email';
        //   break;
        case 'login':
          switch (inputState) {
            case 'email':
              nextInputState = 'password';
              break;
            case 'password':
              data = { company, user: email, password };
              return {
                type: LOGIN_USER_ASYNC.pending,
                payload: data,
              };
              break;
          }
          break;
        case 'register':
          switch (inputState) {
            case 'email':
              nextInputState = 'password';
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
              break;
          }
          break;
        default:
          nextAuthState = 'company';
          nextInputState = 'company';
      }
    }
  }
  return {
    type: UPDATE_AUTH_FORM_STATE,
    payload: {
      inputState: nextInputState,
      authState: nextAuthState,
    },
  };
};

export const previousAuthFormState = props => {
  const { authState, inputState } = props;

  let nextAuthState = authState;
  let nextInputState = '';

  switch (authState) {
    case 'landing':
      nextAuthState = 'company';
      nextInputState = 'company';
      break;
    case 'forgot':
      nextAuthState = 'login';
      nextInputState = 'email';
      break;
    case 'login':
    case 'register':
      switch (inputState) {
        case 'email':
          nextAuthState = 'landing';
          break;
        case 'password':
          nextInputState = 'email';
          break;
      }
      break;
    default:
      nextAuthState = 'company';
      nextInputState = 'company';
  }
  return {
    type: UPDATE_AUTH_FORM_STATE,
    payload: {
      inputState: nextInputState,
      authState: nextAuthState,
    },
  };
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

export const termsChanged = ({ prop, value }) => {
  return {
    type: TERMS_CHANGED,
    payload: { prop, value: !value },
  };
};

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

export const resetAuth = () => {
  return {
    type: RESET_AUTH,
  };
};

// export const hideModal = () => {
//   return {
//     type: HIDE_MODAL,
//   };
// };

export const resetPassword = (company, email) => {
  return {
    type: RESET_PASSWORD_ASYNC.pending,
    payload: { user: email, company },
  };
};

performRegister = data => {
  return {
    type: REGISTER_USER_ASYNC.pending,
    payload: data,
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT_USER_ASYNC.pending,
  };
};
