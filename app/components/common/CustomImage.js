import React, { Component } from 'react';
import { Image, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import context from './context';
import { Svg } from 'expo';
import { View } from './View';

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

  renderPlaceholder1() {
    const w = 477;
    const h = 178;
    const w2 = SCREEN_WIDTH - 16;

    return (
      <View
        style={{
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Svg height={h * (w2 / w)} width={w2}>
          <Svg.Circle
            cx={238.5}
            cy={89}
            r={160.83}
            opacity={0.05}
            fill="#aaf"
          />
          <Svg.Circle
            cx={238.5}
            cy={89}
            r={123.75}
            opacity={0.17}
            fill="#aaf"
          />
          <Svg.Circle cx={238.5} cy={89} r={87.5} opacity={0.47} fill="#fff" />
          <Svg.Circle cx={238.5} cy={89} r={57} fill="#fff" />
          <Svg.Path
            fill="#8024fa"
            d="M265.73 104.78l-27.23 15.69-27.23-15.69 27.23-15.84 27.23 15.84z"
          />
          <Svg.Path
            fill="#fa8380"
            d="M265.73 73.37L238.5 89.06l-27.23-15.69 27.23-15.84 27.23 15.84z"
          />
          <Svg.Path
            fill="#ff29bf"
            d="M265.73 104.75l-27.23 15.7V89.06l27.23-15.69v31.38z"
          />
          <Svg.Path
            fill="#5969f6"
            d="M211.27 104.75l27.23 15.7V89.06l-27.23-15.69v31.38z"
          />
        </Svg>
      </View>
    );
  }
  render() {
    // return this.renderPlaceholder1();
    const imageStyle = this.imageStylePhoto();
    switch (this.props.name) {
      case 'card2':
        return (
          <Image
            style={imageStyle}
            source={require('./../../../assets/icons/card2.png')}
          />
        );
      case 'pxpay':
        return (
          <Image
            style={imageStyle}
            source={require('./../../../assets/icons/pxpay.png')}
          />
        );
      case 'card1-plue':
        return (
          <Image
            style={imageStyle}
            source={require('./../../../assets/icons/card1-plue.png')}
          />
        );
      case 'card2-plue':
        return (
          <Image
            style={imageStyle}
            source={require('./../../../assets/icons/card2-plue.png')}
          />
        );
      case 'slider1-plue':
        return (
          <Image
            style={imageStyle}
            source={require('./../../../assets/icons/slider1-plue.png')}
          />
        );
      case 'slider2-plue':
        return (
          <Image
            style={imageStyle}
            source={require('./../../../assets/icons/slider2-plue.png')}
          />
        );
      case 'spinner-plue':
        console.log(imageStyle.backgroundColor);
        if (
          imageStyle.backgroundColor === 'white' ||
          imageStyle.backgroundColor === '#FFFFFF'
        ) {
          return (
            <Image
              style={[imageStyle, { width: 250 }]}
              source={require('./../../../assets/icons/spinner-plue.gif')}
            />
          );
        } else {
          return (
            <Image
              style={imageStyle}
              source={require('./../../../assets/icons/slider1-plue.png')}
            />
          );
        }
      case 'card1-luuun':
        return (
          <Image
            style={imageStyle}
            source={require('./../../../assets/icons/card1-luuun.png')}
          />
        );
      case 'card2-luuun':
        return (
          <Image
            style={imageStyle}
            source={require('./../../../assets/icons/card2-luuun.png')}
          />
        );
      case 'slider1-luuun':
        return (
          <Image
            style={imageStyle}
            source={require('./../../../assets/icons/slider1-luuun.png')}
          />
        );
      case 'slider2-luuun':
        return (
          <Image
            style={imageStyle}
            source={require('./../../../assets/icons/slider2-luuun.png')}
          />
        );
      case 'card1':
      default:
        return (
          <Image
            style={imageStyle}
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
