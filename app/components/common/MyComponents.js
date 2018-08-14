import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import context from './context';

const SCREEN_WIDTH = Dimensions.get('window').width;

class _MyView extends Component {
  _viewStyle() {
    const { f, fD, p, m, aI, jC } = this.props;
    return {
      flex: f,
      flexDirection: fD,
      padding: calculateRem(p),
    };
  }

  render() {
    const { viewStyle, children } = this.props;

    return <View style={[this._viewStyle(), viewStyle]}>{children}</View>;
  }
}

const calculateRem = number => {
  number;
};

_MyView.propTypes = {
  f: PropTypes.number, // Flex
  fD: PropTypes.string, // Flex direction
  aI: PropTypes.string, // Align items
  jC: PropTypes.string, // Justify content
  p: PropTypes.number, // Padding
  m: PropTypes.number, // Margin
  viewStyle: PropTypes.object, // override styles
  children: PropTypes.node,
};

_MyView.defaultProps = {
  f: 0,
  fD: 'column',
  aI: '',
  jC: '',
  p: 0,
  m: 0,
  viewStyle: {},
};

const MyView = context(_MyView);

export { MyView };
