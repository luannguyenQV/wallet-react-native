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
    const { colors } = this.props.company_config;
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
              textColor={colors.primaryContrast}
              backgroundColor={colors.primary}
              onPress={() => this.props.nextStateMFA('token')}
            />
            <Button
              label="SMS"
              textColor={colors.primary}
              backgroundColor="transparent"
              onPress={() => this.props.nextStateMFA('sms')}
            />
          </View>
        )}
      </View>
    );
  }

  renderEnabled() {
    const { colors } = this.props.company_config;
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
          textColor={colors.primaryContrast}
          backgroundColor={colors.primary}
          onPress={() => this.props.nextStateMFA('')}
        />
      </View>
    );
  }

  renderToken() {
    const { colors } = this.props.company_config;
    const { mfaToken } = this.props;
    console.log(mfaToken);
    let decComp = decodeURIComponent(mfaToken.otpauth_url);
    console.log('decComp', decComp);
    let dec = decodeURI(mfaToken.otpauth_url);
    console.log('dec', dec);
    return (
      <InputContainer>
        <Image
          style={{ width: 250, height: 250, alignSelf: 'center' }}
          source={{
            uri:
              'https://chart.googleapis.com/chart?cht=qr&chs=200x200&chld=L|0&chl=' +
              decodeURIComponent(mfaToken.otpauth_url),
          }}
        />
        <Output label="Issuer" value={mfaToken.issuer} copy />
        <Output label="Account" value={mfaToken.account} copy />
        <Output label="Key" value={mfaToken.key} copy />
        <Button
          label="ENABLE"
          textColor={colors.primaryContrast}
          backgroundColor={colors.primary}
          onPress={() => this.props.nextStateMFA('verifyToken')}
        />
        <Button
          label="CANCEL"
          textColor={colors.primary}
          backgroundColor="transparent"
          onPress={() => this.props.nextStateMFA('back')}
        />
      </InputContainer>
    );
  }

  renderSMS() {
    const { colors } = this.props.company_config;
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
          colors={colors}
        />
        <Button
          label="ENABLE"
          textColor={colors.primaryContrast}
          backgroundColor={colors.primary}
          onPress={() => this.props.nextStateMFA('verifySMS')}
        />
        <Button
          label="CANCEL"
          textColor={colors.primary}
          backgroundColor="transparent"
          onPress={() => this.props.nextStateMFA('back')}
        />
      </View>
    );
  }

  renderVerify() {
    const {
      mfaError,
      mfaState,
      mfaToken,
      company_config,
      profile,
    } = this.props;
    return (
      <View>
        <MultiFactorAuthentication
          colors={company_config.colors}
          verifyMFA={this.props.verifyMFA}
          issuer={profile.company}
          account={profile.email}
          secret={mfaToken ? mfaToken.key : ''}
          error={mfaError}
          type={mfaState === 'verifyToken' ? 'token' : 'sms'}
        />
        {/* <Text style={styles.textStyle}>
          {mfaState === 'verifyToken'
            ? 'Please input the token from your 2FA app'
            : 'Please input the OTP sent to your mobile number'}
        </Text>
        <CodeInput
          ref={component => (this._pinInput2 = component)}
          secureTextEntry
          activeColor="gray"
          autoFocus
          inactiveColor="lightgray"
          className="border-b"
          codeLength={6}
          space={7}
          size={30}
          inputPosition="center"
          containerStyle={{ marginTop: 0, paddingBottom: 16, minHeight: 40 }}
          onFulfill={code => this.props.verifyMFA(code)}
        />
        {mfaError ? (
          <Text style={[styles.textStyle, { color: 'red' }]}>{mfaError}</Text>
        ) : null} */}

        {/* <Button
          label="CANCEL"
          onPress={() => this.setState({ showPin: false })}
        /> */}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <Header
          navigation={this.props.navigation}
          colors={this.props.company_config.colors}
          back
          title="Two factor"
        />
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
    // flex: 1,
    padding: 16,
  },
  textStyle: {
    // flex: 1,
    fontSize: 16,
    textAlign: 'center',
    // backgroundColor: Colors.lightgray,
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingBottom: 16,
  },
});

const mapStateToProps = ({ auth, user }) => {
  const {
    company_config,
    mfaState,
    mfaToken,
    mfaError,
    mfaLoading,
    mfaMobile,
  } = auth;
  const { profile } = user;
  return {
    company_config,
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
