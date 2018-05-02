import React, { Component } from 'react';
import { Input, InputForm } from './../components/common';

export default class BitcoinAddressComponent extends Component {
  render() {
    return (
      <InputForm>
        <Input
          label="Bitcoin Address"
          placeholder="e.g akjsfndj2432askfn"
          autoCapitalize="none"
          underlineColorAndroid="white"
          value={this.props.values.address}
          onChangeText={this.props.updateAddress}
        />
      </InputForm>
    );
  }
}
