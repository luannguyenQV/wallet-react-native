import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import {
  newItem,
  editItem,
  updateItem,
  deleteItem,
  updateInputField,
} from './../../redux/actions';

import Header from './../../components/header';
import { Input, Output } from './../../components/common';
import CardList from './../../components/CardList';

class EmailAddressesScreen extends Component {
  static navigationOptions = {
    title: 'Email addresses',
  };

  renderContent = item => {
    const { viewStyleContent } = styles;
    const { email } = item;
    return (
      <View style={viewStyleContent}>
        {email ? <Output label="" value={email} /> : null}
      </View>
    );
  };

  renderDetail = () => {
    const { temp_email_address, updateError, updateInputField } = this.props;
    const { email } = temp_email_address;

    return (
      <Input
        label="Email address"
        placeholder="e.g. user@rehive.com"
        autoCapitalize="none"
        value={email}
        inputError={updateError}
        onChangeText={input =>
          updateInputField('email_address', 'email', input)
        }
      />
    );
  };

  render() {
    const {
      email_address,
      loading_email_address,
      temp_email_address,
      newItem,
      updateItem,
      showDetail,
    } = this.props;
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          back
          title="Email addresses"
          headerRightIcon={showDetail ? 'done' : 'add'}
          headerRightOnPress={
            showDetail
              ? () => updateItem('email_address', temp_email_address)
              : () => newItem('email_address')
          }
        />
        <CardList
          type="email_address"
          data={email_address}
          tempItem={temp_email_address}
          loadingData={loading_email_address}
          identifier="email"
          renderContent={this.renderContent}
          renderDetail={this.renderDetail}
          emptyListMessage="No email addresses added yet"
          canDelete
          canVerify
          canPrimary
        />
      </View>
    );
  }
}

const styles = {
  viewStyleContent: {
    padding: 8,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
};

const mapStateToProps = ({ user }) => {
  const {
    email_address,
    loading_email_address,
    temp_email_address,
    updateError,
    showDetail,
  } = user;
  return {
    email_address,
    loading_email_address,
    temp_email_address,
    updateError,
    showDetail,
  };
};

export default connect(mapStateToProps, {
  newItem,
  editItem,
  updateItem,
  deleteItem,
  updateInputField,
})(EmailAddressesScreen);
