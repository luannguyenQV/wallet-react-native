/* BUTTON */
/* Component | Stateless | Styled */
/* This is the main button component. Takes props to adjust it's size, type, color etc */
import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Input, Output, Text, EmptyListMessage } from '../common';

class CardPersonalDetails extends Component {
  render() {
    const { item, updateInputField, updateItem } = this.props;
    const { first_name, last_name, id_number } = item;

    if (this.props.detail) {
      return (
        <View>
          <Input
            label="First name"
            placeholder="eg. John"
            autoCapitalize="none"
            value={first_name}
            onChangeText={input =>
              updateInputField('profile', 'first_name', input)
            }
            reference={r => (this.first_name = r)}
            onSubmitEditing={() => this.last_name.focus()}
          />

          <Input
            label="Last name"
            placeholder="eg. Smith"
            autoCapitalize="none"
            value={last_name}
            onChangeText={input =>
              updateInputField('profile', 'last_name', input)
            }
            reference={r => (this.last_name = r)}
            onSubmitEditing={() => this.id_number.focus()}
          />

          <Input
            label="ID number"
            placeholder="eg. 0123456789012"
            autoCapitalize="none"
            value={id_number}
            onChangeText={input =>
              updateInputField('profile', 'id_number', input)
            }
            reference={r => (this.id_number = r)}
            onSubmitEditing={() => updateItem('profile')}
          />
        </View>
      );
    } else {
      return (
        <View style={{ padding: 8 }}>
          {first_name ? <Output label="First name" value={first_name} /> : null}
          {last_name ? <Output label="Last name" value={last_name} /> : null}
          {id_number ? <Output label="ID number" value={id_number} /> : null}
          {first_name && last_name && id_number ? null : (
            <Output label="Incomplete" />
          )}
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

export { CardPersonalDetails };
