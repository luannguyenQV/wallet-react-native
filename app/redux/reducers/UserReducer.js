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
  LOGOUT_USER,
} from './../types';
import { PERSIST_REHYDRATE } from 'redux-persist/es/constants';

const INITIAL_STATE = {
  profile: null,
  loadingProfile: false,
  emailAddresses: null,
  loadingEmailAddresses: false,
  mobileNumbers: null,
  loadingMobileNumbers: false,
  addresses: null,
  loadingAddresses: false,
  documents: null,
  loadingDocuments: false,
  bankAccounts: null,
  loadingBankAccounts: false,
  cryptoAccounts: null,
  loadingCryptoAccounts: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PERSIST_REHYDRATE:
      return action.payload.auth || [];
    case FETCH_PROFILE:
      return {
        ...state,
        loadingProfile: true,
      };
    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
        loadingProfile: false,
      };
    case FETCH_PROFILE_FAIL:
      return {
        ...state,
        loadingProfile: false,
      };
    case FETCH_ADDRESSES:
      return {
        ...state,
        loadingAddresses: true,
      };
    case FETCH_ADDRESSES_SUCCESS:
      return {
        ...state,
        addresses: action.payload,
        loadingAddresses: false,
      };
    case FETCH_ADDRESSES_FAIL:
      return {
        ...state,
        loadingAddresses: false,
      };
    case FETCH_EMAIL_ADDRESSES:
      return {
        ...state,
        loadingEmailAddresses: true,
      };
    case FETCH_EMAIL_ADDRESSES_SUCCESS:
      return {
        ...state,
        emailAddresses: action.payload,
        loadingEmailAddresses: false,
      };
    case FETCH_EMAIL_ADDRESSES_FAIL:
      return {
        ...state,
        loadingEmailAddresses: false,
      };
    case FETCH_MOBILE_NUMBERS:
      return {
        ...state,
        loadingMobileNumbers: true,
      };
    case FETCH_MOBILE_NUMBERS_SUCCESS:
      return {
        ...state,
        mobileNumbers: action.payload,
        loadingMobileNumbers: false,
      };
    case FETCH_MOBILE_NUMBERS_FAIL:
      return {
        ...state,
        loadingMobileNumbers: false,
      };
    case FETCH_DOCUMENTS:
      return {
        ...state,
        loadingDocuments: true,
      };
    case FETCH_DOCUMENTS_SUCCESS:
      return {
        ...state,
        documents: action.payload,
        loadingDocuments: false,
      };
    case FETCH_DOCUMENTS_FAIL:
      return {
        ...state,
        loadingDocuments: false,
      };
    case FETCH_BANK_ACCOUNTS:
      return {
        ...state,
        loadingBankAccounts: true,
      };
    case FETCH_BANK_ACCOUNTS_SUCCESS:
      return {
        ...state,
        bankAccounts: action.payload,
        loadingBankAccounts: false,
      };
    case FETCH_BANK_ACCOUNTS_FAIL:
      return {
        ...state,
        loadingBankAccounts: false,
      };
    case FETCH_CRYPTO_ACCOUNTS:
      return {
        ...state,
        loadingCryptoAccounts: true,
      };
    case FETCH_CRYPTO_ACCOUNTS_SUCCESS:
      return {
        ...state,
        cryptoAccounts: action.payload,
        loadingCryptoAccounts: false,
      };
    case FETCH_CRYPTO_ACCOUNTS_FAIL:
      return {
        ...state,
        loadingCryptoAccounts: false,
      };

    case LOGOUT_USER:
      return INITIAL_STATE;
    default:
      return state;
  }
};
