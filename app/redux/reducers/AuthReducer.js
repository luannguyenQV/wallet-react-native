import { PERSIST_REHYDRATE } from 'redux-persist/es/constants';
import {
  AUTH_FIELD_CHANGED,
  AUTH_FIELD_ERROR,
  LOGIN_USER_ASYNC,
  REGISTER_USER_ASYNC,
  VALIDATE_COMPANY_ASYNC,
  UPDATE_AUTH_FORM_STATE,
  CHANGE_PASSWORD_ASYNC,
  RESET_PASSWORD_ASYNC,
  LOGOUT_USER_ASYNC,
  RESET_AUTH,
  APP_LOAD_START,
  APP_LOAD_FINISH,
  SET_PIN,
  RESET_PIN,
  ACTIVATE_FINGERPRINT,
  INIT,
} from './../actions/AuthActions';
import { HIDE_MODAL } from './../actions/UserActions';

const INITIAL_STATE = {
  mainState: '',
  detailState: '',
  first_name: '',
  last_name: '',
  email: '',
  emailError: '',
  mobile: null,
  mobileError: null,
  // countryName: 'US',
  // countryCode: '+1',
  // lineNumber: null,
  company: '',
  companyError: '',
  password: '',
  passwordError: '',
  new_password: '',
  terms_and_conditions: false,

  token: '',
  loading: false,
  appLoading: false,
  modalVisible: false,

  pin: '',
  fingerprint: false,
};

export default (state = INITIAL_STATE, action) => {
  // console.log('action', action);
  switch (action.type) {
    case PERSIST_REHYDRATE:
      return action.payload.auth || [];

    case INIT.pending:
      return {
        ...state,
        appLoading: true,
      };
    case INIT.success:
    case INIT.fail:
      return {
        ...state,
        appLoading: false,
      };

    case AUTH_FIELD_CHANGED:
      return {
        ...state,
        [action.payload.prop]: action.payload.value,
        [action.payload.prop + 'Error']: '',
      };
    case AUTH_FIELD_ERROR:
      return {
        ...state,
        [action.payload.prop + 'Error']: action.payload.error,
      };

    case UPDATE_AUTH_FORM_STATE:
      const { mainState, detailState } = action.payload;
      return {
        ...state,
        mainState,
        detailState,
        password: '',
        loading: false,
      };

    case LOGIN_USER_ASYNC.pending:
      return {
        ...state,
        loading: true,
        password: '',
      };
    case LOGIN_USER_ASYNC.success:
      return {
        ...state,
        mainState: '',
        detailState: '',
        token: action.payload,
        loading: false,
        appLoading: true,
        pin: '',
        fingerprint: false,
      };
    case LOGIN_USER_ASYNC.error:
      return {
        ...state,
        token: null,
        modalVisible: true,
        modalType: 'loginError',
        loading: false,
        appLoading: false,
        detailState: 'email',
        mainState: 'login',
      };

    case REGISTER_USER_ASYNC.pending:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_USER_ASYNC.success:
      return {
        ...state,
        token: action.payload,
        loading: false,
        appLoading: false,
        pin: '',
        fingerprint: false,
      };
    case REGISTER_USER_ASYNC.error:
      return {
        ...state,
        token: null,
        inputError: action.payload,
        loading: false,
        appLoading: false,
      };

    case CHANGE_PASSWORD_ASYNC.pending:
      return {
        ...state,
        loading: true,
        passwordError: '',
      };
    case CHANGE_PASSWORD_ASYNC.success:
      return {
        ...state,
        password: '',
        new_password: '',
        loading: false,
      };
    case CHANGE_PASSWORD_ASYNC.error:
      return {
        ...state,
        passwordError: action.payload,
        password: '',
        new_password: '',
        loading: false,
      };

    case VALIDATE_COMPANY_ASYNC.pending:
      return {
        ...state,
        loading: true,
      };
    case VALIDATE_COMPANY_ASYNC.success:
      return {
        ...state,
        company: action.payload,
        loading: false,
      };
    case VALIDATE_COMPANY_ASYNC.error:
      return {
        ...state,
        companyError: action.payload,
        loading: false,
      };

    case RESET_PASSWORD_ASYNC.pending:
      return {
        ...state,
        loading: true,
      };
    case RESET_PASSWORD_ASYNC.success:
      return {
        ...state,
        modalType: 'forgot',
        modalVisible: true,
        loading: false,
      };
    case RESET_PASSWORD_ASYNC.error:
      return {
        ...state,
        // companyError: action.payload,
        loading: false,
      };

    case RESET_AUTH:
      return {
        ...state,
        companyError: '',
        passwordError: '',
        emailError: '',
        password: '',
        mainState: 'landing',
        detailState: '',
        modalVisible: false,
        loading: false,
        appLoading: false,
      };

    case HIDE_MODAL:
      return {
        ...state,
        modalVisible: false,
        modalType: '',
      };

    case SET_PIN:
      return {
        ...state,
        pin: action.payload,
        fingerprint: false,
      };

    case ACTIVATE_FINGERPRINT:
      return {
        ...state,
        fingerprint: true,
        pin: '',
      };
    case RESET_PIN:
      return {
        ...state,
        pin: '',
        fingerprint: false,
      };

    case APP_LOAD_START:
      return {
        ...state,
        appLoading: true,
      };
    case APP_LOAD_FINISH:
      return {
        ...state,
        appLoading: false,
      };

    case LOGOUT_USER_ASYNC.success:
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
