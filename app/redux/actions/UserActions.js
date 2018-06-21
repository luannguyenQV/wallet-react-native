import {
  INPUT_FIELD_CHANGED,
  REFRESH_PROFILE_ASYNC,
  FETCH_DATA_ASYNC,
  EDIT_ITEM,
  NEW_ITEM,
  PRIMARY_ITEM,
  UPDATE_ASYNC,
  VERIFY_ASYNC,
  DELETE_ASYNC,
  SHOW_MODAL,
  HIDE_MODAL,
  UPLOAD_PROFILE_PHOTO,
  UPLOAD_DOCUMENT_ASYNC,
  CARD_DISMISS,
  CARD_RESTORE_ALL,
} from './../types';

export const updateInputField = (type, prop, value) => {
  return {
    type: INPUT_FIELD_CHANGED,
    payload: { type, prop, value },
  };
};

export const fetchData = prop => {
  return { type: FETCH_DATA_ASYNC.pending, payload: prop };
};

export const refreshGetVerified = () => {
  return { type: REFRESH_PROFILE_ASYNC.pending };
};

export const editItem = (type, item) => {
  return {
    type: EDIT_ITEM,
    payload: { type: type, data: item },
  };
};

export const primaryItem = (type, item) => {
  return {
    type: PRIMARY_ITEM,
    payload: { type: 'temp_' + type, data: { ...item, primary: true } },
  };
};

export const newItem = type => {
  return {
    type: NEW_ITEM,
    payload: { type: 'temp_' + type },
  };
};

export const verifyItem = (type, value, company) => {
  console.log(type, value);
  return {
    type: VERIFY_ASYNC.pending,
    payload: {
      type,
      value,
      company,
    },
  };
};

export const resendVerification = (type, value, company) => {
  console.log(type, value);
  return {
    type: VERIFY_ASYNC.pending,
    payload: {
      type,
      value,
      company,
    },
  };
};

export const updateItem = (type, data) => {
  return {
    type: UPDATE_ASYNC.pending,
    payload: { type, data },
  };
};

export const deleteItem = (type, item) => {
  return {
    type: DELETE_ASYNC.pending,
    payload: { type, data: item },
  };
};

export const showModal = (type, item, modalType) => {
  // console.log('item', item);
  return {
    type: SHOW_MODAL,
    payload: { type: 'temp_' + type, data: item, modalType },
  };
};

export const hideModal = () => {
  return {
    type: HIDE_MODAL,
  };
};

export const cardDismiss = card_id => {
  console.log(card_id);
  return {
    type: CARD_DISMISS,
    payload: card_id,
  };
};

export const cardRestoreAll = () => {
  return {
    type: CARD_RESTORE_ALL,
  };
};

export const uploadProfilePhoto = image => {
  const file = {
    uri: image,
    name: 'profile',
    type: 'image/jpg',
  };
  return {
    type: UPLOAD_PROFILE_PHOTO.pending,
    payload: file,
  };
};

export const uploadDocument = (image, category, document_type) => {
  const parts = image.split('/');
  const name = parts[parts.length - 1];
  const file = {
    uri: image,
    name,
    type: 'image/jpg',
  };
  return {
    type: UPLOAD_DOCUMENT_ASYNC.pending,
    payload: {
      file,
      category,
      type: document_type,
    },
  };
};

// export const verifyItem = (type, item) => {
//   return {
//     type: VERIFY_ASYNC.pending,
//     payload: { type, data: item },
//   };
// };
