/* BUTTON */
/* Component | Stateless | Styled */
/* This is the main button component. Takes props to adjust it's size, type, color etc */
import React, { Component } from 'react';
import { Text as _text } from 'react-native';
import context from './context';
// import PropTypes from 'prop-types';

class _Text extends Component {
  textStyle() {
    const { children, textStyle } = this.props;
    const { _textStyle } = styles;
    const { color, colors, style } = this.props;

    return [
      _textStyle,
      { color: colors[color], textAlign: 'center' },
      textStyle,
    ];
  }

  // containerStyle()

  render() {
    const { children } = this.props;
    return (
      <_text {...this.props} style={this.textStyle()}>
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
    fontSize: 18,
    margin: 8,
    padding: 8,
  },
};

const Text = context(_Text);

export { Text };
