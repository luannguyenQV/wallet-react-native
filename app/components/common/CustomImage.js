import React, { Component } from 'react';
import { Image, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import context from './context';

const SCREEN_WIDTH = Dimensions.get('window').width;

class _CustomImage extends Component {
  imageStylePhoto() {
    const { backgroundColor, width, height, colors, padding } = this.props;

    return {
      backgroundColor: backgroundColor ? colors[backgroundColor] : 'white',
      width: width - 2 * padding,
      height,
    };
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

_CustomImage.propTypes = {
  backgroundColor: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  padding: PropTypes.number,
  colors: PropTypes.object,
};

_CustomImage.defaultProps = {
  backgroundColor: 'white',
  width: SCREEN_WIDTH,
  height: 120,
  padding: 0,
  colors: {},
};

const CustomImage = context(_CustomImage);

export { CustomImage };
