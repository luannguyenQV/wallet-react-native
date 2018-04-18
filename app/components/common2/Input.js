import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import Colors from './../../config/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

class Input extends Component {
  state = {
    textColor: Colors.black,
    borderColor: Colors.lightgray,
    iconNameVisibility: 'visibility-off',
    secureTextEntry: this.props.password,
  };

  updateColorOnBlur() {
    this.setState({
      textColor: Colors.black,
      borderColor: Colors.lightgray,
    });
  }

  updateColorOnFocus() {
    this.setState({
      textColor: Colors.lightblue,
      borderColor: Colors.lightblue,
    });
  }

  togglePasswordVisibility = () => {
    if (this.state.secureTextEntry) {
      this.setState({
        iconNameVisibility: 'visibility-off',
        secureTextEntry: false,
      });
    } else {
      this.setState({
        iconNameVisibility: 'visibility',
        secureTextEntry: true,
      });
    }
  };

  renderPassword() {
    const { iconStyleVisibility } = styles;

    const { password } = this.props;

    const { iconNameVisibility, borderColor } = this.state;

    if (password) {
      return (
        <View style={{ width: 30 }}>
          <Icon
            style={iconStyleVisibility}
            name={iconNameVisibility}
            size={25}
            color={borderColor}
            onPress={this.togglePasswordVisibility}
          />
        </View>
      );
    }
  }

  render() {
    const {
      label,
      placeholder,
      value,
      onChangeText,
      required,
      requiredError,
      requiredErrorText,
      reference,
      keyboardType,
      returnKeyType,
      onSubmitEditing,
    } = this.props;

    const {
      viewStyleContainer,
      viewStyleLabel,
      viewStyleInput,
      textStyleLabel,
      textStyleRequired,
      textStyleInput,
    } = styles;

    const { borderColor, textColor, secureTextEntry } = this.state;

    return (
      <View style={[viewStyleContainer, { borderBottomColor: borderColor }]}>
        <View style={viewStyleLabel}>
          <Text style={[textStyleLabel, { color: textColor }]}>{label}</Text>
          {required ? <Text style={textStyleRequired}>*</Text> : null}

          {requiredError && (
            <Text style={textStyleRequired}>{requiredErrorText}</Text>
          )}
        </View>
        <View style={viewStyleInput}>
          <TextInput
            style={textStyleInput}
            onFocus={() => this.updateColorOnFocus()}
            onBlur={() => this.updateColorOnBlur()}
            underlineColorAndroid="white"
            autoCapitalize="none"
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            ref={reference}
            selectTextOnFocus
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            returnKeyType={returnKeyType}
            onSubmitEditing={onSubmitEditing}
          />
          {this.renderPassword()}
        </View>
      </View>
    );
  }
}

const styles = {
  viewStyleContainer: {
    flexDirection: 'column',
    marginLeft: 20,
    marginRight: 20,
    paddingTop: 15,
    borderBottomWidth: 1,
  },
  viewStyleLabel: {
    flexDirection: 'row',
  },
  viewStyleInput: {
    flexDirection: 'row',
  },
  textStyleLabel: {
    fontSize: 16,
  },
  textStyleRequired: {
    paddingTop: 5,
    paddingBottom: 10,
    color: Colors.red,
    paddingLeft: 5,
  },
  textStyleInput: {
    height: 40,
    paddingLeft: 0,
    paddingBottom: 5,
    paddingTop: 5,
    color: Colors.black,
    fontWeight: 'normal',
    borderColor: 'white',
    borderWidth: 1,
    flex: 1,
    // alignItems: 'center',
    fontSize: 20,
  },
  iconStyleVisibility: {
    top: 15,
    right: 0,
    position: 'absolute',
  },
};

export { Input };
