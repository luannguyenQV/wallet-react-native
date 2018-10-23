/* BUTTON */
/* Component | Stateless | Styled */
/* This is the main button component. Takes props to adjust it's size, type, color etc */
import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Input, Output, Text } from '../common';

class CardEmail extends Component {
  render() {
    const { item, updateInputField, updateItem, updateError } = this.props;
    const { email } = item;

    if (this.props.detail) {
      return (
        <View style={styles.viewStyleContent}>
          <Input
            label="Email address"
            placeholder="e.g. user@rehive.com"
            autoCapitalize="none"
            value={email}
            inputError={updateError}
            onChangeText={input => updateInputField('email', 'email', input)}
            onSubmitEditing={() => updateItem('email')}
            keyboardType={'email-address'}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.viewStyleContent}>
          {email ? <Output label="" value={email} /> : null}
        </View>
      );
    }
  }
}

// _Button.propTypes = {
//   label: PropTypes.string, // Text displayed on button
//   reference: PropTypes.func, // For animations
//   animation: PropTypes.string, // Animation type
//   disabled: PropTypes.bool, // Disable touchable component
//   onPress: PropTypes.func, // Function to execute on press
//   icon: PropTypes.string, // Icon displayed on left of button
//   size: PropTypes.string, // Size of button (small / default or '' / large)
//   type: PropTypes.string, // Type of button (text, contained, TODO: outlined)
//   backgroundColor: PropTypes.string, // Button color
//   textColor: PropTypes.string, // Text color
//   round: PropTypes.bool, // Rounded corners
//   buttonStyle: PropTypes.object, // override button style
//   containerStyle: PropTypes.object, // override container style
//   textStyle: PropTypes.object, // override text style
//   color: PropTypes.string, // main color
//   colors: PropTypes.object, // colors from context
// };

// _Button.defaultProps = {
//   label: '',
//   reference: () => {},
//   animation: '',
//   disabled: false,
//   onPress: () => {},
//   icon: '',
//   size: '',
//   type: 'contained',
//   round: false,
//   buttonStyle: {},
//   containerStyle: {},
//   color: 'primary',
// };

const styles = {
  viewStyleContent: {
    margin: 8,
  },
};

export { CardEmail };
