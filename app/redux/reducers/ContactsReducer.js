import {
  FETCH_PHONE_CONTACTS_ASYNC,
  SET_CONTACT_TYPE,
  CONTACT_FIELD_CHANGED,
  CONTACT_FIELD_ERROR,
  RESET_SEND,
} from '../actions';

import { PERSIST_REHYDRATE } from 'redux-persist/es/constants';
import { createSelector } from 'reselect';
import { contactsStateSelector } from '../sagas/selectors';

const INITIAL_STATE = {
  contacts: [],
  contactsSearch: '',
  contactsLoading: false,
  contactsType: 'email',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PERSIST_REHYDRATE:
      return action.payload.auth || INITIAL_STATE;
    case RESET_SEND:
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
    if (search) {
      const temp = contactsState.contacts.filter(
        item =>
          item.type === contactsState.contactsType &&
          (item.name.toLowerCase().includes(search) ||
            item.contact.toLowerCase().includes(search)),
      );
      return temp;
    }
    return [];
  },
);
