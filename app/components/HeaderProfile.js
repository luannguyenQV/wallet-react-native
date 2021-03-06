import React, { Component } from 'react';
import { Text, Image, View, TouchableHighlight } from 'react-native';

import { ImageUpload } from './common';

import context from './common/context';

class _HeaderProfile extends Component {
  state = {
    imageUpload: false,
  };

  render() {
    const { profile, colors, uploadProfilePhoto, resetLoading } = this.props;

    const photoLink = profile.profile;
    const name = profile.first_name
      ? profile.first_name + ' ' + profile.last_name
      : '';

    const username = profile.username;

    const {
      viewStyleContainer,
      imageStylePhoto,
      viewStyleName,
      textStyleName,
    } = styles;
    // console.log(this.ImageUploadProfile);
    return (
      <View style={[viewStyleContainer, { backgroundColor: colors.header }]}>
        <TouchableHighlight onPress={() => this.ImageUploadProfile.show()}>
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
          ref={c => (this.ImageUploadProfile = c)}
          onConfirm={image => uploadProfilePhoto(image)}
          resetLoading={resetLoading}
          error={profile.error}
          success={profile.success}
          loading={profile.loading}
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
