/* PIN INPUT */
/*
Component that request the user to input a pin if pin has been set or 
to scan fingerprint if fingerprint has been set.
*/
import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { CodeInput, PopUpGeneral, Button } from './common';
import context from './common/context';
import { Toast } from 'native-base';

class _LocalAuthentication extends Component {
  state = { contentText: '', errorText: '', attempt: 0 };

  async componentDidMount() {
    const { pin, fingerprint, onSuccess } = this.props;

    if (fingerprint) {
      let compatible = await Expo.LocalAuthentication.hasHardwareAsync();
      let fingerprints = await Expo.LocalAuthentication.isEnrolledAsync();
      if (!fingerprints && !compatible) {
        this.setState({ errorText: 'Unable to access local authentication' });
      } else {
        this.scanFingerprint();
      }
    } else if (!pin) {
      onSuccess();
    }
  }

  scanFingerprint = async () => {
    let result = await Expo.LocalAuthentication.authenticateAsync();
    if (result.success) {
      this.props.onSuccess();
    } else {
      this.handleFail();
    }
  };

  handleFail() {
    const { attempts, onDismiss } = this.props;
    let { attempt } = this.state;
    attempt = attempt + 1;
    if (attempt < attempts) {
      let errorText =
        '[' +
        attempt.toString() +
        '/' +
        attempts.toString() +
        '] ' +
        'Unable to authenticate, please try again';
      this.setState({ errorText, attempt });
    } else {
      Toast.show({ text: 'Too many incorrect attempts' });
      onDismiss();
    }
  }

  _onInputPinComplete(code) {
    const { pin, onSuccess } = this.props;
    if (pin === 'set' || pin === code) {
      onSuccess(code);
      this._pinInput.clear();
    } else {
      this._pinInput.clear();
      this.handleFail();
    }
  }

  renderInput() {
    const { pin, fingerprint } = this.props;
    const { attempt } = this.state;
    if (pin) {
      return (
        <CodeInput
          ref={component => (this._pinInput = component)}
          secureTextEntry
          activeColor="gray"
          autoFocus
          inactiveColor="lightgray"
          className="border-b"
          codeLength={4}
          space={7}
          size={30}
          inputPosition="center"
          onFulfill={code => this._onInputPinComplete(code)}
        />
      );
    } else if (fingerprint && attempt > 0) {
      return (
        <Button
          label="TRY AGAIN"
          color="secondary"
          reference={input => (this._fingerprint = input)}
          onPress={() => {
            if (Platform.OS === 'android') {
              Toast.show({ text: 'Please try scan again' });
            }
            this.scanFingerprint();
          }}
        />
      );
    }
    return <View />;
  }

  render() {
    const {
      modal,
      modalVisible,
      onDismiss,
      colors,
      pin,
      type,
      fingerprint,
      backgroundColor,
    } = this.props;
    const { viewStyleContainer, textStyle } = styles;

    const { errorText } = this.state;

    const contentText = pin
      ? 'Please ' + (type ? type : 'enter') + ' your pin'
      : fingerprint && Platform.OS !== 'ios'
        ? 'Please scan your fingerprint'
        : '';

    return modal ? (
      <PopUpGeneral
        visible={modalVisible && (contentText || errorText ? true : false)}
        contentText={contentText}
        textActionOne={'CANCEL'}
        onPressActionOne={onDismiss}
        errorText={errorText}
        onDismiss={onDismiss}>
        {this.renderInput()}
      </PopUpGeneral>
    ) : contentText || errorText || pin ? (
      <View
        style={[
          viewStyleContainer,
          { backgroundColor: colors[backgroundColor] },
        ]}>
        {contentText ? <Text style={textStyle}>{contentText}</Text> : null}
        {errorText ? (
          <Text style={[textStyle, { padding: 8, color: colors.negative }]}>
            {errorText}
          </Text>
        ) : null}
        {this.renderInput()}
      </View>
    ) : null;
  }
}

_LocalAuthentication.propTypes = {
  pin: PropTypes.string, // Required pin
  fingerprint: PropTypes.bool, // Required fingerprint
  modalVisible: PropTypes.bool, // Required fingerprint
  onSuccess: PropTypes.func, // Function if pin/fingerprint success
  onDismiss: PropTypes.func, // Function to execute on dismiss
  attempts: PropTypes.number,
  modal: PropTypes.bool,
  colors: PropTypes.object,
  backgroundColor: PropTypes.string,
  type: PropTypes.string,
};

_LocalAuthentication.defaultProps = {
  pin: '',
  fingerprint: false,
  modalVisible: false,
  onSuccess: () => {},
  onDismiss: () => {},
  attempts: 1,
  modal: false,
  backgroundColor: 'white',
  type: '',
};

const styles = {
  viewStyleContainer: {
    padding: 8,
    borderRadius: 5,
    overflow: 'hidden',
  },
  textStyle: {
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
  },
};

const LocalAuthentication = context(_LocalAuthentication);

export default LocalAuthentication;
