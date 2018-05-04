import {
  AUTH_FIELD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  AUTH_FIELD_ERROR,
  AUTH_FIELD_FOCUS,
  LOGOUT_USER,
} from './../actions/types';
import { PERSIST_REHYDRATE } from 'redux-persist/es/constants';

const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  email: '',
  emailError: '',
  mobileNumber: null,
  mobileNumberError: null,
  countryName: 'US',
  countryCode: '+1',
  lineNumber: null,
  company: '',
  companyError: null,
  password: '',
  passwordError: true,
  password2: '',
  password2Error: true,
  terms: false,
  termsError: '',
  loginError: '',
  token: null,
  user: null,
  loading: false,
  focusProp: null,
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case PERSIST_REHYDRATE:
      return action.payload.auth || [];
    case AUTH_FIELD_CHANGED:
      return {
        ...state,
        [action.payload.prop]: action.payload.value,
        [action.payload.prop + 'Error']: action.payload.error,
      };
    case AUTH_FIELD_ERROR:
      return {
        ...state,
        [action.payload.prop + 'Error']: action.payload.error,
      };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        password: '',
        token: action.payload,
        loading: false,
      };
    case LOGIN_USER_FAIL:
      return {
        ...state,
        // loginError: 'Authentication failed.',
        password: '',
        token: null,
        loading: false,
      };
    case AUTH_FIELD_FOCUS:
      return {
        ...state,
        focusProp: action.payload,
      };
    case LOGOUT_USER:
      console.log('logged out');
      return {
        ...state,
        token: '',
        user: '',
      };
    default:
      return state;
  }
};
