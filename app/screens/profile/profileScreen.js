import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import {
  refreshGetVerified,
  uploadProfilePhoto,
  showModal,
  hideModal,
} from '../../redux/actions';

import Header from '../../components/header';
import HeaderProfile from '../../components/HeaderProfile';

import { Spinner, InputContainer, OutputStatus } from '../../components/common';
import {
  userEmailsSelector,
  userMobilesSelector,
  userAddressesSelector,
  userProfileSelector,
  userDocumentsSelector,
  resetLoading,
  modalOptionsSelector,
} from '../../redux/reducers/UserReducer';

class ProfileScreen extends Component {
  static navigationOptions = {
    title: 'Profile',
  };

  state = {
    imageUpload: true,
  };

  componentDidMount() {
    this.props.refreshGetVerified();
  }

  renderBasicInfo() {
    const profile = this.props.profile.data[0];

    let value =
      profile && profile.first_name && profile.last_name
        ? profile.first_name + ' ' + profile.last_name
        : 'Not yet provided';
    let status =
      profile && profile.status ? profile.status.toUpperCase() : 'INCOMPLETE';

    return (
      <OutputStatus
        label="Personal details"
        value={value}
        status={status}
        onPress={() => this.props.navigation.navigate('PersonalDetails')}
      />
    );
  }

  renderEmailAddresses() {
    const email = this.props.email.data;

    let value = 'Not yet provided';
    let status = 'INCOMPLETE';

    for (let i = 0; i < email.length; i++) {
      if (email[i].verified === true) {
        status = 'VERIFIED';
        value = email[i].email;
      }
      if (email[i].primary === true) {
        value = email[i].email;
      }
    }

    return (
      <OutputStatus
        label="Email"
        value={value}
        status={status}
        onPress={() => this.props.navigation.navigate('EmailAddresses')}
      />
    );
  }

  renderMobileNumbers() {
    const mobile = this.props.mobile.data;

    let value = 'Not yet provided';
    let status = 'INCOMPLETE';

    for (let i = 0; i < mobile.length; i++) {
      if (mobile[i].verified) {
        status = 'VERIFIED';
        value = mobile[i].number;
      }
      if (mobile[i].primary) {
        value = mobile[i].number;
      }
    }

    return (
      <OutputStatus
        label="Mobile"
        value={value}
        status={status}
        onPress={() => this.props.navigation.navigate('MobileNumbers')}
      />
    );
  }

  renderAddresses() {
    const address = this.props.address.data;
    let value = '';
    let status = 'INCOMPLETE';
    if (address.length > 0) {
      const tempAddress = address[0];
      status = tempAddress.status ? tempAddress.status.toUpperCase() : status;
      if (tempAddress.line_1) {
        value = value + tempAddress.line_1;
      }
      if (tempAddress.line_2) {
        value = value + (value ? ', ' : '') + tempAddress.line_2;
      }
      if (tempAddress.city) {
        value = value + (value ? ', ' : '') + tempAddress.city;
      }
      if (tempAddress.state_province) {
        value = value + (value ? ', ' : '') + tempAddress.state_province;
      }
      if (tempAddress.country) {
        value = value + (value ? ', ' : '') + tempAddress.country;
      }
      if (tempAddress.postal_code) {
        value = value + (value ? ', ' : '') + tempAddress.postal_code;
      }
    }
    if (!value) {
      value = 'Not yet provided';
    }

    return (
      <OutputStatus
        label="Address"
        value={value ? value : 'Not yet provided'}
        status={status}
        onPress={() => this.props.navigation.navigate('Addresses')}
      />
    );
  }

  renderDocumentID() {
    const { documents } = this.props;

    let valueIdentity = 'Not yet provided';
    let statusIdentity = 'INCOMPLETE';
    let idDocuments = documents.data.filter(
      doc => doc.document_category === 'Proof Of Identity',
    );
    let idVerified = idDocuments.filter(doc => doc.status === 'verified');
    let idPending = idDocuments.filter(doc => doc.status === 'pending');
    let idDenied = idDocuments.filter(doc => doc.status === 'denied');
    if (idVerified.length > 0) {
      statusIdentity = 'VERIFIED';
      valueIdentity = 'Verified';
    } else if (idPending.length > 0) {
      statusIdentity = 'PENDING';
      valueIdentity = 'Waiting for approval';
    } else if (idDenied.length) {
      statusIdentity = 'DENIED';
      valueIdentity = idDenied[0].note;
    }

    return (
      <OutputStatus
        label="Proof of Identity"
        value={valueIdentity}
        status={statusIdentity}
        onPress={() =>
          this.props.navigation.navigate('Document', {
            name: 'Proof Of Identity',
          })
        }
      />
    );
  }

