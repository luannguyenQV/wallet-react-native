import React, { Component } from 'react';
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  AsyncStorage,
  Alert,
} from 'react-native';
import SettingsService from './../../services/settingsService';
import Auth from './../../util/auth';
import { Input, Button } from './../../components/common';
import Colors from './../../config/colors';
import Header from './../../components/header';

class VerifyMobileScreen extends Component {
  static navigationOptions = {
    title: 'Verify mobile number',
  };

  constructor(props) {
    super(props);
    const params = this.props.navigation.state.params;
    this.state = {
      otp_msg: 'Enter OTP',
      isEdit: false,
      otp: '',
      loginInfo: params.loginInfo,
      signupInfo: params.signupInfo,
    };
  }

  reload = () => {
    Auth.login(this.props.navigation, this.state.loginInfo);
  };
  resend = async () => {
    let responseJson = await SettingsService.resendMobileVerification({
      mobile: this.state.signupInfo.mobile_number,
      company: this.state.signupInfo.company,
    });
    if (responseJson.status === 'success') {
      Alert.alert(
        'Email Resend',
        'A verification email has been resent, please check your email box.',
        [{ text: 'OK', onPress: () => this.setState({ loading: false }) }],
      );
    } else {
      Alert.alert('Error', responseJson.message, [{ text: 'OK' }]);
    }
  };
  verify = async () => {
    await AsyncStorage.setItem('token', this.state.loginInfo.token);
    let responseJson = await SettingsService.verifyMobile(this.state.otp);

    if (responseJson.status === 'success') {
      this.reload();
    } else {
      Alert.alert('Error', responseJson.message, [{ text: 'OK' }]);
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          navigation={this.props.navigation}
          title="Verify mobile number"
        />
        <KeyboardAvoidingView style={styles.container} behavior={'padding'}>
          <View style={{ flex: 1 }}>
            <Input
              label={this.state.otp_msg}
              placeholder="OTP"
              autoCapitalize="none"
              keyboardType="numeric"
              onChangeText={otp => this.setState({ otp })}
            />
          </View>
          <Button label="VERIFY" onPress={this.verify} />

          <View style={styles.buttons}>
            <Button label="SKIP" type="primary" onPress={() => this.reload()} />
            <Button
              label="RESEND"
              type="secondary"
              onPress={() => this.resend()}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingTop: 10,
  },
  submit: {
    flex: 1,
    marginBottom: 10,
    backgroundColor: Colors.lightblue,
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resend: {
    marginHorizontal: 25,
    marginBottom: 10,
    backgroundColor: Colors.lightblue,
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    height: 65,
    flexDirection: 'row',
    alignSelf: 'stretch',
    paddingHorizontal: 25,
  },
});

export default VerifyMobileScreen;
