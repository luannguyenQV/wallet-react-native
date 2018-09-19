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

    console.log('pin', pin);
    console.log('fingerprint', fingerprint);

    let contentText = '';
    let errorText = '';

    if (fingerprint) {
      let compatible = await Expo.Fingerprint.hasHardwareAsync();
      let fingerprints = await Expo.Fingerprint.isEnrolledAsync();
      console.log(fingerprints, compatible);
      if (!fingerprints && !compatible) {
        errorText =
          'Unable to access devices stored fingerprints. Please log out to reset fingerprint.';
      } else {
        if (Platform.OS !== 'ios') {
          contentText = 'Please scan your fingerprint to proceed';
        }
        this.scanFingerprint();
      }
    } else if (pin) {
      contentText = 'Please input your pin to proceed';
    } else {
      onSuccess();
    }

    this.setState({ errorText, contentText });
  }

  scanFingerprint = async () => {
    // let contentText = '';
    // await this.setState({ contentText });
    let result = await Expo.Fingerprint.authenticateAsync('Scan your finger.');
    if (result.success) {
      this.props.onSuccess();
    } else {
      this.handleFail();
    }
  };

  handleFail() {
    console.log('handle fail');
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
      Toast.show({ text: 'Too many incorrect attempts.' });
      onDismiss();
    }
  }

  _onInputPinComplete(code) {
    const { pin, onSuccess } = this.props;
    if (pin === code) {
      onSuccess();
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
          onPress={() => this.scanFingerprint()}
        />
      );
    }
    return <View />;
  }

  render() {
    const { modal, modalVisible, onDismiss, colors } = this.props;
    const { viewStyleContainer, textStyle } = styles;

    const { errorText, contentText, attempt } = this.state;
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
    ) : contentText || errorText ? (
      <View
        style={[
          viewStyleContainer,
          { backgroundColor: colors.primaryContrast },
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
};

_LocalAuthentication.defaultProps = {
  pin: '',
  fingerprint: false,
  modalVisible: false,
  onSuccess: () => {},
  onDismiss: () => {},
  attempts: 1,
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
