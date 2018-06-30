import React, { Component } from 'react';
import Expo from 'expo';
import {
  View,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  UIManager,
  LayoutManager,
  Text,
  Dimensions,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import {
  authFieldChange,
  nextAuthFormState,
  previousAuthFormState,
  resetPassword,
  resetAuth,
  hideModal,
  pinSuccess,
  pinFail,
} from '../../redux/actions';

import Colors from './../../config/colors';
import {
  Button,
  FullScreenForm,
  Input,
  Spinner,
  PopUpGeneral,
  Slides,
  CodeInput,
} from './../../components/common';

const SCREEN_WIDTH = Dimensions.get('window').width;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

class AuthScreen extends Component {
  renderMainContainer() {
    const {
      loading,
      mainState,
      detailState,
      nextAuthFormState,
      temp_company,
      company,
      email,
      resetPassword,
      skip,
    } = this.props;

    let iconHeaderLeft = 'arrow-back';
    let onPressHeaderLeft = () => {
      this.props.previousAuthFormState(this.props);
    };

    let textHeaderRight = '';
    let onPressHeaderRight = () => {};

    let textFooterRight = 'Next';
    let onPressFooterRight = () => {
      nextAuthFormState('');
    };

    // set text / icons
    switch (mainState) {
      case 'company':
        iconHeaderLeft = '';
        break;
      case 'landing':
        textFooterRight = '';
        break;
      case 'forgot':
        textFooterRight = 'Send';
        onPressFooterRight = () => resetPassword(company, email);
        break;
      case 'login':
        textHeaderRight = 'Forgot?';
        onPressHeaderRight = () => nextAuthFormState('forgot');
        if (detailState === 'password') {
          textFooterRight = 'Log in';
        }
        break;
      case 'register':
        if (detailState === 'password') {
          textFooterRight = 'Register';
        }
        break;
      case 'pin':
        iconHeaderLeft = '';
        textFooterRight = '';
        break;
      default:
        if (skip) {
          textHeaderRight = 'Skip';
          onPressHeaderRight = () => nextAuthFormState();
        }
    }

    return (
      <FullScreenForm
        iconHeaderLeft={iconHeaderLeft}
        onPressHeaderLeft={onPressHeaderLeft}
        textHeaderRight={textHeaderRight}
        onPressHeaderRight={onPressHeaderRight}
        textFooterRight={textFooterRight}
        onPressFooterRight={onPressFooterRight}
        loading={loading}>
        {this.renderContent()}
      </FullScreenForm>
    );
  }

  renderContent() {
    const {
      viewStyleInput,
      buttonsContainer,
      loading,
      viewStyleLanding,
      imageContainer,
      image,
    } = styles;
    const {
      mainState,
      detailState,
      nextAuthFormState,
      company_config,
      pinError,
    } = this.props;
    // console.log(company_config);

    const slides = company_config ? company_config.sliders.landing : null;

    switch (mainState) {
      case 'landing':
        return (
          <View style={viewStyleLanding}>
            <Animatable.View style={imageContainer} animation="zoomInRight">
              {slides && slides.length > 0 ? (
                <Slides data={slides} height={200} width={SCREEN_WIDTH} />
              ) : (
                <Image
                  source={require('./../../../assets/icons/Rehive_icon_white.png')}
                  resizeMode="contain"
                  style={image}
                />
              )}
            </Animatable.View>
            <View style={buttonsContainer}>
              <Button
                label="LOG IN"
                textColor={company_config.colors.secondaryContrast}
                backgroundColor={company_config.colors.secondary}
                size="large"
                reference={input => {
                  this.login = input;
                }}
                onPress={() => nextAuthFormState('login')}
                animation="fadeInUpBig"
              />
              <Button
                label="Register"
                textColor={company_config.colors.primaryContrast}
                backgroundColor="transparent"
                // size="large"
                reference={input => {
                  this.login = input;
                }}
                onPress={() => nextAuthFormState('register')}
                animation="fadeInUpBig"
              />
            </View>
          </View>
        );
      case 'register':
      case 'login':
      case 'company':
      case 'forgot':
      case 'mfa':
        return <View style={viewStyleInput}>{this.renderInput()}</View>;
      case 'pin':
        switch (detailState) {
          case 'pin':
            return (
              <View>
                <Text>Enter pin</Text>
                <Text>{pinError}</Text>
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
              </View>
            );
          case 'fingerprint':
            this._scanFingerprint();
            return <Text>Please scan fingerprint</Text>;
        }
    }
  }

  _onInputPinComplete(code) {
    const { pin } = this.props;
    if (pin === code) {
      this.props.pinSuccess();
    } else {
      this._pinInput.clear();
      this.props.pinFail('Incorrect pin, please try again');
    }
  }

  _scanFingerprint = async () => {
    let result = await Expo.Fingerprint.authenticateAsync('Scan your finger.');
    if (result.success) {
      this.props.pinSuccess();
    } else {
      this.props.pinFail('Unable to authenticate with fingerprint');
    }
  };

  renderInput() {
    const {
      detailState,
      countryCode,
      authError,
      company,
      tempCompany,
      email,
      mobile,
      password,
      emailError,
    } = this.props;

    switch (detailState) {
      case 'company':
        return (
          <Input
            key="company"
            placeholder="e.g. Rehive"
            label="Company"
            inputError={authError}
            value={tempCompany}
            onChangeText={value =>
              this.props.authFieldChange({ prop: 'tempCompany', value })
            }
            returnKeyType="next"
            // autoFocus
            onSubmitEditing={() => this.props.nextAuthFormState('')}
          />
        );
      case 'email':
        return (
          <Input
            key="email"
            placeholder="e.g. user@gmail.com"
            label="Email"
            value={email}
            inputError={authError}
            keyboardType="email-address"
            onChangeText={value =>
              this.props.authFieldChange({ prop: 'email', value })
            }
            returnKeyType="next"
            // autoFocus
            onSubmitEditing={() => this.props.nextAuthFormState('')}
          />
        );
      case 'mobile':
        return (
          <Input
            key="mobile"
            type="mobile"
            autoFocus
            placeholder="12345678"
            label="Mobile"
            value={mobile}
            inputError={authError}
            keyboardType="numeric"
            onChangeText={value =>
              this.props.authFieldChange({ prop: 'mobile', value })
            }
            returnKeyType="next"
            changeCountryCode={this.changeCountryCode}
            countryCode={countryCode}
            onSubmitEditing={() => this.props.nextAuthFormState('')}
          />
        );
      case 'password':
        return (
          <Input
            key="password"
            type="password"
            placeholder="Password"
            label="Password"
            value={password}
            inputError={authError}
            // autoFocus
            onChangeText={value =>
              this.props.authFieldChange({ prop: 'password', value })
            }
            returnKeyType="done"
            onSubmitEditing={() => this.props.nextAuthFormState('')}
          />
        );
      default:
        return <View />;
    }
  }

  renderModal() {
    const {
      modalVisible,
      modalType,
      hideModal,
      resetAuth,
      loading,
      email,
      authError,
    } = this.props;
    // console.log(this.props);

    let contentText = '';
    let textActionOne = 'OK';
    let onPressActionOne = hideModal;
    let content = null;
    switch (modalType) {
      case 'loginError':
        contentText = 'Unable to log in with provided credentials';
        break;
      case 'forgot':
        contentText =
          'Instructions on how to reset your password have been sent to ' +
          email;
        onPressActionOne = resetAuth;
        break;
    }

    return (
      <PopUpGeneral
        visible={modalVisible}
        contentText={contentText}
        textActionOne={textActionOne}
        onPressActionOne={onPressActionOne}
        onDismiss={onPressActionOne}
        // loading={loading}
        // errorText={updateError}
      />
    );
  }

  render() {
    const { loading, appLoading } = this.props;
    const { viewStyleContainer } = styles;

    return (
      <KeyboardAvoidingView
        keyboardShouldPersistTaps={'never'}
        style={viewStyleContainer}
        behavior={'padding'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          {loading ? <Spinner size="large" /> : this.renderMainContainer()}
        </TouchableWithoutFeedback>
        {this.renderModal()}
      </KeyboardAvoidingView>
    );
  }
}

const styles = {
  viewStyleContainer: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingTop: Expo.Constants.statusBarHeight,
    justifyContent: 'center',
  },
  buttonsContainer: {
    width: '100%',
    padding: 16,
  },
  viewStyleLanding: {
    justifyContent: 'center',
    flex: 1,
  },
  viewStyleInput: {
    width: '100%',
    justifyContent: 'center',
    flex: 1,
    padding: 16,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    maxWidth: 150,
    height: 70,
  },
  imageSmall: {
    maxWidth: 250,
    height: 50,
  },

  textContainerTerms: {
    paddingHorizontal: 25,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTerms: {
    fontSize: 12,
    color: Colors.primary,
  },
};

const mapStateToProps = ({ auth, user }) => {
  const {
    detailState,
    countryCode,
    mainState,
    tempCompany,
    company,
    authError,
    email,
    emailError,
    mobile,
    mobileError,
    password,
    passwordError,
    loading,
    token,
    appLoading,
    modalVisible,
    modalType,
    pin,
    fingerprint,
    pinError,
    skip,
    company_config,
  } = auth;
  return {
    detailState,
    countryCode,
    mainState,
    tempCompany,
    company,
    authError,
    email,
    emailError,
    mobile,
    mobileError,
    password,
    passwordError,
    loading,
    token,
    appLoading,
    modalVisible,
    modalType,
    company_config,
    pin,
    fingerprint,
    pinError,
    skip,
  };
};

export default connect(mapStateToProps, {
  authFieldChange,
  nextAuthFormState,
  previousAuthFormState,
  resetPassword,
  resetAuth,
  hideModal,
  pinSuccess,
  pinFail,
})(AuthScreen);
