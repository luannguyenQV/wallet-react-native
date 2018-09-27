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

  state = {
    camera: true,
    reference: '',
    data: {
      type: '',
      amount: '',
      recipient: '',
      note: '',
    },
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  accept = data => {
    let { currencies } = this.props;
    const { account, currency, amount, recipient, note, type, memo } = data;

    console.log('currencies', currencies, currency);
    currencies = currencies.data.filter(
      item => item.currency.code === currency,
    );
    console.log('currencies', currencies);
    if (currencies.length > 1) {
      currencies = currencies.filter(item => item[account] === account);
    }
    console.log('currencies', currencies);
    if (currencies.length === 1) {
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
      return;
    }
    this.props.navigation.goBack();
    Toast.show({
      text: 'unable to find currency' + (account ? ' and account' : ''),
    });
  };

  _handleBarCodeRead = raw => {
    const data = decodeQR(raw.data);
    this.accept(data);
  };

  render() {
    const { hasCameraPermission, data } = this.state;
    const { type, currency, account, amount, recipient, note } = data;
    const { viewStyleConfirm } = styles;

    return (
      <View style={{ flex: 1 }}>
        <Header
          navigation={this.props.navigation}
          back
          title="QR code scanner"
        />
        {hasCameraPermission ? (
          this.state.camera ? (
            <BarCodeScanner
              onBarCodeRead={this._handleBarCodeRead}
              style={{ flex: 1 }}
            />
          ) : (
            <View style={viewStyleConfirm}>
              {type ? <Output label="Type" value={type} /> : null}
              {account ? <Output label="Account" value={account} /> : null}
              {currency ? <Output label="Currency" value={currency} /> : null}
              {amount ? <Output label="Amount" value={amount} /> : null}
              {recipient ? (
                <Output label="Recipient" value={recipient} />
              ) : null}
              {note ? <Output label="Note" value={note} /> : null}

              <Button label="Accept" onPress={this.accept} color="secondary" />
              <Button
                label="Scan again"
                onPress={() => this.setState({ camera: true })}
                color="secondary"
              />
            </View>
          )
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
