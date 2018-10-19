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
  CONFIRM_ACTIVE_CURRENCY_ASYNC,
  LOGOUT_USER,
  VIEW_WALLET,
  HIDE_WALLET,
  RESET_USER_ERRORS,
  CACHE_COMPANY,
  SHOW_DETAIL,
  HIDE_DETAIL,
  FETCH_ACCOUNTS_ASYNC,
  FETCH_TRANSACTIONS_ASYNC,
  CLAIM_REWARD_ASYNC,
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

  bank_account: null,
  bank_accountLoading: false,
  bank_accountDetail: false,
  bank_accountIndex: 0,

  crypto_address: null,
  crypto_addressLoading: false,
  crypto_addressDetail: false,
  crypto_addressIndex: 0,

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
        showDetail: false,
        modalVisible: false,
        loading: false,
        tempItem: null,
        updateError: '',
        modalType: '',
      };
    case SHOW_MODAL:
      return {
        ...state,
        modalType: action.payload.modalType,
        modalVisible: true,
        loading: false,
        updateError: '',
        [action.payload.type + 'Index']: action.payload.index,
      };

    case CONFIRM_ACTIVE_CURRENCY_ASYNC.pending:
      return {
        ...state,
        loading: true,
      };
    case CONFIRM_ACTIVE_CURRENCY_ASYNC.success:
    case CONFIRM_ACTIVE_CURRENCY_ASYNC.fail:
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
        tempItem:
          action.payload.type === 'email'
            ? EMPTY_EMAIL
            : action.payload.type === 'mobile'
              ? EMPTY_MOBILE
              : action.payload.type === 'bank_account'
                ? EMPTY_BANK_ACCOUNT
                : action.payload.type === 'address'
                  ? EMPTY_ADDRESS
                  : EMPTY_CRYPTO,
        updateError: '',
        type: action.payload.type,
        showDetail: true,
        newItem: true,
        editing: false,
        [action.payload.type + 'Index']: 0,
      };
    case EDIT_ITEM:
      return {
        ...state,
        tempItem: state[action.payload.type][action.payload.index],
        showDetail: true,
        editing: true,
        modalType: '',
        updateError: '',
      };

    case SHOW_DETAIL:
      let tempItem = {};
      if (state[action.payload.type] && state[action.payload.type].length > 0) {
        tempItem = state[action.payload.type][action.payload.index];
      }
      return {
        ...state,
        showDetail: true,
        type: action.payload.type,
        tempItem,
        [action.payload.type + 'Index']: action.payload.index,
      };
    case HIDE_DETAIL:
      return {
        ...state,
        showDetail: false,
        // [action.payload.type + 'Detail']: false,
        newItem: false,
        detailLoaded: false,
      };
    case FETCH_TRANSACTIONS_ASYNC.pending:
      return {
        ...state,
        detailLoaded: true,
      };

    case CLAIM_REWARD_ASYNC.pending:
      return {
        ...state,
        campaignIndex: action.payload,
      };

    case CACHE_COMPANY:
      let companies = state.companies ? state.companies : [];
      var foundIndex = companies.findIndex(
        company => company.id === action.payload.id,
      );
      console.log(foundIndex);
      if (foundIndex === -1) {
        companies.push(action.payload);
      } else {
        companies[foundIndex] = action.payload;
      }
      return {
        ...state,
        companies,
      };

    case LOGOUT_USER:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const userAddressesSelector = createSelector(userSelector, user => {
  return {
    data:
      user.showDetail && user.type === 'address'
        ? [user.tempItem]
        : user.address,
    loading: user.addressLoading ? user.addressLoading : false,
    index: user.addressIndex ? user.addressIndex : 0,
  };
});

export const userEmailsSelector = createSelector(userSelector, user => {
  return {
    data:
      user.showDetail && user.type === 'email' ? [user.tempItem] : user.email,
    loading: user.emailLoading ? user.emailLoading : false,
    index: user.emailIndex ? user.emailIndex : 0,
  };
});

export const userMobilesSelector = createSelector(userSelector, user => {
  return {
    data:
      user.showDetail && user.type === 'mobile' ? [user.tempItem] : user.mobile,
    loading: user.mobileLoading ? user.mobileLoading : false,
    index: user.mobileIndex ? user.mobileIndex : 0,
  };
});

export const userBankAccountsSelector = createSelector(userSelector, user => {
  return {
    data:
      user.showDetail && user.type === 'bank_account'
        ? [user.tempItem]
        : user.bank_account,
    loading: user.bank_accountLoading ? user.bank_accountLoading : false,
    index: user.bank_accountIndex ? user.bank_accountIndex : 0,
  };
});
export const userCryptoAddressesSelector = createSelector(
  userSelector,
  user => {
    return {
      data:
        user.showDetail && user.type === 'crypto_address'
          ? [user.tempItem]
          : user.crypto_address,
      loading: user.crypto_addressLoading ? user.crypto_addressLoading : false,
      index: user.crypto_addressIndex ? user.crypto_addressIndex : 0,
    };
  },
);

export const userProfileSelector = createSelector(userSelector, user => {
  return {
    data:
      user.showDetail && user.type === 'profile'
        ? [user.tempItem]
        : user.profile,
    loading: user.profileLoading ? user.profileLoading : false,
  };
});

export const cardListOptionsSelector = createSelector(userSelector, user => {
  return {
    showDetail: user.showDetail ? user.showDetail : false,
    modalVisible: user.modalVisible ? user.modalVisible : false,
    modalType: user.modalType ? user.modalType : '',
    detailLoaded: user.detailLoaded ? user.detailLoaded : false,
    noScroll: user.type === 'wallet' && user.showDetail,
  };
});

export const companiesSelector = createSelector(userSelector, user => {
  return user.companies ? user.companies : [];
});
