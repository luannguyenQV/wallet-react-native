import {
  FETCH_USER_SUCCESS,
  FETCH_USER_FAIL,
  FETCH_USER,
  FETCH_ACCOUNTS,
  FETCH_ACCOUNTS_SUCCESS,
  FETCH_ACCOUNTS_FAIL,
  UPDATE_TEMP_CURRENCY,
  SET_ACTIVE_CURRENCY_SUCCESS,
  SET_ACTIVE_CURRENCY_FAIL,
  SET_ACTIVE_CURRENCY,
  SEND_FIELD_UPDATE,
  SEND_FIELD_ERROR,
  SET_SEND_STATE,
  SET_SEND_CURRENCY,
  SET_SEND_AMOUNT,
  SET_SEND_RECIPIENT,
  SET_SEND_NOTE,
  RESET_SEND,
  SEND_SUCCESS,
  SEND_FAIL,
  SEND,
} from './../actions/types';
import { PERSIST_REHYDRATE } from 'redux-persist/es/constants';

const INITIAL_STATE = {
  user: null,
  accounts: null,
  tempCurrency: null,
  tempCurrencyIndex: 0,
  loadingUser: false,
  loadingAccounts: false,
  loadingActiveCurrencyChange: false,
  sendAmount: null,
  sendCurrency: null,
  sendRecipient: '',
  sendNote: '',
  sendReference: null,
  sendState: '',
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case PERSIST_REHYDRATE:
      return action.payload.auth || [];
    case FETCH_USER:
      return {
        ...state,
        loadingUser: true,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loadingUser: false,
      };
    case FETCH_USER_FAIL:
      return {
        ...state,
        loadingUser: false,
      };
    case FETCH_ACCOUNTS:
      return {
        ...state,
        loadingAccounts: true,
      };
    case FETCH_ACCOUNTS_SUCCESS:
      return {
        ...state,
        accounts: action.payload.accounts,
        tempCurrency: action.payload.tempCurrency,
        tempCurrencyIndex: action.payload.activeAccountIndex,
        loadingAccounts: false,
      };
    case FETCH_ACCOUNTS_FAIL:
      return {
        ...state,
        loadingAccounts: false,
      };
    case UPDATE_TEMP_CURRENCY:
      return {
        ...state,
        tempCurrency: action.payload.tempCurrency,
        tempCurrencyIndex: action.payload.activeAccountIndex,
        loadingAccounts: false,
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
    case SET_SEND_CURRENCY:
      return {
        ...state,
        sendCurrency: action.payload.currency,
        sendReference: action.payload.reference,
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
    default:
      return state;
  }
};
