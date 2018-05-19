import {
  FETCH_ACCOUNTS,
  FETCH_ACCOUNTS_SUCCESS,
  FETCH_ACCOUNTS_FAIL,
  UPDATE_CURRENT_INDEX,
  SET_ACTIVE_CURRENCY_SUCCESS,
  SET_ACTIVE_CURRENCY_FAIL,
  SET_ACTIVE_CURRENCY,
  SEND_FIELD_UPDATE,
  SET_SEND_WALLET,
  SEND_FIELD_ERROR,
  SET_SEND_RECIPIENT,
  SET_SEND_NOTE,
  SET_SEND_STATE,
  RESET_SEND,
  SEND_SUCCESS,
  SEND_FAIL,
  SEND,
  APP_LOAD_FINISH,
} from './../types';
import _ from 'lodash';
import Big from 'big.js';

import AccountService from './../../services/accountService';
import TransactionService from './../../services/transactionService';

export const fetchAccounts = () => async dispatch => {
  dispatch({ type: APP_LOAD_FINISH });
  dispatch({ type: FETCH_ACCOUNTS });
  let responseJson = await AccountService.getAllAccounts();

  if (responseJson.status === 'success') {
    const accounts = responseJson.data.results;
    let activeWalletIndex = 0;
    let currencies;
    let account;

    // var wallets = _.flatten(_.flatten(accounts, 'users'));

    // console.log('1', _.flatten(accounts.results));

    // let wallets = _.map(accounts.results, function(account) {
    //   return _.flatten(account.currencies);
    // });

    // wallets.log('1', _.flatten(accounts));

    // _.map(currencies, 'user');

    // console.log(accounts);
    let wallets;
    let index = 0;
    for (var i = 0; i < accounts.length; i++) {
      account = accounts[i];
      // console.log(account);
      currencies = account.currencies;
      for (var j = 0; j < currencies.length; j++) {
        if (!wallets) {
          wallets = [];
        }
        wallets[index] = {
          index,
          account_reference: account.reference,
          account_name: account.name,
          account_label: account.label,
          currency: currencies[j],
        };
        if (currencies[j].active === true) {
          activeWalletIndex = index;
        }
        index++;
      }
    }

    dispatch({
      type: FETCH_ACCOUNTS_SUCCESS,
      payload: { wallets, activeWalletIndex },
    });
  } else {
    dispatch({ type: FETCH_ACCOUNTS_FAIL });
  }
};

export const setActiveWalletIndex = index => {
  return {
    type: UPDATE_CURRENT_INDEX,
    payload: index,
  };
};

export const sendFieldUpdate = ({ prop, value }) => {
  return {
    type: SEND_FIELD_UPDATE,
    payload: { prop, value },
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
  console.log(wallet, amount);
  // const currency = wallet.currency.currency;
  for (let i = 0; i < wallet.currency.currency.divisibility; i++) {
    amount = amount * 10;
  }
  if (amount < wallet.currency.available_balance && amount) {
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
  if (state) {
    return {
      type: SET_SEND_STATE,
      payload: state,
    };
  } else {
    // Return fail?
  }
};

// export const fetchAccounts = () => async dispatch => {
export const setActiveCurrency = wallet => async () => {
  let responseJson = await AccountService.setActiveCurrency(
    wallet.account_reference,
    wallet.currency.currency.code,
  );
  // console.log(responseJson);
  //   if (responseJson.status === 'success') {
  //     Alert.alert(
  //       'Success',
  //       'Your active currency has been changed successfully.',
  //       [{ text: 'OK' }],
  //     );
  //   }
  // };
};

export const resetSend = () => {
  return {
    type: RESET_SEND,
  };
};

export const send = data => async dispatch => {
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
