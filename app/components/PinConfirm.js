/* PIN INPUT */
/*
Component that request the user to input a pin if pin has been set or 
to scan fingerprint if fingerprint has been set.
*/
import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { CodeInput, PopUpGeneral } from './common';
import context from './common/context';
import { Toast } from 'native-base';

class _PinConfirm extends Component {
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
    let result = await Expo.Fingerprint.authenticateAsync('Scan your finger.');
    if (result.success) {
      this.props.onSuccess();
    } else {
      this.setState({ errorText: 'Unable to authenticate with fingerprint' });
    }
  };

  // if finger print cancelled or failed have a button to try again or log out,
  // perhaps show name of phone user and say "Not you?"
  // this logic moves out of this component and onto the authScreen
  // this means all other actions are once off failure as they are now which is fine
  // woooohooo

  _onInputPinComplete(code) {
    const { pin, attempts, onSuccess, onDismiss } = this.props;
    let { attempt } = this.state;
    attempt = attempt + 1;
    if (pin === code) {
      onSuccess();
    } else {
      if (thisAttempt < attempts) {
        this._pinInput.clear();
        let errorText =
          '[' +
          thisAttempt.toString() +
          '/' +
          attempts.toString() +
          '] ' +
          'Incorrect pin, please try again';
        this.setState({ errorText, attempt: thisAttempt });
      } else {
        Toast.show({ text: 'Too many incorrect attempts. Logged out.' });
        onDismiss();
      }
    }
  }

  renderInput() {
    const { pin } = this.props;
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
          containerStyle={{ marginTop: 0, paddingBottom: 24 }}
          onFulfill={code => this._onInputPinComplete(code)}
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
        visible={modalVisible && contentText}
        contentText={contentText}
        textActionOne={'CANCEL'}
        onPressActionOne={onDismiss}
        errorText={errorText}
        onDismiss={onDismiss}>
        {this.renderInput()}
      </PopUpGeneral>
    ) : (
      <View
        style={[
          viewStyleContainer,
          { backgroundColor: colors.primaryContrast },
        ]}>
        <Text style={textStyle}>{contentText}</Text>
        {this.renderInput()}
        {errorText ? (
          <Text style={[textStyle, { paddingTop: 16, color: colors.negative }]}>
            {errorText}
          </Text>
        ) : null}
      </View>
    );
  }
}

_PinConfirm.propTypes = {
  pin: PropTypes.string, // Required pin
  fingerprint: PropTypes.bool, // Required fingerprint
  modalVisible: PropTypes.bool, // Required fingerprint
  onSuccess: PropTypes.func, // Function if pin/fingerprint success
  onDismiss: PropTypes.func, // Function to execute on dismiss
  attempts: PropTypes.number,
};

_PinConfirm.defaultProps = {
  pin: '',
  fingerprint: false,
  modalVisible: false,
  onSuccess: () => {},
  onDismiss: () => {},
  attempts: 3,
};

const styles = {
  viewStyleContainer: {
    // flex: 1,
    padding: 8,
    borderRadius: 5,
    overflow: 'hidden',
    paddingBottom: 16,
  },
  textStyle: {
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
    // paddingTop: 16,
  },
};

const PinConfirm = context(_PinConfirm);

export default PinConfirm;
