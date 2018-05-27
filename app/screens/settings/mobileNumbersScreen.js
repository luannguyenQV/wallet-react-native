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

class MobileNumbersScreen extends Component {
  static navigationOptions = {
    title: 'Mobile numbers',
  };

  // makePrimary = async id => {
  //   this.setState({
  //     loading: true,
  //     loadingMessage: 'Updating...',
  //   });
  //   const body = { primary: true };
  //   let responseJson = await SettingsService.makeMobilePrimary(id, body);

  //   if (responseJson.status === 'success') {
  //     this.setState({ loading: false });
  //     this.reload();
  //   } else {
  //     Alert.alert('Error', responseJson.message, [{ text: 'OK' }]);
  //   }
  // };

  // verify = async number => {
  //   this.setState({
  //     loading: true,
  //     loadingMessage: 'Sending verification code...',
  //   });

  //   const body = {
  //     mobile: number,
  //     company: this.props.profile.company,
  //   };

  //   let responseJson = await SettingsService.resendMobileVerification(body);

  //   if (responseJson.status === 'success') {
  //     this.setState({ loading: false });
  //     this.props.navigation.navigate('VerifyMobileNumber', {
  //       routeName: this.state.routeName,
  //     });
  //   } else {
  //     Alert.alert('Error', responseJson.message, [{ text: 'OK' }]);
  //   }
  // };

  // if (item.number) {
  //   title = item.number;
  // }
  // if (item.email) {
  //   title = item.email;
  // }

  // if (item.primary) {
  //   itemCodeActive = true;
  // } else {
  //   iconHeaderRight = 'trash';
  //   onPressHeaderRight = deleteItem;
  // }
  // if (item.verified) {
  //   subtitle = 'Verified';
  //   if (item.primary) {
  //     textActionOne = 'Make primary';
  //     onPressActionOne = makePrimaryItem;
  //     onPressHeaderLeft = makePrimaryItem;
  //   }
  // } else {
  //   textActionOne = 'Verify';
  //   onPressActionOne = verifyItem;
  // }

  renderDetail = item => {
    const { number } = item;

    const updateInputField = this.props.updateInputField;

    return (
      <InputContainer>
        <Input
          label="Mobile number"
          placeholder="e.g. +278412345687"
          autoCapitalize="none"
          value={number}
          onChangeText={input =>
            updateInputField('mobile_number', 'number', input)
          }
        />
      </InputContainer>
    );
  };

  render() {
    const {
      mobile_number,
      loading_mobile_number,
      fetchData,
      temp_mobile_number,
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
          title="Mobile numbers"
          headerRightIcon={showDetail ? 'save' : 'add'}
          headerRightOnPress={
            showDetail
              ? () => updateItem('mobile_number', temp_mobile_number)
              : () => newItem('mobile_number')
          }
        />
        <CardList
          data={mobile_number}
          tempItem={temp_mobile_number}
          title={item => (item ? item.number : 'New mobile number')}
          subtitle={item => (item.verified ? 'Verified' : '')}
          itemActive={item => (item.primary ? true : false)}
          // makePrimaryItem={this.makePrimary}
          // onPressTitle={item => () => editItem('mobile_number', item)}
          // renderContent={this.renderContent}
          showDetail={showDetail}
          titleDetail="Edit mobile number"
          renderDetail={tempItem => this.renderDetail(tempItem)}
          textFunctionActionOne={item => (item.verified ? '' : 'Verify')}
          // onPressActionOne={this.verify}
          iconTitleRightDetail="close"
          onPressTitleRightDetail={() => fetchData('mobile_number')}
          // textActionOneDetail="Save"
          // onPressActionOneDetail={() =>
          //   updateItem('mobile_number', temp_mobile_number)
          // }
          refreshing={loading_mobile_number}
          onRefresh={() => fetchData('mobile_number')}
          emptyListMessage="No mobile numbers added yet"
          deleteItem={item => () => deleteItem('mobile_number', item)}
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
    mobile_number,
    loading_mobile_number,
    temp_mobile_number,
    showDetail,
  } = user;
  return {
    mobile_number,
    loading_mobile_number,
    temp_mobile_number,
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
})(MobileNumbersScreen);
