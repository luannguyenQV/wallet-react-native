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

import * as Rehive from './../../../util/rehive';

import SettingsService from './../../../services/settingsService';
import {
  ImageUpload,
  Button,
  Spinner,
  ButtonList,
} from '../../../components/common';
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
      showModal: true,
      document_type,
    });
  };

  uploadDocument = async () => {
    const { image, category, document_type } = this.state;
    this.setState({ loading: true });

    const parts = image.split('/');
    const name = parts[parts.length - 1];
    const file = {
      uri: image,
      name,
      type: 'image/jpg',
    };
    try {
      await Rehive.createDocument(file, category, document_type);
      this.setState({ loading: false });
      Alert.alert(
        'Upload successful',
        'Your information will shortly be reviewed by our team.',
        [
          {
            text: 'OK',
            onPress: () => this.props.navigation.goBack(),
          },
        ],
      );
    } catch (error) {
      this.setState({ loading: false });
      Alert.alert('Error', responseJson.message, [{ text: 'OK' }]);
    }
  };

  renderContent() {
    const { category, state, loading } = this.state;
    const {
      textStyleDescription,
      viewStyleButtonContainer,
      viewStyleImageContainer,
    } = styles;
    let options;

    let document_category = document_categories.filter(
      document_category => document_category.document_category === category,
    );
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
            {/* <ButtonList> */}
            <FlatList
              contentContainerStyle={viewStyleButtonContainer}
              data={options}
              renderItem={({ item }) => this.renderTypeButton(item)}
              keyExtractor={item => item.id}
            />
            {/* </ButtonList> */}
          </View>
        );
      case 'confirm':
        return (
          <View>
            <View style={viewStyleImageContainer}>
              <Image
                style={{ height: 300, width: 300 }}
                source={{ uri: this.state.image }}
              />
            </View>
            {loading ? (
              <Spinner size="large" />
            ) : (
              <ButtonList>
                <Button
                  label="Upload"
                  onPress={this.uploadDocument} //this.openModal(item.document_type)}
                />
                <Button
                  label="Cancel"
                  onPress={() => this.resetState()} //this.openModal(item.document_type)}
                />
              </ButtonList>
            )}
          </View>
        );
    }
  }

  renderTypeButton = item => {
    return (
      <Button
        label={item.description}
        // size="small"
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
        <View style={viewStyleContent}>
          <Text style={textStyleHeader}>{category}</Text>
          {this.renderContent()}
        </View>

        <ImageUpload
          visible={this.state.showModal}
          onSave={image =>
            this.setState({
              image,
              state: 'confirm',
            })
          }
          onDismiss={() => this.setState({ showModal: false })}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'flex-start',
    // backgroundColor: 'white',
  },
  viewStyleContent: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  viewStyleButtonContainer: {
    // width: '100%',
  },
  viewStyleImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyleHeader: {
    fontSize: 20,
    // padding: 16,
    // marginBottom: 16,
    textAlign: 'center',
  },
  textStyleDescription: {
    fontSize: 14,
    // flexWrap: 'wrap',
    // paddingBottom: 8,
    textAlign: 'center',
  },
});

export default DocumentScreen;
