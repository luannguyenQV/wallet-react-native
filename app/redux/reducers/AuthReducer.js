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
  UPDATE_AUTH_FORM_STATE,
  LOGOUT_USER,
  LOADING,
} from './../types';
import { PERSIST_REHYDRATE } from 'redux-persist/es/constants';

const INITIAL_STATE = {
  input: '',
  inputError: '',
  textFooterRight: '',
  authState: '',
  inputState: '',
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
  console.log(action);
  switch (action.type) {
    case PERSIST_REHYDRATE:
      return action.payload.auth || [];
    case AUTH_FIELD_CHANGED:
      return {
        ...state,
        [action.payload.prop]: action.payload.value,
        inputError: '',
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

    case UPDATE_AUTH_FORM_STATE:
      const {
        authState,
        inputState,
        textFooterRight,
        iconHeaderLeft,
      } = action.payload;
      return {
        ...state,
        authState,
        inputState,
        textFooterRight,
        iconHeaderLeft,
        // inputError: '',
        password: '',
        loading: false,
      };

    case LOADING:
      return {
        ...state,
        loading: true,
      };

    case LOGIN_USER:
      return {
        ...state,
        loading: true,
        inputError: '',
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
        loading: false,
      };

    case REGISTER_USER:
      return {
        ...state,
        loading: true,
        inputError: '',
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
        inputError: action.payload,
        loading: false,
      };

    case LOGOUT_USER:
      return {
        ...state,
        token: '',
        user: '',
      };
    default:
      return state;
  }
};
