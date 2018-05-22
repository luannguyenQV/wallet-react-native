import React, { Component } from 'react';

import { Input, InputContainer } from './../components/common';

export default class BankAccountComponent extends Component {
  render() {
    console.log(this.props);
    return (
      <InputContainer>
        <Input
          label="Account holder"
          placeholder="e.g. John Snow"
          autoCapitalize="none"
          value={this.props.values.name}
          onChangeText={text => this.props.updateInputField('name', text)}
        />
        <Input
          label="Account number"
          placeholder="e.g. 4083764677"
          autoCapitalize="none"
          value={this.props.values.number}
          onChangeText={text => this.props.updateNumber(text)}
        />
        <Input
          label="Account type"
          placeholder="e.g. Cheque account"
          autoCapitalize="none"
          value={this.props.values.type}
          onChangeText={text => this.props.updateType(text)}
        />
        <Input
          label="Bank name"
          placeholder="e.g. Bank of World"
          autoCapitalize="none"
          value={this.props.values.bank_name}
          onChangeText={text => this.props.updateBank(text)}
        />
        <Input
          label="Branch code"
          placeholder="e.g. 46589"
          autoCapitalize="none"
          value={this.props.values.branch_code}
          onChangeText={text => this.props.updateBranch(text)}
        />
        <Input
          label="Swift code"
          placeholder="Usually 8 or 11 characters"
          autoCapitalize="none"
          value={this.props.values.swift}
          onChangeText={text => this.props.updateSwift(text)}
        />
        <Input
          label="IBAN number"
          placeholder="34 alphanumeric characters"
          autoCapitalize="none"
          value={this.props.values.iban}
          onChangeText={text => this.props.updateIBAN(text)}
        />
        <Input
          label="BIC number"
          placeholder="Usually 8 or 11 characters"
          autoCapitalize="none"
          value={this.props.values.bic}
          onChangeText={text => this.props.updateBIC(text)}
        />
      </InputContainer>
    );
  }
}
