/* USER ACTIONS */

/* 
This file contains all the TYPE declarations and ACTION functions 
that relate to the user profile / information
*/

import { createAsyncTypes } from '../store/Utilities';

export const CONTACT_FIELD_CHANGED = 'contact_field_changed';
export const CONTACT_FIELD_ERROR = 'contact_field_error';
export const updateContactField = ({ prop, value }) => {
  return {
    type: CONTACT_FIELD_CHANGED,
    payload: { prop, value },
  };
};

export const FETCH_PHONE_CONTACTS_ASYNC = createAsyncTypes(
  'fetch_phone_contacts',
);
export const fetchPhoneContacts = () => {
  return { type: FETCH_PHONE_CONTACTS_ASYNC.pending };
};

export const SET_CONTACT_TYPE = 'set_contact_type';
export const setContactType = type => {
  return { type: SET_CONTACT_TYPE, payload: type };
};

// export const NEW_ITEM = 'new_item';
// export const newItem = type => {
//   return {
//     type: NEW_ITEM,
//     payload: { type },
//   };
// };
