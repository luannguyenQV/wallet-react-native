import React, { Component } from 'react';
import { Image, Dimensions, View } from 'react-native';
import { ImagePicker, Permissions } from 'expo';

import { PopUpGeneral } from './PopUpGeneral';
import { Button } from './Button';
// import { View } from './View';
import { Text } from './Text';
import { Spinner } from './Spinner';

const SCREEN_WIDTH = Dimensions.get('window').width;

const initialState = {
  state: 'landing',
  image: {},
  visible: false,
};

class ImageUpload extends Component {
  state = initialState;

  componentDidUpdate(prevProps) {
    if (prevProps.loading && !this.props.loading && !this.props.error) {
      this.setState(initialState);
    }
  }

  componentWillUnmount() {
    this.resetState();
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
    this.props.onConfirm(this.state.image.uri);
  }

  resetState() {
    this.setState(initialState);
  }

  renderLanding() {
    return (
      <View>
        <Button label="Use camera" onPress={this.launchCamera} />
        <Button
          color="secondary"
          label="Choose from gallery"
          onPress={this.launchImageLibrary}
        />
        <Button type="text" label="Cancel" onPress={() => this.resetState()} />
      </View>
    );
  }

  showModal = () => {
    this.setState({
      state: 'landing',
      visible: true,
    });
  };

  renderConfirm() {
    const { error, loading } = this.props;
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
          {error ? (
            <Text style={[textStyleDescription, { color: '#f44336' }]}>
              {error}
            </Text>
          ) : null}
          {loading ? (
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
            onPress={() => this.showModal()}
          />
          <Button
            label="Cancel"
            color="secondary"
            type="text"
            onPress={() => this.resetState()}
          />
        </View>
      </View>
    );
  }

  render() {
    const { state, visible } = this.state;
    return (
      <PopUpGeneral visible={visible} onDismiss={this.resetState}>
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

export { ImageUpload };
