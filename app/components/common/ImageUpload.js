import React, { Component } from 'react';
import { ImagePicker, Permissions } from 'expo';
import { Toast } from 'native-base';
import { PopUpGeneral } from './PopUpGeneral';
import { ButtonList } from './ButtonList';
import { Button } from './Button';

class ImageUpload extends Component {
  state = {
    image: '',
    loading: false,
  };

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
      Toast.show({ text: 'Image uploaded' });
      this.props.onSave(result.uri);
      this.props.onDismiss();
    }
  }

  render() {
    const { visible, onDismiss } = this.props;

    return (
      <PopUpGeneral visible={visible} onDismiss={onDismiss}>
        <ButtonList>
          <Button label="Use camera" onPress={this.launchCamera} />
          <Button
            color="secondary"
            label="Choose from gallery"
            onPress={this.launchImageLibrary}
          />
          <Button type="text" label="Cancel" onPress={() => onDismiss()} />
        </ButtonList>
      </PopUpGeneral>
    );
  }
}

export { ImageUpload };
