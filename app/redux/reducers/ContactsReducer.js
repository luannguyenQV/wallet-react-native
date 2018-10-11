import {
  FETCH_PHONE_CONTACTS_ASYNC,
  SET_CONTACT_TYPE,
  CONTACT_FIELD_CHANGED,
  CONTACT_FIELD_ERROR,
  RESET_SEND,
  SET_TRANSACTION_TYPE,
} from '../actions';

import { PERSIST_REHYDRATE } from 'redux-persist/es/constants';
import { createSelector } from 'reselect';
import { contactsStateSelector } from '../sagas/selectors';

const INITIAL_STATE = {
  contacts: [],
  contactsSearch: '',
  contactsLoading: false,
  contactsType: 'email',
  error: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PERSIST_REHYDRATE:
      return action.payload.auth || INITIAL_STATE;
    case SET_TRANSACTION_TYPE:
      return {
        ...state,
        contactsSearch: '',
        contactsType: 'email',
      };

    case CONTACT_FIELD_CHANGED:
      return {
        ...state,
        [action.payload.prop]: action.payload.value,
        contactError: '',
      };
    case CONTACT_FIELD_ERROR:
      return {
        ...state,
        contactError: action.payload,
      };

    case FETCH_PHONE_CONTACTS_ASYNC.pending:
      return {
        ...state,
        contactsLoading: true,
      };
    case FETCH_PHONE_CONTACTS_ASYNC.success:
      return {
        ...state,
        contacts: action.payload,
        contactsLoading: false,
      };
    case FETCH_PHONE_CONTACTS_ASYNC.error:
      return {
        ...state,
        contactsError: action.payload,
        contactsLoading: false,
      };

    case SET_CONTACT_TYPE:
      return {
        ...state,
        contactsType: action.payload,
      };

    // case LOGOUT_USER_ASYNC.success:
    //   return INITIAL_STATE;
    default:
      return state;
  }
};

export const contactsSelector = createSelector(
  [contactsStateSelector],
  contactsState => {
    const search = contactsState.contactsSearch
      ? contactsState.contactsSearch.toLowerCase()
      : '';
    let data = [];
    if (search && contactsState.contacts) {
      data = contactsState.contacts.filter(
        item =>
          item.type === contactsState.contactsType &&
          (item.name
            ? item.name.toLowerCase().includes(search)
            : false || item.contact
              ? item.contact.toLowerCase().includes(search)
              : false),
      );
    }
    // return {};
    return {
      data,
      search: contactsState.contactsSearch,
      type: contactsState.contactsType,
      loading: contactsState.loading,
      error: contactsState.error,
    };
  },
);
