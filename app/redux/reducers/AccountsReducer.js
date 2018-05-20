import {
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAIL,
  FETCH_PROFILE,
  FETCH_ACCOUNTS,
  FETCH_ACCOUNTS_SUCCESS,
  FETCH_ACCOUNTS_FAIL,
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
  loadingProfile: false,
  loadingAccounts: false,
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
        loadingProfile: true,
      };
    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
        loadingProfile: false,
      };
    case FETCH_PROFILE_FAIL:
      return {
        ...state,
        loadingProfile: false,
      };
    case FETCH_ACCOUNTS:
      return {
        ...state,
        loadingAccounts: true,
      };
    case FETCH_ACCOUNTS_SUCCESS:
      return {
        ...state,
        wallets: action.payload.wallets,
        activeWalletIndex: action.payload.activeWalletIndex,
        showAccountLabel: action.payload.showAccountLabel,
        loadingAccounts: false,
      };
    case FETCH_ACCOUNTS_FAIL:
      return {
        ...state,
        loadingAccounts: false,
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
        inputError: '',
      };
    case SEND_FIELD_ERROR:
      return {
        ...state,
        inputError: action.payload,
      };
    case SET_SEND_STATE:
      return {
        ...state,
        sendState: action.payload,
        inputError: '',
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
        inputError: '',
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
        inputError: action.payload,
        sending: false,
      };

    case LOGOUT_USER:
      return INITIAL_STATE;
    default:
      return state;
  }
};
