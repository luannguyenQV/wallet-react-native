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
} from './../../redux/actions';

import Header from './../../components/header';
import { CardList, InputContainer, Input } from './../../components/common';

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

  renderDetail = item => {
    const { email } = item;

    const updateInputField = this.props.updateInputField;

    return (
      <InputContainer>
        <Input
          label="Email address"
          placeholder="e.g. user@rehive.com"
          autoCapitalize="none"
          value={email}
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
    } = this.props;
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          back
          title="Email addresses"
          headerRightTitle={showDetail ? 'Save' : 'Add'}
          headerRightOnPress={
            showDetail
              ? () => updateItem('email_address', temp_email_address)
              : () => newItem('email_address')
          }
        />
        <CardList
          data={email_address}
          tempItem={temp_email_address}
          title={item => (item ? item.email : 'New email address')}
          subtitle={item => (item.verified ? 'Verified' : '')}
          itemActive={item => (item.primary ? true : false)}
          // makePrimaryItem={this.makePrimary}
          // onPressTitle={item => () => editItem('email_address', item)}
          // renderContent={this.renderContent}
          showDetail={showDetail}
          titleDetail="Edit email address"
          renderDetail={tempItem => this.renderDetail(tempItem)}
          textFunctionActionOne={item => (item.verified ? '' : 'Verify')}
          // onPressActionOne={this.verify}
          iconTitleRightDetail="md-close"
          onPressTitleRightDetail={() => fetchData('email_address')}
          // textActionOneDetail="Save"
          // onPressActionOneDetail={() =>
          //   updateItem('email_address', temp_email_address)
          // }
          refreshing={loading_email_address}
          onRefresh={() => fetchData('email_address')}
          emptyListMessage="No email addresses added yet"
          deleteItem={item => () => deleteItem('email_address', item)}
          deletable
          editing
          titleStyle="secondary"
        />
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
};

const mapStateToProps = ({ user }) => {
  const {
    email_address,
    loading_email_address,
    temp_email_address,
    showDetail,
  } = user;
  return {
    email_address,
    loading_email_address,
    temp_email_address,
    showDetail,
  };
};

export default connect(mapStateToProps, {
  fetchData,
  newItem,
  editItem,
  updateItem,
  deleteItem,
  updateInputField,
})(EmailAddressesScreen);
