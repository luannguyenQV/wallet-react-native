/* TEXT */
/* Component | Stateless | Styled */
/* This is the main text component. Takes props to adjust it's size, type, padding, color etc */
import React, { Component } from 'react';
import { Text as _text } from 'react-native';
import context from './context';
import PropTypes from 'prop-types';

class _Text extends Component {
  textStyle() {
    const {
      textStyle,
      style,
      color,
      colors,
      margin,
      padding,
      fontSize,
      textAlign,
    } = this.props;

    return [
      styles._textStyle,
      {
        color: colors[color],
        textAlign,
        margin,
        padding,
        fontSize,
      },
      textStyle,
      style,
    ];
  }

  render() {
    return (
      <_text {...this.props} style={this.textStyle()}>
        {this.props.children}
      </_text>
    );
  }
}

_Text.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]), // Text displayed on button
  fontSize: PropTypes.number,
  margin: PropTypes.number,
  padding: PropTypes.number,
  textAlign: PropTypes.string,
  color: PropTypes.string,
};

_Text.defaultProps = {
  children: [''],
  fontSize: 16,
  margin: 8,
  padding: 8,
  textAlign: 'center',
  color: 'font',
};

const Text = context(_Text);

export { Text };
