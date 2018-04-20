import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import Colors from './../../config/colors';
import Icon from 'react-native-vector-icons/Ionicons';

class Checkbox extends Component {
  render() {
    const { onPress, value, label, link, linkLabel } = this.props;
    const { textStyle, containerStyle, textStyleLink } = styles;
    return (
      <View style={containerStyle}>
        <Icon
          onPress={onPress} //value ? {this.setState({ value })} : 'md-square-outline'}
          name={value ? 'md-checkbox' : 'md-square-outline'}
          size={30}
          color={value ? Colors.primary : Colors.lightgray}
        />
        <Text style={textStyle}>{label}</Text>
        <TouchableOpacity onPress={() => Linking.openURL({ link })}>
          <Text style={textStyleLink}>{linkLabel}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  textStyle: {
    color: Colors.black,
    paddingLeft: 8,
    paddingRight: 4,
    fontSize: 16,
  },
  textStyleLink: {
    color: Colors.lightblue,
    fontSize: 16,
  },
};

// make component available to other parts of app
export { Checkbox };
