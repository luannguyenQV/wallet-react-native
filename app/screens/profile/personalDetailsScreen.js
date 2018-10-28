import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import {
  updateItem,
  updateInputField,
  showDetail,
} from './../../redux/actions';

import Header from './../../components/header';
import CardListUserSettings from '../../components/cards/CardListUserSettings';
import {
  userProfileSelector,
  modalOptionsSelector,
} from '../../redux/reducers/UserReducer';

class PersonalDetailsScreen extends Component {
  static navigationOptions = {
    title: 'Personal details',
  };

  render() {
    const { profile, updateItem, showDetail } = this.props;

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
    modalOptions: modalOptionsSelector(state),
  };
};

export default connect(mapStateToProps, {
  updateItem,
  showDetail,
  updateInputField,
})(PersonalDetailsScreen);
