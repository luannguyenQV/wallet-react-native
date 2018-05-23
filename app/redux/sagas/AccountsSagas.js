import { all, call, put, takeEvery } from 'redux-saga/effects';
import Big from 'big.js';

import AccountService from './../../services/accountService';
import TransactionService from './../../services/transactionService';

function* fetchAccounts() {
  try {
    let responseJson = yield call(AccountService.getAllAccounts);

    if (responseJson.status === 'success') {
      const accounts = responseJson.data.results;
      let activeWalletIndex = 0;
      let currencies;
      let account;

      let showAccountLabel = false;

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
        currencies = account.currencies;
        for (var j = 0; j < currencies.length; j++) {
          if (!wallets) {
            wallets = [];
          }
          wallets[index] = {
            index,
            account_reference: account.reference,
            account_name: account.name,
            currency: currencies[j],
          };
          if (currencies[j].active === true) {
            activeWalletIndex = index;
          }
          index++;
        }
      }
      if (accounts.length > 1) {
        showAccountLabel = true;
      }

      yield put({
        type: 'FETCH_ACCOUNTS_SUCCESS',
        payload: { wallets, activeWalletIndex, showAccountLabel },
      });
    } else {
      yield put({
        type: 'FETCH_ACCOUNTS_ERROR',
        payload: responseJson.error,
      });
    }
  } catch (error) {
    yield put({ type: 'FETCH_DATA_ERROR', error });
  }
}

export const accountsSagas = all([
  takeEvery('FETCH_ACCOUNTS_PENDING', fetchAccounts),
]);
