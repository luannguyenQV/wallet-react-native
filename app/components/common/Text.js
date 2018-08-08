/* BUTTON */
/* Component | Stateless | Styled */
/* This is the main button component. Takes props to adjust it's size, type, color etc */
import React, { Component } from 'react';
import { Text as _text } from 'react-native';
import PropTypes from 'prop-types';

class _Text extends Component {
  render() {
    const { children } = this.props;
    const { _textStyle } = styles;
    return (
      <_text {...this.props} style={[_textStyle, style]}>
        {children}
      </_text>
    );
  }
}

// _Text.propTypes = {
//   label: PropTypes.string, // Text displayed on button
// };

// _Text.defaultProps = {
//   label: '',
// };

const styles = {
  _textStyle: {
    // flex: 1,
    // margin: 8,
  },
};

const Text = context(_Text);

export { Text };
