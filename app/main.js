import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { AppLoading, Asset } from 'expo';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { init } from './redux/actions';
import { Root } from 'native-base';

import NavigationService from './util/navigation';
import MainNavigator from './routes/mainNavigator';

import { ThemeContext } from './util/config';
import {
  themeColorsSelector,
  themeDesignSelector,
} from './redux/reducers/ConfigReducer';
import { profileSelector } from './redux/reducers/UserReducer';

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

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

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
    const imageAssets = cacheImages([require('./../assets/icons/profile.png')]);

    const fontAssets = Expo.Font.loadAsync({
      ...Ionicons.font,
      ...MaterialCommunityIcons.font,
      'rehive-font': require('./../assets/fonts/rehive-font.ttf'),
    });

    await Promise.all([...imageAssets, ...fontAssets]);
  }

  render() {
    console.disableYellowBox = true;
    const { isReady, initStarted } = this.state;
    const { colors, design, profile } = this.props;
    // console.log(isReady, initStarted);
    if (true && (isReady && initStarted)) {
      return (
        <Root>
          <ThemeContext.Provider value={{ colors, design, profile }}>
            <MainNavigator
              ref={navigatorRef => {
                NavigationService.setTopLevelNavigator(navigatorRef);
              }}
            />
          </ThemeContext.Provider>
        </Root>
      );
    } else {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
          // autoHideSplash={false}
        />
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    colors: themeColorsSelector(state),
    design: themeDesignSelector(state),
    profile: profileSelector(state),
  };
};

export default connect(mapStateToProps, { init })(Main);
