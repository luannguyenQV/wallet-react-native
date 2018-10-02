import React, { Component } from 'react';
import { Fingerprint, Constants } from 'expo';
import {
  View,
  Image,
  KeyboardAvoidingView,
  UIManager,
  Platform,
  Dimensions,
  FlatList,
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
  validateInput,
} from '../../redux/actions';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { colorSelector } from './../../redux/reducers/ConfigReducer';
import {
  authSelector,
  localAuthSelector,
} from './../../redux/reducers/AuthReducer';

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

const SCREEN_WIDTH = Dimensions.get('window').width;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

class AuthScreen extends Component {
  renderMainContainer() {
    const {
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
      this.props.nextAuthFormState('back');
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
        textFooterRight = 'Log in';
        break;
      case 'register':
        textFooterRight = 'Register';
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
        <View style={styles.viewStyleLanding}>{this.renderContent()}</View>
      </FullScreenForm>
    );
  }

  renderContent() {
    const { viewStyleInput, buttonsContainer, imageContainer, image } = styles;
    const {
      mainState,
      detailState,
      nextAuthFormState,
      company_config,
      localAuth,
      authError,
      email,
      user,
      authInputs,
      auth,
      colors,
    } = this.props;

    const slides = company_config ? company_config.sliders.landing : null;

    switch (mainState) {
      case 'landing':
        return (
          <View style={{ width: '100%' }}>
            <Animatable.View style={imageContainer} animation="zoomInRight">
              {slides && slides.length > 0 ? (
                <Slides data={slides} height={200} width={SCREEN_WIDTH} />
              ) : (
                <Image
                  source={require('./../../../assets/icons/icon.png')}
                  resizeMode="contain"
                  style={image}
                />
              )}
            </Animatable.View>
            <View style={buttonsContainer}>
              <Button
                label="LOG IN"
                color="secondary"
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
          <View>
            <Text color="authScreenContrast">
              Please enter your account email, mobile or username
            </Text>
            <View style={viewStyleInput}>{this.renderInput()}</View>
          </View>
        );
      case 'mfa':
        return (
          <View style={viewStyleInput}>
            <MultiFactorAuthentication
              authScreen
              verifyMFA={this.props.verifyMFA}
              type={detailState}
            />
          </View>
        );
      case 'pin':
        switch (detailState) {
          case 'fingerprint':
          case 'pin':
            return (
              <View style={viewStyleInput}>
                <LocalAuthentication
                  pin={localAuth.pin}
                  attempts={3}
                  backgroundColor={'primaryContrast'}
                  fingerprint={localAuth.fingerprint}
                  onSuccess={() => this.props.pinSuccess()}
                  onDismiss={() => this.props.logoutUser()}
                />
              </View>
            );
          case 'set_pin':
          case 'confirm_pin':
            return (
              <View style={viewStyleInput}>
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
            );
        }
      case 'verification':
        switch (detailState) {
          case 'email':
            return (
              <Text color="authScreenContrast">
                Please verify your email by following the instructions sent to{' '}
                {email}
              </Text>
            );
            {
              /* <Button
                label="Open email app"
                textColor={company_config.colors.secondaryContrast}
                backgroundColor={company_config.colors.secondary}
                size="large"
                reference={input => { this.login = input; }}
                onPress={() => nextAuthFormState('login')}
                animation="fadeInUpBig"
              /> */
            }
            {
              /* <Button
                  label="Resend email"
                  textColor={company_config.colors.primaryContrast}
                  backgroundColor="transparent"
                  // size="large"
                  reference={input => { this.login = input; }}
                  onPress={() => nextAuthFormState('register')}
                  animation="fadeInUpBig"
                /> */
            }
        }
      case 'company':
        return (
          <View style={viewStyleInput}>
            {this.renderInput({ id: 0, name: 'company' }, 0)}
          </View>
        );
      default:
        // console.log(authInputs);
        return (
          <View style={viewStyleInput}>
            <Pagination
              dotsLength={auth.authInputs.length}
              activeDotIndex={1}
              // containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
              dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 8,
                backgroundColor: colors.authScreenContrast,
              }}
              // inactiveDotStyle={
              //   {
              //     // Define styles for inactive dots here
              //   }
              // }
              inactiveDotOpacity={0.6}
              inactiveDotScale={0.7}
              // tappableDots={true}
              // carouselRef={this._carousel}
            />
            <Carousel
              ref={c => {
                this._carousel = c;
              }}
              data={authInputs}
              renderItem={({ item, index }) => this.renderInput(item, index)}
              sliderHeight={260}
              itemHeight={95}
              // sliderWidth={SCREEN_WIDTH - 32}
              // itemWidth={SCREEN_WIDTH - 64}
              vertical
              activeSlideAlignment={'center'}
              inactiveSlideOpacity={0.9}
              inactiveSlideScale={0.7}
              onSnapToItem={slideIndex =>
                this[authInputs[slideIndex].name].focus()
              }
              // useScrollView
              keyboardShouldPersistTaps={'always'}
              layoutCardOffset={20}
              removeClippedSubviews={Platform.OS != 'ios'}
              // removeClippedSubviews={false}
            />
          </View>
        );
    }
  }

  _onBlur(item) {
    this.props.validateInput(item.name, this.props.auth[item.name].data);
    console.log('blur', item.name);
  }

  _onInputPinComplete(code) {
    const { localAuth } = this.props;
    if (localAuth.pin === code) {
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
    let result = await Expo.Fingerprint.authenticateAsync('Biometric scan');
    this.props.hideModal();

    if (result.success) {
      this.props.activateFingerprint();
    } else {
      this.props.pinFail('Unable to authenticate with biometrics');
    }
  };

  renderInput(item, index) {
    const { authError, companies, terms, termsChecked, auth } = this.props;
    // console.log(item, index);
    // console.log(auth);
    const { authInputs } = auth;
    const detailState = item.name;

    const { authFieldChange, nextAuthFormState } = this.props;

    let key = detailState;
    let type = detailState;
    let placeholder = '';
    let onChangeText = value => authFieldChange({ prop: detailState, value });
    let data = [];
    let onPressListItem = () => {};
    let returnKeyType = 'next';
    let onSubmitEditing = () => {
      if (authInputs.length > index + 1 && detailState !== 'company') {
        this[authInputs[index + 1].name].focus();
      } else {
        nextAuthFormState('');
        // send next state
      }
    };
    let keyboardType = 'default';
    let autoCapitalize = 'none';
    let onFocus = () => {
      if (detailState !== 'company') {
        // this.props.setAuthIndex(index)
        this._carousel.snapToItem(
          index,
          (animated = true),
          (fireCallback = true),
        );
      }
    };
    let onBlur = () => this._onBlur(item);

    const label = standardizeString(detailState);
    const value = auth[detailState].data;
    const inputError = auth[detailState].error;
    // const onBlur = this.props.validate(detailState);

    switch (detailState) {
      case 'company':
        placeholder = 'e.g. Rehive';
        onChangeText = value => authFieldChange({ prop: 'tempCompany', value });
        data = auth[detailState].data
          ? companies.filter(item =>
              item.toLowerCase().includes(auth[detailState].data),
            )
          : [];
        onPressListItem = item => {
          authFieldChange({ prop: 'tempCompany', value: item });
          nextAuthFormState('');
        };
        break;
      case 'email':
        placeholder = 'e.g. user@gmail.com';
        keyboardType = 'email-address';
        break;
      case 'mobile':
        placeholder = 'e.g. +12345678';
        keyboardType = 'numeric';
        break;
      case 'password':
        placeholder = 'e.g. Password';
        break;
      case 'first_name':
        autoCapitalize = 'words';
        placeholder = 'e.g. John';
        break;
      case 'last_name':
        autoCapitalize = 'words';
        placeholder = 'e.g. Snow';
        break;
      case 'username':
        placeholder = 'e.g. jon_snow';
        break;
      case 'country':
        placeholder = 'Password';
        break;
    }
    if (detailState.includes('terms')) {
      return (
        <Checkbox
          link={item.terms.link}
          description={item.terms.description}
          title={item.terms.title}
          // toggleCheck={() => this.props.toggleTerms()}
          // value={termsChecked}
          // error={authError}
        />
      );
    }
    return (
      <Input
        reference={input => {
          this[detailState] = input;
        }}
        key={key}
        type={type}
        data={data}
        placeholder={placeholder}
        label={label}
        value={value}
        inputError={inputError}
        popUp
        onPressListItem={onPressListItem}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        onFocus={onFocus}
        onBlur={onBlur}
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
    } = this.props;
    // console.log(this.props);

    let contentText = '';
    let textActionOne = 'OK';
    let onPressActionOne = hideModal;
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
            Fingerprint.cancelAuthenticate();
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
        behavior={'padding'}>
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
    // flex: 1,
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
    companies,
    company,
    authError,
    loading,
    appLoading,
    modalVisible,
    modalType,
    skip,
    company_config,
    postLoading,
    code,
    user,
    terms,
    termsChecked,
    authInputs,
  } = state.auth;
  return {
    detailState,
    countryCode,
    mainState,
    tempCompany,
    company,
    companies,
    authError,
    loading,
    appLoading,
    modalVisible,
    modalType,
    company_config,
    skip,
    postLoading,
    code,
    user,
    terms,
    termsChecked,
    authInputs,
    localAuth: localAuthSelector(state),
    auth: authSelector(state),
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
  validateInput,
})(AuthScreen);

//727
