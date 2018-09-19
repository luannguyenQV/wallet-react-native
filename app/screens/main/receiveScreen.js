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
import { currenciesSelector } from '../../redux/reducers/AccountsReducer';

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
    const currency = this.props.navigation.state.params.currency;

    // const accountRef = currency.account;
    const currencyCode = currency.currency.code;

    let cryptoURI = '';
    const cryptoType = currency.crypto;
    const cryptoTemp = crypto[cryptoType] ? crypto[cryptoType] : '';
    if (cryptoType) {
      cryptoURI =
        'https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=' +
        encodeURIComponent(
          cryptoType +
            ':' +
            cryptoTemp.address +
            '?' +
            (cryptoTemp.memo ? 'memo=' + cryptoTemp.memo + '&' : '') +
            (currencyCode ? 'currency=' + currencyCode : ''),
        ) +
        '&choe=UTF-8';
    }
    const emailURI =
      'https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=' +
      encodeURIComponent(
        'rehive:' +
          profile.email +
          (currencyCode ? '?currency=' + currencyCode : ''),
      ) +
      '&choe=UTF-8';

    this.setState({
      cryptoURI,
      emailURI,
      crypto: cryptoTemp,
    });
  }

  _copyQR(type) {
    const user = this.props.profile;
    const value = type === 'email' ? user.email : this.state.crypto.address;
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
          onPress={() => this._copyQR(type)}>
          <Image
            style={{ width: 300, height: 250, alignSelf: 'center' }}
            source={{
              uri:
                type === 'email' ? this.state.emailURI : this.state.cryptoURI,
            }}
          />
        </TouchableHighlight>
        {type === 'crypto' ? (
          <Output label={'Address'} value={this.state.crypto.address} copy />
        ) : null}
        <Output
          label={type === 'email' ? 'Email' : 'Memo'}
          value={type === 'email' ? user.email : this.state.crypto.memo}
          copy
        />
      </View>
    );
  }

  render() {
    const { colors } = this.props.company_config;
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation} back title="Receive" />
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

const mapStateToProps = state => {
  return {
    currencies: currenciesSelector(state),
    profile: state.user.profile,
    company_config: state.auth.company_config,
    crypto: state.crypto,
  };
};

export default connect(mapStateToProps, {})(ReceiveScreen);
