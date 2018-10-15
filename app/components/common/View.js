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
// import PropTypes from 'prop-types';

class _View extends Component {
  render() {
    const {
      style,
      children,
      keyboardAvoiding,
      behavior,
      colors,
      color,
    } = this.props;
    const { _containerStyle } = styles;

    if (keyboardAvoiding) {
      return (
        <View style={{ flex: 1 }}>
          <KeyboardAvoidingView
            // keyboardShouldPersistTaps={'always'}
            style={[
              _containerStyle,
              { backgroundColor: color ? colors[color] : 'white' },
            ]}
            behavior={
              behavior
                ? behavior
                : Platform.OS === 'android' ? 'height' : 'padding'
            }>
            <ScrollView
              keyboardDismissMode={'interactive'}
              keyboardShouldPersistTaps="always">
              <TouchableWithoutFeedback
                onPress={() => Keyboard.dismiss()}
                accessible={false}>
                {children}
              </TouchableWithoutFeedback>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      );
    } else {
      return (
        <_view
          {...this.props}
          style={[
            _containerStyle,
            { backgroundColor: color ? colors[color] : 'white' },
            style,
          ]}>
          {children}
        </_view>
      );
    }
  }
}

// Screen.propTypes = {
//   label: PropTypes.string, // Text displayed on button
// };

// Screen.defaultProps = {
//   label: '',
// };

// TODO: add custom shortcuts for alignment, flex, padding, margin, defaults (rem?)

const styles = {
  _containerStyle: {
    flex: 1,
    // margin: 8,
  },
};

const View = context(_View);

export { View };
