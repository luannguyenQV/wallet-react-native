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
} from './../actions/types';
import { PERSIST_REHYDRATE } from 'redux-persist/es/constants';

const INITIAL_STATE = {
  input: '',
  inputError: '',
  actionText: '',
  authFormState: '',
  authFormInputState: '',
  first_name: '',
  last_name: '',
  email: '',
  mobileNumber: null,
  countryName: 'US',
  countryCode: '+1',
  lineNumber: null,
  company: '',
  password: '',
  terms_and_conditions: false,
  token: null,
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
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
        [action.payload.prop]: state.input,
        inputError: '',
        loading: true,
      };
    case UPDATE_AUTH_FORM_FIELD_SUCCESS:
      return {
        ...state,
        [action.payload.prop]: action.payload.value,
        input: '',
        inputError: '',
        loading: false,
      };
    case UPDATE_AUTH_FORM_FIELD_FAIL:
      return {
        ...state,
        inputError: action.payload.inputError,
        loading: false,
      };

    case UPDATE_AUTH_FORM_STATE:
      const { authFormState, authFormInputState, actionText } = action.payload;
      return {
        ...state,
        authFormState,
        authFormInputState,
        actionText,
        // inputError: '',
        input: '',
        password: '',
        loading: false,
      };

    case LOGIN_USER:
      return {
        ...state,
        loading: true,
        error: '',
        input: '',
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        token: action.payload,
        loading: false,
      };
    case LOGIN_USER_FAIL:
      return {
        ...state,
        token: null,
        // passwordError: 'Unable to login with provided credentials',
        inputError:
          'Unable to login with provided credentials, please try again',
        input: state.email,
        loading: false,
      };

    case REGISTER_USER:
      return {
        ...state,
        loading: true,
        error: '',
        input: '',
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        token: action.payload,
        loading: false,
      };
    case REGISTER_USER_FAIL:
      return {
        ...state,
        token: null,
        // passwordError: 'Unable to login with provided credentials',
        inputError: 'User already registered with this email',
        input: state.email,
        loading: false,
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
