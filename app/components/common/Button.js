// import lib for making component
import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Colors from './../../config/colors';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialIcons';

class Button extends Component {
  buttonStyle() {
    const { buttonStyle } = styles;
    const { type, color, size, label } = this.props;
    return [
      buttonStyle,
      {
        backgroundColor:
          type && type !== 'contained'
            ? 'transparent'
            : color ? Colors[color] : Colors.primary,
        height: size === 'large' ? 40 : size === 'small' ? 30 : 36,
        // minWidth: label ?
      },
    ];
  }

  textStyle() {
    const { textStyle } = styles;
    const { size } = this.props;
    return [
      textStyle,
      {
        color: this.contrastColor(),
        fontSize: size === 'large' ? 18 : size === 'small' ? 10 : 14,
      },
    ];
  }

  contrastColor() {
    const { type, color } = this.props;
    return type === 'text'
      ? color ? Colors[color] : Colors.primary
      : color ? Colors[color + 'Contrast'] : Colors.primaryContrast;
  }

  render() {
    const {
      onPress,
      label,
      reference,
      animate,
      disabled,
      size,
      icon,
    } = this.props;
    const { containerStyle } = styles;
    return (
      <Animatable.View
        ref={reference}
        style={containerStyle}
        animation={animate ? 'fadeInUpBig' : ''}>
        <TouchableOpacity
          onPress={onPress}
          style={this.buttonStyle()}
          disabled={disabled}>
          <View style={{ flexDirection: 'row' }}>
            {icon ? (
              <Icon
                // style={{ alignSelf: 'flex-end' }}
                name={icon}
                size={size === 'large' ? 26 : size === 'small' ? 18 : 22}
                color={this.contrastColor()}
              />
            ) : null}
            <Text style={this.textStyle()}>{label}</Text>
          </View>
        </TouchableOpacity>
      </Animatable.View>
    );
  }
}

const styles = {
  containerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 8,
    // width: '100%',
    backgroundColor: '#00000000',
  },
  buttonStyle: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 3,
    minWidth: 64,
    padding: 8,
    // backgroundColor: Colors.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    shadowOpacity: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyleText: {
    flex: 1,
    height: 28,
    backgroundColor: 'transparent',
    // width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
};

export { Button };
