import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import Header from './../../components/header';
import { connect } from 'react-redux';
import {
  resetSend,
  setSendWallet,
  updateAccountField,
} from './../../redux/actions';
import { decodeQR } from './../../util/general';

import { Output, Button } from './../../components/common';

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

  accept = () => {
    const { account, currency, amount, recipient, note } = this.state.data;
    this.props.resetSend();
    if (account) {
      // set account?
    }
    if (currency) {
      // set account?
      // search for currency,
    } else {
      // default use
      // this.props.setSendWallet(
      //   this.props.wallets[this.props.activeWalletIndex],
      // );
    }

    this.props.updateAccountField({ prop: 'sendAmount', value: amount });
    this.props.updateAccountField({ prop: 'sendRecipient', value: recipient });
    this.props.updateAccountField({ prop: 'sendNote', value: note });
    this.props.navigation.goBack();
    // this.props.navigation.navigate('Send');
  };

  _handleBarCodeRead = raw => {
    const data = decodeQR(raw.data);
    console.log(data);
    this.setState({ camera: false, data });
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
          colors={this.props.company_config.colors}
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

              <Button label="Accept" onPress={this.accept} />
              <Button
                label="Scan again"
                onPress={() => this.setState({ camera: true })}
              />
            </View>
          )
        ) : (
          <Text>No access to camera</Text>
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

const mapStateToProps = ({ auth }) => {
  const { company_config } = auth;
  return { company_config };
};

export default connect(mapStateToProps, {
  resetSend,
  setSendWallet,
  updateAccountField,
})(QRCodeScannerScreen);
