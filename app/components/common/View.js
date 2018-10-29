/* BUTTON */
/* Component | Stateless | Styled */
/* This is the main button component. Takes props to adjust it's size, type, color etc */
import React, { Component } from 'react';
import {
  View as _view,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ViewPropTypes,
  ScrollView,
} from 'react-native';
import context from './context';
import PropTypes from 'prop-types';

class _View extends Component {
  renderContent() {
    const { children, keyboardAvoiding } = this.props;
    if (keyboardAvoiding) {
      return (
        <TouchableWithoutFeedback
          onPress={() => Keyboard.dismiss()}
          accessible={false}>
          {children}
        </TouchableWithoutFeedback>
      );
    } else {
      return children;
    }
  }
  renderScrollView() {
    return (
      <ScrollView
        keyboardDismissMode={'interactive'}
        keyboardShouldPersistTaps="always">
        {this.renderContent()}
      </ScrollView>
    );
  }

  viewStyle() {
    const { bC, m, p, o, h, w, fD, aI, jC, colors, rem, style } = this.props;

    return [
      {
        backgroundColor: colors[bC],
        margin: m * rem,
        padding: p * rem,
        opacity: o,
        height: h,
        width: w,
        flexDirection: fD,
        alignItems: aI,
        justifyContent: jC,
      },
      style,
    ];
  }

  render() {
    const { style, keyboardAvoiding, scrollView, behavior } = this.props;

    if (keyboardAvoiding) {
      return (
        <KeyboardAvoidingView
          keyboardShouldPersistTaps={'handled'}
          style={this.viewStyle()}
          behavior={
            'padding'
            // behavior ? behavior :
            // Platform.OS === 'android' ? '' : 'padding'
          }>
          {scrollView ? this.renderScrollView() : this.renderContent()}
        </KeyboardAvoidingView>
      );
    }
    return (
      <_view style={this.viewStyle()}>
        {scrollView ? this.renderScrollView() : this.renderContent()}
      </_view>
    );
  }
}
_View.propTypes = {
  keyboardAvoiding: PropTypes.bool,
  scrollView: PropTypes.bool,

  behavior: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired, // string passed to RN <Text />
  f: PropTypes.number, // flex
  h: PropTypes.number, // height
  w: PropTypes.number, // width
  m: PropTypes.number, // margin
  p: PropTypes.number, // padding
  o: PropTypes.number, // opacity
  bC: PropTypes.string, // backgroundColor
  colors: PropTypes.object, // colors object from context
  rem: PropTypes.number, // rem value
  fD: PropTypes.string, // flexDirection
  aI: PropTypes.string, // alignItems
  jC: PropTypes.string, // justifyContent
  style: PropTypes.object, // TODO: ViewPropTypes.style, // override text style
};

_View.defaultProps = {
  keyboardAvoiding: false,
  scrollView: false,
  behavior: '',
  children: [''], // empty
  f: 0,
  h: null,
  w: null,
  m: 0, // 0-8: 0|0.25|0.5|1|2|4|8|16|32 rem
  p: 0, // 0-8: 0|0.25|0.5|1|2|4|8|16|32 rem
  o: 1, // 0-1
  bC: 'transparent', // backgroundColor
  colors: {}, // from context
  colors: {}, // from context
  rem: 16, // rem value
  fD: 'row', // flexDirection
  aI: 'flex-start', // alignItems
  jC: 'flex-start', // justifyContent
  style: null,
};

const View = context(_View);

export { View };
