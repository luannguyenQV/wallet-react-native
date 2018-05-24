import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import Colors from './../../config/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CountryPicker from 'react-native-country-picker-modal';

class Input extends Component {
  state = {
    focused: false,
    iconNameVisibility: 'visibility',
    secureTextEntry: this.props.type === 'password' ? true : false,
    cca2: 'US',
    countryCode: '+1',
  };

  _OnBlur() {
    this.setState({
      focused: false,
    });
  }

  _OnFocus() {
    this.setState({
      focused: true,
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
      requiredError,
      autoCorrect,
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
      focused,
      secureTextEntry,
      iconNameVisibility,
      cca2,
    } = this.state;

    // console.log(this.state);

    return (
      <View
        style={[viewStyleInput, { paddingBottom: focused || value ? 8 : 0 }]}>
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
              style={[
                textStyleCode,
                countryCode.length < 4
                  ? {
                      width: 35,
                    }
                  : {
                      width: 50,
                    },
              ]}
              underlineColorAndroid="transparent"
            />
          </View>
        ) : null}
        <TextInput
          style={textStyleInput}
          onFocus={() => this._OnFocus()}
          onBlur={() => this._OnBlur()}
          underlineColorAndroid="transparent"
          autoCapitalize={autoCapitalize ? autoCapitalize : 'none'}
          autoCorrect={autoCorrect ? autoCorrect : false}
          placeholder={focused ? placeholder : label}
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
          multiline
        />
        {type === 'password' ? (
          <View>
            <Icon
              style={[
                iconStyleVisibility,
                {
                  color: requiredError
                    ? Colors.error
                    : focused ? Colors.focus : 'rgba(0,0,0,0.6)',
                },
              ]}
              name={iconNameVisibility}
              size={24}
              color={borderColor}
              // onPress={this.togglePasswordVisibility}
            />
          </View>
        ) : null}
      </View>
    );
  }

  render() {
    const { label, value, required, requiredError, helperText } = this.props;

    const {
      viewStyleContainer,
      viewStyleLabel,
      viewStyleHelper,
      textStyleLabel,
      textStyleFooter,
      viewStyleContent,
    } = styles;

    const { focused } = this.state;

    return (
      <View style={viewStyleContainer}>
        <View
          style={[
            viewStyleContent,
            {
              borderColor: requiredError
                ? Colors.error
                : focused ? Colors.focus : Colors.lightGray,
              borderBottomWidth: requiredError || focused ? 2 : 1,
            },
          ]}>
          {focused || value ? (
            <View style={viewStyleLabel}>
              <Text
                style={[
                  textStyleLabel,
                  {
                    color: requiredError
                      ? Colors.error
                      : focused ? Colors.focus : 'rgba(0,0,0,0.6)',
                  },
                ]}>
                {label}
                {required ? ' *' : ''}
              </Text>
            </View>
          ) : null}
          {this.renderInput()}
        </View>

        <View style={viewStyleHelper}>
          <Text
            style={[
              textStyleFooter,
              { color: requiredError ? Colors.error : Colors.onPrimary },
            ]}>
            {requiredError ? 'Error: ' + requiredError : helperText}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = {
  viewStyleContainer: {
    minHeight: 80,
    borderTopRightRadius: 3,
    borderTopLeftRadius: 3,
    borderRadius: 3,
    // borderWidth: 2,
    // borderColor: Colors.primary,
  },
  viewStyleContent: {
    // borderTopRightRadius: 3,
    backgroundColor: Colors.onPrimary,
    paddingHorizontal: 12,
    minHeight: 56,
    justifyContent: 'center',
  },
  viewStyleLabel: {
    // height: 20,
  },
  viewStyleCountry: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewStyleInput: {
    flexDirection: 'row',
  },
  viewStyleHelper: {
    height: 28,
  },
  textStyleLabel: {
    fontSize: 12,
    paddingTop: 6,
  },
  textStyleInput: {
    fontWeight: 'normal',
    flex: 1,
    fontSize: 16,
    color: 'rgba(0,0,0,0.87)',
  },
  textStyleCode: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.87)',
    textAlign: 'right',
    fontWeight: 'normal',
    alignItems: 'center',
    fontSize: 16,
  },
  textStyleFooter: {
    paddingTop: 4,
    paddingBottom: 8,
    paddingHorizontal: 12,
    fontSize: 12,
  },
  iconStyleVisibility: {
    width: 24,
    height: 24,
    right: 0,
    bottom: 4,
    position: 'absolute',
  },
};

export { Input };
