import {
  AUTH_FIELD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  UPDATE_AUTH_FORM_FIELD_SUCCESS,
  UPDATE_AUTH_FORM_FIELD_FAIL,
  AUTH_FIELD_ERROR,
  AUTH_FIELD_FOCUS,
  LOGOUT_USER,
  TERMS_CHANGED,
  UPDATE_AUTH_FORM_STATE,
  UPDATE_REGISTER_FORM_STATE,
  UPDATE_AUTH_FORM_FIELD,
} from './../actions/types';
import { PERSIST_REHYDRATE } from 'redux-persist/es/constants';

const INITIAL_STATE = {
  first_name: '',
  input: '',
  inputError: '',
  last_name: '',
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
  terms_and_conditions: false,
  termsError: '',
  loginError: '',
  token: null,
  user: null,
  loading: false,
  authFormState: 'invalidCompany',
  registerFormState: 'email',
  actionText: 'Next',
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
        inputError: action.payload.error,
      };
    case TERMS_CHANGED:
      return {
        ...state,
        [action.payload.prop]: action.payload.value,
      };
    case UPDATE_AUTH_FORM_FIELD:
      return {
        ...state,
        loading: true,
        inputError: '',
      };
    case UPDATE_AUTH_FORM_FIELD_SUCCESS:
      return {
        ...state,
        // authFormState: 'validCompany',
        input: '',
        inputError: '',
        loading: false,
      };
    case UPDATE_AUTH_FORM_FIELD_FAIL:
      return {
        ...state,
        inputError: action.payload,
        loading: false,
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
        authFormState: 'validCompany',
        password: '',
        token: null,
        // passwordError: 'Unable to login with provided credentials',
        inputError: '',
        loading: false,
      };
    case UPDATE_AUTH_FORM_STATE:
      return {
        ...state,
        authFormState: action.payload,
        registerFormState: '',
        inputError: '',
        password: '',
      };
    case UPDATE_AUTH_FORM_FIELD:
      return {
        ...state,
        authFormState: action.payload,
        registerFormState: '',
        inputError: '',
        loading: '',
      };
    case UPDATE_REGISTER_FORM_STATE:
      return {
        ...state,
        registerFormState: action.payload.nextState,
        actionText: action.payload.actionText,
        inputError: '',
        input: '',
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
