import {
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAIL,
  FETCH_PROFILE,
  FETCH_EMAIL_ADDRESSES_SUCCESS,
  FETCH_EMAIL_ADDRESSES_FAIL,
  FETCH_EMAIL_ADDRESSES,
  FETCH_MOBILE_NUMBERS_SUCCESS,
  FETCH_MOBILE_NUMBERS_FAIL,
  FETCH_MOBILE_NUMBERS,
  FETCH_ADDRESSES_SUCCESS,
  FETCH_ADDRESSES_FAIL,
  FETCH_ADDRESSES,
  FETCH_DOCUMENTS_SUCCESS,
  FETCH_DOCUMENTS_FAIL,
  FETCH_DOCUMENTS,
  FETCH_BANK_ACCOUNTS_SUCCESS,
  FETCH_BANK_ACCOUNTS_FAIL,
  FETCH_BANK_ACCOUNTS,
  FETCH_CRYPTO_ACCOUNTS_SUCCESS,
  FETCH_CRYPTO_ACCOUNTS_FAIL,
  FETCH_CRYPTO_ACCOUNTS,
} from './../types';

import UserInfoService from './../../services/userInfoService';
import SettingsService from './../../services/settingsService';

// export const fetchUser = () => async () => {
//   fetchProfile();
//   fetchEmailAddresses();
//   fetchMobileNumbers();
//   fetchAddresses();
//   fetchDocuments();
// };

export const fetchProfile = () => async dispatch => {
  dispatch({ type: FETCH_PROFILE });
  let responseJson = await UserInfoService.getUserDetails();

  if (responseJson.status === 'success') {
    dispatch({ type: FETCH_PROFILE_SUCCESS, payload: responseJson.data });
  } else {
    //TODO: Logout here?
    dispatch({ type: FETCH_PROFILE_FAIL });
  }
};

export const fetchEmailAddresses = () => async dispatch => {
  dispatch({ type: FETCH_EMAIL_ADDRESSES });
  let responseJson = await SettingsService.getAllEmails();

  if (responseJson.status === 'success') {
    dispatch({
      type: FETCH_EMAIL_ADDRESSES_SUCCESS,
      payload: responseJson.data,
    });
  } else {
    //TODO: Logout here?
    dispatch({ type: FETCH_EMAIL_ADDRESSES_FAIL });
  }
};

export const fetchMobileNumbers = () => async dispatch => {
  dispatch({ type: FETCH_MOBILE_NUMBERS });
  let responseJson = await SettingsService.getAllMobiles();

  if (responseJson.status === 'success') {
    dispatch({
      type: FETCH_MOBILE_NUMBERS_SUCCESS,
      payload: responseJson.data,
    });
  } else {
    //TODO: Logout here?
    dispatch({ type: FETCH_MOBILE_NUMBERS_FAIL });
  }
};

export const fetchAddresses = () => async dispatch => {
  dispatch({ type: FETCH_ADDRESSES });
  let responseJson = await UserInfoService.getAddress();

  if (responseJson.status === 'success') {
    dispatch({ type: FETCH_ADDRESSES_SUCCESS, payload: responseJson.data });
  } else {
    //TODO: Logout here?
    dispatch({ type: FETCH_ADDRESSES_FAIL });
  }
};

export const fetchDocuments = () => async dispatch => {
  dispatch({ type: FETCH_DOCUMENTS });
  let responseJson = await UserInfoService.getAllDocuments();

  if (responseJson.status === 'success') {
    dispatch({
      type: FETCH_DOCUMENTS_SUCCESS,
      payload: responseJson.data.results,
    });
  } else {
    //TODO: Logout here?
    dispatch({ type: FETCH_DOCUMENTS_FAIL });
  }
};

export const fetchBankAccounts = () => async dispatch => {
  dispatch({ type: FETCH_BANK_ACCOUNTS });
  let responseJson = await SettingsService.getAllBankAccounts();

  if (responseJson.status === 'success') {
    dispatch({
      type: FETCH_BANK_ACCOUNTS_SUCCESS,
      payload: responseJson.data,
    });
  } else {
    //TODO: Logout here?
    dispatch({ type: FETCH_BANK_ACCOUNTS_FAIL });
  }
};

export const fetchCryptoAccounts = () => async dispatch => {
  dispatch({ type: FETCH_CRYPTO_ACCOUNTS });
  let responseJson = await SettingsService.getAllCryptoAddresses();

  if (responseJson.status === 'success') {
    dispatch({
      type: FETCH_CRYPTO_ACCOUNTS_SUCCESS,
      payload: responseJson.data,
    });
  } else {
    //TODO: Logout here?
    dispatch({ type: FETCH_CRYPTO_ACCOUNTS_FAIL });
  }
};
