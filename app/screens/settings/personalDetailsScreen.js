import React, { Component } from 'react';
import { ImagePicker } from 'expo';
import {
  View,
  Alert,
  Text,
  Image,
  StyleSheet,
  AsyncStorage,
  TouchableHighlight,
  RefreshControl,
} from 'react-native';
import { connect } from 'react-redux';
import { fetchProfile } from './../../redux/actions';

import CountryPicker from 'react-native-country-picker-modal';
import Modal from 'react-native-modal';
import UserInfoService from './../../services/userInfoService';
import ResetNavigation from './../../util/resetNavigation';
import Colors from './../../config/colors';
import Header from './../../components/header';
import { Input, InputContainer } from './../../components/common';

class PersonalDetailsScreen extends Component {
  static navigationOptions = {
    title: 'Personal details',
  };

  state = {
    routeName: this.props.navigation.state.params
      ? this.props.navigation.state.params.name
      : null,
    first_name: this.props.profile.first_name,
    last_name: this.props.profile.last_name,
    id_number: this.props.profile.id_number,
    nationality:
      this.props.profile.nationality !== ''
        ? this.props.profile.nationality
        : 'US',
    profile: this.props.profile.profile,
    modalVisible: false,
  };

  componentDidMount() {
    this.props.fetchProfile();
  }

  navigateToUploadImage = result => {
    this.props.navigation.navigate('UploadImage', { image: result });
  };

  openModal = async () => {
    this.setState({ modalVisible: true });
  };

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

  save = async () => {
    let responseJson = await UserInfoService.updateUserDetails({
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      id_number: this.state.id_number,
      nationality: this.state.nationality,
      language: this.state.language,
    });
    if (responseJson.status === 'success') {
      ResetNavigation.dispatchToDrawerRoute(
        this.props.navigation,
        this.state.routeName ? 'GetVerified' : 'Settings',
      );
    } else {
      Alert.alert('Error', responseJson.message, [{ text: 'OK' }]);
    }
  };

  render() {
    const {
      first_name,
      last_name,
      id_number,
      nationality,
      modalVisible,
    } = this.state;
    const { fetchProfile, loadingProfile } = this.props;
    const { viewStyleContainer, imageStylePhoto } = styles;
    return (
      <View style={{ flex: 1 }}>
        <Header
          navigation={this.props.navigation}
          back
          title="Personal details"
          headerRightTitle="Save"
          headerRightOnPress={this.save}
        />
        <View style={viewStyleContainer}>
          <TouchableHighlight
            style={{ width: 100 }}
            onPress={() => this.openModal()}>
            {this.state.profile ? (
              <Image
                style={imageStylePhoto}
                source={{
                  uri: this.state.profile,
                  cache: 'only-if-cached',
                }}
                key={this.state.profile}
              />
            ) : (
              <Image
                source={require('./../../../assets/icons/profile.png')}
                style={styles.photo}
              />
            )}
          </TouchableHighlight>
        </View>
        <InputContainer
          refreshControl={
            <RefreshControl
              refreshing={loadingProfile}
              onRefresh={fetchProfile}
            />
          }>
          <Input
            label="First name"
            placeholder=""
            autoCapitalize="none"
            value={first_name}
            onChangeText={text => this.setState({ first_name: text })}
          />

          <Input
            label="Last name"
            placeholder=""
            autoCapitalize="none"
            value={last_name}
            onChangeText={text => this.setState({ last_name: text })}
          />

          <Input
            label="ID No"
            placeholder=""
            autoCapitalize="none"
            value={id_number}
            onChangeText={text => this.setState({ id_number: text })}
          />
          <View style={[styles.pickerContainer, { paddingVertical: 20 }]}>
            <Text style={[styles.text, { flex: 4 }]}>Country</Text>
            <View style={{ flex: 5, alignItems: 'flex-end' }}>
              <CountryPicker
                onChange={value => {
                  this.setState({ nationality: value.cca2 });
                }}
                closeable
                filterable
                cca2={nationality}
                translation="eng"
                styles={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            </View>
          </View>
        </InputContainer>

        <Modal
          animationInTiming={500}
          animationOutTiming={500}
          backdropTransitionOutTiming={500}
          backdropTransitionInTiming={500}
          backdropColor="black"
          onBackdropPress={() => this.setState({ modalVisible: false })}
          isVisible={modalVisible}>
          <View style={styles.modal}>
            <View style={styles.bottomModal}>
              <View
                style={[
                  styles.button,
                  { borderBottomWidth: 1, borderBottomColor: Colors.black },
                ]}>
                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
                  Change Image
                </Text>
              </View>
              <TouchableHighlight
                style={styles.button}
                onPress={() => this.launchCamera()}>
                <Text style={styles.buttonText}>Use Camera</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.button}
                onPress={() => this.launchImageLibrary()}>
                <Text style={styles.buttonText}>Choose From Gallery</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.button}
                onPress={() => {
                  this.setState({ modalVisible: false });
                }}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
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
  input: {
    flex: 5,
    fontSize: 16,
    paddingLeft: 15,
  },
  text: {
    flex: 4,
    fontSize: 14,
    borderRightColor: 'lightgray',
    color: Colors.black,
  },
  submit: {
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 20,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  viewStyleContainer: {
    backgroundColor: Colors.primary,
    alignItems: 'center',
    paddingBottom: 8,
  },
  imageStylePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: Colors.secondary,
    borderWidth: 5,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomModal: {
    width: '80%',
    height: 250,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  languageModal: {
    width: '100%',
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, .10)',
  },
  button: {
    height: 60,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
  },
});

const mapStateToProps = ({ user }) => {
  const { profile, loadingProfile } = user;
  return { profile, loadingProfile };
};

export default connect(mapStateToProps, { fetchProfile })(
  PersonalDetailsScreen,
);
