import { all } from 'redux-saga/effects';
import { userSagas } from './UserSagas';
import { authSagas } from './AuthSagas';
import { accountsSagas } from './AccountsSagas';
import { contactsSagas } from './ContactsSagas';

const sagas = [authSagas, userSagas, accountsSagas, contactsSagas];

export default function* rootSaga() {
  try {
    yield all(sagas);
  } catch (error) {
    console.log(error);
  }
}
