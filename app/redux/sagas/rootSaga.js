import { all } from 'redux-saga/effects';
import { userSagas } from './UserSagas';
import { authSagas } from './AuthSagas';
import { accountsSagas } from './AccountsSagas';
import { contactsSagas } from './ContactsSagas';
import { rewardsSagas } from './RewardsSagas';
import { cryptoSagas } from './CryptoSagas';

const sagas = [
  authSagas,
  userSagas,
  accountsSagas,
  contactsSagas,
  rewardsSagas,
  cryptoSagas,
];

export default function* rootSaga() {
  try {
    yield all(sagas);
  } catch (error) {
    console.log(error);
  }
}
