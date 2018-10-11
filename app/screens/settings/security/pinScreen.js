import React, { Component } from 'react';
import {
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import {
  setPin,
  resetPin,
  activateFingerprint,
  newItem,
} from './../../../redux/actions';

import Header from './../../../components/header';
import LocalAuthentication from '../../../components/LocalAuthentication';

import { Button, PopUpGeneral, CodeInput } from './../../../components/common';
import { Toast } from 'native-base';

class PinScreen extends Component {
  static navigationOptions = {
    title: 'Set pin/fingerprint',
  };

  state = {
    modalVisible: false,
    modalType: 'none',
    pinState: 'none',
    pinVisible: true,
    hasFingerprintScanner: false,
    hasSavedFingerprints: false,

    tempPin: '',
    viewState: 'auth',
  };

  componentDidMount() {
    if (Expo.LocalAuthentication.hasHardwareAsync()) {
      this.setState({ hasFingerprintScanner: true });
      console.log('hasFingerprintScanner');
      if (Expo.LocalAuthentication.isEnrolledAsync()) {
        this.setState({ hasSavedFingerprints: true });
        console.log('hasSavedFingerprints');
      }
    }
  }

  setPin = confirm_pin => {
    const { new_pin } = this.state;
    if (new_pin === confirm_pin) {
      this.setState({ modalVisible: false });
      this.props.setPin(new_pin);
      this.props.navigation.goBack();
    } else {
      this.setState({ modalVisible: true, modalType: 'errorPin' });
    }
  };

  resetPin = () => {
    this.props.resetPin();
    this.setState({ modalVisible: true, modalType: 'resetPin' });
  };

  renderMainContainer() {
    const { pin, fingerprint } = this.props;
    const { hasFingerprintScanner, hasSavedFingerprints, showPin } = this.state;
    if (showPin) {
      return (
        <View>
          <Text style={styles.textStyle}>Please input your pin</Text>
          <CodeInput
            ref={component => (this._pinInput2 = component)}
            secureTextEntry
            activeColor="gray"
            autoFocus
            inactiveColor="lightgray"
            className="border-b"
            codeLength={4}
            space={7}
            size={30}
            inputPosition="center"
            containerStyle={{ marginTop: 0, paddingBottom: 16, minHeight: 40 }}
            onFulfill={code =>
              this.setState({
                new_pin: code,
                modalVisible: true,
                modalType: 'setLocalAuthentication',
              })
            }
          />

          <Button
            label="CANCEL"
            color="primary"
            onPress={() => this.setState({ showPin: false })}
          />
        </View>
      );
    } else {
    }
  }

  activateFingerprint = async () => {
    if (Platform.OS === 'android') {
      this.setState({
        modalVisible: true,
        modalType: 'setFingerprint',
      });
    }
    let result = await Expo.LocalAuthentication.authenticateAsync('Biometric scan');

    if (result.success) {
      this.props.activateFingerprint();
      this.setState({
        modalVisible: true,
        modalType: 'confirmFingerprint',
      });
    } else {
      this.props.pinFail('Unable to authenticate with biometrics');
    }
  };

  iosScan = async () => {
    let result = await Expo.LocalAuthentication.authenticateAsync('Biometric scan');

    if (!result.success) {
      this.props.navigation.goBack();
    }
    return null;
  };

  renderModal() {
    const { modalVisible, modalType } = this.state;

    let contentText = '';
    let actionText = 'CANCEL';
    let action = () => {
      this.setState({ modalVisible: false });
      this.props.navigation.goBack();
    };
    let showPin = false;
    let errorText = '';
    switch (modalType) {
      case 'setFingerprint':
        contentText = 'Please scan your fingerprint to activate this feature';
        action = () => {
          if (Platform.os !== 'ios') {
            Expo.LocalAuthentication.cancelAuthenticate();
          }
          this.setState({ modalVisible: false, modalType: 'none' });
        };
        break;
      case 'confirmFingerprint':
        contentText = 'LocalAuthentication has been set';
        actionText = 'CLOSE';
        break;
      case 'inputPinError':
        errorText = 'Incorrect pin';
      // case 'setPin':
      //   contentText = 'Please input a pin to secure your account';
      //   // this.pinInput.clear();
      //   showPin = true;
      //   break;
      case 'setLocalAuthentication':
        contentText = 'Please confirm your pin';
        // this._pinInput.clear();
        showPin = true;
        break;
      case 'setPinSuccess':
        contentText = 'Pin has been set';
        break;
      case 'errorPin':
        contentText = 'Pin and confirm pin do not match';
        actionText = 'CLOSE';
        action = () =>
          this.setState({ modalVisible: false, modalType: 'none' });
        break;
      case 'resetPin':
        contentText = 'Pin and fingerprint reset';
        actionText = 'CLOSE';
        action = () =>
          this.setState({ modalVisible: false, modalType: 'none' });
        break;
      default:
        contentText = '';
    }
    return (
      <PopUpGeneral
        visible={modalVisible}
        contentText={contentText}
        textActionOne={actionText}
        onPressActionOne={action}
        errorText={errorText}>
        {showPin ? (
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
            onFulfill={code => this.setPin(code)}
          />
        ) : null}
      </PopUpGeneral>
    );
  }

  renderLanding() {
    const { pin, fingerprint } = this.props;
    const { hasFingerprintScanner, hasSavedFingerprints } = this.state;
    return (
      <View style={{ alignContent: 'center', padding: 8 }}>
        {!hasFingerprintScanner ? (
          <Text>No fingerprint scanner</Text>
        ) : !hasSavedFingerprints ? (
          <Text>No fingerprints saved</Text>
        ) : (
          <Button
            label="ACTIVATE FINGERPRINT"
            color="primary"
            onPress={() => this.setState({ viewState: 'fingerprint' })}
          />
        )}

        <Button
          label="SET PIN"
          color="secondary"
          onPress={() => this.setState({ viewState: 'pin' })}
        />

        {pin || fingerprint ? (
          <Button
            label="RESET"
            color="primary"
            type="text"
            onPress={this.resetPin}
          />
        ) : null}
      </View>
    );
  }

  renderContent() {
    const { viewState } = this.state;
    let pin = '';
    let fingerprint = false;
    let onDismiss = () => {};
    let onSuccess = () => {};
    let onCancel = () => this.setState({ viewState: 'landing' });
    let type = '';
    console.log(viewState);
    switch (viewState) {
      case 'auth':
        ({ pin, fingerprint } = this.props);
        onSuccess = () => this.setState({ viewState: 'landing' });
        onDismiss = () => this.props.navigation.goBack();
        onCancel = onDismiss;
        break;
      case 'fingerprint':
        fingerprint = true;
        onSuccess = () => {
          this.props.activateFingerprint();
          Toast.show({
            text: 'Local authentication: fingerprint/biometrics activated',
            duration: 3500,
          });
          this.props.navigation.goBack();
        };
        onDismiss = () => {}; //this.props.navigation.goBack();
        break;
      case 'pin':
        pin = 'set';
        onSuccess = code =>
          this.setState({ tempPin: code, viewState: 'confirm' });
        onDismiss = () => {}; //this.props.navigation.goBack();
        break;
      case 'confirm':
        pin = this.state.tempPin;
        type = 'confirm';
        onSuccess = code => {
          this.props.setPin(code);
          Toast.show({
            text: 'Local authentication: pin activated',
            duration: 3500,
          });
          this.props.navigation.goBack();
        };
        onDismiss = () => {}; //this.props.navigation.goBack();
        break;
      case 'landing':
        return this.renderLanding();
      default:
        break;
    }

    return (
      <View style={{ padding: 8 }}>
        <LocalAuthentication
          pin={pin}
          fingerprint={fingerprint}
          attempts={3}
          type={type}
          // modalVisible={pinVisible}
          onSuccess={onSuccess}
          onDismiss={onDismiss}
        />
        {viewState !== 'landing' ? (
          <Button
            label="CANCEL"
            color="primary"
            type="text"
            onPress={onCancel}
          />
        ) : null}
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Header
          navigation={this.props.navigation}
          title="Set pin/fingerprint"
          back
        />
        {this.renderContent()}
      </View>
    );
  }
}

const styles = {
  buttonStyle: {
    flex: 1,
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  textStyle: {
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
    padding: 8,
  },
  pinInfo: {
    flex: 2,
    flexDirection: 'column',
    padding: 20,
  },
  pinTextStyle: {
    paddingTop: 16,
    justifyContent: 'center',
  },
};
const mapStateToProps = ({ auth }) => {
  const { pin, fingerprint } = auth;
  return { pin, fingerprint };
};

export default connect(mapStateToProps, {
  setPin,
  activateFingerprint,
  resetPin,
})(PinScreen);
