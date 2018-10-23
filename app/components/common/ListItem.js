import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
} from 'react-native';
import PropTypes from 'prop-types';

class ListItem extends Component {
  render() {
    const {
      viewStyleContainer,
      viewStyleImage,
      viewStyleTitle,
      textStyleTitle,
      textStyleSubtitle,
    } = styles;
    const { image, title, subtitle, onPress, noImage } = this.props;
    console.log(image);
    return (
      <TouchableHighlight
        underlayColor={'white'}
        onPress={item => onPress(item)}>
        <View style={viewStyleContainer}>
          {!noImage ? (
            <View style={viewStyleImage}>
              {image ? (
                <Image
                  style={{ height: 32, width: 32, borderRadius: 16 }}
                  source={{
                    uri: image,
                    // cache: 'only-if-cached',
                  }}
                />
              ) : (
                <Image
                  source={require('./../../../assets/icons/profile.png')}
                  style={{ height: 32, width: 32 }}
                />
              )}
            </View>
          ) : null}
          <View style={viewStyleTitle}>
            <Text style={textStyleTitle}>{title ? title : subtitle}</Text>
            {subtitle ? (
              <Text style={textStyleSubtitle}>{title ? subtitle : ''}</Text>
            ) : null}
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

ListItem.propTypes = {
  image: PropTypes.string, // Text displayed on button
  title: PropTypes.string, // Animation type
  subtitle: PropTypes.string, // Animation type
  onPress: PropTypes.func, // Function to execute on press
  noImage: PropTypes.bool,
};

ListItem.defaultProps = {
  image: '',
  title: '',
  subtitle: '',
  onPress: () => {},
  noImage: false,
};

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
