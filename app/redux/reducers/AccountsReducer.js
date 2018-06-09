import {
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAIL,
  FETCH_PROFILE,
  FETCH_ACCOUNTS_ASYNC,
  UPDATE_CURRENT_INDEX,
  SET_ACTIVE_CURRENCY_ASYNC,
  INPUT_FIELD_UPDATE,
  INPUT_FIELD_ERROR,
  SET_SEND_STATE,
  SET_SEND_WALLET,
  RESET_SEND,
  SEND_ASYNC,
  SET_WITHDRAW_STATE,
  WITHDRAW_ASYNC,
  SET_WITHDRAW_WALLET,
  SET_WITHDRAW_BANK_ACCOUNT,
  RESET_WITHDRAW,
  VIEW_WALLET,
  HIDE_WALLET,
  SHOW_MODAL,
} from './../types';
import { PERSIST_REHYDRATE } from 'redux-persist/es/constants';

const INITIAL_STATE = {
  user: null,
  // accounts: null,
  wallets: [],
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
  tempWallet: null,
  showWallet: false,
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
    case FETCH_ACCOUNTS_ASYNC.pending:
      return {
        ...state,
        loading_accounts: true,
      };
    case FETCH_ACCOUNTS_ASYNC.success:
      return {
        ...state,
        wallets: action.payload.wallets,
        activeWalletIndex: action.payload.activeWalletIndex,
        showAccountLabel: action.payload.showAccountLabel,
        loading_accounts: false,
      };
    case FETCH_ACCOUNTS_ASYNC.error:
      return {
        ...state,
        loading_accounts: false,
      };
    case UPDATE_CURRENT_INDEX:
      return {
        ...state,
        activeWalletIndex: action.payload,
      };

    // case SET_ACTIVE_CURRENCY_ASYNC.pending:
    //   return {
    //     ...state,
    //     tempWallet: action.payload,
    //   };
    // case SET_ACTIVE_CURRENCY_ASYNC.success:
    //   return {
    //     ...state,
    //     tempWallet: null,
    //   };
    // case SET_ACTIVE_CURRENCY_ASYNC.error:
    //   return {
    //     ...state,
    //   };

    case SHOW_MODAL:
      if (action.payload.type === 'temp_wallet') {
        return {
          ...state,
          tempWallet: action.payload.data,
        };
      }
      return { ...state };

    case INPUT_FIELD_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case SET_SEND_WALLET:
      return {
        ...state,
        sendWallet: action.payload,
        sendState: 'amount',
        sendError: '',
      };
    case INPUT_FIELD_ERROR:
      return {
        ...state,
        sendError: action.payload,
        WithdrawError: action.payload,
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
    case SEND_ASYNC.pending:
      return {
        ...state,
        sending: true,
      };
    case SEND_ASYNC.success:
      return {
        ...state,
        sendState: 'success',
        sending: false,
      };
    case SEND_ASYNC.error:
      return {
        ...state,
        sendState: 'fail',
        sendError: action.payload,
        sending: false,
      };

    case SET_WITHDRAW_WALLET:
      return {
        ...state,
        withdrawWallet: action.payload,
        withdrawState: 'amount',
        withdrawError: '',
      };
    case SET_WITHDRAW_STATE:
      return {
        ...state,
        withdrawState: action.payload,
        withdrawError: '',
      };
    case SET_WITHDRAW_BANK_ACCOUNT:
      return {
        ...state,
        withdrawBankAccount: action.payload,
        withdrawError: '',
      };
    case RESET_WITHDRAW:
      return {
        ...state,
        withdrawAmount: '',
        withdrawWallet: null,
        withdrawBankAccount: null,
        withdrawNote: '',
        withdrawAccountName: '',
        withdrawState: 'amount',
        withdrawError: '',
      };
    case WITHDRAW_ASYNC.pending:
      return {
        ...state,
        withdrawing: true,
      };
    case WITHDRAW_ASYNC.success:
      return {
        ...state,
        withdrawState: 'success',
        withdrawing: false,
      };
    case WITHDRAW_ASYNC.error:
      return {
        ...state,
        withdrawState: 'fail',
        withdrawError: action.payload,
        withdrawing: false,
      };

    case VIEW_WALLET:
      return {
        ...state,
        showWallet: true,
        tempWallet: action.payload,
        // sendWallet: action.payload,
        // sendState: 'amount',
        // sendError: '',
      };
    case HIDE_WALLET:
      return {
        ...state,
        tempWallet: null,
        showWallet: false,
      };

    // case LOGOUT_USER:
    //   return INITIAL_STATE;
    default:
      return state;
  }
};
