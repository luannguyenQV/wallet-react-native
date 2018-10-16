import {
  INPUT_FIELD_CHANGED,
  INPUT_FIELD_ERROR,
  FETCH_DATA_ASYNC,
  NEW_ITEM,
  EDIT_ITEM,
  UPDATE_ASYNC,
  CONFIRM_DELETE_ASYNC,
  DELETE_ITEM,
  RESEND_VERIFICATION_ASYNC,
  VERIFY_ASYNC,
  PRIMARY_ITEM,
  CARD_DISMISS,
  CARD_RESTORE_ALL,
  UPLOAD_DOCUMENT_ASYNC,
  SHOW_MODAL,
  HIDE_MODAL,
  SET_ACTIVE_CURRENCY_ASYNC,
  LOGOUT_USER,
  VIEW_WALLET,
  HIDE_WALLET,
  RESET_USER_ERRORS,
  SHOW_DETAIL,
  HIDE_DETAIL,
} from '../actions';

import { PERSIST_REHYDRATE } from 'redux-persist/es/constants';
import { userSelector } from './../sagas/selectors';
import { createSelector } from '../../../node_modules/reselect';

const EMPTY_BANK_ACCOUNT = {
  name: '',
  number: '',
  type: '',
  bank_name: '',
  bank_code: '',
  branch_code: '',
  swift: '',
  iban: '',
  bic: '',
};

const EMPTY_PROFILE = {
  first_name: '',
  last_name: '',
  id_number: '',
  nationality: '',
  profile: '',
};

const EMPTY_MOBILE = { number: '', primary: false };

const EMPTY_EMAIL = { email: '', primary: false };

const EMPTY_CRYPTO = { address: '', crypto_type: '' };

const EMPTY_ADDRESS = {
  line_1: '',
  line_2: '',
  city: '',
  state_province: '',
  country: 'US',
  postal_code: '',
};

const INITIAL_STATE = {
  refreshing_profile: false,
  profile: {},
  email_address: [],
  mobile_number: [],
  document: {},
  bank_account: [],
  crypto_account: [],
  company: [],
  company_bank_account: [],
  company_currency: [],

  tempItem: {},

  showDetail: false,
  wallet: false,
  modalVisible: false,
  modalType: '',

  loading: false,
  updateError: '',
  fetchError: '',

  dismissedCards: [],

  email: null,
  emailLoading: false,
  emailDetail: false,
  emailIndex: 0,

  mobile: null,
  mobileLoading: false,
  mobileDetail: false,
  mobileIndex: 0,

  address: null,
  addressLoading: false,
  addressDetail: false,
  addressIndex: 0,

  bankAccount: null,
  bankAccountLoading: false,
  bankAccountDetail: false,
  bankAccountIndex: 0,

  cryptoAddress: null,
  cryptoAddressLoading: false,
  cryptoAddressDetail: false,
  cryptoAddressIndex: 0,

  newItem: false,
};

