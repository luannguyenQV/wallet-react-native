import React, { Component } from 'react';
import { View } from 'react-native';

class ButtonList extends Component {
  render() {
    const { children, containerStyle } = this.props;

    const { _containerStyle } = styles;

    return <View style={[_containerStyle, containerStyle]}>{children}</View>;
  }
}

const styles = {
  _containerStyle: {
    // justifyContent: 'flex-start',
  },
};

export { ButtonList };
