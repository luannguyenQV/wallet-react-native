import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import {
  updateItem,
  updateInputField,
  showDetail,
  uploadProfilePhoto,
} from './../../redux/actions';

import Header from './../../components/header';
import HeaderProfile from './../../components/HeaderProfile';
import CardListUserSettings from '../../components/cards/CardListUserSettings';
import { userProfileSelector } from '../../redux/reducers/UserReducer';

class PersonalDetailsScreen extends Component {
  static navigationOptions = {
    title: 'Personal details',
  };

  render() {
    const { profile, updateItem, showDetail, uploadProfilePhoto } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Header
          navigation={this.props.navigation}
          back
          title="Personal details"
          headerRightIcon={profile.showDetail ? 'done' : 'edit'}
          headerRightOnPress={() =>
            profile.showDetail
              ? updateItem('profile')
              : showDetail('profile', 0)
          }
          noShadow
        />
        <HeaderProfile
          photoLink={profile.profile}
          name={
            profile.first_name
              ? profile.first_name + ' ' + profile.last_name
              : ''
          }
          username={profile.username}
          uploadProfilePhoto={uploadProfilePhoto}
        />
        <CardListUserSettings
          type="profile"
          data={profile}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: userProfileSelector(state),
  };
};

export default connect(mapStateToProps, {
  updateItem,
  showDetail,
  updateInputField,
  uploadProfilePhoto,
})(PersonalDetailsScreen);
