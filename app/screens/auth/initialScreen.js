import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import {
  initialLoad,
  authFieldChange,
  updateAuthFormState,
  // updateAuthInputState,
  updateAuthInputField,
  loginUser,
  registerUser,
} from '../../redux/actions';

import Colors from './../../config/colors';
import Exp from './../../../exp.json';
import {
  Button,
  Card,
  CardContainer,
  Input,
  Output,
} from './../../components/common';

class InitialScreen extends Component {
  componentDidMount() {
    this.props.initialLoad(this.props);
    this.onAuthComplete(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.onAuthComplete(nextProps);
    if (
      nextProps.authFormState === 'register' &&
      nextProps.registerFormState === ''
    ) {
      console.log('yo');
      this.props.updateAuthFormState({ nextFormState: 'landing' });
    }
  }

  onAuthComplete(props) {
    if (props.token) {
      this.props.navigation.navigate('Home');
    }
  }

  performLogin = () => {
    const { email, company, password } = this.props;
    this.props.loginUser({ email, company, password });
  };

  updateAuthInputField() {
    this.props.updateAuthInputField(this.props);
  }

  changeCountryCode = (code, cca2) => {
    this.setState({
      countryCode: '+' + code,
      // countryName: cca2,
    });
  };

  openLoginForm() {
    this.props.updateAuthFormState({
      nextFormState: 'login',
    });
    this.props.authFieldChange({ prop: 'input', value: this.props.email });
  }

  renderMainContainer() {
    const {
      contentContainer,
      imageContainer,
      buttonsContainer,
      image,
      imageSmall,
    } = styles;

    const { authFormState, authFormInputState } = this.props;
    console.log('authFormState: ', authFormState);
    console.log('authFormInputState: ', authFormInputState);

    switch (authFormState) {
      case 'landing':
        return (
          <View style={contentContainer}>
            <View style={imageContainer}>
              <Image
                source={require('./../../../assets/icons/new_logo.png')}
                resizeMode="contain"
                style={image}
              />
            </View>

            <CardContainer>
              <Card
                textActionOne="Change"
                onPressActionOne={() =>
                  this.props.updateAuthFormState({
                    nextFormState: 'company',
                  })
                }>
                <Output label="Company" value={this.props.company} />
              </Card>
            </CardContainer>

            <View style={buttonsContainer}>
              <Button
                label="LOG IN"
                type="primary"
                reference={input => {
                  this.login = input;
                }}
                onPress={() => this.openLoginForm()}
              />
              <Button
                label="REGISTER"
                type="secondary"
                reference={input => {
                  this.login = input;
                }}
                onPress={() =>
                  this.props.updateAuthFormState({
                    nextFormState: 'register',
                  })
                }
              />
            </View>
          </View>
        );
      default:
        return (
          <View style={contentContainer}>
            <View style={imageContainer}>
              <Image
                source={require('./../../../assets/icons/new_logo.png')}
                resizeMode="contain"
                style={imageSmall}
              />
            </View>
            <CardContainer>{this.renderOpenCard()}</CardContainer>
          </View>
        );
    }
  }

  renderOpenCard() {
    const {
      authFormState,
      input,
      inputError,
      company,
      email,
      password,
      emailError,
      passwordError,
      loading,
      actionText,
    } = this.props;

    let textHeader = '';
    let iconHeaderLeft = '';
    let onPressHeaderLeft = () =>
      this.props.updateAuthFormState({ nextFormState: 'landing' });
    let onPressActionOne = () => {};

    console.log(authFormState);
    switch (authFormState) {
      case 'company':
        if (this.props.company) {
          iconHeaderLeft = 'md-close';
        }
        break;

      case 'login':
        textHeader = 'Welcome back';
        iconHeaderLeft = 'md-close';

        // textActionOne = 'Log in';
        // onPressActionOne = () => this.performLogin();
        break;

      case 'register':
        textHeader = 'Register';
        iconHeaderLeft = 'md-close';

        // textActionOne = { actionText };
        // onPressActionOne = () => this.nextRegister();
        break;
    }
    return (
      <Card
        textHeader={textHeader}
        iconHeaderLeft={iconHeaderLeft}
        onPressHeaderLeft={onPressHeaderLeft}
        textActionOne={actionText}
        onPressActionOne={() => this.updateAuthInputField()}
        loading={loading}>
        {this.renderInputField()}
      </Card>
    );
  }

  renderInputField() {
    const { authFormInputState, input, inputError, countryCode } = this.props;

    console.log();
    switch (authFormInputState) {
      case 'company':
        return (
          <Input
            key="company"
            placeholder="e.g. Rehive"
            label="Company"
            value={input}
            requiredError={inputError}
            reference={input => {
              this.input = input;
            }}
            onChangeText={value =>
              this.props.authFieldChange({ prop: 'input', value })
            }
            returnKeyType="next"
            autoFocus
            onSubmitEditing={() => this.updateAuthInputField()}
          />
        );
      case 'email':
        return (
          <Input
            key="email"
            placeholder="e.g. user@gmail.com"
            label="Email"
            value={input}
            requiredError={inputError}
            reference={input => {
              this.input = input;
            }}
            keyboardType="email-address"
            onChangeText={value =>
              this.props.authFieldChange({ prop: 'input', value })
            }
            returnKeyType="next"
            autoFocus
            onSubmitEditing={() => this.updateAuthInputField()}
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
            value={input}
            requiredError={inputError}
            reference={input => {
              this.input = input;
            }}
            keyboardType="numeric"
            onChangeText={value =>
              this.props.authFieldChange({ prop: 'input', value })
            }
            returnKeyType="next"
            changeCountryCode={this.changeCountryCode}
            countryCode={countryCode}
            onSubmitEditing={() => this.updateAuthInputField()}
          />
        );
      case 'password':
        return (
          <Input
            key="password"
            type="password"
            placeholder="Password"
            label="Password"
            value={input}
            requiredError={inputError}
            reference={input => {
              this.input = input;
            }}
            password={true}
            autoFocus
            onChangeText={value =>
              this.props.authFieldChange({ prop: 'input', value })
            }
            returnKeyType="done"
            onSubmitEditing={() => this.updateAuthInputField()}
          />
        );
      default:
        return <View />;
    }
  }

  render() {
    const { viewContainer, textContainerTerms, textTerms } = styles;

    return (
      <View style={viewContainer}>
        {this.renderMainContainer()}
        <View style={{ alignItems: 'center', paddingVertical: 5 }}>
          <Text>Version: {Exp.version}</Text>
        </View>

        <View style={textContainerTerms}>
          <Text style={textTerms}>
            By tapping Log in or Register, I agree to Terms of Service and
            Privacy Policy
          </Text>
        </View>
      </View>
    );
  }
}

const styles = {
  viewContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  imageContainer: {
    paddingTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    maxWidth: 250,
    height: 150,
  },
  imageSmall: {
    maxWidth: 250,
    height: 50,
  },
  buttonsContainer: {
    // flexDirection: 'row',
    // paddingHorizontal: 25,
    // justifyContent: 'center',
    // paddingVertical: 25,
    // justifySelf: 'flex-end',
    // position: 'absolute',
    // bottom: 0,
  },
  textContainerTerms: {
    backgroundColor: Colors.lightgray,
    paddingHorizontal: 25,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTerms: {
    fontSize: 12,
    color: Colors.lightblue,
  },

  cardContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 20,
    marginTop: 0,
  },
  cardTitleContainer: {
    // flex: 1,
    height: 170,
  },
  cardTitle: {
    position: 'absolute',
    // top: 120,
    // left: 26,
    backgroundColor: 'transparent',
    padding: 16,
    fontSize: 24,
    color: '#000000',
    fontWeight: 'bold',
  },

  cardContent: {
    padding: 0,
    color: 'rgba(0, 0, 0, 0.54)',
  },

  cardAction: {
    borderStyle: 'solid',
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    borderTopWidth: 1,
    padding: 15,
  },
};

const mapStateToProps = ({ auth }) => {
  return auth;
};

export default connect(mapStateToProps, {
  authFieldChange,
  initialLoad,
  updateAuthFormState,
  // updateAuthInputState,
  updateAuthInputField,
  loginUser,
  registerUser,
})(InitialScreen);
