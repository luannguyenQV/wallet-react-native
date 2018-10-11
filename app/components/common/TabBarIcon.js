import React, { Component } from 'react';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import context from './context';

class _TabBarIcon extends Component {
  render() {
    const { routeName, focused, tintColor } = this.props;

    let iconName;
    if (routeName === 'Home') {
      iconName = `ios-home${focused ? '' : ''}`;
    } else if (routeName === 'Wallets') {
      iconName = `wallet${focused ? '' : ''}`;
    } else if (routeName === 'Rewards') {
      iconName = `gift${focused ? '' : ''}`;
      // iconName = `star-box`;
    } else if (routeName === 'GetVerified') {
      iconName = `ios-person${focused ? '' : ''}`;
    } else if (routeName === 'Settings') {
      iconName = 'ios-settings';
      // iconName = `settings${focused ? '' : '-outline'}`;
    }
    // const color = focused ? colors.primary : colors.grey3;

    // You can return any component that you like here! We usually use an
    // icon component from react-native-vector-icons
    switch (routeName) {
      case 'Wallets':
      case 'Rewards':
        return (
          <MaterialCommunityIcons name={iconName} size={25} color={tintColor} />
        );
      default:
        return <Ionicons name={iconName} size={25} color={tintColor} />;
    }
  }
}
const TabBarIcon = context(_TabBarIcon);

export { TabBarIcon };
