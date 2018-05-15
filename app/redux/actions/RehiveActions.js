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
  SET_SEND_CURRENCY,
  SEND_FIELD_ERROR,
  SET_SEND_RECIPIENT,
  SET_SEND_NOTE,
  SET_SEND_STATE,
  RESET_SEND,
  SEND_SUCCESS,
  SEND_FAIL,
  SEND,
} from './types';
import Big from 'big.js';

import UserInfoService from './../../services/userInfoService';
import AccountService from './../../services/accountService';
import TransactionService from './../../services/transactionService';

export const fetchUser = () => async dispatch => {
  dispatch({ type: FETCH_USER });
  let responseJson = await UserInfoService.getUserDetails();

  if (responseJson.status === 'success') {
    dispatch({ type: FETCH_USER_SUCCESS, payload: responseJson.data });
  } else {
    //TODO: Logout here?
    dispatch({ type: FETCH_USER_FAIL });
  }
};

export const fetchAccounts = () => async dispatch => {
  dispatch({ type: FETCH_ACCOUNTS });
  let allAccountsResponseJson = await AccountService.getAllAccounts();
  let activeAccountResponseJson = await UserInfoService.getActiveAccount();
  console.log('allAccountsResponseJson', allAccountsResponseJson.data);

  if (
    allAccountsResponseJson.status === 'success' &&
    activeAccountResponseJson.status === 'success'
  ) {
    const accounts = allAccountsResponseJson.data;
    const currencies = accounts.results[0].currencies;
    let activeAccountIndex = 0;

    for (var i = 0; i < currencies.length; i++) {
      if (currencies[i].active === true) {
        activeAccountIndex = i;
        i = currencies.length;
      }
    }
    // console.log('accounts', accounts);
    const tempCurrency = currencies[activeAccountIndex];

    console.log('tempCurrency', tempCurrency);

    dispatch({
      type: FETCH_ACCOUNTS_SUCCESS,
      payload: { accounts, tempCurrency, activeAccountIndex },
    });
  } else {
    dispatch({ type: FETCH_ACCOUNTS_FAIL });
  }
};

export const switchTempCurrency = (
  accounts,
  tempCurrency,
  tempCurrencyIndex,
) => {
  console.log('accounts', accounts);
  console.log('tempCurrency', tempCurrency);
  console.log('tempCurrencyIndex', tempCurrencyIndex);
  let currencies = accounts.results[0].currencies;
  console.log('currencies', currencies);
  let index = (tempCurrencyIndex + 1) % currencies.length;
  if (currencies[index].currency.symbol === tempCurrency.currency.symbol) {
    index = (index + 1) % currencies.length;
  }

  return {
    type: UPDATE_TEMP_CURRENCY,
    payload: { index, tempCurrency: currencies[index] },
  };
};

export const setActiveCurrency = (reference, code) => async dispatch => {
  dispatch({ type: SET_ACTIVE_CURRENCY });
  let responseJson = await AccountService.setActiveCurrency(reference, code);

  if (responseJson.status === 'success') {
    // const tempCurrency = responseJson.data.results[0].currencies[0];
    // const accounts = responseJson.data;
    dispatch({
      type: SET_ACTIVE_CURRENCY_SUCCESS,
      // payload: { accounts, tempCurrency },
    });
  } else {
    dispatch({ type: SET_ACTIVE_CURRENCY_FAIL });
  }
};

export const sendFieldUpdate = ({ prop, value }) => {
  return {
    type: SEND_FIELD_UPDATE,
    payload: { prop, value },
  };
};

export const setSendCurrency = (currency, reference) => {
  console.log(currency, reference);
  if (currency && reference) {
    return {
      type: SET_SEND_CURRENCY,
      payload: { currency, reference },
    };
  } else {
    // Return fail?
  }
};

export const validateSendAmount = (currency, amount) => {
  for (let i = 0; i < currency.currency.divisibility; i++) {
    amount = amount * 10;
  }
  if (amount < currency.available_balance && amount) {
    return setSendState('recipient');
  } else {
    return {
      type: SEND_FIELD_ERROR,
      payload: 'Invalid send amount',
    };
  }
};

export const validateSendRecipient = recipient => {
  if (recipient) {
    return setSendState('note');
  } else {
    return {
      type: SEND_FIELD_ERROR,
      payload: 'Recipient cannot be blank',
    };
  }
};

export const validateSendNote = note => {
  return setSendState('confirm');
};

export const setSendState = state => {
  console.log(state);
  if (state) {
    return {
      type: SET_SEND_STATE,
      payload: state,
    };
  } else {
    // Return fail?
  }
};

export const resetSend = () => {
  return {
    type: RESET_SEND,
  };
};

export const send = data => async dispatch => {
  console.log(data);
  let amount = new Big(data.amount);
  for (let i = 0; i < data.currency.currency.divisibility; i++) {
    amount = amount.times(10);
  }
  dispatch({ type: SEND });
  let responseJson = await TransactionService.sendMoney(
    amount,
    data.recipient,
    data.note,
    data.currency.currency.code,
    data.reference,
  );

  console.log('responseJson', responseJson);

  if (responseJson.status === 'success') {
    dispatch({
      type: SEND_SUCCESS,
    });
  } else {
    dispatch({
      type: SEND_FAIL,
      payload: responseJson.message,
    });
  }
};
