import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  Alert,
  Clipboard,
} from 'react-native';
import Header from './../../../../components/header';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from './../../../../config/colors';
import AuthService from './../../../../services/authService';
import resetNavigation from './../../../../util/resetNavigation';
import {
  Input,
  InputContainer,
  Button,
  Output,
} from './../../../../components/common';

class TwoFactorTokenScreen extends Component {
  static navigationOptions = {
    title: 'Token',
  };

  constructor(props) {
    super(props);
    const params = this.props.navigation.state.params;
    this.state = {
      imageURI:
        'https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=undefined&choe=UTF-8',
      otpauth_url: '',
      token: '',
      issuer: '',
      account: '',
      key: '',
      // delete: params.authInfo.token,
    };
  }

  async componentDidMount() {
    let responseJson = await AuthService.tokenAuthGet();
    if (responseJson.status === 'success') {
      const tokenResponse = responseJson.data;
      this.setState({
        otpauth_url: tokenResponse.otpauth_url,
        issuer: tokenResponse.issuer,
        account: tokenResponse.account,
        key: tokenResponse.key,
        imageURI:
          'https://chart.googleapis.com/chart?cht=qr&chs=200x200&chld=L|0&chl=' +
          tokenResponse.otpauth_url,
      });
    } else {
      let responseJson = await AuthService.tokenAuthPost({});
      if (responseJson.status === 'success') {
        const tokenResponse = responseJson.data;
        this.setState({
          otpauth_url: tokenResponse.otpauth_url,
          issuer: tokenResponse.issuer,
          account: tokenResponse.account,
          key: tokenResponse.key,
          imageURI:
            'https://chart.googleapis.com/chart?cht=qr&chs=200x200&chld=L|0&chl=' +
            tokenResponse.otpauth_url,
        });
      } else {
        Alert.alert('Error', responseJson.message, [{ text: 'OK' }]);
      }
    }
  }

  saveToken = async () => {
    let responseJson = await AuthService.authVerify({
      token: this.state.token,
    });
    if (responseJson.status === 'success') {
      const authInfo = responseJson.data;
      await resetNavigation.dispatchUnderTwoFactor(this.props.navigation);
    } else {
      Alert.alert('Error', responseJson.message, [{ text: 'OK' }]);
    }
  };

  deleteTwoFactorAuth = async () => {
    let responseJson = await AuthService.authTokenDelete();
    if (responseJson.status === 'success') {
      this.setState({
        delete: !this.state.delete,
      });
      await resetNavigation.dispatchUnderTwoFactor(this.props.navigation);
    } else {
      Alert.alert('Error', responseJson.message, [{ text: 'OK' }]);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          back
          title="Token authentication"
        />
        <InputContainer>
          <Image
            style={{ width: 250, height: 250, alignSelf: 'center' }}
            source={{ uri: this.state.imageURI }}
          />
          <Output label="Issuer" value={this.state.issuer} copy />
          <Output label="Account" value={this.state.account} copy />
          <Output label="Key" value={this.state.key} copy />
          <Input
            label="Enter your token"
            placeholder="e.g. 123456"
            value={this.state.token}
            keyboardType="numeric"
            returnKeyType="done"
            onChangeText={token => this.setState({ token: token })}
          />
          <Button label="SUBMIT" onPress={() => this.saveToken()} />
          {this.state.delete && (
            <Button label="DELETE" onPress={() => this.deleteTwoFactorAuth()} />
          )}
        </InputContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 16,
    color: Colors.black,
    padding: 20,
  },
  infoContainer: {
    paddingVertical: 16,
    paddingHorizontal: 15,
    flexDirection: 'row',
  },
  infoTitleText: {
    flex: 2,
    color: Colors.black,
    textAlign: 'left',
  },
  infoDetailsText: {
    flex: 5,
    textAlign: 'right',
  },
  buttonStyle: {
    backgroundColor: Colors.lightblue,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 4,
    marginHorizontal: 15,
    marginVertical: 8,
  },
  buttonTextColor: {
    color: 'white',
  },
  submit: {
    marginBottom: 10,
    marginHorizontal: 20,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.lightblue,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TwoFactorTokenScreen;
