import {
  INPUT_FIELD_CHANGED,
  EDIT_ITEM,
  EDIT_PROFILE,
  NEW_ITEM,
  FETCH_DATA_ASYNC,
  UPDATE_ASYNC,
  PRIMARY_ITEM,
  LOGOUT_USER,
  HIDE_MODAL,
  HIDE_WALLET,
  VIEW_WALLET,
} from './../types';
import { PERSIST_REHYDRATE } from 'redux-persist/es/constants';

const INITIAL_STATE = {
  refreshing_profile: false,
  profile: {},
  loading_profile: false,
  email_address: [],
  loading_email_address: false,
  mobile_number: [],
  loading_mobile_number: false,
  address: null,
  loading_address: false,
  document: {},
  loading_document: false,
  bank_account: [],
  loading_bank_account: false,
  crypto_account: [],
  loading_crypto_account: false,
  temp_profile: {
    first_name: '',
    last_name: '',
    id_number: '',
    nationality: '',
    profile: '',
  },
  temp_mobile_number: { number: '', primary: false },
  temp_email_address: { email: '', primary: false },
  temp_crypto_address: { address: '', crypto_type: '' },
  temp_bank_account: {
    name: '',
    number: '',
    type: '',
    bank_name: '',
    bank_code: '',
    branch_code: '',
    swift: '',
    iban: '',
    bic: '',
  },
  temp_address: {
    line_1: '',
    line_2: '',
    city: '',
    state_province: '',
    country: 'US',
    postal_code: '',
  },
  showDetail: false,
  showModal: false,
  loading: false,
  updateError: '',
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case PERSIST_REHYDRATE:
      return action.payload.auth || [];
    case INPUT_FIELD_CHANGED:
      return {
        ...state,
        ['temp_' + action.payload.type]: {
          ...state['temp_' + action.payload.type],
          [action.payload.prop]: action.payload.value,
        },
      };
    case EDIT_ITEM:
      return {
        ...state,
        [action.payload.type]: action.payload.data,
        showDetail: true,
        editing: true,
      };
    case PRIMARY_ITEM:
      return {
        ...state,
        [action.payload.type]: action.payload.data,
        showModal: true,
        loading: false,
        updateError: '',
      };
    case EDIT_PROFILE:
      return {
        ...state,
        temp_profile: {
          line_1: action.payload.data,
          line_2: action.payload.data,
          city: action.payload.data,
          state_province: action.payload.data,
          country: action.payload.data,
          postal_code: action.payload.data,
        },
        showDetail: true,
        // [action.payload.prop + 'Error']: action.payload.error,
      };
    case NEW_ITEM:
      return {
        ...state,
        [action.payload.type]: {},
        showDetail: true,
        editing: false,
      };
    case HIDE_MODAL:
      return {
        ...state,
        showModal: false,
        loading: false,
        updateError: '',
      };

    case FETCH_DATA_ASYNC.pending:
      return {
        ...state,
        ['loading_' + action.payload]: true,
        showDetail: false,
        updateError: '',
      };
    case FETCH_DATA_ASYNC.success:
      return {
        ...state,
        [action.payload.prop]: action.payload.data,
        ['loading_' + action.payload.prop]: false,
      };
    case FETCH_DATA_ASYNC.error:
      return {
        ...state,
        ['loading_' + action.payload]: false,
      };

    case UPDATE_ASYNC.pending:
      return {
        ...state,
        loading: true,
        updateError: '',
        // ['loading_' + action.payload]: true,
        // showDetail: false,
      };
    case UPDATE_ASYNC.success:
      return {
        ...state,
        loading: false,
        showModal: false,
        // [action.payload.prop]: action.payload.data,
        // ['loading_' + action.payload.prop]: false,
      };
    case UPDATE_ASYNC.error:
      return {
        ...state,
        updateError: action.payload,
        loading: false,
      };
    case VIEW_WALLET:
      return {
        ...state,
        showDetail: true,
        wallet: true,
        // tempWallet: action.payload,
        // sendWallet: action.payload,
        // sendState: 'amount',
        // sendError: '',
      };
    case HIDE_WALLET:
      return {
        ...state,
        // tempWallet: null,
        wallet: false,
        showDetail: false,
      };

    case LOGOUT_USER:
      return INITIAL_STATE;
    default:
      return state;
  }
};
