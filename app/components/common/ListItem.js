import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
} from 'react-native';

class ListItem extends Component {
  render() {
    const {
      viewStyleContainer,
      viewStyleImage,
      viewStyleTitle,
      textStyleTitle,
      textStyleSubtitle,
    } = styles;
    const { image, title, subtitle } = this.props;
    return (
      <TouchableHighlight
        underlayColor={'white'}
        onPress={item => this.props.onPress(item)}>
        <View style={viewStyleContainer}>
          <View style={viewStyleImage}>
            {image ? (
              <Image
                style={{ height: 32, width: 32, borderRadius: 16 }}
                source={{
                  uri: image,
                  cache: 'only-if-cached',
                }}
              />
            ) : (
              <Image
                source={require('./../../../assets/icons/profile.png')}
                style={{ height: 32, width: 32 }}
              />
            )}
          </View>
          <View style={viewStyleTitle}>
            <Text style={textStyleTitle}>{title}</Text>
            {subtitle ? (
              <Text style={textStyleSubtitle}>{subtitle}</Text>
            ) : null}
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const ListSeparator = () => (
  <View
    style={{
      backgroundColor: 'lightgrey',
      height: 0.5,
    }}
  />
);

const styles = {
  viewStyleContainer: {
    // flex: 1,
    flexDirection: 'row',
    height: 48,
    // borderBottomWidth: 0.5,
    // borderBottomColor: 'lightgrey',
  },
  viewStyleImage: {
    width: 56,
    paddingVertical: 8,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  viewStyleTitle: {
    justifyContent: 'center',
  },
  textStyleTitle: {
    fontSize: 18,
    color: 'black',
  },
  textStyleSubtitle: {
    fontSize: 12,
    color: 'black',
  },
};

export { ListItem, ListSeparator };
