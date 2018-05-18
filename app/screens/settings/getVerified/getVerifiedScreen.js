import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  AsyncStorage,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
// import {  } from './../redux/actions';

import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from './../../../config/colors';
import Header from './../../../components/header';
import GetVerifiedOption from './../../../components/getVerifiedOption';
import SettingsService from './../../../services/settingsService';
import UserInfoService from './../../../services/userInfoService';
import HeaderVerified from './../../../components/HeaderVerified';

import { Spinner, InputForm } from './../../../components/common';

class GetVerifiedScreen extends Component {
  static navigationOptions = {
    title: 'Get verified',
  };

  goTo = (path, name) => {
    this.props.navigation.navigate(path, { name });
  };

  renderBasicInfo() {
    const { profile } = this.props;

    let value = profile.first_name + ' ' + profile.last_name;
    let status = profile.status.toUpperCase();

    return (
      <GetVerifiedOption
        label="Basic Info"
        value={value}
        status={status}
        gotoAddress="SettingsPersonalDetails"
        goTo={this.goTo}
      />
    );
  }

  renderEmailAddresses() {
    const { emailAddresses } = this.props;

    let value = 'Not yet provided';
    let status = 'INCOMPLETE';

    for (let i = 0; i < emailAddresses.length; i++) {
      if (emailAddresses[i].verified === true) {
        status = 'VERIFIED';
        value = emailAddresses[i].email;
      }
      if (emailAddresses[i].primary === true) {
        value = emailAddresses[i].email;
      }
    }

    return (
      <GetVerifiedOption
        label="Email address"
        value={value}
        status={status}
        gotoAddress="SettingsEmailAddresses"
        goTo={this.goTo}
      />
    );
  }

  renderMobileNumbers() {
    const { mobileNumbers } = this.props;

    let value = 'Not yet provided';
    let status = 'INCOMPLETE';

    for (let i = 0; i < mobileNumbers.length; i++) {
      if (mobileNumbers[i].verified) {
        status = 'VERIFIED';
        value = mobileNumbers[i].number;
      }
      if (mobileNumbers[i].primary) {
        value = mobileNumbers[i].number;
      }
    }

    return (
      <GetVerifiedOption
        label="Mobile number"
        value={value}
        status={status}
        gotoAddress="SettingsMobileNumbers"
        goTo={this.goTo}
      />
    );
  }

  renderAddresses() {
    const { addresses } = this.props;

    let value = '';
    if (addresses.line_1) {
      value = value + addresses.line_1 + ', ';
    }
    if (addresses.line_2) {
      value = value + addresses.line_2 + ', ';
    }
    if (addresses.city) {
      value = value + addresses.city + ', ';
    }
    if (addresses.state_province) {
      value = value + addresses.state_province + ', ';
    }
    if (addresses.country) {
      value = value + addresses.country + ', ';
    }
    if (addresses.postal_code) {
      value = value + addresses.postal_code;
    }
    let status = addresses.status.toUpperCase();

    return (
      <GetVerifiedOption
        label="Address"
        value={value}
        status={status}
        gotoAddress="SettingsAddress"
        goTo={this.goTo}
      />
    );
  }

  renderDocuments() {
    const { documents } = this.props;

    let valueIdentity = 'Not yet provided';
    let statusIdentity = 'INCOMPLETE';
    let idDocuments = documents.filter(
      doc => doc.document_category === 'Proof Of Identity',
    );
    let idVerified = idDocuments.filter(doc => doc.status === 'verified');
    let idPending = idDocuments.filter(doc => doc.status === 'pending');
    let idDenied = idDocuments.filter(doc => doc.status === 'denied');
    if (idVerified.length > 0) {
      statusIdentity = 'verified';
      valueIdentity = 'Verified';
    } else if (idPending.length > 0) {
      statusIdentity = 'pending';
      valueIdentity = 'Waiting for approval';
    } else if (idDenied.length) {
      statusIdentity = 'denied';
      valueIdentity = idDenied[0].note;
    }

    let valueAdvancedIdentity = 'Not yet provided';
    let statusAdvancedIdentity = 'INCOMPLETE';
    let idSelfieDocuments = documents.filter(
      doc => doc.document_category === 'Advanced Proof Of Identity',
    );
    let idSelfieVerified = idSelfieDocuments.filter(
      doc => doc.status === 'verified',
    );
    let idSelfiePending = idSelfieDocuments.filter(
      doc => doc.status === 'pending',
    );
    let idSelfieDenied = idSelfieDocuments.filter(
      doc => doc.status === 'denied',
    );
    if (idSelfieVerified.length > 0) {
      statusAdvancedIdentity = 'verified';
      valueAdvancedIdentity = 'Verified';
    } else if (idSelfiePending.length > 0) {
      statusAdvancedIdentity = 'pending';
      valueAdvancedIdentity = 'Waiting for approval';
    } else if (idSelfieDenied.length > 0) {
      statusAdvancedIdentity = 'denied';
      valueAdvancedIdentity = idSelfieDenied[0].note;
    }

    let valueAddress = 'Not yet provided';
    let statusAddress = 'INCOMPLETE';
    let addressDocuments = documents.filter(
      doc => doc.document_category === 'Proof Of Address',
    );
    let addressVerified = addressDocuments.filter(
      doc => doc.status === 'verified',
    );
    let addressPending = addressDocuments.filter(
      doc => doc.status === 'pending',
    );
    let addressDenied = addressDocuments.filter(doc => doc.status === 'denied');
    if (addressVerified.length > 0) {
      statusAddress = 'verified';
      valueAddress = 'Verified';
    } else if (addressPending.length > 0) {
      statusAddress = 'pending';
      valueAddress = 'Waiting for approval';
    } else if (addressDenied.length > 0) {
      statusAddress = 'denied';
      valueAddress = idDenied[0].note;
    }

    return (
      <View>
        <GetVerifiedOption
          label="Proof of Identity"
          value={valueIdentity}
          status={statusIdentity.toUpperCase()}
          gotoAddress="Document"
          goTo={this.goTo}
        />

        <GetVerifiedOption
          label="Advanced Proof of Identity"
          value={valueAdvancedIdentity}
          status={statusAdvancedIdentity.toUpperCase()}
          gotoAddress="Document"
          goTo={this.goTo}
        />

        <GetVerifiedOption
          label="Proof of Address"
          value={valueAddress}
          status={statusAddress.toUpperCase()}
          gotoAddress="Document"
          goTo={this.goTo}
        />
      </View>
    );
  }

  render() {
    const { profile, loadingProfile } = this.props;
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          drawer
          title="Get verified"
        />
        <HeaderVerified
          photoLink={profile.profile}
          username={profile.username}
          firstName={profile.first_name}
          lastName={profile.last_name}
        />
        <View style={styles.mainContainer}>
          {loadingProfile ? <Spinner /> : null}
          <InputForm>
            {this.renderBasicInfo()}
            {this.renderEmailAddresses()}
            {this.renderMobileNumbers()}
            {this.renderAddresses()}
            {this.renderDocuments()}
          </InputForm>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainContainer: {
    flex: 1,
  },
});

const mapStateToProps = ({ user }) => {
  const { profile, addresses, mobileNumbers, emailAddresses, documents } = user;
  return {
    profile,
    addresses,
    mobileNumbers,
    emailAddresses,
    documents,
  };
};

export default connect(mapStateToProps, {})(GetVerifiedScreen);
