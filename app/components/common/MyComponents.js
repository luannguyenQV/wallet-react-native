import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import context from './context';

const SCREEN_WIDTH = Dimensions.get('window').width;
const rem = SCREEN_WIDTH > 340 ? 18 : 16;
const fontRem = 20;

class _MyView extends Component {
  _viewStyle() {
    const { f, fD, p, m, aI, jC } = this.props;
    console.log(SCREEN_WIDTH);
    console.log(SCREEN_WIDTH / 8);
    return {
      flex: f ? 1 : 0,
      flexDirection: fD,
      padding: padding(p),
    };
  }

  render() {
    const { viewStyle, children } = this.props;

    return <View style={[this._viewStyle(), viewStyle]}>{children}</View>;
  }
}

const padding = p => p * (SCREEN_WIDTH / rem);

_MyView.propTypes = {
  f: PropTypes.bool, // Flex
  fD: PropTypes.string, // Flex direction
  aI: PropTypes.string, // Align items
  jC: PropTypes.string, // Justify content
  p: PropTypes.number, // Padding
  m: PropTypes.number, // Margin
  viewStyle: PropTypes.object, // override styles
  children: PropTypes.node,
};

_MyView.defaultProps = {
  f: false,
  fD: 'column',
  aI: '',
  jC: '',
  p: 0,
  m: 0,
  viewStyle: {},
};

const MyView = context(_MyView);

export { MyView };
