import { all } from 'redux-saga/effects';
import { userSagas } from './UserSagas';

const sagas = [...userSagas];

// export const initSagas = sagaMiddleware =>
//   sagas.forEach(sagaMiddleware.run.bind(sagaMiddleware));

//   // foo.js
// export const fooSagas = [
//   takeEvery("FOO_A", fooASaga),
//   takeEvery("FOO_B", fooBSaga),
// ]

// // bar.js
// export const barSagas = [
//   takeEvery("BAR_A", barASaga),
//   takeEvery("BAR_B", barBSaga),
// ];

// // index.js
// import { fooSagas } from './foo';
// import { barSagas } from './bar';

// export default function* rootSaga() {
//   yield all([helloSaga]);
// }

export default function* rootSaga() {
  yield all(sagas);
}
