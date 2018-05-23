import React, { Component } from 'react';
import { View, Alert, FlatList, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { fetchData } from './../../../redux/actions';

import Spinner from 'react-native-loading-spinner-overlay';
import EmailAddress from './../../../components/emailAddress';
import ResetNavigation from './../../../util/resetNavigation';
import SettingsService from './../../../services/settingsService';
import Colors from './../../../config/colors';
import Header from './../../../components/header';
import { CardList } from './../../../components/common';

class EmailAddressesScreen extends Component {
  static navigationOptions = {
    title: 'Email addresses',
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
      'SettingsEmailAddresses',
    );
  };

  makePrimary = async id => {
    this.setState({
      loading: true,
      loadingMessage: 'Updating...',
    });
    const body = { primary: true };
    let responseJson = await SettingsService.makeEmailPrimary(id, body);

    if (responseJson.status === 'success') {
      this.reload();
    } else {
      Alert.alert('Error', responseJson.message, [{ text: 'OK' }]);
    }
  };

  verify = async email => {
    this.setState({
      loading: true,
      loadingMessage: 'Sending verification code...',
    });

    const body = {
      email: email,
      company: this.props.profile.company,
    };

    let responseJson = await SettingsService.resendEmailVerification(body);

    if (responseJson.status === 'success') {
      this.setState({ loading: false });
      Alert.alert(
        'Email Sent',
        'A verification email has been sent, please check your email box.',
        [{ text: 'OK', onPress: () => {} }],
      );
    } else {
      Alert.alert('Error', responseJson.message, [{ text: 'OK' }]);
    }
  };

  delete = async id => {
    this.setState({
      loading: true,
      loadingMessage: 'Deleting...',
    });
    let responseJson = await SettingsService.deleteEmail(id);

    if (responseJson.status === 'success') {
      this.setState({ loading: false });
      this.reload();
    } else {
      Alert.alert('Error', responseJson.message, [{ text: 'OK' }]);
    }
  };

  render() {
    const { email_addresses, loading_email_addresses, fetchData } = this.props;
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          back
          title="Email addresses"
          headerRightTitle="Add"
          headerRightOnPress={() =>
            this.props.navigation.navigate('AddEmailAddress', {
              routeName: this.state.routeName,
            })
          }
        />
        <CardList
          data={email_addresses}
          textFunctionActionOne={item =>
            item ? (item.verified ? '' : 'Verify') : ''
          }
          onPressActionOne={this.verify}
          onPressTitleLeft={this.makePrimary}
          title={item => (item ? item.email : '')}
          subtitle={item => (item ? (item.verified ? 'Verified' : '') : '')}
          itemActive={item => (item ? (item.primary ? true : false) : false)}
          refreshing={loading_email_addresses}
          onRefresh={() => fetchData('email_addresses')}
          deleteItem={this.delete}
          deletable
          titleDetail={item =>
            item
              ? item.email ? 'New email address' : 'Edit email address'
              : ''
          }
          renderDetail={this.renderDetail}
          saveItem={this.saveBankAccount}
          emptyListMessage="No email addresses added yet"
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
  const { email_addresses, loading_email_addresses, profile } = user;
  return { email_addresses, loading_email_addresses, profile };
};

export default connect(mapStateToProps, { fetchData })(EmailAddressesScreen);
