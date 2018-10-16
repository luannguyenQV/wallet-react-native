/* BUTTON */
/* Component | Stateless | Styled */
/* This is the main button component. Takes props to adjust it's size, type, color etc */
import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Input, Output, Text } from '../common';

class CardBankAccount extends Component {
  render() {
    const { item, updateInputField, updateItem } = this.props;
    const {
      name,
      number,
      type,
      bank_name,
      bank_code,
      branch_code,
      swift,
      iban,
      bic,
    } = item;

    if (this.props.detail) {
      return (
        <View style={styles.viewStyleContent}>
          <Input
            label="Account holder"
            placeholder="e.g. John Snow"
            autoCapitalize="none"
            value={name}
            // inputError={updateError}
            onChangeText={input =>
              updateInputField('bank_account', 'name', input)
            }
            reference={r => (this.name = r)}
            onSubmitEditing={() => this.number.focus()}
            returnKeyType="next"
          />
          <Input
            label="Account number"
            placeholder="e.g. 4083764677"
            autoCapitalize="none"
            value={number}
            onChangeText={input =>
              updateInputField('bank_account', 'number', input)
            }
            reference={r => (this.number = r)}
            onSubmitEditing={() => this.type.focus()}
            returnKeyType="next"
            keyboardType={'numeric'}
          />
          <Input
            label="Account type"
            placeholder="e.g. Cheque account"
            autoCapitalize="none"
            value={type}
            onChangeText={input =>
              updateInputField('bank_account', 'type', input)
            }
            reference={r => (this.type = r)}
            onSubmitEditing={() => this.bank_name.focus()}
            returnKeyType="next"
          />
          <Input
            label="Bank name"
            placeholder="e.g. Bank of World"
            autoCapitalize="none"
            value={bank_name}
            onChangeText={input =>
              updateInputField('bank_account', 'bank_name', input)
            }
            reference={r => (this.bank_name = r)}
            onSubmitEditing={() => this.bank_code.focus()}
            returnKeyType="next"
          />
          <Input
            label="Bank code"
            placeholder="e.g. 12324"
            autoCapitalize="none"
            value={bank_code}
            onChangeText={input =>
              updateInputField('bank_account', 'bank_code', input)
            }
            reference={r => (this.bank_code = r)}
            onSubmitEditing={() => this.branch_code.focus()}
            returnKeyType="next"
          />
          <Input
            label="Branch code"
            placeholder="e.g. 46589"
            autoCapitalize="none"
            value={branch_code}
            onChangeText={input =>
              updateInputField('bank_account', 'branch_code', input)
            }
            reference={r => (this.branch_code = r)}
            onSubmitEditing={() => this.swift.focus()}
            returnKeyType="next"
          />
          <Input
            label="Swift code"
            placeholder="Usually 8 or 11 characters"
            autoCapitalize="none"
            value={swift}
            onChangeText={input =>
              updateInputField('bank_account', 'swift', input)
            }
            reference={r => (this.swift = r)}
            onSubmitEditing={() => this.iban.focus()}
            returnKeyType="next"
          />
          <Input
            label="IBAN number"
            placeholder="34 alphanumeric characters"
            autoCapitalize="none"
            value={iban}
            onChangeText={input =>
              updateInputField('bank_account', 'iban', input)
            }
            reference={r => (this.iban = r)}
            onSubmitEditing={() => this.bic.focus()}
            returnKeyType="next"
          />
          <Input
            label="BIC number"
            placeholder="Usually 8 or 11 characters"
            autoCapitalize="none"
            value={bic}
            onChangeText={input =>
              updateInputField('bank_account', 'bic', input)
            }
            onSubmitEditing={() => updateItem('bank_account', tempItem)}
            reference={r => (this.bic = r)}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.viewStyleContent}>
          {bank_name ? <Output label="Bank name" value={bank_name} /> : null}
          {bank_code ? <Output label="Bank code" value={bank_code} /> : null}
          {branch_code ? (
            <Output label="Branch name" value={branch_code} />
          ) : null}
          {type ? <Output label="Type" value={type} /> : null}
          {number ? <Output label="Number" value={number} /> : null}
          {swift ? <Output label="Swift" value={swift} /> : null}
          {iban ? <Output label="IBAN" value={iban} /> : null}
          {bic ? <Output label="BIC" value={bic} /> : null}
          {!(
            bank_name &&
            bank_name &&
            branch_code &&
            type &&
            number &&
            swift &&
            iban &&
            bic
          ) ? (
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

const styles = {
  viewStyleContent: {
    margin: 8,
  },
};

export { CardBankAccount };
