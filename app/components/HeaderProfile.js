import React, { Component } from 'react';
import { Text, Image, View, TouchableHighlight } from 'react-native';

import { ImageUpload } from './common';

import context from './common/context';

class _HeaderProfile extends Component {
  state = {
    imageUpload: false,
  };

  render() {
    const { photoLink, username, name, colors } = this.props;

    const {
      viewStyleContainer,
      imageStylePhoto,
      viewStyleName,
      textStyleName,
    } = styles;
    return (
      <View style={[viewStyleContainer, { backgroundColor: colors.header }]}>
        <TouchableHighlight
          onPress={() => this.setState({ imageUpload: true })}>
          {photoLink ? (
            <Image
              style={[
                imageStylePhoto,
                {
                  borderColor: colors.headerContrast,
                },
              ]}
              source={{
                uri: photoLink,
                // cache: 'only-if-cached',
              }}
              key={photoLink}
            />
          ) : (
            <Image
              source={require('./../../assets/icons/profile.png')}
              style={[
                imageStylePhoto,
                {
                  borderColor: colors.headerContrast,
                },
              ]}
            />
          )}
        </TouchableHighlight>

        <View style={viewStyleName}>
          <Text style={[textStyleName, { color: colors.headerContrast }]}>
            {username ? username : name}
          </Text>
        </View>

        <ImageUpload
          visible={this.state.imageUpload}
          onSave={image => this.props.uploadProfilePhoto(image)}
          onDismiss={() => this.setState({ imageUpload: false })}
        />
      </View>
    );
  }
}

const styles = {
  viewStyleContainer: {
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.15,
    zIndex: 2,
  },
  imageStylePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 5,
  },
  viewStyleName: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  textStyleName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const HeaderProfile = context(_HeaderProfile);

export default HeaderProfile;
