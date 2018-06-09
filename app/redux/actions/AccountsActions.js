import {
  FETCH_ACCOUNTS_ASYNC,
  UPDATE_CURRENT_INDEX,
  SET_ACTIVE_CURRENCY_ASYNC,
  INPUT_FIELD_UPDATE,
  SET_SEND_WALLET,
  INPUT_FIELD_ERROR,
  SET_WITHDRAW_WALLET,
  SET_WITHDRAW_BANK_ACCOUNT,
  SET_WITHDRAW_STATE,
  RESET_WITHDRAW,
  SET_SEND_STATE,
  RESET_SEND,
  SEND_ASYNC,
  VIEW_WALLET,
  HIDE_WALLET,
  WITHDRAW_ASYNC,
} from './../types';
import _ from 'lodash';
import * as Rehive from './../../util/rehive';
import Big from 'big.js';

export const fetchAccounts = () => {
  return { type: FETCH_ACCOUNTS_ASYNC.pending };
};

export const setActiveWalletIndex = index => {
  return {
    type: UPDATE_CURRENT_INDEX,
    payload: index,
  };
};

export const setSendWallet = wallet => {
  if (wallet) {
    return {
      type: SET_SEND_WALLET,
      payload: wallet,
    };
  } else {
    // Return fail?
  }
};

export const validateSendAmount = (wallet, amount) => {
  // console.log(wallet, amount);
  // const currency = wallet.currency.currency;
  for (let i = 0; i < wallet.currency.currency.divisibility; i++) {
    amount = amount * 10;
  }
  if (amount <= wallet.currency.available_balance && amount) {
    return setSendState('recipient');
  } else {
    return {
      type: INPUT_FIELD_ERROR,
      payload: 'Invalid send amount',
    };
  }
};

export const validateSendRecipient = recipient => {
  if (recipient) {
    return setSendState('note');
  } else {
    return {
      type: INPUT_FIELD_ERROR,
      payload: 'Recipient cannot be blank',
    };
  }
};

export const validateSendNote = note => {
  return setSendState('confirm');
};

export const setSendState = state => {
  if (state) {
    return {
      type: SET_SEND_STATE,
      payload: state,
    };
  } else {
    // Return fail?
  }
};

export const inputFieldUpdate = ({ prop, value }) => {
  return {
    type: INPUT_FIELD_UPDATE,
    payload: { prop, value },
  };
};

export const resetSend = () => {
  return {
    type: RESET_SEND,
  };
};

export const send = data => async dispatch => {
  // console.log(data);
  let amount = new Big(data.amount);
  for (let i = 0; i < data.currency.divisibility; i++) {
    amount = amount.times(10);
  }
  dispatch({ type: SEND_ASYNC.pending });
  try {
    await Rehive.createTransfer(
      amount,
      data.recipient,
      data.note,
      data.currency.code,
      data.reference,
    );
    dispatch({
      type: SEND_ASYNC.success,
    });
  } catch (error) {
    dispatch({
      type: SEND_ASYNC.error,
      payload: error,
    });
  }
};

export const setWithdrawWallet = wallet => {
  return {
    type: SET_WITHDRAW_WALLET,
    payload: wallet,
  };
};

export const setWithdrawBankAccount = bankAccount => {
  return {
    type: SET_WITHDRAW_BANK_ACCOUNT,
    payload: bankAccount,
  };
};

export const validateWithdrawBankAccount = note => {
  return setWithdrawState('note');
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
      type: WITHDRAW_FIELD_ERROR,
      payload: 'Invalid send amount',
    };
  }
};

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

// export const withdrawFieldUpdate = ({ prop, value }) => {
//   return {
//     type: WITHDRAW_FIELD_UPDATE,
//     payload: { prop, value },
//   };
// };

export const resetWithdraw = () => {
  return {
    type: RESET_WITHDRAW,
  };
};

export const withdraw = data => async dispatch => {
  let amount = new Big(data.amount);
  for (let i = 0; i < data.currency.divisibility; i++) {
    amount = amount.times(10);
  }
  dispatch({ type: WITHDRAW_ASYNC.pending });
  try {
    await Rehive.createDebit(
      amount,
      data.currency.code,
      data.reference,
      data.note,
      data.metadata,
    );
    dispatch({
      type: WITHDRAW_ASYNC.success,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: WITHDRAW_ASYNC.error,
      payload: error,
    });
  }
};

export const setActiveCurrency = wallet => {
  return {
    type: SET_ACTIVE_CURRENCY_ASYNC.pending,
    payload: wallet,
  };
};

export const viewWallet = wallet => {
  return {
    type: VIEW_WALLET,
    payload: wallet,
  };
};

export const hideWallet = () => {
  return {
    type: HIDE_WALLET,
  };
};
