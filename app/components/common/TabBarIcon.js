import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import context from './context';

class _TabBarIcon extends Component {
  renderIcon() {
    const { routeName, focused, tintColor, colors } = this.props;

    let iconName;
    switch (routeName) {
      case 'Home':
        iconName = `ios-home${focused ? '' : ''}`;
        break;
      case 'Wallets':
        iconName = `wallet${focused ? '' : ''}`;
        break;
      case 'Rewards':
        iconName = `gift${focused ? '' : ''}`;
        break;
      case 'GetVerified':
        iconName = `ios-person${focused ? '' : ''}`;
        break;
      case 'Settings':
        iconName = 'ios-settings';
        break;
    }

    switch (routeName) {
      case 'Wallets':
      case 'Rewards':
        return (
          <MaterialCommunityIcons
            name={iconName}
            size={25}
            color={colors[tintColor]}
          />
        );
      default:
        return <Ionicons name={iconName} size={25} color={colors[tintColor]} />;
    }
  }
  renderText() {
    const { routeName, tintColor, colors } = this.props;

    let iconLabel = '';
    switch (routeName) {
      case 'GetVerified':
        iconLabel = 'Get verified';
        break;
      default:
        iconLabel = routeName;
        break;
    }

    return (
      <Text style={[styles._textStyle, { color: colors[tintColor] }]}>
        {iconLabel.toUpperCase()}
      </Text>
    );
  }

  render() {
    return (
      <View style={styles._containerStyle}>
        {this.renderIcon()}
        {this.renderText()}
      </View>
    );
  }
}

const styles = {
  _containerStyle: {
    // flex: 1,
    // minWidth: 64,
    // padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  _textStyle: {
    textAlign: 'center',
    fontSize: 9,
  },
};

const TabBarIcon = context(_TabBarIcon);

export { TabBarIcon };
