import {
  INPUT_FIELD_CHANGED,
  EDIT_ITEM,
  EDIT_PROFILE,
  NEW_ITEM,
  FETCH_DATA_ASYNC,
  UPDATE_ASYNC,
  DELETE_ASYNC,
  VERIFY_ASYNC,
  PRIMARY_ITEM,
  LOGOUT_USER,
  SHOW_MODAL,
  HIDE_MODAL,
  HIDE_WALLET,
  VIEW_WALLET,
  CARD_DISMISS,
  CARD_RESTORE_ALL,
  UPLOAD_DOCUMENT_ASYNC,
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
  company: [],
  loading_company: false,
  company_bank_account: [],
  loading_company_bank_account: false,
  company_currency: [],
  loading_company_currency: false,

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
  modalVisible: false,
  // showDeleteModal: false,
  loading: false,

  updateError: '',
  modalType: '',
  dismissedCards: [],
};

export default (state = INITIAL_STATE, action) => {
  // console.log(action);
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
        wallet: false,
      };
    case PRIMARY_ITEM:
      return {
        ...state,
        [action.payload.type]: action.payload.data,
        modalVisible: true,
        loading: false,
        updateError: '',
        modalType: 'primary',
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
        modalVisible: false,
        loading: false,
        updateError: '',
        modalType: '',
      };
    case SHOW_MODAL:
      return {
        ...state,
        [action.payload.type]: action.payload.data,
        modalType: action.payload.modalType,
        modalVisible: true,
        loading: false,
        updateError: '',
      };

    case FETCH_DATA_ASYNC.pending:
      return {
        ...state,
        ['loading_' + action.payload]: true,
        modalVisible: false,
        modalType: '',
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
        modalVisible: false,
        // [action.payload.prop]: action.payload.data,
        // ['loading_' + action.payload.prop]: false,
      };
    case UPDATE_ASYNC.error:
      return {
        ...state,
        updateError: action.payload,
        loading: false,
      };

    case DELETE_ASYNC.pending:
      return {
        ...state,
        loading: true,
        updateError: '',
      };
    case DELETE_ASYNC.success:
      return {
        ...state,
        loading: false,
        modalVisible: false,
      };
    case DELETE_ASYNC.error:
      return {
        ...state,
        updateError: action.payload,
        loading: false,
      };

    case VERIFY_ASYNC.pending:
      return {
        ...state,
        loading: true,
        updateError: '',
      };
    case VERIFY_ASYNC.success:
      return {
        ...state,
        loading: false,
        modalVisible: true,
        modalType: 'verify',
      };
    case VERIFY_ASYNC.error:
      return {
        ...state,
        updateError: action.payload,
        loading: false,
      };

    case UPLOAD_DOCUMENT_ASYNC.pending:
      return {
        ...state,
        loading: true,
        updateError: '',
      };
    case UPLOAD_DOCUMENT_ASYNC.success:
      return {
        ...state,
        loading: false,
        // modalVisible: true,
        // modalType: 'verify',
      };
    case UPLOAD_DOCUMENT_ASYNC.error:
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

    case CARD_DISMISS:
      return {
        ...state,
        dismissedCards: state.dismissedCards
          ? [...state.dismissedCards, action.payload]
          : [action.payload],
      };

    case CARD_RESTORE_ALL:
      return {
        ...state,
        dismissedCards: [],
      };

    case LOGOUT_USER:
      return INITIAL_STATE;
    default:
      return state;
  }
};
