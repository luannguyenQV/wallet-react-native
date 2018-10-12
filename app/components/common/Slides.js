import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  Animated,
} from 'react-native';
import context from './context';
import { CustomImage } from './CustomImage';

const SCREEN_WIDTH = Dimensions.get('window').width;

class _Slides extends Component {
  scrollX = new Animated.Value(0);

  renderSlides() {
    const { width, height, data, colors } = this.props;
    const {
      viewStyleSlide,
      imageStylePhoto,
      textStyleTitle,
      textStyleDescription,
    } = styles;
    let position = Animated.divide(this.scrollX, width);

    return data.map((slide, i) => {
      let opacity = position.interpolate({
        inputRange: [i - 0.7, i, i + 0.7],
        outputRange: [0.05, 1, 0.05],
        extrapolate: 'clamp',
      });
      return (
        <Animated.View key={slide.id} style={{ opacity, width }}>
          <CustomImage name={slide.image} backgroundColor={'authScreen'} />
          <Text
            style={[textStyleTitle, { color: colors['authScreenContrast'] }]}>
            {slide.title}
          </Text>
          <Text
            style={[
              textStyleDescription,
              { color: colors['authScreenContrast'] },
            ]}>
            {slide.description}
          </Text>
        </Animated.View>
      );
    });
  }

  render() {
    const { width, height, data, colors } = this.props;
    let position = Animated.divide(this.scrollX, width);
    return (
      <View
        style={{ justifyContent: 'center', alignItems: 'center', height: 300 }}>
        <ScrollView
          horizontal
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { x: this.scrollX } } },
          ])}
          scrollEventThrottle={16}>
          {this.renderSlides()}
        </ScrollView>
        {data && data.length > 1 ? (
          <View
            style={{
              flexDirection: 'row',
            }}>
            {data.map((_, i) => {
              let opacity = position.interpolate({
                inputRange: [i - 1, i, i + 1],
                outputRange: [0.3, 1, 0.3],
                extrapolate: 'clamp',
              });
              return (
                <Animated.View
                  key={i}
                  style={{
                    opacity,
                    height: 10,
                    width: 10,
                    backgroundColor: colors['authScreenContrast'],
                    margin: 8,
                    borderRadius: 5,
                  }}
                />
              );
            })}
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = {
  viewStyleSlide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH,
    // padding: 16,
  },
  imageStylePhoto: {
    width: SCREEN_WIDTH - 16,
    // height: 150,
  },
  textStyleTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textStyleDescription: {
    fontSize: 14,
    textAlign: 'center',
  },
};

const Slides = context(_Slides);

export { Slides };
