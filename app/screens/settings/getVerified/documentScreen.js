import React, { Component } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  FlatList,
  Alert,
  Image,
} from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import Colors from './../../../config/colors';
import Header from './../../../components/header';
import SettingsService from './../../../services/settingsService';
import { SettingsOption, Button, Spinner } from '../../../components/common';
import document_categories from './../../../config/document_types.json';

class DocumentScreen extends Component {
  static navigationOptions = {
    title: 'Documents',
  };

  state = {
    document_type: '',
    state: '',
    category: '',
    showModal: false,
  };

  componentDidMount() {
    this.resetState();
  }

  resetState() {
    this.setState({
      document_type: '',
      state: 'document_type',
      category: this.props.navigation.state.params.name,
    });
  }

  selectType = document_type => {
    this.setState({
      state: 'upload_option',
      document_type,
    });
  };

  launchCamera = async () => {
    Permissions.askAsync(Permissions.CAMERA);
    Permissions.askAsync(Permissions.CAMERA_ROLL);
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: 'Images',
      allowsEditing: true,
      // aspect: [4, 3],
    });
    if (!result.cancelled) {
      this.setState({
        image: result.uri,
        state: 'confirm',
      });
    }
  };

  launchImageLibrary = async () => {
    Permissions.askAsync(Permissions.CAMERA_ROLL);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'Images',
      allowsEditing: true,
    });
    if (!result.cancelled) {
      this.setState({
        image: result.uri,
        state: 'confirm',
      });
    }
  };

  uploadDocument = async () => {
    const { image, category, document_type } = this.state;
    this.setState({ loading: true });

    const parts = image.split('/');
    const name = parts[parts.length - 1];
    const file = {
      image,
      name,
      type: 'image/jpg',
    };

    let responseJson = await SettingsService.documentUpload(
      file,
      category,
      document_type,
    );
    if (responseJson.status === 'success') {
      this.setState({ loading: false });
      Alert.alert(
        'Upload successful',
        'Your information will shortly be reviewed by our team.',
        [
          {
            text: 'OK',
            onPress: () => this.setState({ loading: false }),
          },
        ],
      );
    } else {
      Alert.alert('Error', responseJson.message, [{ text: 'OK' }]);
      this.setState({ loading: false });
    }
  };

  renderContent() {
    const { category, state, loading } = this.state;
    const { textStyleDescription, viewStyleButtonContainer } = styles;
    console.log(this.state);
    let options;

    let document_category = document_categories.filter(
      document_category => document_category.document_category === category,
    );
    console.log(document_category);
    if (category) {
      options = document_category[0].document_types;
    }

    switch (state) {
      case 'document_type':
        return (
          <View>
            <Text style={textStyleDescription}>
              Please upload one of the following documents.{' '}
              {category === 'Proof of Address'
                ? 'Your name and address must be clearly visible and be dated within the last 3 months.'
                : ''}
            </Text>
            <FlatList
              contentContainerStyle={viewStyleButtonContainer}
              data={options}
              renderItem={({ item }) => this.renderTypeButton(item)}
              keyExtractor={item => item.id}
            />
          </View>
        );
      case 'upload_option':
        return (
          <View style={viewStyleButtonContainer}>
            <Button
              label="Use camera"
              onPress={this.launchCamera} //this.openModal(item.document_type)}
            />
            <Button
              label="Choose from gallery"
              onPress={this.launchImageLibrary} //this.openModal(item.document_type)}
            />
            <Button
              label="Cancel"
              onPress={() => this.resetState()} //this.openModal(item.document_type)}
            />
          </View>
        );
      case 'confirm':
        return (
          <View style={viewStyleButtonContainer}>
            <Image
              style={{ height: 300, width: 300 }}
              source={{ uri: this.state.image }}
            />
            {loading ? (
              <Spinner size="large" />
            ) : (
              <View>
                <Button
                  label="Upload"
                  onPress={this.uploadDocument} //this.openModal(item.document_type)}
                />
                <Button
                  label="Cancel"
                  onPress={() => this.resetState()} //this.openModal(item.document_type)}
                />{' '}
              </View>
            )}
          </View>
        );
    }
  }

  renderTypeButton = item => {
    console.log(item);
    return (
      <Button
        label={item.description}
        onPress={() => this.selectType(item.document_type)}
      />
    );
  };

  render() {
    const { category } = this.state;
    const { textStyleHeader, viewStyleContent } = styles;
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation} back title="Documents" />
        <Text style={textStyleHeader}>{category}</Text>
        <View style={viewStyleContent}>{this.renderContent()}</View>
        {/* <Output label={'> ' + 'item.description' + ' <'} /> */}
        <Modal
          animationType={'slide'}
          transparent
          visible={this.state.showModal}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}>
          <View style={styles.modal}>
            <View style={styles.bottomModal}>
              <View style={[styles.button, { borderBottomColor: 'black' }]}>
                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
                  {this.state.status}
                </Text>
              </View>
              <TouchableHighlight
                onPress={() => {
                  this.setState({ showModal: false });
                }}>
                <Text>Cancel</Text>
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
    // flexDirection: 'column',
    backgroundColor: 'white',
  },
  viewStyleContent: {
    // flex: 1,
    // backgroundColor: Colors.lightgray,
    // padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewStyleButtonContainer: {
    // flex: 1,
    // padding: 8,
    // justifyContent: 'flex-start',
    // alignItems: 'center',
    width: '100%',
    // height: '100%',
  },
  upload: {
    marginBottom: 10,
    marginHorizontal: 20,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.lightblue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomModal: {
    width: '70%',
    height: 220,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyleHeader: {
    fontSize: 20,
    padding: 16,
    textAlign: 'center',
  },
  textStyleDescription: {
    fontSize: 14,
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingBottom: 8,
    textAlign: 'center',
  },
});

export default DocumentScreen;
