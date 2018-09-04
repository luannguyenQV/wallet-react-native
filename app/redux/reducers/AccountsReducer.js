import {
  FETCH_ACCOUNTS_ASYNC,
  ACCOUNT_FIELD_CHANGED,
  ACCOUNT_FIELD_ERROR,
  SET_SEND_STATE,
  SET_SEND_TYPE,
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
  SET_RECEIVE_ADDRESS,
  FETCH_TRANSACTIONS_ASYNC,
  SET_HOME_ACCOUNT,
  SET_HOME_CURRENCY,
} from '../actions';
import { PERSIST_REHYDRATE } from 'redux-persist/es/constants';

const INITIAL_STATE = {
  accounts: [],
  activeWalletIndex: 0,
  transactions: {},

  loading: false,
  loadingActiveCurrencyChange: false,

  sendAmount: 0,
  sendWallet: null,
  sendRecipient: '',
  sendNote: '',
  sendMemo: '',
  sendReference: null,
  sendState: '',

  tempWallet: null,
  showWallet: false,

  withdrawAmount: 0,
  withdrawWallet: null,
  withdrawRecipient: '',
  withdrawNote: '',
  withdrawReference: null,
  withdrawState: '',
};

export default (state = INITIAL_STATE, action) => {
  // console.log(action);
  switch (action.type) {
    case PERSIST_REHYDRATE:
      return action.payload.auth || INITIAL_STATE;

    case FETCH_ACCOUNTS_ASYNC.pending:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ACCOUNTS_ASYNC.success:
      return {
        ...state,
        accounts: action.payload,
        loading: false,
      };
    case FETCH_ACCOUNTS_ASYNC.error:
      return {
        ...state,
        loading: false,
      };

    case FETCH_TRANSACTIONS_ASYNC.pending:
      return {
        ...state,
        transactionsLoading: true,
      };
    case FETCH_TRANSACTIONS_ASYNC.success:
      const { transactions, filters } = action.payload;
      const { account, currency } = filters;
      return {
        ...state,
        transactions: {
          ...state.transactions,
          [account]: {
            ...state.transactions[account],
            [currency]: transactions,
          },
        },
        transactionsLoading: false,
      };
    case FETCH_TRANSACTIONS_ASYNC.error:
      return {
        ...state,
        transactionsLoading: false,
      };

    case SET_HOME_ACCOUNT:
      return {
        ...state,
        homeAccount: action.payload,
      };
    case SET_HOME_CURRENCY:
      return {
        ...state,
        homeCurrency: action.payload,
      };

    case SHOW_MODAL:
      if (action.payload.type === 'wallet') {
        return {
          ...state,
          tempWallet: action.payload.item,
        };
      }
      return { ...state };

    case ACCOUNT_FIELD_CHANGED:
      return { ...state, [action.payload.prop]: action.payload.value };
    case ACCOUNT_FIELD_ERROR:
      return {
        ...state,
        sendError: action.payload,
        withdrawError: action.payload,
      };

    case SET_SEND_WALLET:
      return {
        ...state,
        sendWallet: action.payload,
        sendState: 'amount',
        sendError: '',
        sendType: '',
      };
    case SET_SEND_TYPE:
      return {
        ...state,
        sendType: action.payload,
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
        sendAmount: '',
        sendCurrency: '',
        sendRecipient: '',
        sendNote: '',
        sendReference: '',
        sendState: 'amount',
        sendError: '',
        sendMemo: '',
        sendType: '',
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
    case SET_RECEIVE_ADDRESS:
      return {
        ...state,
        receiveAddress: action.payload.receiveAddress,
        receiveMemo: action.payload.receiveMemo,
      };

    case SET_WITHDRAW_WALLET:
      return {
        ...state,
        withdrawAmount: '',
        withdrawBankAccount: null,
        withdrawNote: '',
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

export function walletsSelector(state) {
  const {
    accounts,
    transactions,
    loading,
    transactionsLoading,
    homeAccount,
    homeCurrency,
  } = state.accounts;

  const crypto = state.crypto;
  // console.log('crypto', crypto);
  // let index = 0;
  let activeCurrency = '';

  let data = accounts.map(account => {
    account.currencies = account.currencies.map(currency => {
      currency.transactions = transactions[account.reference]
        ? transactions[account.reference][currency.currency.code]
        : {};
      if (currency.active) {
        activeCurrency = currency.currency.code;
      }
      // console.log('active' + currency.active);
      return currency;
    });
    // console.log('account', account);
    return account;
  });

  let currencies = [];
  let tempCurrencies = [];
  for (i = 0; i < accounts.length; i++) {
    tempCurrencies = accounts[i].currencies.map(currency => {
      currency.account = accounts[i].reference;
      // console.log('active' + currency.active);
      return currency;
    });
    currencies = currencies.concat(tempCurrencies);
  }

  // let currencies = accounts.map(account => {
  //   currencies = account.currencies.map(currency => {
  //     currency.account = account.reference;
  //     // console.log('active' + currency.active);
  //     return currency;
  //   });
  //   // console.log('account', account);
  //   return currencies;
  // });
  console.log('currencies', currencies);

  let wallets = {
    homeAccount,
    homeCurrency,
    activeCurrency,
    data,
    transactions,
    transactionsLoading,
    showAccountLabel: accounts.length > 1 ? true : false,
    loading,
    currencies,
  };

  //       if (currencies[j].active === true) {
  //         activeWalletIndex = index;
  //       }
  // if (wallets.length > 0) {
  //   const activeItem = wallets[activeWalletIndex];
  //   wallets[activeWalletIndex] = wallets[0];
  //   wallets[0] = activeItem;
  // }

  return wallets;
}
