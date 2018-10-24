import { PERSIST_REHYDRATE } from 'redux-persist/es/constants';
import { createSelector } from 'reselect';
import {
  AUTH_FIELD_CHANGED,
  AUTH_FIELD_ERROR,
  LOGIN_USER_ASYNC,
  UPDATE_AUTH_FORM_STATE,
  CHANGE_PASSWORD_ASYNC,
  RESET_PASSWORD_ASYNC,
  LOGOUT_USER_ASYNC,
  RESET_AUTH,
  APP_LOAD,
  SET_PIN,
  RESET_PIN,
  ACTIVATE_FINGERPRINT,
  INIT,
  PIN_FAIL,
  LOADING,
  SET_COMPANY,
  AUTH_COMPLETE,
  POST_LOADING,
  POST_NOT_LOADING,
  SHOW_FINGERPRINT_MODAL,
  INIT_MFA,
  RESET_MFA,
  NEXT_STATE_MFA,
  UPDATE_MFA_ERROR,
  UPDATE_MFA_STATE,
  UPDATE_MFA_TOKEN,
  VERIFY_MFA,
  AUTH_STORE_USER,
  POST_AUTH_FLOW_FINISH,
  TOGGLE_TERMS,
  SHOW_PIN,
  HIDE_PIN,
} from '../actions/AuthActions';
import { HIDE_MODAL } from '../actions/UserActions';
import { SET_TRANSACTION_TYPE } from '../actions';
import { authStateSelector, userStateSelector } from '../sagas/selectors';

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
  companies: [],
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
  pinVisible: false,
  mfaState: 'loading',
};

export default (state = INITIAL_STATE, action) => {
  // console.log('action', action);
  switch (action.type) {
    case PERSIST_REHYDRATE:
      return action.payload.auth || INITIAL_STATE;

    case INIT.pending:
      return {
        ...state,
        mainState: 'company',
        detailState: 'company',
        appLoading: true,
        postLoading: false,
        pinError: '',
        code: '',
        password: '', // these are here
        old_password: '', // to ensure all
        new_password: '', // passwords are reset
      };
    case INIT.success:
      return {
        ...state,
        appLoading: false,
        mainState: action.payload.mainState,
        detailState: action.payload.detailState,
        password: '',
        loading: false,
        token: action.payload.mainState === 'landing' ? '' : state.token,
      };
    case INIT.fail:
      return {
        ...state,
        appLoading: false,
        pin: '',
        fingerprint: false,
      };

    case VERIFY_MFA:
    case LOADING:
      return {
        ...state,
        loading: true,
      };

    case AUTH_FIELD_CHANGED:
      return {
        ...state,
        [action.payload.prop]: action.payload.value,
        [action.payload.prop + 'Error']: '',
        authError: '',
      };
    case AUTH_FIELD_ERROR:
      return {
        ...state,
        [action.payload.prop + 'Error']: action.payload.error,
      };

    case UPDATE_AUTH_FORM_STATE:
      const { mainState, detailState, authError, skip, terms } = action.payload;
      return {
        ...state,
        mainState,
        detailState,
        authError,
        skip,
        terms,
        termsChecked: false,
        password: detailState === 'terms' ? state.password : '',
        loading: false,
      };

    case LOGIN_USER_ASYNC.success:
      return {
        ...state,
        user: action.payload,
      };

    case CHANGE_PASSWORD_ASYNC.pending:
      return {
        ...state,
        loading: true,
        inputError: '',
      };
    case CHANGE_PASSWORD_ASYNC.success:
      return {
        ...state,
        password: '',
        old_password: '',
        new_password: '',
        loading: false,
      };
    case CHANGE_PASSWORD_ASYNC.error:
      return {
        ...state,
        inputError: action.payload,
        password: '',
        old_password: '',
        new_password: '',
        loading: false,
      };

    case SHOW_FINGERPRINT_MODAL:
      return {
        ...state,
        modalType: 'fingerprint',
        modalVisible: true,
      };

    case TOGGLE_TERMS:
      return {
        ...state,
        termsChecked: !state.termsChecked,
        authError: '',
      };

    case SET_COMPANY:
      let companies = state.companies ? state.companies : [];
      if (companies.indexOf(action.payload.company) === -1) {
        companies.push(action.payload.company);
      }
      return {
        ...state,
        company: action.payload.company,
        company_config: action.payload.company_config,
        companies,
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
        authError: action.payload,
        loading: false,
      };

    case RESET_AUTH:
      return {
        ...state,
        authError: '',
        password: '',
        mainState: 'landing',
        detailState: '',
        modalVisible: false,
        loading: false,
        appLoading: false,
        skip: false,
        old_password: '',
        new_password: '',
      };
    case AUTH_COMPLETE:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authError: '',
      };
    case AUTH_STORE_USER:
      return {
        ...state,
        user: action.payload,
      };
    // case POST_AUTH_FLOW_FINISH:
    //   return {
    //     ...state,
    //     // user: action.payload,
    //   };

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
        modalVisible: false,
      };
    case RESET_PIN:
      return {
        ...state,
        pin: '',
        fingerprint: false,
      };
    case PIN_FAIL:
      return {
        ...state,
        pinError: action.payload,
      };

    case APP_LOAD.pending:
      return {
        ...state,
        mainState: '',
        detailState: '',
        appLoading: true,
      };
    case APP_LOAD.success:
      return {
        ...state,
        appLoading: false,
        postLoading: false,
      };

    case POST_LOADING:
      return {
        ...state,
        postLoading: true,
      };
    case POST_NOT_LOADING:
      return {
        ...state,
        postLoading: false,
      };

    case INIT_MFA:
      return {
        ...state,
        mfaState: 'loading',
      };
    case RESET_MFA:
      return {
        ...state,
        mfaState: 'landing',
        mfaError: '',
        mfaLoading: false,
      };

    case NEXT_STATE_MFA:
      return {
        ...state,
        mfaLoading: true,
      };
    case UPDATE_MFA_STATE:
      return {
        ...state,
        mfaState: action.payload,
        mfaLoading: false,
      };
    case UPDATE_MFA_ERROR:
      return {
        ...state,
        mfaError: action.payload,
      };
    case UPDATE_MFA_TOKEN:
      return {
        ...state,
        mfaToken: action.payload,
      };

    case SHOW_PIN:
      return {
        ...state,
        pinVisible: true,
      };
    case SET_TRANSACTION_TYPE:
    case HIDE_PIN:
      return {
        ...state,
        pinVisible: false,
      };

    case LOGOUT_USER_ASYNC.pending:
      return {
        ...state,
        loggingOut: true,
      };

    case LOGOUT_USER_ASYNC.success:
      return {
        token: '',
        authError: '',
        mainState: 'landing',
        detailState: 'landing',
        pin: '',
        fingerprint: false,
        appLoading: false,
        company: state.company,
        company_config: state.company_config,
        companies: state.companies,
        email: state.email,
        modalVisible: false,
        loggingOut: false,
      };

    default:
      return state;
  }
};

export const settingsSelector = createSelector(
  [authStateSelector, userStateSelector],
  (authState, userState) => {
    const { modalType, modalVisible } = userState;
    const { loggingOut } = authState;
    return {
      modalVisible: modalVisible ? modalVisible : false,
      modalType: modalType ? modalType : '',
      loggingOut: loggingOut ? loggingOut : false,
    };
  },
);
