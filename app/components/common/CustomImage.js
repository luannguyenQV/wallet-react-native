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
      case 'card2':
        return (
          <Image
            style={this.imageStylePhoto()}
            source={require('./../../../assets/icons/card2.png')}
          />
        );
      case 'pxpay':
        return (
          <Image
            style={this.imageStylePhoto()}
            source={require('./../../../assets/icons/pxpay.png')}
          />
        );
      case 'card1-plue':
        return (
          <Image
            style={this.imageStylePhoto()}
            source={require('./../../../assets/icons/card1-plue.png')}
          />
        );
      case 'card2-plue':
        return (
          <Image
            style={this.imageStylePhoto()}
            source={require('./../../../assets/icons/card2-plue.png')}
          />
        );
      case 'card1-luuun':
        return (
          <Image
            style={this.imageStylePhoto()}
            source={require('./../../../assets/icons/card1-luuun.png')}
          />
        );
      case 'card2-luuun':
        return (
          <Image
            style={this.imageStylePhoto()}
            source={require('./../../../assets/icons/card2-luuun.png')}
          />
        );
      case 'card1':
      default:
        return (
          <Image
            style={this.imageStylePhoto()}
            source={require('./../../../assets/icons/card1.png')}
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
