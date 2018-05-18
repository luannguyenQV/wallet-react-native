import React, { Component } from 'react';
import { Input, InputContainer } from './../components/common';

class CryptoAddressComponent extends Component {
  render() {
    return (
      <InputContainer>
        <Input
          label="Crpyto address"
          placeholder="e.g akjsfndj2432askfn"
          autoCapitalize="none"
          underlineColorAndroid="white"
          value={this.props.values.address}
          onChangeText={this.props.updateAddress}
        />
      </InputContainer>
    );
  }
}
export default CryptoAddressComponent;
