import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootSaga from './../sagas/rootSaga';

import rootReducer from './../reducers';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'accounts', 'user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}) {
  const store = createStore(
    persistedReducer,
    initialState,
    compose(
      applyMiddleware(thunk, sagaMiddleware),
      global.reduxNativeDevTools
        ? global.reduxNativeDevTools(/*options*/)
        : noop => noop,
    ),
  );
  sagaMiddleware.run(rootSaga);

  const persistor = persistStore(store);
  // persistor.purge();
  return { persistor, store };
}