  renderDocumentAddress() {
    const { documents } = this.props;

    let valueAddress = 'Not yet provided';
    let statusAddress = 'INCOMPLETE';
    let addressDocuments = documents.data.filter(
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
      statusAddress = 'VERIFIED';
      valueAddress = 'Verified';
    } else if (addressPending.length > 0) {
      statusAddress = 'PENDING';
      valueAddress = 'Waiting for approval';
    } else if (addressDenied.length > 0) {
      statusAddress = 'DENIED';
      valueAddress = idDenied[0].note;
    }

    return (
      <OutputStatus
        label="Proof of Address"
        value={valueAddress}
        status={statusAddress}
        onPress={() =>
          this.props.navigation.navigate('Document', {
            name: 'Proof Of Address',
          })
        }
      />
    );
  }

  renderDocumentAdvID() {
    const { documents } = this.props;

    let valueAdvancedIdentity = 'Not yet provided';
    let statusAdvancedIdentity = 'INCOMPLETE';
    let idSelfieDocuments = documents.data.filter(
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
      statusAdvancedIdentity = 'VERIFIED';
      valueAdvancedIdentity = 'Verified';
    } else if (idSelfiePending.length > 0) {
      statusAdvancedIdentity = 'PENDING';
      valueAdvancedIdentity = 'Waiting for approval';
    } else if (idSelfieDenied.length > 0) {
      statusAdvancedIdentity = 'DENIED';
      valueAdvancedIdentity = idSelfieDenied[0].note;
    }

    return (
      <OutputStatus
        label="Advanced Proof of Identity"
        value={valueAdvancedIdentity}
        status={statusAdvancedIdentity}
        onPress={() =>
          this.props.navigation.navigate('Document', {
            name: 'Advanced Proof Of Identity',
          })
        }
      />
    );
  }

  render() {
    const {
      profile,
      company_config,
      uploadProfilePhoto,
      modalOptions,
      showModal,
      hideModal,
      resetLoading,
    } = this.props;
    const { container, mainContainer } = styles;
    const {
      requireDocumentID,
      requireDocumentAddress,
      requireDocumentAdvID,
    } = company_config.verification;
    return (
      <View style={container}>
        <Header
          navigation={this.props.navigation}
          drawer
          title="Profile"
          noShadow
        />
        <View style={mainContainer}>
          <HeaderProfile
            uploadProfilePhoto={uploadProfilePhoto}
            photoLink={profile.data[0].profile}
            name={
              profile.data[0].first_name
                ? profile.data[0].first_name + ' ' + profile.data[0].last_name
                : ''
            }
            username={profile.data[0].username}
            showModal={showModal}
          />
          {profile.loading ? <Spinner /> : null}
          <InputContainer>
            {this.renderBasicInfo()}
            {this.renderEmailAddresses()}
            {this.renderMobileNumbers()}
            {this.renderAddresses()}
            {!requireDocumentID ? null : this.renderDocumentID()}
            {!requireDocumentAddress ? null : this.renderDocumentAddress()}
            {!requireDocumentAdvID ? null : this.renderDocumentAdvID()}
          </InputContainer>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainContainer: {
    flex: 1,
  },
};

const mapStateToProps = state => {
  return {
    profile: userProfileSelector(state),
    address: userAddressesSelector(state),
    mobile: userMobilesSelector(state),
    email: userEmailsSelector(state),
    documents: userDocumentsSelector(state),
    company_config: state.auth.company_config,
    modalOptions: modalOptionsSelector(state),
  };
};

export default connect(mapStateToProps, {
  refreshGetVerified,
  uploadProfilePhoto,
  showModal,
  hideModal,
  resetLoading,
})(ProfileScreen);
