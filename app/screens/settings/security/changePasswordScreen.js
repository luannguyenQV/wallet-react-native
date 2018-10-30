import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import {
  authFieldChange,
  changePassword,
  hideModal,
  resetAuth,
} from '../../../redux/actions';
import {
  Input,
  InputContainer,
  Button,
  Text,
} from './../../../components/common';
import Header from './../../../components/header';

class ChangePasswordScreen extends Component {
  static navigationOptions = {
    label: 'Change password',
  };

  componentWillUnmount() {
    this.props.resetAuth();
  }

  render() {
    const {
      new_password,
      old_password,
      authFieldChange,
      inputError,
      changePassword,
      old_passwordError,
      new_passwordError,
    } = this.props;
    const { container, textStyle } = styles;
    return (
      <View style={container}>
        <Header
          navigation={this.props.navigation}
          back
          title="Change password"
        />
        <InputContainer>
          <Input
            type="password"
            label="Old password"
            // placeholder="password"
            autoCapitalize="none"
            value={old_password}
            inputError={old_passwordError}
            onChangeText={value =>
              authFieldChange({ prop: 'old_password', value })
            }
          />
          <Input
            type="password"
            label="New password"
            autoCapitalize="none"
            // placeholder="e.g. 123dr!21"
            value={new_password}
            inputError={new_passwordError}
            onChangeText={value =>
              authFieldChange({ prop: 'new_password', value })
            }
          />

          {inputError ? (
            <Text style={{ padding: 8 }} color={'negative'}>
              {inputError}
            </Text>
          ) : null}

          <Button
            label="CONFIRM"
            color="primary"
            wide
            onPress={() => changePassword(old_password, new_password)}
          />
        </InputContainer>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  textStyle: {
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
  },
};

const mapStateToProps = ({ auth }) => {
  const {
    input,
    inputError,
    old_password,
    new_password,
    old_passwordError,
    new_passwordError,
    loading,
  } = auth;
  return {
    input,
    inputError,
    old_password,
    new_password,
    old_passwordError,
    new_passwordError,
    loading,
  };
};

export default connect(mapStateToProps, {
  authFieldChange,
  changePassword,
  hideModal,
  resetAuth,
})(ChangePasswordScreen);
