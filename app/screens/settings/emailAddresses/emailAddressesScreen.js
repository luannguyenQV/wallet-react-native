import React, { Component } from 'react';
import { View, Alert, FlatList, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { fetchEmailAddresses } from './../../../redux/actions';

import Spinner from 'react-native-loading-spinner-overlay';
import EmailAddress from './../../../components/emailAddress';
import ResetNavigation from './../../../util/resetNavigation';
import SettingsService from './../../../services/settingsService';
import Colors from './../../../config/colors';
import Header from './../../../components/header';
import { EmptyListMessage } from './../../../components/common';

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

  componentDidMount() {
    this.props.fetchEmailAddresses();
  }

  reload = () => {
    console.log('emailAddress: ' + this.state.routeName);
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
    const {
      emailAddresses,
      loadingEmailAddresses,
      fetchEmailAddresses,
    } = this.props;
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
        <Spinner
          visible={this.state.loading}
          textContent={this.state.loadingMessage}
          textStyle={{ color: '#FFF' }}
        />
        {emailAddresses.length > 0 ? (
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={loadingEmailAddresses}
                onRefresh={fetchEmailAddresses}
              />
            }
            data={emailAddresses}
            renderItem={({ item }) => (
              <EmailAddress
                email={item}
                makePrimary={this.makePrimary}
                verify={this.verify}
                delete={this.delete}
                reload={this.reload}
              />
            )}
            keyExtractor={item => item.id}
          />
        ) : (
          <EmptyListMessage text="No email addresses added yet" />
        )}
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
  submit: {
    marginBottom: 10,
    marginHorizontal: 20,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.lightblue,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const mapStateToProps = ({ user }) => {
  const { emailAddresses, loadingEmailAddresses, profile } = user;
  return { emailAddresses, loadingEmailAddresses, profile };
};

export default connect(mapStateToProps, { fetchEmailAddresses })(
  EmailAddressesScreen,
);
