import React, { Component } from 'react';
import { Image, Dimensions } from 'react-native';
import context from './context';

const SCREEN_WIDTH = Dimensions.get('window').width;

class _CustomImage extends Component {
  imageStylePhoto() {
    const { backgroundColor, width, height, colors } = this.props;

    return [
      styles.imageStylePhoto,
      {
        backgroundColor: backgroundColor ? colors[backgroundColor] : 'white',
      },
    ];
  }
  render() {
    switch (this.props.name) {
      case 'card1':
        return (
          <Image
            style={this.imageStylePhoto()}
            source={require('./../../../assets/icons/card1_transparent.png')}
          />
        );
      case 'card2':
        return (
          <Image
            style={this.imageStylePhoto()}
            source={require('./../../../assets/icons/card2_transparent.png')}
          />
        );
      case 'pxpay':
        return (
          <Image
            style={this.imageStylePhoto()}
            source={require('./../../../assets/icons/pxpay.png')}
          />
        );
      case 'plue':
        return (
          <Image
            style={this.imageStylePhoto()}
            source={require('./../../../assets/icons/pxpay.png')}
          />
        );
    }
  }
}

const styles = {
  imageStylePhoto: {
    width: SCREEN_WIDTH - 16,
    height: 120,
  },
};

const CustomImage = context(_CustomImage);

export { CustomImage };
