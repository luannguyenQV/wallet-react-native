import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from './../reducers';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'rehive', 'user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore(initialState = {}) {
  const store = createStore(
    persistedReducer,
    initialState,
    compose(
      applyMiddleware(thunk),
      global.reduxNativeDevTools
        ? global.reduxNativeDevTools(/*options*/)
        : noop => noop,
    ),
  );

  const persistor = persistStore(store);
  // persistor.purge();
  // if (global.reduxNativeDevTools) {
  //   global.reduxNativeDevTools.updateStore(store);
  // }
  return { persistor, store };
}
