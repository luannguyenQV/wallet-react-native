/* PIN INPUT */
/*
Component that request the user to input a pin if pin has been set or 
to scan fingerprint if fingerprint has been set.
*/
import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { CodeInput, PopUpGeneral } from './common';

class PinModal extends Component {
  state = { contentText: '', errorText: '' };
  componentDidMount() {
    const { pin, fingerprint, onSuccess } = this.props;

    console.log('pin', pin);
    console.log('fingerprint', fingerprint);

    // let compatible = await this.checkDeviceForHardware();
    // let fingerprints = await this.checkForFingerprints();

    let contentText = '';
    let errorText = '';

    if (fingerprint) {
      if (Platform.OS === 'ios') {
        onSuccess();
      }
      // if (!compatible) {
      //   errorText =
      //     'Unable to access devices fingerprint scanner. Please log out to reset fingerprint.';
      // } else if (!fingerprints) {
      //   errorText =
      //     'Unable to access devices stored fingerprints. Please log out to reset fingerprint.';
      // } else {
      contentText = 'Please scan your fingerprint to proceed';
      this.scanFingerprint();
      // }
    } else if (pin) {
      contentText = 'Please input your pin to proceed';
    } else {
      onSuccess();
    }

    this.setState({ errorText, contentText });
  }

  checkDeviceForHardware = async () => {
    let compatible = await Expo.Fingerprint.hasHardwareAsync();
    this.setState({ compatible });
  };

  checkForFingerprints = async () => {
    let fingerprints = await Expo.Fingerprint.isEnrolledAsync();
    this.setState({ fingerprints });
  };

  scanFingerprint = async () => {
    let result = await Expo.Fingerprint.authenticateAsync('Scan your finger.');
    if (result.success) {
      this.props.onSuccess();
    } else {
      this.setState({ errorText: 'Unable to authenticate with fingerprint' });
    }
  };

  _onInputPinComplete(code) {
    const { pin, onSuccess } = this.props;
    let errorText = '';
    if (pin === code) {
      onSuccess();
    } else {
      this._pinInput.clear();
      errorText = 'Incorrect pin, please try again';
    }
    this.setState({ errorText });
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
    const { modal, modalVisible, onDismiss } = this.props;
    const { viewStyleContainer, textStyle } = styles;

    const { errorText, contentText } = this.state;

    return modal ? (
      <PopUpGeneral
        visible={modalVisible}
        contentText={contentText}
        textActionOne={'CANCEL'}
        onPressActionOne={onDismiss}
        errorText={errorText}
        onDismiss={onDismiss}>
        {this.renderInput()}
      </PopUpGeneral>
    ) : (
      <View style={viewStyleContainer}>
        <Text style={textStyle}>{contentText}</Text>
        {this.renderInput()}
      </View>
    );
  }
}

PinModal.propTypes = {
  pin: PropTypes.string, // Required pin
  fingerprint: PropTypes.bool, // Required fingerprint
  modalVisible: PropTypes.bool, // Required fingerprint
  onSuccess: PropTypes.func, // Function if pin/fingerprint success
  onDismiss: PropTypes.func, // Function to execute on dismiss
};

PinModal.defaultProps = {
  pin: '',
  fingerprint: false,
  modalVisible: false,
  onSuccess: () => {},
  onDismiss: () => {},
};

const styles = {
  viewStyleContainer: {
    flex: 1,
    padding: 8,
  },
  textStyle: {
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
    padding: 8,
    paddingBottom: 16,
  },
};

export default PinModal;
