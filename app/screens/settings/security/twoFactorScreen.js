import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableHighlight,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import {
  initMFA,
  nextStateMFA,
  verifyMFA,
  authFieldChange,
} from './../../../redux/actions';

import Header from '../../../components/header';
import {
  Button,
  Spinner,
  Input,
  InputContainer,
  Output,
  CodeInput,
  MultiFactorAuthentication,
} from '../../../components/common';

class TwoFactorScreen extends Component {
  static navigationOptions = {
    title: 'Two factor',
  };

  componentDidMount() {
    this.props.initMFA();
    // checks mfa status, updates state accordingly
    // this.setState({ viewState: 'landing' });
  }

  renderContent() {
    const { mfaState } = this.props;

    switch (mfaState) {
      case 'landing':
        return this.renderLanding();
      case 'enabled':
        return this.renderEnabled();
      case 'token':
        return this.renderToken();
      case 'sms':
        return this.renderSMS();
      case 'verifyToken':
      case 'verifySMS':
        return this.renderVerify();
      default:
        return <Spinner size="large" />;
    }
  }

  renderLanding() {
    return (
      <View style={styles.contentStyle}>
        <Text style={styles.textStyle}>
          Multi-factor authentication increases the security of your account by
          requiring a code (either SMS or from a token provider) above your
          normal password for authentication. {'\n'}
          {'\n'}Please choose the type of multi-factor authentication you would
          like to activate on your account.
        </Text>
        {this.props.mfaLoading ? (
          <Spinner size="large" />
        ) : (
          <View>
            <Button
              label="TOKEN"
              color="primary"
              onPress={() => this.props.nextStateMFA('token')}
            />
            <Button
              label="SMS"
              color="primary"
              type="text"
              onPress={() => this.props.nextStateMFA('sms')}
            />
          </View>
        )}
      </View>
    );
  }

  renderEnabled() {
    return (
      <View style={styles.contentStyle}>
        <Text style={styles.textStyle}>
          Multi-factor authentication increases the security of your account by
          requiring a code (either SMS or from a token provider) above your
          normal password for authentication. {'\n'}
          {'\n'}Multi-factor authentication is enabled on this account.
        </Text>
        <Button
          label="DISABLE"
          color="primary"
          onPress={() => this.props.nextStateMFA('')}
        />
      </View>
    );
  }

  renderToken() {
    const { colors } = this.props.company_config;
    const { issuer, account, key, otpauth_url } = this.props.mfaToken;
    const url =
      'otpauth://totp/' +
      issuer +
      ':' +
      account +
      '?secret=' +
      key +
      '&digits=6&issuer=' +
      issuer;
    console.log('url', url);
    const encUrl = encodeURI(url);
    console.log('encUrl', encUrl);

    return (
      <InputContainer>
        <View style={{ height: 8 }} />
        <Image
          style={{
            width: 250,
            height: 250,
            alignSelf: 'center',
          }}
          source={{
            uri:
              'https://chart.googleapis.com/chart?cht=qr&chs=200x200&chld=L|0&chl=' +
              encUrl,
          }}
        />
        <Output label="Issuer" value={issuer} copy />
        <Output label="Account" value={account} copy />
        <Output label="Key" value={key} copy />
        <Button
          label="ENABLE"
          color="primary"
          onPress={() => this.props.nextStateMFA('verifyToken')}
        />
        <Button
          label="CANCEL"
          color="primary"
          type="text"
          onPress={() => this.props.nextStateMFA('back')}
        />
      </InputContainer>
    );
  }

  renderSMS() {
    return (
      <View style={styles.contentStyle}>
        <Text style={styles.textStyle}>
          Please input a mobile number that will be used for SMS multi-factor
          auth.
        </Text>
        <Input
          label="Mobile number"
          placeholder="e.g. +278412345687"
          autoCapitalize="none"
          value={this.props.mfaMobile}
          // inputError={updateError}
          onChangeText={value =>
            this.props.authFieldChange({ prop: 'mfaMobile', value })
          }
        />
        <Button
          label="ENABLE"
          color="primary"
          onPress={() => this.props.nextStateMFA('verifySMS')}
        />
        <Button
          label="CANCEL"
          color="primary"
          type="text"
          onPress={() => this.props.nextStateMFA('back')}
        />
      </View>
    );
  }

  renderVerify() {
    const { mfaError, mfaState, mfaToken, profile } = this.props;
    return (
      <View>
        <MultiFactorAuthentication
          verifyMFA={this.props.verifyMFA}
          issuer={profile.company}
          account={profile.email}
          secret={mfaToken ? mfaToken.key : ''}
          error={mfaError}
          type={mfaState === 'verifyToken' ? 'token' : 'sms'}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <Header navigation={this.props.navigation} back title="Two factor" />
        {this.renderContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  contentStyle: {
    padding: 16,
  },
  textStyle: {
    fontSize: 16,
    textAlign: 'center',
    paddingBottom: 16,
  },
});

const mapStateToProps = ({ auth, user }) => {
  const { mfaState, mfaToken, mfaError, mfaLoading, mfaMobile } = auth;
  const { profile } = user;
  return {
    mfaState,
    mfaToken,
    mfaError,
    mfaLoading,
    mfaMobile,
    profile,
  };
};

export default connect(mapStateToProps, {
  initMFA,
  nextStateMFA,
  verifyMFA,
  authFieldChange,
})(TwoFactorScreen);
