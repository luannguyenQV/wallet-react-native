import React, { Component } from 'react';
import { ScrollView, KeyboardAvoidingView } from 'react-native';

class InputForm extends Component {
  render() {
    const { reference, children } = this.props;

    const { containerStyle } = styles;

    return (
      <ScrollView
        style={containerStyle}
        keyboardDismissMode={'interactive'}
        keyboardShouldPersistTaps="always"
        ref={reference}>
        {children}
      </ScrollView>
    );
  }
}

const styles = {
  containerStyle: {
    paddingBottom: 25,
  },
};

export { InputForm };
