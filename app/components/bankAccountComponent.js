import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateInputField } from './../redux/actions';

import { Input, InputContainer } from './../components/common';

class BankAccountComponent extends Component {
  render() {
    const {
      name,
      number,
      type,
      bank_name,
      bank_code,
      branch_code,
      swift,
      iban,
      bic,
    } = this.props.temp_bank_account;

    return (
      <InputContainer>
        <Input
          label="Account holder"
          placeholder="e.g. John Snow"
          autoCapitalize="none"
          value={name}
          onChangeText={text =>
            this.props.updateInputField('bank_account', 'name', text)
          }
        />
        <Input
          label="Account number"
          placeholder="e.g. 4083764677"
          autoCapitalize="none"
          value={number}
          onChangeText={text => this.props.updateNumber(text)}
        />
        <Input
          label="Account type"
          placeholder="e.g. Cheque account"
          autoCapitalize="none"
          value={type}
          onChangeText={text => this.props.updateType(text)}
        />
        <Input
          label="Bank name"
          placeholder="e.g. Bank of World"
          autoCapitalize="none"
          value={bank_name}
          onChangeText={text => this.props.updateBank(text)}
        />
        <Input
          label="Bank code"
          placeholder="e.g. 12542"
          autoCapitalize="none"
          value={bank_name}
          onChangeText={text => this.props.updateBank(text)}
        />
        <Input
          label="Branch code"
          placeholder="e.g. 46589"
          autoCapitalize="none"
          value={branch_code}
          onChangeText={text => this.props.updateBranch(text)}
        />
        <Input
          label="Swift code"
          placeholder="Usually 8 or 11 characters"
          autoCapitalize="none"
          value={swift}
          onChangeText={text => this.props.updateSwift(text)}
        />
        <Input
          label="IBAN number"
          placeholder="34 alphanumeric characters"
          autoCapitalize="none"
          value={iban}
          onChangeText={text => this.props.updateIBAN(text)}
        />
        <Input
          label="BIC number"
          placeholder="Usually 8 or 11 characters"
          autoCapitalize="none"
          value={bic}
          onChangeText={text => this.props.updateBIC(text)}
        />
      </InputContainer>
    );
  }
}

const mapStateToProps = ({ user }) => {
  const { temp_bank_account } = user;
  return {
    temp_bank_account,
  };
};

export default connect(mapStateToProps, {
  updateInputField,
})(BankAccountComponent);
