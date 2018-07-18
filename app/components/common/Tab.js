import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  Animated,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Swiper extends Component {
  render() {
    const { width, height, data } = this.props;
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
                  backgroundColor: '#f3f3f3',
                  margin: 8,
                  borderRadius: 5,
                }}
              />
            );
          })}
        </View>
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
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textStyleDescription: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },
};

export { Swiper };
