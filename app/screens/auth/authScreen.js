import React, { Component } from 'react';
import { Constants } from 'expo';
import {
  View,
  Image,
  KeyboardAvoidingView,
  UIManager,
  Platform,
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
  activateFingerprint,
  setPin,
  showModal,
  showFingerprintModal,
  verifyMFA,
  toggleTerms,
  logoutUser,
  resendVerification,
} from '../../redux/actions';

import { colorSelector } from './../../redux/reducers/ConfigReducer';

import {
  Button,
  FullScreenForm,
  Input,
  Spinner,
  PopUpGeneral,
  Slides,
  CodeInput,
  MultiFactorAuthentication,
  Checkbox,
  Text,
} from './../../components/common';
import { standardizeString } from './../../util/general';
import client from './../../config/client';
import LocalAuthentication from '../../components/LocalAuthentication';
import {
  companiesSelector,
  publicCompaniesSelector,
} from '../../redux/reducers/UserReducer';

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
      company,
      email,
      resetPassword,
      skip,
      company_config,
      terms,
    } = this.props;

    let iconHeaderLeft = 'arrow-back';
    let textHeaderLeft = '';
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
        if (client.company) {
          iconHeaderLeft = '';
        }
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
        if (
          (detailState === 'password' &&
            !company_config.auth.terms &&
            company_config.auth.terms.length === 0) ||
          (company_config.auth.terms &&
            terms &&
            terms.id &&
            company_config.auth.terms.length - 1 === terms.id)
        ) {
          textFooterRight = 'Register';
        }
        break;
      case 'pin':
      case 'mfa':
        textFooterRight = '';
      case 'verification':
        iconHeaderLeft = '';
        textHeaderLeft = 'Log out';
        onPressHeaderLeft = () => this.props.logoutUser();
      default:
    }
    if (skip) {
      textHeaderRight = 'Skip';
      onPressHeaderRight = () => nextAuthFormState('skip');
    }

    return (
      <FullScreenForm
        iconHeaderLeft={iconHeaderLeft}
        onPressHeaderLeft={onPressHeaderLeft}
        textHeaderLeft={textHeaderLeft}
        textHeaderRight={textHeaderRight}
        onPressHeaderRight={onPressHeaderRight}
        textFooterRight={textFooterRight}
        onPressFooterRight={onPressFooterRight}
        // loading={loading}
        color="primary"
        type="auth">
        {this.renderContent()}
      </FullScreenForm>
    );
  }

  renderContent() {
    const {
      viewStyleInput,
      buttonsContainer,
      viewStyleLanding,
      imageContainer,
      image,
      textStyle,
    } = styles;
    const {
      mainState,
      detailState,
      nextAuthFormState,
      company_config,
      pin,
      fingerprint,
      authError,
      email,
      user,
    } = this.props;

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
                  source={require('./../../../assets/icons/icon-1024.png')}
                  resizeMode="contain"
                  style={image}
                />
              )}
            </Animatable.View>
            <View style={buttonsContainer}>
              <Button
                label="LOG IN"
                color="focus"
                size="large"
                reference={input => {
                  this.login = input;
                }}
                onPress={() => nextAuthFormState('login')}
                animation="fadeInUpBig"
              />
              <Button
                label="Register"
                color="authScreenContrast"
                type="text"
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
      case 'forgot':
        return (
          <View style={viewStyleLanding}>
            <Text color="authScreenContrast">
              Please enter your account email, mobile or username
            </Text>
            <View style={viewStyleInput}>{this.renderInput()}</View>
          </View>
        );
      case 'mfa':
        return (
          <MultiFactorAuthentication
            authScreen
            verifyMFA={this.props.verifyMFA}
            type={detailState}
          />
        );
      case 'pin':
        switch (detailState) {
          case 'fingerprint':
          case 'pin':
            return (
              <View style={viewStyleInput}>
                <LocalAuthentication
                  pin={pin}
                  attempts={3}
                  backgroundColor={'primaryContrast'}
                  fingerprint={fingerprint}
                  onSuccess={() => this.props.pinSuccess()}
                  onDismiss={() => this.props.logoutUser()}
                />
              </View>
            );
          case 'set_pin':
          case 'confirm_pin':
            return (
              <View style={viewStyleLanding}>
                <Text color="authScreenContrast">
                  {detailState === 'set_pin'
                    ? 'Please enter pin'
                    : 'Please confirm pin'}
                </Text>
                <Text color="error">{authError}</Text>
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
                  containerStyle={{ marginTop: 0, paddingBottom: 24 }}
                  onFulfill={code => this._onSetPinComplete(code)}
                />
              </View>
            );

          case 'set_fingerprint':
            return (
              <View style={viewStyleLanding}>
                <View style={buttonsContainer}>
                  <Button
                    label="USE FINGERPRINT"
                    color="secondary"
                    reference={input => {
                      this.login = input;
                    }}
                    onPress={() => this._activateFingerprint()}
                    animation="slideInRight"
                  />
                  <Button
                    label="USE PIN"
                    color="primary"
                    type="text"
                    reference={input => {
                      this.login = input;
                    }}
                    onPress={() => nextAuthFormState('pin')}
                    animation="slideInRight"
                  />
                </View>
              </View>
            );
        }
      case 'verification':
        switch (detailState) {
          case 'email':
            return (
              <View style={viewStyleLanding}>
                <Text color="authScreenContrast">
                  Please verify your email by following the instructions sent to{' '}
                  {email}
                </Text>
                {/* <Button
                label="Open email app"
                textColor={company_config.colors.secondaryContrast}
                backgroundColor={company_config.colors.secondary}
                size="large"
                reference={input => { this.login = input; }}
                onPress={() => nextAuthFormState('login')}
                animation="fadeInUpBig"
              /> */}
                {/* <Button
                  label="Resend email"
                  color="secondary"
                  reference={input => {
                    this.email = input;
                  }}
                  onPress={() => resendVerification()}
                  animation="slideInRight"
                /> */}
              </View>
            );
        }
      default:
        return <View style={viewStyleInput}>{this.renderInput()}</View>;
    }
  }

  _onInputPinComplete(code) {
    const { pin } = this.props;
    if (pin === code) {
      this.props.pinSuccess();
    } else {
      this._pinInput.clear();
      this.props.pinFail('Pin incorrect, please try again');
    }
  }

  _onSetPinComplete(code) {
    if (!this.props.code) {
      this.props.authFieldChange({ prop: 'code', value: code });
      this._pinInput.clear();
    } else if (this.props.code === code) {
      this.props.setPin(code);
    } else {
      this._pinInput.clear();
      this.props.authFieldChange({ prop: 'code', value: '' });
    }
    this.props.nextAuthFormState();
  }

  _activateFingerprint = async () => {
    if (Platform.OS === 'android') {
      this.props.showFingerprintModal();
    }
    let result = await Expo.LocalAuthentication.authenticateAsync(
      'Biometric scan',
    );
    this.props.hideModal();

    if (result.success) {
      this.props.activateFingerprint();
    } else {
      this.props.pinFail('Unable to authenticate with biometrics');
    }
  };

  renderInput() {
    const {
      detailState,
      authError,
      company,
      companies,
      tempCompany,
      email,
      mobile,
      password,
      first_name,
      last_name,
      country,
      company_config,
      username,
      terms,
      termsChecked,
      public_companies,
    } = this.props;

    const { authFieldChange, nextAuthFormState } = this.props;

    let key = detailState;
    let type = detailState;
    let placeholder = '';
    let label = standardizeString(detailState);
    let value = '';
    let onChangeText = value => authFieldChange({ prop: detailState, value });
    let data = [];
    let onPressListItem = () => {};
    let returnKeyType = 'done';
    let onSubmitEditing = () => nextAuthFormState('');
    let keyboardType = 'default';
    let autoCapitalize = 'none';
    let title = '';
    let subtitle = '';
    let icon = '';
    let autoFocus = false;
    let sections = [];

    switch (detailState) {
      case 'company':
        placeholder = 'e.g. Rehive';
        value = tempCompany;
        onChangeText = value => authFieldChange({ prop: 'tempCompany', value });
        const recentData = tempCompany
          ? companies.filter(
              item =>
                (item.id
                  ? item.id.toLowerCase().includes(tempCompany.toLowerCase())
                  : false) ||
                (item.name
                  ? item.name.toLowerCase().includes(tempCompany.toLowerCase())
                  : false),
            )
          : companies;
        try {
          const publicData = tempCompany
            ? public_companies.filter(
                item =>
                  item.id
                    ? item.id.toLowerCase().includes(tempCompany.toLowerCase())
                    : false || item.name
                      ? item.name
                          .toLowerCase()
                          .includes(tempCompany.toLowerCase())
                      : false,
              )
            : public_companies;
          console.log(publicData);
          if (publicData.length > 0) {
            sections.push({
              title: 'Public',
              data: publicData,
            });
          }
        } catch (error) {
          console.log(error);
        }
        if (recentData.length > 0) {
          sections.push({
            title: 'Recent',
            data: recentData,
          });
        }
        onPressListItem = item => {
          authFieldChange({ prop: 'tempCompany', value: item.id });
          nextAuthFormState('');
        };
        title = 'name';
        subtitle = 'id';
        icon = 'logo';
        autoFocus = true;
        break;
      case 'email':
        value = email;
        placeholder = 'e.g. user@gmail.com';
        keyboardType = 'email-address';
        break;
      case 'mobile':
        value = mobile;
        placeholder = 'e.g. +12345678';
        keyboardType = 'numeric';
        break;
      case 'password':
        value = password;
        placeholder = 'e.g. Password';
        break;
      case 'first_name':
        autoCapitalize = 'words';
        value = first_name;
        placeholder = 'e.g. John';
        break;
      case 'last_name':
        autoCapitalize = 'words';
        value = last_name;
        placeholder = 'e.g. Snow';
        break;
      case 'username':
        value = username;
        placeholder = 'e.g. jon_snow';
        break;
      case 'country':
        value = country;
        placeholder = 'Password';
        break;
      case 'terms':
        return (
          <Checkbox
            link={terms.link}
            description={terms.description}
            title={terms.title}
            toggleCheck={() => this.props.toggleTerms()}
            value={termsChecked}
            error={authError}
          />
        );
    }
    return (
      <Input
        key={key}
        type={type}
        data={data}
        sections={sections}
        placeholder={placeholder}
        label={label}
        value={value}
        inputError={authError}
        popUp
        onPressListItem={onPressListItem}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        title={title}
        subtitle={subtitle}
        icon={icon}
        autoFocus={autoFocus}
      />
    );
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
      case 'fingerprint':
        contentText = 'Please scan your fingerprint';
        textActionOne = 'CANCEL';
        onPressActionOne = () => {
          if (Platform.os !== 'ios') {
            Expo.LocalAuthentication.cancelAuthenticate();
          }
          hideModal();
        };
        break;
    }

    return (
      <PopUpGeneral
        visible={modalVisible}
        contentText={contentText}
        textActionOne={textActionOne}
        onPressActionOne={onPressActionOne}
        onDismiss={onPressActionOne}
        loading={loading}
        // errorText={updateError}
      />
    );
  }

  render() {
    const { loading, appLoading, postLoading, colors } = this.props;
    const { viewStyleContainer } = styles;

    return (
      <KeyboardAvoidingView
        keyboardShouldPersistTaps={'always'}
        style={[viewStyleContainer, { backgroundColor: colors.authScreen }]}
        behavior={'padding'}
        // keyboardVerticalOffset={10}
      >
        {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}> */}
        {loading || postLoading || appLoading ? (
          <Spinner
            type="auth"
            size="large"
            color="authScreenContrast"
            backgroundColor="authScreen"
          />
        ) : (
          this.renderMainContainer()
        )}
        {/* </TouchableWithoutFeedback> */}
        {this.renderModal()}
      </KeyboardAvoidingView>
    );
  }
}

const styles = {
  viewStyleContainer: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    justifyContent: 'center',
  },
  buttonsContainer: {
    width: '100%',
    padding: 16,
  },
  viewStyleLanding: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    // alignItems: 'center',
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
};

const mapStateToProps = state => {
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
    postLoading,
    code,
    user,
    terms,
    termsChecked,
  } = state.auth;
  return {
    detailState,
    countryCode,
    mainState,
    tempCompany,
    company,
    companies: companiesSelector(state),
    public_companies: publicCompaniesSelector(state),
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
    postLoading,
    code,
    user,
    terms,
    termsChecked,
    colors: colorSelector(state),
  };
};

export default connect(mapStateToProps, {
  authFieldChange,
  nextAuthFormState,
  previousAuthFormState,
  resetPassword,
  resetAuth,
  showModal,
  hideModal,
  pinSuccess,
  pinFail,
  activateFingerprint,
  showFingerprintModal,
  setPin,
  verifyMFA,
  toggleTerms,
  logoutUser,
  resendVerification,
})(AuthScreen);

//727
