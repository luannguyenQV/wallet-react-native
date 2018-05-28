import React, { Component } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  FlatList,
} from 'react-native';
import { ImagePicker } from 'expo';
import Colors from './../../../config/colors';
import Header from './../../../components/header';
import DocumentUploadHelperText from './../../../components/DocumentUploadHelperText';
import { SettingsOption, Output } from '../../../components/common';
import document_categories from './../../../config/document_types.json';

class DocumentScreen extends Component {
  static navigationOptions = {
    title: 'Documents',
  };

  constructor(props) {
    super(props);
    const params = this.props.navigation.state.params;
    this.state = {
      title: params.name,
      getVerified: false,
      modalVisible: false,
      category: params.name,
    };
  }

  openModal = type => {
    this.setState({ modalVisible: true, type });
  };

  launchCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    this.setState({ modalVisible: false });
    if (!result.cancelled) {
      this.props.navigation.navigate('DocumentUpload', {
        getVerified: this.state.getVerified,
        image: result,
        category: this.state.category,
        type: this.state.title,
      });
    }
  };

  launchImageLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    this.setState({ modalVisible: false });
    if (!result.cancelled) {
      this.props.navigation.navigate('DocumentUpload', {
        getVerified: this.state.getVerified,
        image: result,
        category: this.state.category,
        type: this.state.title,
      });
    }
  };

  renderHelperText() {
    const { title } = this.state;
    const {
      // viewStyleContainer,
      textStyleHeader,
      textStyleDescription,
      viewStyleOptions,
    } = styles;

    let document_category = document_categories.filter(
      document_category => document_category.document_category === title,
    );
    let options = document_category[0].document_types;

    console.log('document_categories', document_categories);
    console.log('document_category', document_category);
    console.log('options', options);

    // return <DocumentUploadHelperText title={title} options={options} />;
    return (
      <View>
        <Text style={textStyleHeader}>{title}</Text>
        <Text style={textStyleDescription}>
          Please upload one of the following documents.{' '}
          {title === 'Proof of Address'
            ? 'Your name and address must be clearly visible and be dated within the last 3 months.'
            : ''}
        </Text>
        <FlatList
          contentContainerStyle={viewStyleOptions}
          data={options}
          renderItem={({ item }) => this.renderItem(item)}
          keyExtractor={item => item.id}
          scrollEnabled={false}
        />
      </View>
    );
  }

  renderItem = item => {
    const { viewStyleOptions, textStyleOptions } = styles;
    console.log(item);
    return (
      <SettingsOption
        label={'>  ' + item.description}
        onPress={() => this.openModal(item.document_type)}
      />
    );
    // return (
    //   <View>
    //     <Text>{'> ' + item.description + ' <'}</Text>
    //     <Text>hi there</Text>
    //   </View>
    // );
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          back
          title="Documents"
          // headerRightText="Add"
          // headerRightOnPress={() => this.openModal()}
        />
        <View style={styles.topContainer}>{this.renderHelperText()}</View>
        {/* <Output label={'> ' + 'item.description' + ' <'} /> */}
        <Modal
          animationType={'slide'}
          transparent
          visible={this.state.modalVisible}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}>
          <View style={styles.modal}>
            <View style={styles.bottomModal}>
              <View style={[styles.button, { borderBottomColor: 'black' }]}>
                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
                  Upload Image
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
    // flexDirection: 'column',
    backgroundColor: 'white',
  },
  topContainer: {
    // flex: 1,
    // backgroundColor: Colors.lightgray,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
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
  button: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: Colors.black,
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
  textStyleOptions: {
    fontSize: 14,
    paddingHorizontal: 16,
    textAlign: 'center',
  },
});

export default DocumentScreen;
