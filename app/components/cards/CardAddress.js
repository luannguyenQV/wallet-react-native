/* BUTTON */
/* Component | Stateless | Styled */
/* This is the main button component. Takes props to adjust it's size, type, color etc */
import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Input, Output, Text } from '../common';

class CardAddress extends Component {
  render() {
    const { item, updateInputField, updateItem } = this.props;
    const { line_1, line_2, city, state_province, postal_code } = item;

    if (this.props.detail) {
      return (
        <View>
          <Input
            reference={r => (this.line_1 = r)}
            onSubmitEditing={() => this.line_2.focus()}
            label="Address line 1"
            placeholder="e.g. 158 Kloof Street"
            autoCapitalize="none"
            value={line_1}
            onChangeText={input => updateInputField('address', 'line_1', input)}
            returnKeyType="next"
          />

          <Input
            reference={r => (this.line_2 = r)}
            onSubmitEditing={() => this.city.focus()}
            label="Address line 2"
            placeholder="e.g. Gardens"
            autoCapitalize="none"
            value={line_2}
            onChangeText={input => updateInputField('address', 'line_2', input)}
            returnKeyType="next"
          />

          <Input
            reference={r => (this.city = r)}
            onSubmitEditing={() => this.state_province.focus()}
            label="City"
            placeholder="e.g. Cape Town"
            autoCapitalize="none"
            value={city}
            onChangeText={input => updateInputField('address', 'city', input)}
            returnKeyType="next"
          />

          <Input
            reference={r => (this.state_province = r)}
            onSubmitEditing={() => this.postal_code.focus()}
            returnKeyType="next"
            label="State or province"
            placeholder="e.g. Western Cape"
            autoCapitalize="none"
            value={state_province}
            onChangeText={input =>
              updateInputField('address', 'state_province', input)
            }
          />

          <Input
            reference={r => (this.postal_code = r)}
            // onSubmitEditing={() => this.recipientInput.focus()}
            label="Postal or ZIP code"
            keyboardType={'numeric'}
            placeholder="e.g. 9001"
            autoCapitalize="none"
            value={postal_code}
            onChangeText={input =>
              updateInputField('address', 'postal_code', input)
            }
            onSubmitEditing={() => updateItem('address')}
          />
        </View>
      );
    } else {
      return (
        <View style={{ padding: 8 }}>
          {line_1 ? <Output label="Address line 1" value={line_1} /> : null}
          {line_2 ? <Output label="Address line 2" value={line_2} /> : null}
          {city ? <Output label="City" value={city} /> : null}
          {state_province ? (
            <Output label="State or province" value={state_province} />
          ) : null}
          {postal_code ? (
            <Output label="Postal or ZIP code" value={postal_code} />
          ) : null}
          {!(line_1 && line_2 && city && state_province && postal_code) ? (
            <Output label="Incomplete" />
          ) : null}
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

// const styles = {
//   _containerStyle: {
//     flexDirection: 'row',
//     margin: 8,
//   },
//   _buttonStyle: {
//     flex: 1,
//     flexDirection: 'row',
//     borderRadius: 2.5,
//     minWidth: 64,
//     padding: 8,
//     shadowColor: '#000',
//     shadowOffset: { width: 2, height: 2 },
//     shadowRadius: 5,
//     shadowOpacity: 0.2,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   _textStyle: {
//     textAlign: 'center',
//     fontWeight: 'bold',
//   },
// };

export { CardAddress };
