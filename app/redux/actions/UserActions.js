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
  FETCH_MOBILE_NUMBERS_ASYNC,
  FETCH_DATA_ASYNC,
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

export const fetchData = prop => {
  return { type: FETCH_DATA_ASYNC.PENDING, payload: prop };
};
