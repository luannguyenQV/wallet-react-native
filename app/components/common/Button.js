/* BUTTON */
/* Component | Stateless | Styled */
/* This is the main button component. Takes props to adjust it's size, type, color etc */
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialIcons';
import context from './context';
import { Text } from './Text';
import { View } from './View';

class _Button extends Component {
  _buttonStyle() {
    const {
      type,
      color,
      size,
      design,
      round,
      buttonStyle,
      colors,
      wide,
    } = this.props;

    let backgroundColor = 'transparent';
    if (type === 'contained') {
      backgroundColor = colors[color] ? colors[color] : color;
    }
    return {
      ...styles._buttonStyle,
      backgroundColor,
      height: size === 'large' ? 40 : size === 'small' ? 30 : 36,
      borderRadius:
        design.roundButtons || round
          ? size === 'large' ? 20 : size === 'small' ? 15 : 18
          : 2.5,
      shadowRadius: design.buttonShadow,
      flex: wide ? 1 : 0,
      ...buttonStyle,
    };
  }

  textStyle() {
    const { size, type, color, colors, textStyle } = this.props;

    let textColor = colors[color];
    if (type === 'contained') {
      textColor = colors[color + 'Contrast'];
    }

    return {
      color: textColor,
      fontSize: size === 'large' ? 18 : size === 'small' ? 12 : 14,
      ...textStyle,
    };
  }

  render() {
    const {
      onPress,
      label,
      reference,
      animation,
      disabled,
      size,
      icon,
      containerStyle,
      design,
    } = this.props;
    const { _containerStyle } = styles;
    return (
      <Animatable.View
        ref={reference}
        style={[
          _containerStyle,
          { elevation: design.buttonElevation },
          containerStyle,
        ]}
        animation={animation}>
        <TouchableOpacity
          onPress={onPress}
          disabled={disabled}
          style={this._buttonStyle()}>
          <View fD={'row'} aI={'center'}>
            {icon ? (
              <Icon
                name={icon}
                size={size === 'large' ? 26 : size === 'small' ? 18 : 22}
                color={textColor}
              />
            ) : null}
            <Text t="bu" style={this.textStyle()}>
              {label}
            </Text>
          </View>
        </TouchableOpacity>
      </Animatable.View>
    );
  }
}

_Button.propTypes = {
  label: PropTypes.string, // Text displayed on button
  reference: PropTypes.func, // For animations
  animation: PropTypes.string, // Animation type
  disabled: PropTypes.bool, // Disable touchable component
  onPress: PropTypes.func, // Function to execute on press
  icon: PropTypes.string, // Icon displayed on left of button
  size: PropTypes.string, // Size of button (small / default or '' / large)
  type: PropTypes.string, // Type of button (text, contained, TODO: outlined)
  backgroundColor: PropTypes.string, // Button color
  textColor: PropTypes.string, // Text color
  round: PropTypes.bool, // Rounded corners
  buttonStyle: PropTypes.object, // override button style
  containerStyle: PropTypes.object, // override container style
  textStyle: PropTypes.object, // override text style
  color: PropTypes.string, // main color
  colors: PropTypes.object, // colors from context
  design: PropTypes.object, // design from context
  wide: PropTypes.bool,
};

_Button.defaultProps = {
  label: '',
  reference: () => {},
  animation: '',
  disabled: false,
  onPress: () => {},
  icon: '',
  size: '',
  type: 'contained',
  round: false,
  buttonStyle: {},
  containerStyle: {},
  color: 'primary',
  design: { roundButtons: false },
  wide: false,
};

const styles = {
  _containerStyle: {
    flexDirection: 'row',
    margin: 8,
  },
  _buttonStyle: {
    flexDirection: 'row',
    minWidth: 64,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const Button = context(_Button);

export { Button };
