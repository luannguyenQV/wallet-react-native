import React, { Component } from 'react';
import { Text, TouchableHighlight } from 'react-native';

class TouchableCircle extends Component {
  render() {
    const { text, active, onPress, radius, colors } = this.props;
    const { circle, textStyle } = styles;
    return (
      <TouchableHighlight
        onPress={onPress}
        style={[
          circle,
          {
            height: radius * 2,
            width: radius * 2,
            borderRadius: radius,
            backgroundColor: active ? colors.focus : 'lightgrey',
          },
        ]}>
        <Text
          style={[
            textStyle,
            {
              fontSize: text.length <= 2 ? 24 : text.length <= 4 ? 15 : 10,
            },
          ]}>
          {text ? text.substr(0, 6).toUpperCase() : ''}
        </Text>
      </TouchableHighlight>
    );
  }
}

const styles = {
  circle: {
    // margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
};

export default TouchableCircle;
