import React, { Component } from 'react';
import { Text, Image, View } from 'react-native';

import Colors from './../config/colors';

class HeaderVerified extends Component {
  render() {
    const { photoLink, name } = this.props;
    const {
      viewStyleContainer,
      imageStylePhoto,
      viewStyleName,
      textStyleName,
    } = styles;
    return (
      <View style={viewStyleContainer}>
        {photoLink ? (
          <Image
            style={imageStylePhoto}
            source={{
              uri: photoLink,
              // cache: 'only-if-cached',
            }}
            key={photoLink}
          />
        ) : (
          <Image
            source={require('./../../assets/icons/profile.png')}
            style={imageStylePhoto}
          />
        )}
        <View style={viewStyleName}>
          <Text style={textStyleName}>{name}</Text>
        </View>
      </View>
    );
  }
}

const styles = {
  viewStyleContainer: {
    backgroundColor: Colors.primary,
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 8,
  },
  imageStylePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: Colors.secondary,
    borderWidth: 5,
  },
  viewStyleName: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  textStyleName: {
    color: Colors.onPrimary,
    fontSize: 16,
    fontWeight: 'bold',
  },
};

export default HeaderVerified;
