import React, { Component } from 'react';
import { Text, TouchableHighlight } from 'react-native';

export default class DrawerOption extends Component {
  _containerStyle() {
    const { address, activeItemKey, colors } = this.props;
    // console.log()
    const { containerStyle } = styles;
    return [
      containerStyle,
      {
        backgroundColor:
          address === activeItemKey ? colors.primary : 'transparent',
      },
    ];
  }

  _textStyle() {
    const { address, activeItemKey, colors } = this.props;
    // console.log()
    const { textStyle } = styles;
    return [
      textStyle,
      {
        color:
          address === activeItemKey ? colors.primaryContrast : colors.primary,
      },
    ];
  }

  render() {
    const { name, address, navigation, colors } = this.props;
    return (
      <TouchableHighlight
        // activeOpacity={0.4}
        underlayColor={colors.secondary}
        style={this._containerStyle()}
        onPress={() => navigation.navigate(address)}>
        <Text style={this._textStyle()}>{name}</Text>
      </TouchableHighlight>
    );
  }
}

const styles = {
  containerStyle: {
    padding: 8,
    paddingLeft: 16,
    marginVertical: 2,
    width: '100%',
  },
  textStyle: {
    fontSize: 18,
    fontWeight: 'normal',
  },
};

// ctiveTintColor={colors.secondaryContrast}
//           activeBackgroundColor={colors.secondary}
//           inactiveTintColor={colors.primary}
//           inactiveBackgroundColor="transparent"
//           labelStyle={{
//             margin: 15,
//             alignItems: 'center',
//             fontSize: 16,
//             fontWeight: 'normal',
//           }}
