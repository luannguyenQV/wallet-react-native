import React, { Component } from 'react';
import { Text, Image, View, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { uploadProfilePhoto } from './../redux/actions';

import { ImageUpload } from './common';

import Colors from './../config/colors';

class HeaderProfile extends Component {
  state = {
    imageUpload: false,
  };

  // uploadImage(image) {

  // }

  render() {
    const { photoLink, username, name, colors } = this.props;

    const {
      viewStyleContainer,
      imageStylePhoto,
      viewStyleName,
      textStyleName,
    } = styles;
    return (
      <View style={[viewStyleContainer, { backgroundColor: colors.primary }]}>
        <TouchableHighlight
          onPress={() => this.setState({ imageUpload: true })}>
          {photoLink ? (
            <Image
              style={[
                imageStylePhoto,
                {
                  borderColor: Colors.secondary,
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
                  borderColor: Colors.secondary,
                },
              ]}
            />
          )}
        </TouchableHighlight>

        <View style={viewStyleName}>
          <Text style={[textStyleName, { color: colors.primaryContrast }]}>
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
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 5,
    shadowOpacity: 0.3,
    zIndex: 10,
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

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, {
  uploadProfilePhoto,
})(HeaderProfile);
