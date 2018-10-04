import {
  all,
  call,
  put,
  takeEvery,
  take,
  takeLatest,
} from 'redux-saga/effects';

import { FETCH_PHONE_CONTACTS_ASYNC } from '../actions';

import NavigationService from '../../util/navigation';
import reducers from '../reducers';
import ContactService from '../../services/contactService';

function* fetchPhoneContacts() {
  try {
    let response = null;
    response = yield call(ContactService.getAllContacts);
    yield put({
      type: FETCH_PHONE_CONTACTS_ASYNC.success,
      payload: response,
    });
  } catch (error) {
    console.log('fetchPhoneContacts', error);
    yield put({
      type: FETCH_PHONE_CONTACTS_ASYNC.error,
      payload: error.message,
    });
  }
}

export const contactsSagas = all([
  takeEvery(FETCH_PHONE_CONTACTS_ASYNC.pending, fetchPhoneContacts),
]);
