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
import { Input, Output } from './../../components/common';
import CardList from './../../components/CardList';

class MobileNumbersScreen extends Component {
  static navigationOptions = {
    title: 'Mobile numbers',
  };

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

  renderContent = item => {
    const { viewStyleContent } = styles;
    const { number } = item;
    console.log(item);
    return (
      <View style={viewStyleContent}>
        {number ? <Output label="" value={number} /> : null}
      </View>
    );
  };

  renderDetail = () => {
    const { temp_mobile_number, updateError, updateInputField } = this.props;
    const { number } = temp_mobile_number;

    return (
      <Input
        label="Mobile number"
        placeholder="e.g. +278412345687"
        autoCapitalize="none"
        value={number}
        inputError={updateError}
        onChangeText={input =>
          updateInputField('mobile_number', 'number', input)
        }
      />
    );
  };

  render() {
    const {
      mobile_number,
      loading_mobile_number,
      temp_mobile_number,
      newItem,
      updateItem,
      showDetail,
    } = this.props;
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          back
          title="Mobile numbers"
          headerRightIcon={showDetail ? 'done' : 'add'}
          headerRightOnPress={
            showDetail
              ? () => updateItem('mobile_number', temp_mobile_number)
              : () => newItem('mobile_number')
          }
        />
        <CardList
          type="mobile_number"
          data={mobile_number}
          tempItem={temp_mobile_number}
          loadingData={loading_mobile_number}
          identifier="number"
          renderContent={this.renderContent}
          renderDetail={this.renderDetail}
          emptyListMessage="No mobile numbers added yet"
          canDelete
          // canVerify
          canPrimary
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
  viewStyleContent: {
    padding: 8,
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
