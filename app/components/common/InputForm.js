import React, { Component } from 'react';
import { ScrollView, KeyboardAvoidingView } from 'react-native';

class InputForm extends Component {
  render() {
    const { reference, children } = this.props;

    const { containerStyle, containerStyleScroll } = styles;

    return (
      <KeyboardAvoidingView
        style={containerStyle}
        behavior={'padding'}
        keyboardVerticalOffset={5}>
        <ScrollView
          style={containerStyleScroll}
          keyboardDismissMode={'interactive'}
          keyboardShouldPersistTaps="always"
          ref={reference}>
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    // backgroundColor: 'white',
    backgroundColor: '#00000000',
    paddingVertical: 10,
    justifyContent: 'flex-start',
    // paddingRight: 25,
  },
  containerStyleScroll: {
    paddingBottom: 25,
    paddingRight: 10,
  },
};

export { InputForm };
