import React, { Component } from 'react';
import { Image, Dimensions, View } from 'react-native';
import PropTypes from 'prop-types';
import context from './context';
import { Svg } from 'expo';

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

  renderCard1() {
    const { colors } = this.props;
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
        <Svg
          height={h * (w2 / w)}
          width={w2}
          data-name="Layer 1"
          viewBox="0 0 477 178">
          <Svg.Circle
            cx={238.5}
            cy={89}
            r={160.8}
            opacity={0.07}
            fill={colors['secondary']}
          />
          <Svg.Circle
            cx={238.5}
            cy={89}
            r={123.8}
            opacity={0.37}
            fill={colors['secondary']}
          />
          <Svg.Circle
            cx={238.5}
            cy={89}
            r={87.5}
            style={{ isolation: 'isolate' }}
            opacity={0.47}
            fill={colors['secondary']}
          />
          <Svg.Circle cx={238.5} cy={89} r={57} fill="#fff" />
          <Svg.Path
            fill={colors['primary']}
            d="M265.7 73.4l-27.2 15.7-27.2-15.7 27.2-15.9 27.2 15.9z"
          />
          <Svg.Path
            fill={colors['secondary']}
            d="M265.7 104.8l-27.2 15.6V89.1l27.2-15.7v31.4z"
          />
          <Svg.Path
            fill={colors['tertiary']}
            d="M211.3 104.8l27.2 15.6V89.1l-27.2-15.7v31.4z"
          />
        </Svg>
      </View>
    );
  }

  renderCard2() {
    const { colors } = this.props;
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
        <Svg
          height={h * (w2 / w)}
          width={w2}
          data-name="Layer 1"
          viewBox="0 0 477 178">
          <Svg.Path
            fill={colors['tertiary']} // needed
            d="M477.25 191.91l-46.21 26.66v-53.23l46.21-26.66v53.23z"
          />
          <Svg.Path
            fill={colors['tertiary']}
            opacity={0.3}
            d="M384.84 191.91l46.2 26.66v-53.23l-46.2-26.66v53.23z"
          />
          <Svg.Path
            fill={colors['primary']}
            d="M384.92 165.34l-23.1 13.25-23.1-13.25 23.1-13.49 23.1 13.49z"
          />
          <Svg.Path
            fill={colors['tertiary']}
            d="M384.92 191.91l-23.1 13.33v-26.65l23.1-13.25v26.57z"
          />
          <Svg.Path
            fill={colors['primary']}
            d="M384.92 165.26l-23.1 13.24v-26.57l23.1-13.33v26.66z"
          />
          <Svg.Path
            fill={colors['primary']}
            opacity={0.65}
            d="M477.25 85.45l-46.21 26.58-46.2-26.58 46.2-26.9 46.21 26.9z"
          />
          <Svg.Path
            fill={colors['primary']}
            d="M477.25 138.68l-46.21 26.58v-53.23l46.21-26.58v53.23z"
          />
          <Svg.Path
            fill={colors['primary']}
            opacity={0.3}
            d="M384.84 138.68l46.2 26.58v-53.23l-46.2-26.58v53.23z"
          />
          <Svg.Path
            fill={colors['tertiary']}
            opacity={0.65}
            d="M315.78 98.7l-46.21 26.57-46.2-26.57 46.2-26.9 46.21 26.9z"
          />
          <Svg.Path
            fill={colors['tertiary']}
            d="M315.78 151.93l-46.21 26.57v-53.23l46.21-26.57v53.23z"
          />
          <Svg.Path
            fill={colors['tertiary']}
            opacity={0.3}
            d="M223.89 151.01l46.2 26.58v-53.23l-46.2-26.58v53.23z"
          />
          <Svg.Path
            fill={colors['tertiary']}
            d="M384.92 138.93l-23.1 13.32v-26.57l23.1-13.33v26.58z"
          />
          <Svg.Path
            fill={colors['tertiary']}
            opacity={0.65}
            d="M384.92 86.21l-23.1 13.33-23.1-13.33 23.1-13.41 23.1 13.41z"
          />
          <Svg.Path
            fill={colors['tertiary']}
            d="M384.92 112.87l-23.1 13.24V99.54l23.1-13.33v26.66z"
          />
          <Svg.Path
            fill={colors['tertiary']}
            opacity={0.3}
            d="M338.72 112.87l23.1 13.24V99.54l-23.1-13.33v26.66z"
          />
          <Svg.Path
            fill={colors['primary']}
            opacity={0.65}
            d="M269.98 177.91l-46.2 26.57-46.21-26.57 46.21-26.9 46.2 26.9z"
          />
          <Svg.Path
            fill={colors['tertiary']}
            opacity={0.65}
            d="M361.9 125.36l-23.1 13.32-23.1-13.32 23.1-13.41 23.1 13.41z"
          />
          <Svg.Path
            fill={colors['tertiary']}
            d="M361.9 152.01l-23.1 13.33v-26.66l23.1-13.32v26.65z"
          />
          <Svg.Path
            fill={colors['tertiary']}
            opacity={0.3}
            d="M315.7 152.01l23.1 13.33v-26.66l-23.1-13.32v26.65z"
          />
          <Svg.Path
            fill={colors['primary']}
            opacity={0.65}
            d="M361.82 178.34L315.62 205l-46.12-26.66 46.12-26.89 46.2 26.89zM177.65 152.01l-46.2 26.58-46.2-26.58 46.2-26.9 46.2 26.9z"
          />
          <Svg.Path
            fill={colors['primary']}
            d="M177.65 205.24l-46.2 26.58v-53.23l46.2-26.58v53.23z"
          />
          <Svg.Path
            fill={colors['primary']}
            opacity={0.3}
            d="M85.25 205.24l46.2 26.58v-53.23l-46.2-26.58v53.23z"
          />
        </Svg>
      </View>
    );
  }

  renderSlider1() {
    const { colors, width, height } = this.props;
    const w = 328;
    const h = 328;
    const w2 = width;

    return (
      <View
        style={{
          // backgroundColor: 'orange',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Svg
          height={h * (w2 / w)}
          width={w2}
          data-name="Layer 1"
          viewBox="0 0 328 328">
          <Svg.Circle
            cx={164}
            cy={164}
            r={160.83}
            style={{ isolation: 'isolate' }}
            opacity={0.05}
            fill={colors['authScreenContrast']}
          />
          <Svg.Circle
            cx={164}
            cy={164}
            r={123.75}
            style={{ isolation: 'isolate' }}
            opacity={0.17}
            fill={colors['authScreenContrast']}
          />
          <Svg.Circle
            cx={164}
            cy={164}
            r={87.5}
            style={{ isolation: 'isolate' }}
            opacity={0.47}
            fill={colors['authScreenContrast']}
          />
          <Svg.Circle cx={164} cy={164} r={57} fill="#fff" />
          <Svg.Path
            fill={colors['primary']}
            d="M191.23 179.78L164 195.47l-27.23-15.69L164 163.94l27.23 15.84z"
          />
          <Svg.Path
            fill={colors['secondary']}
            d="M191.23 148.37L164 164.06l-27.23-15.69L164 132.53l27.23 15.84z"
          />
          <Svg.Path
            fill={colors['tertiary']}
            d="M191.23 179.75L164 195.45v-31.39l27.23-15.69v31.38z"
          />
          <Svg.Path
            fill={colors['focus']}
            d="M136.77 179.75l27.23 15.7v-31.39l-27.23-15.69v31.38z"
          />
        </Svg>
      </View>
    );
  }

  render() {
    switch (this.props.name) {
      case 'card2':
        return this.renderCard2();
      case 'slider1':
        return this.renderSlider1();
      case 'card1':
      default:
        return this.renderCard1();
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
