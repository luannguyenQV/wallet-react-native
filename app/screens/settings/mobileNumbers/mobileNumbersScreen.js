import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ListView,
  Alert,
  AsyncStorage,
  FlatList,
  RefreshControl,
} from 'react-native';
import { connect } from 'react-redux';
import { fetchData } from './../../../redux/actions';

import ResetNavigation from './../../../util/resetNavigation';
import SettingsService from './../../../services/settingsService';
import Colors from './../../../config/colors';
import Header from './../../../components/header';
import { CardList } from './../../../components/common';

import * as types from './../../../redux/types';

class MobileNumbersScreen extends Component {
  static navigationOptions = {
    title: 'Mobile numbers',
  };

  state = {
    routeName: this.props.navigation.state.params
      ? this.props.navigation.state.params.name
      : null,
    loading: false,
    loadingMessage: '',
  };

  reload = () => {
    ResetNavigation.dispatchUnderDrawer(
      this.props.navigation,
      this.state.routeName != null ? 'GetVerified' : 'Settings',
      'SettingsMobileNumbers',
    );
  };

  makePrimary = async id => {
    this.setState({
      loading: true,
      loadingMessage: 'Updating...',
    });
    const body = { primary: true };
    let responseJson = await SettingsService.makeMobilePrimary(id, body);

    if (responseJson.status === 'success') {
      this.setState({ loading: false });
      this.reload();
    } else {
      Alert.alert('Error', responseJson.message, [{ text: 'OK' }]);
    }
  };

  verify = async number => {
    this.setState({
      loading: true,
      loadingMessage: 'Sending verification code...',
    });

    const body = {
      mobile: number,
      company: this.props.profile.company,
    };

    let responseJson = await SettingsService.resendMobileVerification(body);

    if (responseJson.status === 'success') {
      this.setState({ loading: false });
      this.props.navigation.navigate('VerifyMobileNumber', {
        routeName: this.state.routeName,
      });
    } else {
      Alert.alert('Error', responseJson.message, [{ text: 'OK' }]);
    }
  };

  delete = async id => {
    this.setState({
      loading: true,
      loadingMessage: 'Deleting...',
    });

    let responseJson = await SettingsService.deleteMobile(id);

    if (responseJson.status === 'success') {
      this.setState({ loading: false });
      this.reload();
    } else {
      Alert.alert('Error', responseJson.message, [{ text: 'OK' }]);
    }
  };

  // if (item.number) {
  //   title = item.number;
  // }
  // if (item.email) {
  //   title = item.email;
  // }

  // if (item.primary) {
  //   itemCodeActive = true;
  // } else {
  //   iconHeaderRight = 'md-trash';
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

  render() {
    const { mobile_numbers, loading_mobile_numbers, fetchData } = this.props;
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          back
          title="Mobile numbers"
          headerRightTitle="Add"
          headerRightOnPress={() =>
            this.props.navigation.navigate('AddMobileNumber', {
              routeName: this.state.routeName,
            })
          }
        />
        {/* <Spinner
          visible={this.state.loading}
          textContent={this.state.loadingMessage}
          textStyle={{ color: '#FFF' }}
        /> */}
        <CardList
          data={mobile_numbers}
          // makePrimaryItem={this.makePrimary}
          textFunctionActionOne={item => (item.verified ? '' : 'Verify')}
          onPressActionOne={this.verify}
          // deleteItem={this.delete}
          title={item => item.number}
          subtitle={item => (item.verified ? 'Verified' : '')}
          itemActive={item => (item.primary ? true : false)}
          refreshing={loading_mobile_numbers}
          onRefresh={() => fetchData('mobile_numbers')}
          emptyListMessage="No mobile numbers added yet"
          deleteItem={this.delete}
          deletable
          titleStyle="secondary"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  submit: {
    marginBottom: 10,
    marginHorizontal: 20,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.lightblue,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = ({ user }) => {
  const { mobile_numbers, loading_mobile_numbers, profile } = user;
  return { mobile_numbers, loading_mobile_numbers, profile };
};

export default connect(mapStateToProps, { fetchData })(MobileNumbersScreen);
