/* TEXT */
/* Component | Stateless | Styled */
/* This is the main text component. Takes props to adjust it's size, type, padding, color etc */
import React, { Component } from 'react';
import { Text as _text } from 'react-native';
import context from './context';
import PropTypes from 'prop-types';

class _Text extends Component {
  typography(typeScale) {
    // default values are for body1
    let fontSize = 16;
    // let typeFace = '';
    let fontStyle = 'normal';
    // let fontFamily = '';
    // let textTransform = 'none'; // Not accepted by RN/expo
    let fontWeight = 'normal';
    let letterSpacing = 0.5;
    switch (typeScale) {
      case 'h1':
        fontSize = 96;
        fontWeight = 300;
        letterSpacing = -1.5;
        break;
      case 'h2':
        fontSize = 60;
        fontWeight = 300;
        letterSpacing = -0.5;
        break;
      case 'h3':
        fontSize = 48;
        letterSpacing = 0;
        break;
      case 'h4':
        fontSize = 34;
        letterSpacing = 0.25;
        break;
      case 'h5':
        fontSize = 24;
        letterSpacing = 0;
        break;
      case 'h6':
        fontSize = 20;
        fontWeight = 700;
        letterSpacing = 0.15;
        break;
      case 's1':
        fontSize = 16;
        letterSpacing = 0.15;
        break;
      case 's2':
        fontSize = 14;
        letterSpacing = 0.1;
        break;
      case 'b2':
        fontSize = 14;
        letterSpacing = 0.25;
        break;
      case 'bu':
        fontSize = 14;
        letterSpacing = 1.25;
        // textTransform = 'uppercase';
        break;
      case 'c':
        fontSize = 12;
        letterSpacing = 0.4;
        break;
      case 'o':
        fontSize = 10;
        letterSpacing = 1.5;
        // textTransform = 'uppercase';
        break;
      case 'b1':
      default:
        break;
    }
    return {
      fontSize,
      fontStyle,
      fontWeight,
      letterSpacing,
      // textTransform,
    };
  }
  textStyle() {
    const { s, m, p, o, c, t, tA, colors, rem, style } = this.props;

    return [
      this.typography(t),
      {
        color: colors[c],
        margin: m * rem,
        padding: p * rem,
        opacity: o,
        textAlign: tA,
      },
      s ? { fontSize: s } : {},
      style,
    ];
  }

  render() {
    const { children } = this.props;
    return (
      <_text {...this.props} style={this.textStyle()}>
        {children}
      </_text>
    );
  }
}

_Text.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired, // string passed to RN <Text />
  s: PropTypes.number, // fontSize
  m: PropTypes.number, // margin
  p: PropTypes.number, // padding
  o: PropTypes.number, // opacity
  t: PropTypes.string, // type scale
  c: PropTypes.string, // color
  colors: PropTypes.object, // colors object from context
  rem: PropTypes.number, // rem value,
  tA: PropTypes.string, // textAlign
};

_Text.defaultProps = {
  children: [''], // empty
  s: 16,
  m: 0, // 0-8: 0|0.25|0.5|1|2|4|8|16|32 rem
  p: 0, // 0-8: 0|0.25|0.5|1|2|4|8|16|32 rem
  o: 1, // 0-1
  t: 'b1', // h1:heading1, h2, h3, s1:subtitle1, s2, b1:body1, b2, bu: button, c:caption, o:overline.
  c: 'font', // see colors object
  colors: {}, // from context
  rem: 16, // rem value TODO: explain
  tA: 'auto',
};

const Text = context(_Text);

export { Text };
