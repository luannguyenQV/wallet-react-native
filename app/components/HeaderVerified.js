import React, { Component } from 'react';
import { Text, Image, View } from 'react-native';

import Colors from './../config/colors';

class HeaderVerified extends Component {
  renderName() {
    const { username, firstName, lastName } = this.props;
    const { viewStyleName, textStyleName, textStyleNameLabel } = styles;
    let nameLabel = '';
    let name = '';
    if (username) {
      nameLabel = 'Username';
      name = username;
    } else if (firstName) {
      nameLabel = 'Name';
      name = firstName + ' ' + lastName;
    }
    return (
      <View style={viewStyleName}>
        <Text style={textStyleNameLabel}>{nameLabel}</Text>
        <Text style={textStyleName}>{name}</Text>
      </View>
    );
  }
  render() {
    const { photoLink } = this.props;
    const { viewStyleContainer, imageStylePhoto } = styles;
    return (
      <View style={viewStyleContainer}>
        {photoLink ? (
          <Image
            style={imageStylePhoto}
            source={{
              uri: photoLink,
              cache: 'only-if-cached',
            }}
            key={photoLink}
          />
        ) : (
          <Image
            source={require('./../../assets/icons/profile.png')}
            style={imageStylePhoto}
          />
        )}
        {this.renderName()}
      </View>
    );
  }
}

const styles = {
  viewStyleContainer: {
    // height: 160,
    // flexDirection: 'column',
    backgroundColor: Colors.primary,
    // paddingVertical: 20,
    // justifyContent: 'center',
    alignItems: 'center',
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
  },
  textStyleNameLabel: {
    color: 'white',
    fontSize: 12,
    // fontWeight: 'bold',
    paddingBottom: 2,
    paddingTop: 8,
  },
  textStyleName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
};

export default HeaderVerified;
