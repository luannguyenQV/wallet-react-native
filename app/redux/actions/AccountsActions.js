import * as Rehive from '../../util/rehive';
import { createAsyncTypes } from '../store/Utilities';

export const ACCOUNT_FIELD_CHANGED = 'account_field_changed';
export const ACCOUNT_FIELD_ERROR = 'account_field_error';
export const updateAccountField = ({ prop, value }) => {
  return {
    type: ACCOUNT_FIELD_CHANGED,
    payload: { prop, value },
  };
};

export const FETCH_ACCOUNTS_ASYNC = createAsyncTypes('fetch_accounts');
export const fetchAccounts = () => {
  return { type: FETCH_ACCOUNTS_ASYNC.pending };
};

export const FETCH_TRANSACTIONS_ASYNC = createAsyncTypes('fetch_transactions');
export const fetchTransactions = filters => {
  return { type: FETCH_TRANSACTIONS_ASYNC.pending, payload: filters };
};

// export const SET_HOME_ACCOUNT = 'set_home_account';
// export const setHomeAccount = account => {
//   return {
//     type: SET_HOME_ACCOUNT,
//     payload: account,
//   };
// };

export const SET_HOME_CURRENCY = 'set_home_currency';
export const setHomeCurrency = currency => {
  return {
    type: SET_HOME_CURRENCY,
    payload: currency,
  };
};

export const SET_TRANSACTION_TYPE = 'set_transaction_type';
export const setTransactionType = type => {
  return {
    type: SET_TRANSACTION_TYPE,
    payload: type,
  };
};

export const SET_TRANSACTION_CURRENCY = 'set_transaction_currency';
export const setTransactionCurrency = currency => {
  return {
    type: SET_TRANSACTION_CURRENCY,
    payload: currency,
  };
};

export const SET_TRANSACTION_STATE = 'set_transaction_state';
export const setTransactionState = state => {
  return {
    type: SET_TRANSACTION_STATE,
    payload: state,
  };
};

export const VALIDATE_TRANSACTION = createAsyncTypes('validate_transaction');
export const validateTransaction = type => {
  return {
    type: VALIDATE_TRANSACTION.pending,
    payload: type,
  };
};

export const RESET_TRANSACTION = 'reset_transaction';
export const resetTransaction = () => {
  return {
    type: RESET_TRANSACTION,
  };
};

export const SET_RECEIVE_ADDRESS = 'set_receive_address';
export const SEND_ASYNC = createAsyncTypes('send');
export const send = sendData => {
  return {
    type: SEND_ASYNC.pending,
    payload: sendData,
  };
};

export const SET_WITHDRAW_WALLET = 'set_withdraw_wallet';
export const setWithdrawWallet = wallet => {
  return {
    type: SET_WITHDRAW_WALLET,
    payload: wallet,
  };
};

export const SET_WITHDRAW_BANK_ACCOUNT = 'set_withdraw_bank_account';
export const setWithdrawBankAccount = bankAccount => {
  return {
    type: SET_WITHDRAW_BANK_ACCOUNT,
    payload: bankAccount,
  };
};

export const validateWithdrawNote = note => {
  return setWithdrawState('confirm');
};

export const validateWithdrawAmount = (wallet, amount) => {
  // console.log(wallet, amount);
  // const currency = wallet.currency.currency;
  for (let i = 0; i < wallet.currency.currency.divisibility; i++) {
    amount = amount * 10;
  }
  if (amount <= wallet.currency.available_balance && amount) {
    return setWithdrawState('account');
  } else {
    return {
      type: ACCOUNT_FIELD_ERROR,
      payload: 'Invalid send amount',
    };
  }
};

export const SET_WITHDRAW_STATE = 'set_withdraw_state';
export const setWithdrawState = state => {
  if (state) {
    return {
      type: SET_WITHDRAW_STATE,
      payload: state,
    };
  } else {
    // Return fail?
  }
};

export const RESET_WITHDRAW = 'reset_withdraw';
export const resetWithdraw = () => {
  return {
    type: RESET_WITHDRAW,
  };
};

export const WITHDRAW_ASYNC = createAsyncTypes('withdraw');
export const withdraw = data => async dispatch => {
  let amount = new Big(data.amount);
  for (let i = 0; i < data.currency.divisibility; i++) {
    amount = amount.times(10);
  }
  dispatch({ type: WITHDRAW_ASYNC.pending });
  try {
    await Rehive.createDebit({
      ...data,
      amount: parseInt(amount, 0),
    });
    dispatch({
      type: WITHDRAW_ASYNC.success,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: WITHDRAW_ASYNC.error,
      payload: error.message,
    });
  }
};

export const CONFIRM_ACTIVE_CURRENCY_ASYNC = createAsyncTypes(
  'confirm_active_currency',
);
export const confirmActiveItem = () => {
  return {
    type: CONFIRM_ACTIVE_CURRENCY_ASYNC.pending,
  };
};

export const VIEW_WALLET = 'view_wallet';
export const viewWallet = wallet => {
  return {
    type: VIEW_WALLET,
    payload: wallet,
  };
};

export const HIDE_WALLET = 'hide_wallet';
export const hideWallet = () => {
  return {
    type: HIDE_WALLET,
  };
};

export const TOGGLE_ACCOUNT_FIELD = 'toggle_account_field';
export const toggleAccountField = field => {
  return {
    type: TOGGLE_ACCOUNT_FIELD,
    payload: field,
  };
};

export const RESET_RECEIVE = 'reset_receive';
export const resetReceive = () => {
  return {
    type: RESET_RECEIVE,
  };
};

export const SET_RECEIVE_TYPE = 'set_receive_type';
export const setReceiveType = type => {
  return {
    type: SET_RECEIVE_TYPE,
    payload: type,
  };
};
