import React, { Component } from 'react';
import { View } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import Header from '../../components/header';
import { connect } from 'react-redux';
import { updateContactField } from '../../redux/actions';
import { decodeQR } from '../../util/general';

import { EmptyListMessage } from '../../components/common';

class InputScannerScreen extends Component {
  static navigationOptions = {
    title: 'Input scanner',
  };

  state = { hasCameraPermission: false, prop: '' };

  async componentDidMount() {
    const { prop } = this.props.navigation.state.params;
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted', prop });
  }

  _handleBarCodeRead = raw => {
    const data = decodeQR(raw.data);
    const { prop } = this.state;
    console.log(prop, data.recipient);

    this.props.updateContactField({ prop, value: data.recipient });

    this.props.navigation.goBack();
  };

  render() {
    const { hasCameraPermission } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <Header navigation={this.props.navigation} back title="Input scanner" />
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

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, { updateContactField })(
  InputScannerScreen,
);
