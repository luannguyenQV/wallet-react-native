import {
  FETCH_ACCOUNTS_ASYNC,
  UPDATE_CURRENT_INDEX,
  SET_ACTIVE_CURRENCY_ASYNC,
  INPUT_FIELD_UPDATE,
  SET_SEND_WALLET,
  INPUT_FIELD_ERROR,
  SET_SEND_RECIPIENT,
  SET_SEND_NOTE,
  SET_SEND_STATE,
  RESET_SEND,
  SEND_ASYNC,
  VIEW_WALLET,
  HIDE_WALLET,
} from './../types';
import _ from 'lodash';
import Big from 'big.js';

import TransactionService from './../../services/transactionService';

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

export const sendFieldUpdate = ({ prop, value }) => {
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
  let responseJson = await TransactionService.sendMoney(
    amount,
    data.recipient,
    data.note,
    data.currency.code,
    data.reference,
  );
  // console.log(responseJson);
  if (responseJson.status === 'success') {
    dispatch({
      type: SEND_ASYNC.success,
    });
  } else {
    dispatch({
      type: SEND_ASYNC.error,
      payload: responseJson.message,
    });
  }
};

export const setWithdrawWallet = wallet => {
  if (wallet) {
    return {
      type: SET_WITHDRAW_WALLET,
      payload: wallet,
    };
  } else {
    // Return fail?
  }
};

export const validateWithdrawAmount = (wallet, amount) => {
  // console.log(wallet, amount);
  // const currency = wallet.currency.currency;
  for (let i = 0; i < wallet.currency.currency.divisibility; i++) {
    amount = amount * 10;
  }
  if (amount <= wallet.currency.available_balance && amount) {
    return setWithdrawState('recipient');
  } else {
    return {
      type: WITHDRAW_FIELD_ERROR,
      payload: 'Invalid send amount',
    };
  }
};

export const withdrawFieldUpdate = ({ prop, value }) => {
  return {
    type: WITHDRAW_FIELD_UPDATE,
    payload: { prop, value },
  };
};

export const resetWithdraw = () => {
  return {
    type: RESET_WITHDRAW,
  };
};

export const withdraw = data => async dispatch => {
  // console.log(data);
  let amount = new Big(data.amount);
  for (let i = 0; i < data.currency.divisibility; i++) {
    amount = amount.times(10);
  }
  dispatch({ type: WITHDRAW });
  let responseJson = await TransactionService.sendMoney(
    amount,
    data.recipient,
    data.note,
    data.currency.code,
    data.reference,
  );
  // console.log(responseJson);
  if (responseJson.status === 'success') {
    dispatch({
      type: WITHDRAW_SUCCESS,
    });
  } else {
    dispatch({
      type: WITHDRAW_FAIL,
      payload: responseJson.message,
    });
  }
};

export const setActiveCurrency = wallet => {
  return {
    type: SET_ACTIVE_CURRENCY_ASYNC.pending,
    payload: wallet,
  };
};

// export const setActiveCurrency = wallet => async () => {
//   let responseJson = await AccountService.setActiveCurrency(
//     wallet.account_reference,
//     wallet.currency.currency.code,
//   );
// };

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
