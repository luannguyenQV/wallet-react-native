import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import {
  fetchData,
  newItem,
  editItem,
  updateItem,
  deleteItem,
  updateInputField,
  primaryItem,
  hideModal,
} from './../../redux/actions';

import Header from './../../components/header';
import { InputContainer, Input, Output } from './../../components/common';
import CardList from './../../components/CardList';

class EmailAddressesScreen extends Component {
  static navigationOptions = {
    title: 'Email addresses',
  };

  // makePrimary = async id => {
  //   this.setState({
  //     loading: true,
  //     loadingMessage: 'Updating...',
  //   });
  //   const body = { primary: true };
  //   let responseJson = await SettingsService.makeEmailPrimary(id, body);

  //   if (responseJson.status === 'success') {
  //     this.reload();
  //   } else {
  //     Alert.alert('Error', responseJson.message, [{ text: 'OK' }]);
  //   }
  // };

  // verify = async email => {
  //   this.setState({
  //     loading: true,
  //     loadingMessage: 'Sending verification code...',
  //   });

  //   const body = {
  //     email: email,
  //     company: this.props.profile.company,
  //   };

  //   let responseJson = await SettingsService.resendEmailVerification(body);

  //   if (responseJson.status === 'success') {
  //     this.setState({ loading: false });
  //     Alert.alert(
  //       'Email Sent',
  //       'A verification email has been sent, please check your email box.',
  //       [{ text: 'OK', onPress: () => {} }],
  //     );
  //   } else {
  //     Alert.alert('Error', responseJson.message, [{ text: 'OK' }]);
  //   }
  // };

  renderContent(item) {
    const { viewStyleContent } = styles;
    const { email } = item;
    return (
      <View style={viewStyleContent}>
        {email ? <Output label="Email" value={email} /> : null}
      </View>
    );
  }

  renderDetail = (item, error) => {
    const { email } = item;

    const updateInputField = this.props.updateInputField;

    return (
      <InputContainer>
        <Input
          label="Email address"
          placeholder="e.g. user@rehive.com"
          autoCapitalize="none"
          value={email}
          inputError={error}
          onChangeText={input =>
            updateInputField('email_address', 'email', input)
          }
        />
      </InputContainer>
    );
  };

  render() {
    const {
      email_address,
      loading_email_address,
      fetchData,
      temp_email_address,
      newItem,
      updateItem,
      deleteItem,
      showDetail,
      showModal,
      hideModal,
      updateError,
      loadingModal,
    } = this.props;
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          back
          title="Email addresses"
          headerRightIcon={showDetail ? 'save' : 'add'}
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
          // onRefresh={() => fetchData('email_address')}
          title={item => (item ? item.email : 'New email address')}
          subtitle={item => (item.verified ? 'Verified' : '')}
          itemActive={item => (item.primary ? true : false)}
          // makePrimaryItem={this.makePrimary}
          // onPressTitleLeft={item => this.showModal(item)}
          renderContent={this.renderContent}
          showDetail={showDetail}
          // titleDetail="Edit email address"
          renderDetail={tempItem => this.renderDetail(tempItem, updateError)}
          // textFunctionActionOne={item => (item.verified ? '' : 'Verify')}
          // onPressActionOne={this.verify}
          // iconTitleRightDetail="close"
          // onPressTitleRightDetail=
          // textActionOneDetail="Save"
          // onPressActionOneDetail={() =>
          //   updateItem('email_address', temp_email_address)
          // }
          emptyListMessage="No email addresses added yet"
          deleteItem={item => () => deleteItem('email_address', item)}
          deletable
          editing
          titleStyle="secondary"
          // textPopUp={
          //   temp_email_address
          //     ? 'Set ' + temp_email_address.email + ' to primary?'
          //     : 'Set primary email?'
          // }
          // textPopUpActionOne="Confirm"
          // onPressPopUpAction={() =>
          //   updateItem('email_address', temp_email_address)
          // }
        />
      </View>
    );
  }
}

const styles = {
  viewStyleContent: {
    // paddingLeft: 16,
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
    showDetail,
    updateError,
    showModal,
    loadingModal,
  } = user;
  return {
    email_address,
    loading_email_address,
    temp_email_address,
    showDetail,
    updateError,
    showModal,
    loadingModal,
  };
};

export default connect(mapStateToProps, {
  fetchData,
  newItem,
  editItem,
  updateItem,
  deleteItem,
  updateInputField,
  primaryItem,
  hideModal,
})(EmailAddressesScreen);
