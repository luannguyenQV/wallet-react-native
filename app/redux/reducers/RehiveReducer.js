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
  SET_SEND_CURRENCY,
  SET_SEND_AMOUNT,
  SET_SEND_RECIPIENT,
  SET_SEND_NOTE,
  RESET_SEND,
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
  send_amount: null,
  send_currency: null,
  send_recipient: null,
  send_note: null,
  send_reference: null,
};

export default (state = INITIAL_STATE, action) => {
  // console.log(action);
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
    case SET_SEND_CURRENCY:
      return {
        ...state,
        send_currency: action.payload,
      };
    case SET_SEND_AMOUNT:
      return {
        ...state,
        send_amount: action.payload,
      };
    case SET_SEND_RECIPIENT:
      return {
        ...state,
        send_recipient: action.payload,
      };
    case SET_SEND_NOTE:
      return {
        ...state,
        send_note: action.payload,
      };
    case RESET_SEND:
      return {
        ...state,
        send_amount: null,
        send_currency: null,
        send_recipient: null,
        send_note: null,
        send_reference: null,
      };
    default:
      return state;
  }
};
