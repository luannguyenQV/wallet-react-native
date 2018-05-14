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
} from './types';

import UserInfoService from './../../services/userInfoService';
import AccountService from './../../services/accountService';

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

export const setSendCurrency = currency => {
  if (currency) {
    return {
      type: SET_SEND_CURRENCY,
      payload: currency,
    };
  } else {
    // Return fail?
  }
};

export const setSendAmount = amount => {
  if (amount) {
    return {
      type: SET_SEND_AMOUNT,
      payload: amount,
    };
  } else {
    // Return fail?
  }
};

export const setSendRecipient = recipient => {
  if (recipient) {
    return {
      type: SET_SEND_RECIPIENT,
      payload: recipient,
    };
  } else {
    // Return fail?
  }
};

export const setSendNote = note => {
  if (note) {
    return {
      type: SET_SEND_NOTE,
      payload: note,
    };
  } else {
    // Return fail?
  }
};
