import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { AppLoading, Asset } from 'expo';
import { init } from './redux/actions';
import { Root } from 'native-base';

import NavigationService from './util/navigation';
import MainNavigator from './routes/mainNavigator';

import { ThemeContext } from './util/config';
import { colorSelector } from './redux/reducers/ConfigReducer';

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

class Main extends Component {
  state = {
    isReady: false,
    initStarted: false,
  };

  componentDidMount() {
    // SplashScreen.preventAutoHide();
    this.props.init();
    this.setState({ initStarted: true });
  }

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      require('./../assets/icons/card1.png'),
      require('./../assets/icons/card2.png'),
      require('./../assets/icons/card3.png'),
    ]);

    // const fontAssets = cacheFonts([FontAwesome.font]);

    await Promise.all([...imageAssets]); //, ...fontAssets
    // this.setState({ isReady: true });
  }

  render() {
    console.disableYellowBox = true;
    const { isReady, initStarted } = this.state;
    if (isReady && initStarted) {
      return (
        <Root>
          <ThemeContext.Provider value={{ colors: this.props.colors }}>
            <MainNavigator
              ref={navigatorRef => {
                NavigationService.setTopLevelNavigator(navigatorRef);
              }}
            />
          </ThemeContext.Provider>
        </Root>
      );
    } else {
      // return (
      //   <View style={{ flex: 1, justifyContent: 'center' }}>
      //     <Image
      //       source={require('./../assets/icons/icon.png')}
      //       onLoad={this._loadAssetsAsync}
      //       style={{
      //         width: SCREEN_WIDTH,
      //         height: SCREEN_WIDTH,
      //       }}
      //     />
      //   </View>
      // );
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
          autoHideSplash={false}
        />
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    // colors: getColors(state.auth),
    colors: colorSelector(state),
  };
};

export default connect(mapStateToProps, { init })(Main);
