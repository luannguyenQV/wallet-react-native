import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import context from './context';

class _TabBarIcon extends Component {
  renderIcon() {
    const { routeName, focused, tintColor, colors, profile } = this.props;
    const { imageStylePhoto } = styles;

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
      case 'Profile':
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
      case 'Profile':
        if (profile.profile) {
          return (
            <Image
              style={[
                imageStylePhoto,
                {
                  borderColor: colors[tintColor],
                },
              ]}
              source={{
                uri: profile.profile,
                // cache: 'only-if-cached',
              }}
            />
          );
        }
      default:
        return <Ionicons name={iconName} size={24} color={colors[tintColor]} />;
    }
  }
  renderText() {
    const { routeName, tintColor, colors } = this.props;

    return (
      <Text style={[styles._textStyle, { color: colors[tintColor] }]}>
        {routeName.toUpperCase()}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  _textStyle: {
    textAlign: 'center',
    fontSize: 9,
  },
  imageStylePhoto: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    // padding: 2,
    margin: 1,
  },
};

const TabBarIcon = context(_TabBarIcon);

export { TabBarIcon };
