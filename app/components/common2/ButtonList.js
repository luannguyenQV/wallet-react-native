import React, { Component } from 'react';
import { View } from 'react-native';

class InputForm extends Component {
  render() {
    const { reference, children } = this.props;

    const { containerStyle } = styles;

    return <View style={{ containerStyle }}>{children}</View>;
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 10,
    justifyContent: 'center',
    paddingRight: 25,
    paddingBottom: 15,
  },
};

export { InputForm };
