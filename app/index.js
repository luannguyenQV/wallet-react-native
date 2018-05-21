import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './redux/store';
// import { store, persistor } from './redux/store';

import AppNavigator from './routes/stackNavigator';

class App extends Component {
  render() {
    const { persistor, store } = configureStore();
    console.disableYellowBox = true;

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppNavigator />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
