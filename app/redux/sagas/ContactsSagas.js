import {
  all,
  call,
  put,
  takeEvery,
  take,
  takeLatest,
} from 'redux-saga/effects';

import { FETCH_PHONE_CONTACTS_ASYNC } from './../actions';

import NavigationService from './../../util/navigation';
import reducers from '../reducers';
import ContactService from '../../services/contactService';

function* fetchPhoneContacts() {
  console.log('hi');
  try {
    let response = null;
    response = yield call(ContactService.getAllContacts);
    console.log('in saga', response);

    // let data = response;
    // if (data && data.length > 0 && action.payload === ('email' || 'mobile')) {
    //   const primaryIndex = data.findIndex(item => item.primary === true);
    //   const primaryItem = data[primaryIndex];
    //   data[primaryIndex] = data[0];
    //   data[0] = primaryItem;
    // }
    // if (data.results) {
    //   data = data.results;
    // }
    yield put({
      type: FETCH_PHONE_CONTACTS_ASYNC.success,
      payload: response,
    });
  } catch (error) {
    console.log('fetchPhoneContacts', error);
    yield put({ type: FETCH_PHONE_CONTACTS_ASYNC.error, payload: error });
  }
}

export const contactsSagas = all([
  takeEvery(FETCH_PHONE_CONTACTS_ASYNC.pending, fetchPhoneContacts),
]);
