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
import { allTransactionsSelector } from './AccountsReducer';

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

export const phoneContactsSelector = createSelector(
  contactsStateSelector,
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
    return data;
  },
);

function objectMap(object, mapFn) {
  return Object.keys(object).reduce(function(result, key) {
    return mapFn(object[key]);
  }, {});
}

export const recentContactsSelector = createSelector(
  allTransactionsSelector,
  allTransactions => {
    let allUsers = [];
    try {
      allUsers = objectMap(allTransactions, account =>
        objectMap(account, currency =>
          currency.map(
            transaction =>
              transaction.source_transaction
                ? transaction.source_transaction.user
                : transaction.destination_transaction
                  ? transaction.destination_transaction.user
                  : null,
          ),
        ),
      );
    } catch (e) {
      console.log(e);
    }
    allUsers = allUsers.filter(
      (item, index, self) =>
        self.findIndex(t => t && item && t.id === item.id) === index,
    );
    return allUsers;
  },
);

export const contactsSelector = createSelector(
  [contactsStateSelector, recentContactsSelector, phoneContactsSelector],
  (contactsState, recentContacts, phoneContacts) => {
    const search = contactsState.contactsSearch
      ? contactsState.contactsSearch.toLowerCase()
      : '';
    let dataPhone = [];
    if (search && phoneContacts) {
      dataPhone = phoneContacts.filter(
        item =>
          item.type === contactsState.contactsType &&
          (item.name
            ? item.name.toLowerCase().includes(search)
            : false || item.contact
              ? item.contact.toLowerCase().includes(search)
              : false),
      );
    }
    let dataRecent = [];
    if (search && recentContacts) {
      dataRecent = recentContacts.filter(
        item =>
          contactsState.contactsType === 'email' &&
          item &&
          ((item.first_name
            ? item.first_name.toLowerCase().includes(search)
            : false) ||
            (item.last_name
              ? item.last_name.toLowerCase().includes(search)
              : false)),
      );
    }

    return {
      phone: dataPhone,
      recent: dataRecent,
      search: contactsState.contactsSearch,
      type: contactsState.contactsType,
      loading: contactsState.loading,
      error: contactsState.error,
    };
  },
);
