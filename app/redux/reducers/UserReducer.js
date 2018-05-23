import {
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAIL,
  FETCH_PROFILE,
  FETCH_DATA_ASYNC,
  LOGOUT_USER,
} from './../types';
import { PERSIST_REHYDRATE } from 'redux-persist/es/constants';

const INITIAL_STATE = {
  profile: {},
  loading_profile: false,
  email_addresses: [],
  loading_email_addresses: false,
  mobile_numbers: [],
  loading_mobile_numbers: false,
  addresses: null,
  loading_addresses: false,
  documents: {},
  loading_documents: false,
  bankAccounts: [],
  loading_bank_accounts: false,
  cryptoAccounts: [],
  loading_crypto_accounts: false,
};

export default (state = INITIAL_STATE, action) => {
  // console.log(action);
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

    case FETCH_DATA_ASYNC.PENDING:
      return {
        ...state,
        ['loading_' + action.payload]: true,
      };
    case FETCH_DATA_ASYNC.SUCCESS:
      return {
        ...state,
        [action.payload.prop]: action.payload.data,
        ['loading_' + action.payload.prop]: false,
      };
    case FETCH_DATA_ASYNC.ERROR:
      return {
        ...state,
        ['loading_' + action.payload]: false,
      };

    case LOGOUT_USER:
      return INITIAL_STATE;
    default:
      return state;
  }
};
