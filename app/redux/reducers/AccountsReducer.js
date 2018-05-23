import {
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAIL,
  FETCH_PROFILE,
  FETCH_ACCOUNTS_ASYNC,
  UPDATE_CURRENT_INDEX,
  SET_ACTIVE_CURRENCY_SUCCESS,
  SET_ACTIVE_CURRENCY_FAIL,
  SET_ACTIVE_CURRENCY,
  SEND_FIELD_UPDATE,
  SEND_FIELD_ERROR,
  SET_SEND_STATE,
  SET_SEND_WALLET,
  SET_SEND_AMOUNT,
  SET_SEND_RECIPIENT,
  SET_SEND_NOTE,
  RESET_SEND,
  SEND_SUCCESS,
  SEND_FAIL,
  SEND,
  LOGOUT_USER,
  // APP_LOAD_FINISH,
} from './../types';
import { PERSIST_REHYDRATE } from 'redux-persist/es/constants';

const INITIAL_STATE = {
  user: null,
  // accounts: null,
  wallets: null,
  activeWalletIndex: 0,
  loading_profile: false,
  loading_accounts: false,
  loadingActiveCurrencyChange: false,
  sendAmount: null,
  sendWallet: null,
  sendRecipient: '',
  sendNote: '',
  sendReference: null,
  sendState: '',
};

export default (state = INITIAL_STATE, action) => {
  // console.log(action);
  switch (action.type) {
    case PERSIST_REHYDRATE:
      return action.payload.auth || [];
    case FETCH_PROFILE:
      return {
        ...state,
        loading_profile: true,
      };
    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
        loading_profile: false,
      };
    case FETCH_PROFILE_FAIL:
      return {
        ...state,
        loading_profile: false,
      };
    case FETCH_ACCOUNTS_ASYNC.PENDING:
      return {
        ...state,
        loading_accounts: true,
      };
    case FETCH_ACCOUNTS_ASYNC.SUCCESS:
      return {
        ...state,
        wallets: action.payload.wallets,
        activeWalletIndex: action.payload.activeWalletIndex,
        showAccountLabel: action.payload.showAccountLabel,
        loading_accounts: false,
      };
    case FETCH_ACCOUNTS_ASYNC.ERROR:
      return {
        ...state,
        loading_accounts: false,
      };
    case UPDATE_CURRENT_INDEX:
      return {
        ...state,
        activeWalletIndex: action.payload,
      };
    case SET_ACTIVE_CURRENCY:
      return {
        ...state,
        loadingActiveCurrencyChange: true,
      };
    case SET_ACTIVE_CURRENCY_SUCCESS:
      return {
        ...state,
        // user: action.payload,
        loadingActiveCurrencyChange: false,
      };
    case SET_ACTIVE_CURRENCY_FAIL:
      return {
        ...state,
        loadingActiveCurrencyChange: false,
      };
    case SEND_FIELD_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case SET_SEND_WALLET:
      return {
        ...state,
        sendWallet: action.payload,
        sendState: 'amount',
        sendError: '',
      };
    case SEND_FIELD_ERROR:
      return {
        ...state,
        sendError: action.payload,
      };
    case SET_SEND_STATE:
      return {
        ...state,
        sendState: action.payload,
        sendError: '',
      };
    case RESET_SEND:
      return {
        ...state,
        sendAmount: null,
        sendCurrency: null,
        sendRecipient: null,
        sendNote: null,
        sendReference: null,
        sendState: 'amount',
        sendError: '',
      };
    case SEND:
      return {
        ...state,
        sending: true,
      };
    case SEND_SUCCESS:
      return {
        ...state,
        sendState: 'success',
        sending: false,
      };
    case SEND_FAIL:
      return {
        ...state,
        sendState: 'fail',
        sendError: action.payload,
        sending: false,
      };

    case LOGOUT_USER:
      return INITIAL_STATE;
    default:
      return state;
  }
};
