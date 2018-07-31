import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppLoading, Asset, Font } from 'expo';
import { init } from './redux/actions';
import { Root } from 'native-base';

import NavigationService from './util/navigation';
import MainNavigator from './routes/mainNavigator';

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
  }

  render() {
    console.disableYellowBox = true;
    const { isReady, initStarted } = this.state;
    const { appLoading } = this.props;

    if (isReady && initStarted && !appLoading) {
      return (
        <Root>
          <MainNavigator
            ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
          />
        </Root>
      );
    } else {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
  }
}

const mapStateToProps = ({ auth }) => {
  const { appLoading } = auth;
  return { appLoading };
};

export default connect(mapStateToProps, { init })(Main);
