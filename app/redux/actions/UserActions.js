import {
  INPUT_FIELD_CHANGED,
  REFRESH_PROFILE_ASYNC,
  FETCH_DATA_ASYNC,
  EDIT_ITEM,
  NEW_ITEM,
  UPDATE_ASYNC,
  DELETE_ASYNC,
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
    payload: { type: 'temp_' + type, data: item },
  };
};

export const newItem = type => {
  return {
    type: NEW_ITEM,
    payload: { type: 'temp_' + type },
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
