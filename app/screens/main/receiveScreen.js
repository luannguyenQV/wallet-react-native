import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableHighlight,
  Clipboard,
} from 'react-native';
import { connect } from 'react-redux';

import { Toast } from 'native-base';
import Header from './../../components/header';
import { Output } from './../../components/common';
import { Container, Tab, Tabs } from 'native-base';

const SCREEN_WIDTH = Dimensions.get('window').width;

class ReceiveScreen extends Component {
  static navigationOptions = {
    title: 'Receive',
  };

  state = {
    imageURI:
      'https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=undefined&choe=UTF-8',
    crypto: false,
  };

  componentDidMount() {
    const { profile, crypto } = this.props;
    const currencyCode = this.props.navigation.state.params.currencyCode;
    if (
      crypto.stellar.includes(currencyCode) ||
      crypto.ethereum.includes(currencyCode) ||
      crypto.bitcoin.includes(currencyCode)
    ) {
      this.setState({ crypto: true });
    }
    const emailURI =
      'https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=' +
      encodeURIComponent(
        'rehive:' +
          profile.email +
          (currencyCode ? '?currency=' + currencyCode : ''),
      ) +
      '&choe=UTF-8';
    const cryptoURI =
      'https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=' +
      encodeURIComponent(
        'stellar:' +
          this.props.receiveAddress +
          '?' +
          (profile.username ? 'memo=' + profile.username + '&' : '') +
          (currencyCode ? 'currency=' + currencyCode : ''),
      ) +
      '&choe=UTF-8';
    this.setState({ cryptoURI, emailURI });
  }

  _copyQR(type) {
    const user = this.props.profile;
    const value = type === 'email' ? user.email : this.props.receiveAddress;
    Clipboard.setString(value);
    Toast.show({
      text:
        value +
        ' copied.' +
        (type === 'email'
          ? ''
          : ' Please remember to include your memo when sending to this address.'),
      duration: 3000,
    });
  }

  renderDetail(type) {
    const user = this.props.profile;
    return (
      <View style={{ padding: 16, width: '100%' }}>
        <Text style={styles.text}>
          {type === 'crypto'
            ? 'This QR code is your public address for accepting payments.'
            : 'This QR code is your Rehive account for use with another Rehive app'}
        </Text>

        <TouchableHighlight
          underlayColor={'white'}
          activeOpacity={0.2}
          onPress={() => this._copyQR()}>
          <Image
            style={{ width: 300, height: 250, alignSelf: 'center' }}
            source={{
              uri:
                type === 'email' ? this.state.emailURI : this.state.cryptoURI,
            }}
          />
        </TouchableHighlight>
        {type === 'crypto' ? (
          <Output label={'Address'} value={this.props.receiveAddress} copy />
        ) : null}
        <Output
          label={type === 'email' ? 'Email' : 'Memo'}
          value={type === 'email' ? user.email : this.props.receiveMemo}
          copy
        />
      </View>
    );
  }

  render() {
    const { colors } = this.props.company_config;
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          colors={colors}
          back
          title="Receive"
        />
        {this.state.crypto ? (
          <Container>
            <Tabs
              tabBarUnderlineStyle={{
                backgroundColor: colors.focus,
              }}>
              <Tab heading="Email" activeTextStyle={{ color: colors.focus }}>
                {this.renderDetail('email')}
              </Tab>
              <Tab heading="Crypto" activeTextStyle={{ color: colors.focus }}>
                {this.renderDetail('crypto')}
              </Tab>
            </Tabs>
          </Container>
        ) : (
          this.renderDetail('email')
        )}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    // alignItems: 'center',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
    paddingHorizontal: 8,
  },
};

const mapStateToProps = ({ user, auth, accounts, crypto }) => {
  const { company_config } = auth;
  const { profile } = user;
  const { receiveAddress, receiveMemo } = accounts;
  return { profile, company_config, receiveAddress, receiveMemo, crypto };
};

export default connect(mapStateToProps, {})(ReceiveScreen);
