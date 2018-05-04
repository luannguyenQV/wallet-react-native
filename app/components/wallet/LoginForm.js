import React, { Component } from 'react';
import { KeyboardAvoidingView, findNodeHandle } from 'react-native';
import { connect } from 'react-redux';
import { authFieldChange, loginUser } from './../../redux/actions';

import { Input, Button, InputForm } from './../common';

class LoginForm extends Component {
  componentWillReceiveProps(nextProps) {
    this.onAuthComplete(nextProps);
  }

  onAuthComplete(props) {
    if (props.token) {
      this.props.navigation.navigate('Home');
    }
  }

  onButtonPress = () => {
    const { email, company, password } = this.props;
    this.props.loginUser({ email, company, password });
  };

  _scrollToInput(inputHandle) {
    inputHandle.focus();
    setTimeout(() => {
      let scrollResponder = this.myScrollView.getScrollResponder();
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
        findNodeHandle(inputHandle),
        200,
        true,
      );
    }, 100);
  }

  render() {
    const {
      email,
      emailError,
      company,
      companyError,
      password,
      passwordError,
    } = this.props;

    const { containerStyle } = styles;

    return (
      <KeyboardAvoidingView
        style={containerStyle}
        behavior={'padding'}
        keyboardVerticalOffset={5}>
        <InputForm
          reference={scrollView => {
            this.myScrollView = scrollView;
          }}>
          <Input
            placeholder="e.g. user@gmail.com"
            label="Email"
            value={email}
            required
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
            onSubmitEditing={() => {
              this.validationEmail();
              this.company.focus();
            }}
          />
          <Input
            placeholder="e.g. Rehive"
            label="Company"
            required
            requiredError={companyError}
            value={company}
            onChangeText={value =>
              this.props.authFieldChange({ prop: 'company', value })
            }
            scrollView={this.myScrollView}
            reference={input => {
              this.company = input;
            }}
            onSubmitEditing={() => {
              this.password.focus();
            }}
            returnKeyType="next"
          />
          <Input
            type="password"
            placeholder="Password"
            label="Password"
            required
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
            onSubmitEditing={this.onButtonPress}
          />
          <Button label="LOG IN" type="primary" onPress={this.onButtonPress} />
          <Button
            label="Forgot password?"
            type="text"
            onPress={() => this.props.navigation.navigate('ForgotPassword')}
          />
        </InputForm>
        {/* <ButtonList>
          
        </ButtonList> */}
      </KeyboardAvoidingView>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    // backgroundColor: 'white',
    backgroundColor: '#00000000',
    // paddingVertical: 10,
    justifyContent: 'flex-start',
    // paddingRight: 25,
  },
  containerStyleInputs: {
    paddingRight: 25,
    paddingBottom: 15,
  },
};

const mapStateToProps = ({ auth }) => {
  return auth;
};

export default connect(mapStateToProps, {
  authFieldChange,
  loginUser,
})(LoginForm);
