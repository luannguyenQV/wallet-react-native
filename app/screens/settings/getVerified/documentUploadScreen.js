import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Alert,
  Text,
  TouchableHighlight,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import SettingsService from './../../../services/settingsService';
import ResetNavigation from './../../../util/resetNavigation';
import Colors from './../../../config/colors';
import Header from './../../../components/header';

class DocumentUploadScreen extends Component {
  static navigationOptions = {
    title: 'Document upload',
  };

  constructor(props) {
    super(props);
    const params = this.props.navigation.state.params;
    this.state = {
      image: params.image,
      category: params.category,
      type: params.type,
      getVerified: params.getVerified,
      loading: false,
    };
  }

  goBackAndReload = () => {
    ResetNavigation.dispatchUnderDrawer(
      this.props.navigation,
      this.state.getVerified ? 'GetVerified' : 'Settings',
      'SettingsGetVerified',
    );
  };

  saveImage = async () => {
    this.setState({ loading: true });
    const uri = this.state.image.uri;
    const parts = uri.split('/');
    const name = parts[parts.length - 1];
    const file = {
      uri,
      name,
      type: 'image/jpg',
    };
    var category = this.state.category;
    var type = this.state.type;

    let responseJson = await SettingsService.documentUpload(
      file,
      category,
      type,
    );
    if (responseJson.status === 'success') {
      this.setState({ loading: false });
      Alert.alert(
        'Upload successful',
        'Your information will shortly be reviewed by our team.',
        [{ text: 'OK', onPress: () => this.goBackAndReload() }],
      );
    } else {
      Alert.alert('Error', responseJson.message, [{ text: 'OK' }]);
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          navigation={this.props.navigation}
          back
          title="Document upload"
        />
        <View style={styles.container}>
          <Spinner
            visible={this.state.loading}
            textContent={'Uploading...'}
            textStyle={{ color: '#FFF' }}
          />
          <TouchableHighlight style={{ flex: 1 }} onPress={null}>
            <Image
              style={{ height: 300, width: 300 }}
              source={{ uri: this.state.image.uri }}
            />
          </TouchableHighlight>
          <View style={styles.buttonbar}>
            <TouchableHighlight
              style={[styles.submit, { backgroundColor: Colors.red }]}
              onPress={() => this.props.navigation.goBack()}>
              <Text style={{ color: 'white', fontSize: 20 }}>Cancel</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={[styles.submit, { marginLeft: 25 }]}
              onPress={() => this.saveImage()}>
              <Text style={{ color: 'white', fontSize: 20 }}>Upload</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  buttonbar: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    paddingHorizontal: 25,
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: 'transparent',
  },
  submit: {
    backgroundColor: Colors.lightblue,
    height: 50,
    borderRadius: 25,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DocumentUploadScreen;
