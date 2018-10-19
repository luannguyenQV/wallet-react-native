import React, { Component } from 'react';
import { ImagePicker } from 'expo';
import { View, Image, Text, TouchableHighlight, Modal } from 'react-native';
import { connect } from 'react-redux';
import {
  fetchData,
  editItem,
  updateItem,
  updateInputField,
  uploadProfilePhoto,
} from './../../redux/actions';

// import CountryPicker from 'react-native-country-picker-modal';
import Colors from './../../config/colors';
import Header from './../../components/header';
import {
  Input,
  Output,
  Card,
  CardContainer,
  EmptyListMessage,
} from './../../components/common';
import HeaderProfile from './../../components/HeaderProfile';
import CardListUserSettings from '../../components/cards/CardListUserSettings';
import { userProfileSelector } from '../../redux/reducers/UserReducer';

class PersonalDetailsScreen extends Component {
  static navigationOptions = {
    title: 'Personal details',
  };

  state = {
    modalVisible: false,
  };

  componentDidMount() {
    this.props.fetchData('profile');
  }

  toggleEdit = () => {
    const data = {
      first_name: this.props.profile.first_name,
      last_name: this.props.profile.last_name,
      id_number: this.props.profile.id_number,
      nationality: this.props.profile.nationality,
      // profile: this.props.profile.profile,
    };
    this.props.editItem('profile', data);
  };

  navigateToUploadImage = result => {
    this.props.navigation.navigate('UploadImage', { image: result });
  };

  // openModal = () => {
  //   this.setState({ modalVisible: true });
  // };

  launchCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    this.setState({ modalVisible: false });
    if (!result.cancelled) {
      this.navigateToUploadImage(result);
    }
  };

  launchImageLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    this.setState({ modalVisible: false });
    if (!result.cancelled) {
      this.navigateToUploadImage(result);
    }
  };

  render() {
    const {
      tempItem,
      profile,
      updateItem,
      showDetail,
      uploadProfilePhoto,
    } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Header
          navigation={this.props.navigation}
          back
          title="Personal details"
          headerRightIcon={showDetail ? 'done' : 'edit'}
          headerRightOnPress={() =>
            showDetail ? updateItem('profile', tempItem) : this.toggleEdit()
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

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
  },
};

const mapStateToProps = state => {
  return {
    profile: userProfileSelector(state),
  };
};

export default connect(mapStateToProps, {
  fetchData,
  editItem,
  updateItem,
  updateInputField,
  uploadProfilePhoto,
})(PersonalDetailsScreen);
