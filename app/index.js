import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { AppLoading, Asset, Font } from 'expo';

import { persistor, store } from './redux/store';
import NavigationService from './util/navigation';
import AppNavigator from './routes/stackNavigator';

// const _XHR = GLOBAL.originalXMLHttpRequest
//   ? GLOBAL.originalXMLHttpRequest
//   : GLOBAL.XMLHttpRequest;

// XMLHttpRequest = _XHR;

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

// function cacheFonts(fonts) {
//   return fonts.map(font => Font.loadAsync(font));
// }

class App extends Component {
  state = {
    isReady: false,
  };

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      require('./../assets/icons/send.png'),
      require('./../assets/icons/receive.png'),
      require('./../assets/icons/more.png'),
      require('./../assets/icons/deposit.png'),
      require('./../assets/icons/withdraw.png'),
      require('./../assets/icons/card1.png'),
      require('./../assets/icons/card2.png'),
      require('./../assets/icons/card3.png'),
    ]);

    // const fontAssets = cacheFonts([FontAwesome.font]);

    await Promise.all([...imageAssets]); //, ...fontAssets
  }

  render() {
    // const { persistor, store } = configureStore();
    console.disableYellowBox = true;

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {/* {this.state.isReady ? ( */}
          <AppNavigator
            ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
          />
          {/* ) : (
            <AppLoading
              startAsync={this._loadAssetsAsync}
              onFinish={() => this.setState({ isReady: true })}
              onError={console.warn}
            />
          )} */}
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
