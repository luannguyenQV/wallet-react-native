import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import {
  initialLoad,
  authFieldChange,
  updateAuthFormState,
  saveCompany,
  loginUser,
  registerUser,
  updateRegisterFormState,
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
import LoginForm from './../../components/wallet/LoginForm';

class InitialScreen extends Component {
  state = {
    containerOpen: null,
    containerShow: 'initial',
    inputState: 'company',
  };

  componentDidMount() {
    this.props.initialLoad(this.props);
    this.onAuthComplete(this.props);
    if (this.input) {
      this.input.focus();
    }
  }
  componentWillReceiveProps(nextProps) {
    this.onAuthComplete(nextProps);
    if (
      nextProps.authFormState === 'register' &&
      nextProps.registerFormState === ''
    ) {
      this.props.updateRegisterFormState({ state: 'initial' });
    }
  }

  onAuthComplete(props) {
    if (props.token) {
      this.props.navigation.navigate('Home');
    }
  }

  changeContainerState = newState => {
    if (this.state.containerOpen === null)
      this.setState({ containerOpen: false });
  };

  performLogin = () => {
    const { email, company, password } = this.props;
    this.props.loginUser({ email, company, password });
  };

  openLogin() {
    this.props.updateAuthFormState({
      nextState: 'login',
    });
  }

  openRegister() {
    this.props.updateAuthFormState({
      nextState: 'register',
    });
  }

  nextRegister() {
    this.props.updateRegisterFormState({
      state: this.props.registerFormState,
      value: this.props.input,
    });
  }

  changeCountryCode = (code, cca2) => {
    this.setState({
      countryCode: '+' + code,
      // countryName: cca2,
    });
  };

  renderMainContainer() {
    const {
      contentContainer,
      imageContainer,
      buttonsContainer,
      image,
      imageSmall,
    } = styles;

    const {
      authFormState,
      inputError,
      company,
      email,
      password,
      emailError,
      passwordError,
      loading,
    } = this.props;

    switch (authFormState) {
      case 'validCompany':
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
                    nextState: 'invalidCompany',
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
                onPress={() => this.openLogin()}
              />
              <Button
                label="REGISTER"
                type="secondary"
                reference={input => {
                  this.login = input;
                }}
                onPress={() =>
                  this.props.updateAuthFormState({
                    nextState: 'register',
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
      contentContainer,
      imageContainer,
      buttonsContainer,
      image,
      imageSmall,
    } = styles;

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

    switch (authFormState) {
      case 'invalidCompany':
        return (
          <Card
            textActionOne="Save"
            onPressActionOne={() =>
              this.props.saveCompany({ company: this.props.company })
            }
            loading={loading}>
            <Input
              placeholder="e.g. Rehive"
              label="Company"
              requiredError={inputError}
              value={company}
              autoFocus
              onChangeText={value =>
                this.props.authFieldChange({ prop: 'company', value })
              }
              returnKeyType="done"
            />
          </Card>
        );
      case 'login':
        return (
          <Card
            textHeader="Welcome back"
            iconHeaderLeft="md-arrow-back"
            onPressHeaderLeft={() =>
              this.props.updateAuthFormState({
                nextState: 'validCompany',
              })
            }
            textActionOne="Log in"
            onPressActionOne={() => this.performLogin()}
            loading={loading}>
            <Input
              placeholder="e.g. user@gmail.com"
              label="Email"
              value={email}
              requiredError={emailError}
              keyboardType="email-address"
              onChangeText={value =>
                this.props.authFieldChange({ prop: 'email', value })
              }
              returnKeyType="next"
              autoFocus
              scrollView={this.myScrollView}
              reference={input => {
                this.email = input;
              }}
              // onSubmitEditing={() => {
              //   this.validationEmail();
              // }}
            />
            <Input
              type="password"
              placeholder="Password"
              label="Password"
              requiredError={passwordError}
              value={password}
              password={true}
              onChangeText={value =>
                this.props.authFieldChange({ prop: 'password', value })
              }
              returnKeyType="done"
              scrollView={this.myScrollView}
              reference={input => {
                this.password = input;
              }}
              // onSubmitEditing={this.onButtonPress}
            />
          </Card>
        );
      case 'register':
        return (
          <Card
            textHeader="Register"
            iconHeaderLeft="md-arrow-back"
            onPressHeaderLeft={() =>
              this.props.updateAuthFormState({
                nextState: 'validCompany',
              })
            }
            textActionOne={actionText}
            onPressActionOne={() => this.nextRegister()}
            loading={loading}>
            {this.renderRegisterInput()}
          </Card>
        );
      default:
        return <View />;
    }
  }

  renderRegisterInput() {
    const {
      contentContainer,
      imageContainer,
      buttonsContainer,
      image,
      imageSmall,
    } = styles;

    const {
      registerFormState,
      input,
      inputError,
      company,
      email,
      password,
      emailError,
      passwordError,
      loading,
      lineNumber,
      countryCode,
      mobileNumberError,
    } = this.props;

    switch (registerFormState) {
      case 'email':
        return (
          <Input
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
            scrollView={this.myScrollView}
            onSubmitEditing={() => this.nextRegister()}
          />
        );
      case 'mobile':
        return (
          <Input
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
            onSubmitEditing={() => this.nextRegister()}
          />
        );
      default:
        return (
          <Input
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
            onSubmitEditing={() => this.nextRegister()}
          />
        );
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
  saveCompany,
  loginUser,
  registerUser,
  updateRegisterFormState,
})(InitialScreen);
