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
import { fetchMobileNumbers } from './../../../redux/actions';

import Spinner from 'react-native-loading-spinner-overlay';
import MobileNumber from './../../../components/mobileNumber';
import ResetNavigation from './../../../util/resetNavigation';
import SettingsService from './../../../services/settingsService';
import Colors from './../../../config/colors';
import Header from './../../../components/header';
import { EmptyListMessage } from './../../../components/common';

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

  componentWillMount() {
    this.props.fetchMobileNumbers();
  }

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

  render() {
    const {
      mobileNumbers,
      loadingMobileNumbers,
      fetchMobileNumbers,
    } = this.props;
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
        <Spinner
          visible={this.state.loading}
          textContent={this.state.loadingMessage}
          textStyle={{ color: '#FFF' }}
        />
        {mobileNumbers.length > 0 ? (
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={loadingMobileNumbers}
                onRefresh={fetchMobileNumbers}
              />
            }
            data={mobileNumbers}
            renderItem={({ item }) => (
              <MobileNumber
                mobile={item}
                makePrimary={this.makePrimary}
                verify={this.verify}
                delete={this.delete}
                reload={this.reload}
              />
            )}
            keyExtractor={item => item.id}
          />
        ) : (
          <EmptyListMessage text="No mobile numbers added yet" />
        )}
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
  const { mobileNumbers, loadingMobileNumbers, profile } = user;
  return { mobileNumbers, loadingMobileNumbers, profile };
};

export default connect(mapStateToProps, { fetchMobileNumbers })(
  MobileNumbersScreen,
);
