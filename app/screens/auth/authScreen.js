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
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import {
  initialLoad,
  authFieldChange,
  nextAuthFormState,
  previousAuthFormState,
} from '../../redux/actions';

import Colors from './../../config/colors';
import { Button, AuthForm, Input, Spinner } from './../../components/common';

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

class AuthScreen extends Component {
  componentDidMount() {
    this.props.initialLoad(this.props);
    // this.onAuthComplete(this.props);
  }
  // componentWillReceiveProps(nextProps) {
  //   // if (
  //   //   nextProps.authState === 'register' &&
  //   //   nextProps.registerFormState === ''
  //   // ) {
  //   //   this.props.nextAuthFormState({ nextFormState: 'landing' });
  //   // }
  // }
  // componentWillUnmount() {

  // }

  onAuthComplete(props) {
    const { token, appLoading } = props;

    // if (token) {
    if (!appLoading) {
      props.navigation.navigate('Home');
    }
    // }
  }

  changeCountryCode = (code, cca2) => {
    this.setState({
      countryCode: '+' + code,
      // countryName: cca2,
    });
  };

  componentWillReceiveProps(newProps) {
    //check for the mounted props
    this.onAuthComplete(newProps);
    if (!newProps.mounted) return this.unMountStyle(); //call outro animation when mounted prop is false
    this.setState({
      //remount the node when the mounted prop is true
      show: true,
    });
    setTimeout(this.mountStyle, 10); //call the into animiation
  }

  unMountStyle() {
    //css for unmount animation
    this.setState({
      style: {
        fontSize: 60,
        opacity: 0,
        transition: 'all 1s ease',
      },
    });
  }

  renderMainContainer() {
    const { loading, textFooterRight, iconHeaderLeft } = this.props;

    // let iconHeaderLeft = '';
    let textHeaderRight = '';
    // let textFooterRight = textFooterRight;

    let onPressHeaderLeft = () => {
      this.props.previousAuthFormState(this.props);
    };
    let onPressHeaderRight = () => {};
    let onPressFooterRight = () => {
      this.props.nextAuthFormState(this.props, '');
    };

    return (
      <AuthForm
        iconHeaderLeft={iconHeaderLeft}
        onPressHeaderLeft={onPressHeaderLeft}
        textHeaderRight={textHeaderRight}
        onPressHeaderRight={onPressHeaderRight}
        textFooterRight={textFooterRight}
        onPressFooterRight={onPressFooterRight}
        loading={loading}>
        {this.renderTop()}
        {this.renderBottom()}
      </AuthForm>
    );
  }

  renderTop() {
    const { viewStyleTopContainer, imageContainer, image } = styles;
    const { authState } = this.props;

    if (authState === 'landing') {
      return (
        <View style={viewStyleTopContainer}>
          <Animatable.View style={imageContainer} animation="fadeInDownBig">
            <Image
              source={require('./../../../assets/icons/Rehive_icon_white.png')}
              resizeMode="contain"
              style={image}
            />
          </Animatable.View>
        </View>
      );
    }
  }

  renderBottom() {
    const { viewStyleBottomContainer, buttonsContainer, loading } = styles;
    const { authState } = this.props;

    switch (authState) {
      case 'landing':
        return (
          <View style={buttonsContainer}>
            <Button
              label="LOG IN"
              type="contained"
              color="secondary"
              size="large"
              reference={input => {
                this.login = input;
              }}
              onPress={() => this.props.nextAuthFormState(this.props, 'login')}
              animate
            />
            <Button
              label="Register"
              type="text"
              color="primaryContrast"
              reference={input => {
                this.login = input;
              }}
              onPress={() =>
                this.props.nextAuthFormState(this.props, 'register')
              }
              animate
            />
          </View>
        );
      default:
        return (
          <View style={viewStyleBottomContainer}>
            {loading ? <Spinner size="large" /> : this.renderInput()}
          </View>
        );
    }
  }

  renderInput() {
    const {
      inputState,
      inputError,
      countryCode,
      company,
      email,
      password,
      emailError,
      passwordError,
    } = this.props;

    switch (inputState) {
      case 'company':
        return (
          <Input
            key="company"
            placeholder="e.g. Rehive"
            label="Company"
            inputError={inputError}
            value={company}
            onChangeText={value =>
              this.props.authFieldChange({ prop: 'company', value })
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
            inputError={inputError}
            keyboardType="email-address"
            onChangeText={value =>
              this.props.authFieldChange({ prop: 'email', value })
            }
            returnKeyType="next"
            autoFocus
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
            inputError={inputError}
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
              inputError={inputError}
              autoFocus
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

  render() {
    const { viewContainer } = styles;

    return (
      <KeyboardAvoidingView
        keyboardShouldPersistTaps={'never'}
        style={viewContainer}
        behavior={'padding'}>
        <TouchableWithoutFeedback
          style={{ flex: 1 }}
          onPress={Keyboard.dismiss}
          accessible={false}>
          {this.renderMainContainer()}
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const styles = {
  viewContainer: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingTop: Expo.Constants.statusBarHeight,
    justifyContent: 'center',

    // paddingHorizontal: 8,
  },
  buttonsContainer: {
    width: '100%',
    // flex: 1,
    // backgroundColor: Colors.onPrimary,
    // borderRadius: 2,
    // paddingBottom: 10,
  },
  viewStyleTopContainer: {
    // alignItems: 'center',
    justifyContent: 'center',
    // flex: 1,
    flex: 3,
    // backgroundColor: 'white',
  },
  viewStyleBottomContainer: {
    width: '100%',
    justifyContent: 'center',
    flex: 1,
    paddingTop: 48,
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

const mapStateToProps = ({ auth }) => {
  const {
    inputState,
    input,
    inputError,
    countryCode,
    authState,
    company,
    email,
    password,
    emailError,
    passwordError,
    loading,
    textFooterRight,
    token,
    iconHeaderLeft,
    appLoading,
  } = auth;
  return {
    inputState,
    input,
    inputError,
    countryCode,
    authState,
    company,
    email,
    password,
    emailError,
    passwordError,
    loading,
    textFooterRight,
    token,
    iconHeaderLeft,
    appLoading,
  };
};

export default connect(mapStateToProps, {
  authFieldChange,
  initialLoad,
  nextAuthFormState,
  previousAuthFormState,
})(AuthScreen);
