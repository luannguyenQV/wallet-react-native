/* BUTTON */
/* Component | Stateless | Styled */
/* This is the main button component. Takes props to adjust it's size, type, color etc */
import React, { Component } from 'react';
import { View as _view } from 'react-native';
// import PropTypes from 'prop-types';

class View extends Component {
  render() {
    const { style, children } = this.props;
    const { _containerStyle } = styles;
    return (
      <_view {...this.props} style={[_containerStyle, style]}>
        {children}
      </_view>
    );
  }
}

// Screen.propTypes = {
//   label: PropTypes.string, // Text displayed on button
// };

// Screen.defaultProps = {
//   label: '',
// };

// TODO: add custom shortcuts for alignment, flex, padding, margin, defaults (rem?)

const styles = props => {
  return {
    _containerStyle: {
      flex: 1,
      margin: 8,
    },
  };
};

const View = context(_View);

export { View };