export default (state = INITIAL_STATE, action) => {
  // console.log(action);
  switch (action.type) {
    case PERSIST_REHYDRATE:
      return action.payload.auth || INITIAL_STATE;
    case INPUT_FIELD_CHANGED:
      return {
        ...state,
        updateError: '',
        tempItem: {
          ...state.tempItem,
          [action.payload.prop]: action.payload.value,
        },
      };
    case UPDATE_ASYNC.pending:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_ASYNC.success:
      return {
        ...state,
        tempItem: {},
        loading: false,
        updateError: '',
        modalType: '',
        modalVisible: false,
      };
    case UPDATE_ASYNC.error:
      return {
        ...state,
        loading: false,
        updateError: action.payload,
      };

    case DELETE_ITEM:
      return {
        ...state,
        tempItem: action.payload.data,
        loading: false,
        updateError: '',
        modalType: 'delete',
        modalVisible: true,
      };
    case CONFIRM_DELETE_ASYNC.pending:
      return {
        ...state,
        loading: true,
      };
    case CONFIRM_DELETE_ASYNC.success:
      return {
        ...state,
        loading: false,
        modalVisible: false,
      };
    case CONFIRM_DELETE_ASYNC.error:
      return {
        ...state,
        updateError: action.payload,
        loading: false,
      };

    case RESEND_VERIFICATION_ASYNC.pending:
      return {
        ...state,
        tempItem: action.payload.data,
        loading: true,
        updateError: '',
      };
    case RESEND_VERIFICATION_ASYNC.success:
      return {
        ...state,
        modalVisible: true,
        modalType: 'verify',
        loading: false,
      };
    case RESEND_VERIFICATION_ASYNC.error:
      return {
        ...state,
        loading: false,
        modalVisible: true,
        modalType: 'verify',
        updateError: action.payload,
      };
    case HIDE_MODAL:
      return {
        ...state,
        modalVisible: false,
        loading: false,
        tempItem: null,
        updateError: '',
        modalType: '',
      };
    case SHOW_MODAL:
      return {
        ...state,
        tempItem: action.payload.item,
        modalType: action.payload.modalType,
        modalVisible: true,
        loading: false,
        updateError: '',
      };

    case SET_ACTIVE_CURRENCY_ASYNC.pending:
      return {
        ...state,
        loading: true,
      };
    case SET_ACTIVE_CURRENCY_ASYNC.success:
    case SET_ACTIVE_CURRENCY_ASYNC.fail:
      return {
        ...state,
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
        modalVisible: false,
        modalType: '',
      };
    case VERIFY_ASYNC.error:
      return {
        ...state,
        updateError: action.payload,
        loading: false,
      };

    case FETCH_DATA_ASYNC.pending:
      return {
        ...state,
        loading: true,
        showDetail: false,
        modalVisible: false,
        modalType: '',
      };
    case FETCH_DATA_ASYNC.success:
      return {
        ...state,
        [action.payload.prop]: action.payload.data,
        loading: false,
        updateError: '',
      };
    case FETCH_DATA_ASYNC.error:
      return {
        ...state,
        loading: false,
        fetchError: action.payload,
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
    case RESET_USER_ERRORS:
      return {
        ...state,
        updateError: '',
      };

    case VIEW_WALLET:
      return {
        ...state,
        showDetail: true,
        wallet: true,
      };
    case HIDE_WALLET:
      return {
        ...state,
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

    case NEW_ITEM:
      return {
        ...state,
        updateError: '',
        showDetail: true,
        newItem: true,
        editing: false,
        mobileIndex: 0,
      };
    case EDIT_ITEM:
      return {
        ...state,
        tempItem: action.payload.data,
        showDetail: true,
        editing: true,
        wallet: false,
        modalType: '',
        updateError: '',
      };
    case PRIMARY_ITEM:
      return {
        ...state,
        tempItem: action.payload.data,
        loading: false,
        updateError: '',
        modalType: 'primary',
        modalVisible: true,
      };

    case SHOW_DETAIL:
      return {
        ...state,
        showDetail: true,
        [action.payload.type + 'Index']: action.payload.index,
      };
    case HIDE_DETAIL:
      return {
        ...state,
        showDetail: false,
        // [action.payload.type + 'Detail']: false,
        newItem: false,
      };

    case LOGOUT_USER:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const userAddressesSelector = createSelector(userSelector, user => {
  return {
    data: user.newItem ? [EMPTY_ADDRESS] : user.address,
    loading: user.addressLoading,
    index: user.addressIndex,
    showDetail: user.showDetail,
    modalVisible: user.modalVisible,
    modalType: user.modalType,
    indexLoading: false,
  };
});

export const userEmailsSelector = createSelector(userSelector, user => {
  return {
    data: user.newItem ? [EMPTY_EMAIL] : user.email,
    loading: user.emailLoading,
    index: user.emailIndex,
    showDetail: user.showDetail,
    modalVisible: user.modalVisible,
    modalType: user.modalType,
    indexLoading: false,
  };
});

export const userMobilesSelector = createSelector(userSelector, user => {
  return {
    data: user.newItem ? [EMPTY_MOBILE] : user.mobile,
    loading: user.mobileLoading,
    index: user.mobileIndex,
    showDetail: user.showDetail,
    modalVisible: user.modalVisible,
    modalType: user.modalType,
    indexLoading: false,
  };
});

export const userBankAccountsSelector = createSelector(userSelector, user => {
  return {
    data: user.newItem ? [EMPTY_BANK_ACCOUNT] : user.bankAccount,
    loading: user.bankAccountLoading,
    index: user.bankAccountIndex,
    showDetail: user.showDetail,
    modalVisible: user.modalVisible,
    modalType: user.modalType,
    indexLoading: false,
  };
});
export const userCryptoAddressesSelector = createSelector(
  userSelector,
  user => {
    return {
      data: user.newItem ? [EMPTY_CRYPTO] : user.cryptoAddress,
      loading: user.cryptoAddressLoading,
      index: user.cryptoAddressIndex,
      showDetail: user.showDetail,
      modalVisible: user.modalVisible,
      modalType: user.modalType,
      indexLoading: false,
    };
  },
);
