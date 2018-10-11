import React, { Component } from 'react';
import { View } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import Header from './../../components/header';
import { connect } from 'react-redux';
import { currenciesSelector } from './../../redux/reducers/AccountsReducer';
import { decodeQR } from './../../util/general';

import { Output, Button, EmptyListMessage } from './../../components/common';
import { Toast } from 'native-base';

class QRCodeScannerScreen extends Component {
  static navigationOptions = {
    title: 'QR code scanner',
  };

  state = { hasCameraPermission: false };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  _handleBarCodeRead = raw => {
    const data = decodeQR(raw.data);
    let { currencies } = this.props;
    console.log(data);
    const { account, currency, amount, recipient, note, type, memo } = data;

    currencies = currencies.data.filter(
      item => item.currency.code === currency,
    );
    if (currencies.length > 1) {
      currencies = currencies.filter(item => item[account] === account);
    }

    if (currencies.length === 0) {
      currencies = this.props.currencies.data;
    }
    this.props.navigation.goBack();
    this.props.navigation.navigate('Send', {
      type,
      account,
      currency: currencies[0],
      amount,
      note,
      memo,
      recipient,
    });
  };

  render() {
    const { hasCameraPermission } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <Header
          navigation={this.props.navigation}
          back
          title="QR code scanner"
        />
        {hasCameraPermission ? (
          <BarCodeScanner
            onBarCodeRead={this._handleBarCodeRead}
            style={{ flex: 1 }}
            barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
          />
        ) : (
          <EmptyListMessage text="No access to camera" />
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
  },
  buttons: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewStyleConfirm: {
    padding: 16,
  },
};

const mapStateToProps = state => {
  return { currencies: currenciesSelector(state) };
};

export default connect(mapStateToProps, {})(QRCodeScannerScreen);
