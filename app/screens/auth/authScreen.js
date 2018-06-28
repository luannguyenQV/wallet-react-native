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
  Dimensions,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import {
  initialLoad,
  authFieldChange,
  nextAuthFormState,
  previousAuthFormState,
  resetPassword,
  resetAuth,
  hideModal,
} from '../../redux/actions';
import { initializeSDK } from './../../util/rehive';

import Colors from './../../config/colors';
import {
  Button,
  FullScreenForm,
  Input,
  Spinner,
  PopUpGeneral,
  Slides,
} from './../../components/common';

const SCREEN_WIDTH = Dimensions.get('window').width;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

class AuthScreen extends Component {
  componentDidMount() {
    initializeSDK();
    this.props.initialLoad(this.props);
    // this.onAuthComplete(this.props);
  }

  changeCountryCode = (code, cca2) => {
    this.setState({
      countryCode: '+' + code,
      // countryName: cca2,
    });
  };

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
    } = this.props;

    let iconHeaderLeft = 'arrow-back';
    let onPressHeaderLeft = () => {
      this.props.previousAuthFormState(this.props);
    };

    let textHeaderRight = '';
    let onPressHeaderRight = () => {};

    let textFooterRight = 'Next';
    let onPressFooterRight = () => {
      nextAuthFormState(this.props, '');
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
        onPressHeaderRight = () => nextAuthFormState(this.props, 'forgot');
        if (detailState === 'password') {
          textFooterRight = 'Log in';
        }
        break;
      case 'register':
        if (detailState === 'password') {
          textFooterRight = 'Register';
        }
        break;
      default:
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
    const { mainState, nextAuthFormState, company_config } = this.props;
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
                onPress={() => nextAuthFormState(this.props, 'login')}
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
                onPress={() => nextAuthFormState(this.props, 'register')}
                animation="fadeInUpBig"
              />
            </View>
          </View>
        );
      default:
        return <View style={viewStyleInput}>{this.renderInput()}</View>;
    }
  }

  renderInput() {
    const {
      detailState,
      inputError,
      countryCode,
      company,
      tempCompany,
      email,
      password,
      companyError,
      emailError,
      passwordError,
    } = this.props;

    switch (detailState) {
      case 'company':
        return (
          <Input
            key="company"
            placeholder="e.g. Rehive"
            label="Company"
            inputError={companyError}
            value={tempCompany}
            onChangeText={value =>
              this.props.authFieldChange({ prop: 'tempCompany', value })
            }
            returnKeyType="next"
            // autoFocus
            onSubmitEditing={() => this.props.nextAuthFormState(this.props, '')}
          />
        );
      case 'email':
        return (
          <Input
            key="email"
            placeholder="e.g. user@gmail.com"
            label="Email"
            value={email}
            inputError={emailError}
            keyboardType="email-address"
            onChangeText={value =>
              this.props.authFieldChange({ prop: 'email', value })
            }
            returnKeyType="next"
            // autoFocus
            onSubmitEditing={() => this.props.nextAuthFormState(this.props, '')}
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
            inputError={mobileError}
            keyboardType="numeric"
            onChangeText={value =>
              this.props.authFieldChange({ prop: 'mobile', value })
            }
            returnKeyType="next"
            changeCountryCode={this.changeCountryCode}
            countryCode={countryCode}
            onSubmitEditing={() => this.props.nextAuthFormState(this.props, '')}
          />
        );
      case 'password':
        return (
          <View>
            <Input
              key="password"
              type="password"
              placeholder="Password"
              label="Password"
              value={password}
              inputError={passwordError}
              // autoFocus
              onChangeText={value =>
                this.props.authFieldChange({ prop: 'password', value })
              }
              returnKeyType="done"
              onSubmitEditing={() =>
                this.props.nextAuthFormState(this.props, '')
              }
            />
            {/* <Button
              label="Forgot password?"
              type="text"
              color="primaryContrast"
              // reference={f => {
              //   this.login = input;
              // }}
              // onPress={() =>
              //   this.props.nextAuthFormState(this.props, 'forgotPassword')
              // }
            /> */}
          </View>
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
        <TouchableWithoutFeedback
          // style={{ flex: 1 }}
          onPress={Keyboard.dismiss}
          accessible={false}>
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

    // paddingHorizontal: 8,
  },
  buttonsContainer: {
    width: '100%',
    // flex: 1,
    // borderRadius: 2,
    // paddingBottom: 10,
    padding: 16,
  },
  viewStyleLanding: {
    // paddingTop: 80,
    // flexDirection: 'column',
    // alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
    // flex: 3,
    // backgroundColor: 'white',
  },
  viewStyleInput: {
    width: '100%',
    justifyContent: 'center',
    flex: 1,
    padding: 16,
    // flex: 1,
    // backgroundColor: Colors.onPrimary,
    // borderRadius: 2,
    // paddingBottom: 16,
  },
  imageContainer: {
    // paddingBottom: 50,
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
    // backgroundColor: Colors.lightgray,
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
    companyError,
    email,
    emailError,
    password,
    passwordError,
    loading,
    token,
    appLoading,
    modalVisible,
    modalType,
  } = auth;
  const { company_config } = user;
  return {
    detailState,
    countryCode,
    mainState,
    tempCompany,
    company,
    companyError,
    email,
    emailError,
    password,
    passwordError,
    loading,
    token,
    appLoading,
    modalVisible,
    modalType,
    company_config,
  };
};

export default connect(mapStateToProps, {
  authFieldChange,
  initialLoad,
  nextAuthFormState,
  previousAuthFormState,
  resetPassword,
  resetAuth,
  hideModal,
})(AuthScreen);
