import React, { Component } from 'react';
import { Image, Dimensions, View } from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import { connect } from 'react-redux';
import {
  uploadProfilePhoto,
  showModal,
  hideModal,
  resetLoading,
} from '../../redux/actions';

import { PopUpGeneral } from './PopUpGeneral';
import { Button } from './Button';
// import { View } from './View';
import { Text } from './Text';
import { Spinner } from './Spinner';
import { modalOptionsSelector } from '../../redux/reducers/UserReducer';

const SCREEN_WIDTH = Dimensions.get('window').width;

const initialState = {
  state: 'landing',
  image: {},
};

class _ImageUpload extends Component {
  state = initialState;

  componentDidUpdate(prevProps) {
    if (!prevProps.modalOptions.visible && this.props.modalOptions.visible) {
      this.setState(initialState);
    }
  }

  componentWillUnmount() {
    console.log('test');
  }

  launchCamera = async () => {
    Permissions.askAsync(Permissions.CAMERA);
    Permissions.askAsync(Permissions.CAMERA_ROLL);
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: 'Images',
      allowsEditing: true,
      // aspect: [4, 3],
    });
    this.handleImagePicker(result);
  };

  launchImageLibrary = async () => {
    Permissions.askAsync(Permissions.CAMERA_ROLL);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'Images',
      allowsEditing: true,
    });
    this.handleImagePicker(result);
  };

  handleImagePicker(result) {
    if (!result.cancelled) {
      this.setState({ state: 'confirm', image: result });
    }
  }

  handleConfirm() {
    this.props.onSave(this.state.image.uri);
  }

  resetState() {
    this.setState(initialState);
    this.props.resetLoading();
  }

  renderLanding() {
    const { onDismiss } = this.props;
    return (
      <View>
        <Button label="Use camera" onPress={this.launchCamera} />
        <Button
          color="secondary"
          label="Choose from gallery"
          onPress={this.launchImageLibrary}
        />
        <Button type="text" label="Cancel" onPress={() => onDismiss()} />
      </View>
    );
  }

  renderConfirm() {
    const { modalOptions, onDismiss } = this.props;
    const { image } = this.state;
    const {
      viewStyleContent,
      textStyleDescription,
      viewStyleButtonContainer,
      viewStyleImageContainer,
    } = styles;
    const width = SCREEN_WIDTH - 64;
    const height = Math.min(image.height * (width / image.width), width);
    return (
      <View style={viewStyleContent}>
        <View style={viewStyleImageContainer}>
          <Image
            style={{ height, width, borderRadius: 4 }}
            source={{ uri: image.uri }}
            resizeMode={'contain'}
          />
        </View>
        <View style={viewStyleButtonContainer}>
          {modalOptions.error ? (
            <Text style={[textStyleDescription, { color: '#f44336' }]}>
              {modalOptions.error}
            </Text>
          ) : null}
          {modalOptions.loading ? (
            <Spinner containerStyle={{ margin: 8 }} />
          ) : (
            <Button
              label="Confirm & upload"
              color="primary"
              onPress={() => this.handleConfirm()}
            />
          )}
          <Button
            label="Choose new image"
            color="secondary"
            onPress={() => this.resetState()}
          />
          <Button
            label="Cancel"
            color="secondary"
            type="text"
            onPress={() => onDismiss()}
          />
        </View>
      </View>
    );
  }

  render() {
    const { modalOptions, onDismiss } = this.props;
    const { state } = this.state;
    console.log(this.props);
    return (
      <PopUpGeneral visible={modalOptions.visible} onDismiss={onDismiss}>
        {state === 'confirm' ? this.renderConfirm() : this.renderLanding()}
      </PopUpGeneral>
    );
  }
}

const styles = {
  container: {
    flex: 0,

    backgroundColor: 'white',
  },
  viewStyleContent: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 8,
  },
  viewStyleButtonContainer: {
    paddingHorizontal: 8,
    width: '100%',
  },
  viewStyleImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  textStyleHeader: {
    fontSize: 20,
    padding: 8,
    textAlign: 'center',
  },
  textStyleDescription: {
    fontSize: 14,
    padding: 8,
    textAlign: 'center',
  },
};

function withRedux(_ImageUpload) {
  return class extends React.Component {
    handleConfirm(image) {
      const { type, uploadProfilePhoto, uploadDocument } = this.props;
      switch (type) {
        case 'profile':
          uploadProfilePhoto(image);
          break;
        case 'document':
          uploadDocument(image);
          break;
      }
    }

    render() {
      const { type, modalOptions, hideModal } = this.props;
      return (
        <_ImageUpload
          type={type}
          modalOptions={modalOptions}
          onSave={image => this.handleConfirm(image)}
          onDismiss={() => hideModal()}
          resetLoading={this.props.resetLoading}
        />
      );
    }
  };
}

const mapStateToProps = state => {
  return {
    modalOptions: modalOptionsSelector(state),
  };
};

const ImageUpload = connect(mapStateToProps, {
  showModal,
  hideModal,
  resetLoading,
  uploadProfilePhoto,
})(withRedux(_ImageUpload));

export { ImageUpload };
