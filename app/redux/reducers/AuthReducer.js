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
  APP_LOAD_FINISH,
  CHANGE_PASSWORD_ASYNC,
  HIDE_MODAL,
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
  token: '',
  loading: false,
  hasFetched: false,
  appLoading: true,
  old_password: '',
  new_password: '',
};

export default (state = INITIAL_STATE, action) => {
  // console.log('action', action);
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
        [action.payload.prop + 'Error']: action.payload.error,
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

    case LOGIN_USER_ASYNC.pending:
      return {
        ...state,
        loading: true,
        inputError: '',
        password: '',
      };
    case LOGIN_USER_ASYNC.success:
      return {
        ...state,
        authState: '',
        inputState: '',
        token: action.payload,
        loading: false,
        old_passwordError: '',
        new_passwordError: '',
        old_password: '',
        new_password: '',
      };
    case LOGIN_USER_ASYNC.error:
      return {
        ...state,
        token: null,
        // passwordError: 'Unable to login with provided credentials',
        inputError: action.payload,
        loading: false,
      };

    case REGISTER_USER_ASYNC.pending:
      return {
        ...state,
        loading: true,
        inputError: '',
      };
    case REGISTER_USER_ASYNC.success:
      return {
        ...state,
        token: action.payload,
        loading: false,
      };
    case REGISTER_USER_ASYNC.error:
      return {
        ...state,
        token: null,
        inputError: action.payload,
        loading: false,
      };

    case CHANGE_PASSWORD_ASYNC.pending:
      return {
        ...state,
        loading: true,
        inputError: '',
        modalVisible: false,
      };
    case CHANGE_PASSWORD_ASYNC.success:
      return {
        ...state,
        old_password: '',
        new_password1: '',
        new_password2: '',
        modalVisible: true,
        loading: false,
      };
    case CHANGE_PASSWORD_ASYNC.error:
      return {
        ...state,
        inputError: action.payload,
        // [action.payload.prop + 'Error']: action.payload.error,
        old_password: '',
        new_password1: '',
        new_password2: '',
        loading: false,
        modalVisible: true,
      };

    case HIDE_MODAL:
      return {
        ...state,
        inputError: '',
        modalVisible: false,
      };

    case APP_LOAD_START:
      return {
        ...state,
        appLoading: true,
        textFooterRight: '',
      };
    case APP_LOAD_FINISH:
      return {
        ...state,
        appLoading: false,
      };

    case LOGOUT_USER:
      return {
        token: null,
        appLoading: true,
        company: state.company,
        email: state.email,
      };
    default:
      return state;
  }
};
