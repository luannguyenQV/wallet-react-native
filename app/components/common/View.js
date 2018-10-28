/* BUTTON */
/* Component | Stateless | Styled */
/* This is the main button component. Takes props to adjust it's size, type, color etc */
import React, { Component } from 'react';
import {
  View as _view,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
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

  render() {
    const {
      style,
      children,
      keyboardAvoiding,
      scrollView,
      behavior,
      colors,
      color,
    } = this.props;

    if (keyboardAvoiding) {
      return (
        <KeyboardAvoidingView
          keyboardShouldPersistTaps={'handled'}
          style={[
            styles._containerStyle,
            { backgroundColor: color ? colors[color] : 'white' },
          ]}
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
      <_view
        style={[
          styles._containerStyle,
          { backgroundColor: color ? colors[color] : 'white' },
          style,
        ]}>
        {scrollView ? this.renderScrollView() : this.renderContent()}
      </_view>
    );
  }
}

_View.propTypes = {
  keyboardAvoiding: PropTypes.bool,
  scrollView: PropTypes.bool,

  behavior: PropTypes.string,
};

_View.defaultProps = {
  keyboardAvoiding: false,
  scrollView: false,
  behavior: '',
};

// TODO: add custom shortcuts for alignment, flex, padding, margin, defaults (rem?)

const styles = {
  _containerStyle: {
    flex: 1,
    // margin: 8,
  },
};

const View = context(_View);

export { View };
