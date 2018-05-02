import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import Colors from './../../config/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CountryPicker from 'react-native-country-picker-modal';

class Input extends Component {
  state = {
    textColor: Colors.black,
    borderColor: Colors.lightgray,
    iconNameVisibility: 'visibility-off',
    secureTextEntry: this.props.type == 'password' ? true : false,
    cca2: 'US',
    countryCode: '+1',
  };

  _OnBlur() {
    this.setState({
      textColor: Colors.black,
      borderColor: Colors.lightgray,
    });
  }

  _OnFocus() {
    this.setState({
      textColor: Colors.primary,
      borderColor: Colors.primary,
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

  renderInput() {
    const {
      label,
      placeholder,
      value,
      onChangeText,
      reference,
      keyboardType,
      returnKeyType,
      onSubmitEditing,
      autoCapitalize,
      autoFocus,
      type,
      countryCode,
      changeCountryCode,
    } = this.props;

    const {
      viewStyleInput,
      textStyleInput,
      iconStyleVisibility,
      viewStyleCountry,
      textStyleCode,
    } = styles;

    const {
      borderColor,
      textColor,
      secureTextEntry,
      iconNameVisibility,
      cca2,
    } = this.state;

    return (
      <View style={[viewStyleInput, { borderColor: borderColor }]}>
        {type === 'mobile' ? (
          <View style={viewStyleCountry}>
            <CountryPicker
              onChange={value => {
                this.setState({ cca2: value.cca2 });
                changeCountryCode(value.callingCode);
              }}
              closeable
              filterable
              cca2={cca2}
              translation="eng"
              styles={{ width: 24 }}
            />
            <TextInput
              value={countryCode}
              editable={false}
              style={textStyleCode}
            />
          </View>
        ) : null}
        <TextInput
          style={textStyleInput}
          onFocus={() => this._OnFocus()}
          onBlur={() => this._OnBlur()}
          underlineColorAndroid="transparent"
          autoCapitalize={autoCapitalize ? autoCapitalize : 'none'}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          ref={reference}
          selectTextOnFocus
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          autoFocus={autoFocus}
          blurOnSubmit={false}
        />
        {type === 'password' ? (
          <View>
            <Icon
              style={iconStyleVisibility}
              name={iconNameVisibility}
              size={24}
              color={borderColor}
              onPress={this.togglePasswordVisibility}
            />
          </View>
        ) : null}
      </View>
    );
  }

  render() {
    const { label, required, requiredError } = this.props;

    const {
      viewStyleContainer,
      viewStyleLabel,
      viewStyleHelper,
      textStyleLabel,
      textStyleRequired,
    } = styles;

    const { textColor } = this.state;

    return (
      <View style={viewStyleContainer}>
        <View style={viewStyleLabel}>
          <Text style={[textStyleLabel, { color: textColor }]}>
            {label}
            {required ? ' *' : ''}
          </Text>
        </View>
        {this.renderInput()}

        {requiredError ? (
          <View style={viewStyleHelper}>
            <Text style={textStyleRequired}>{requiredError}</Text>
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = {
  viewStyleContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    minHeight: 64,
    paddingTop: 8,
  },
  viewStyleLabel: {
    height: 20,
  },
  viewStyleCountry: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewStyleInput: {
    flexDirection: 'row',
    minHeight: 32,
    borderBottomWidth: 1,
  },
  viewStyleHelper: {
    height: 28,
  },
  textStyleLabel: {
    fontSize: 12,
    paddingTop: 8,
  },
  textStyleInput: {
    color: 'black',
    fontWeight: 'normal',
    paddingTop: 8,
    flex: 1,
    fontSize: 16,
    paddingBottom: 8,
  },
  textStyleCode: {
    width: 50,
    fontSize: 16,
    color: 'black',
    textAlign: 'right',
    fontWeight: 'normal',
    borderColor: 'white',
    alignItems: 'center',
    fontSize: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  textStyleRequired: {
    paddingTop: 2,
    paddingBottom: 8,
    fontSize: 12,
    color: Colors.error,
  },
  iconStyleVisibility: {
    width: 24,
    height: 24,
    right: 0,
    bottom: 8,
    position: 'absolute',
  },
};

export { Input };
