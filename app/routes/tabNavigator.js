import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';

import { TabBarIcon } from './../components/common';

import HomeScreen from './../screens/main/homeScreen';
import WalletsScreen from '../screens/main/walletsScreen';
import RewardsScreen from '../screens/main/rewardsScreen';
import GetVerifiedScreen from './../screens/settings/getVerified/getVerifiedScreen';
import SettingsScreen from './../screens/settings/settingsScreen';

const Stack = {
  GetVerified: GetVerifiedScreen,
  Rewards: RewardsScreen,
  Home: HomeScreen,
  Wallets: WalletsScreen,
  Settings: SettingsScreen,
};

const tabNavigator = createBottomTabNavigator(Stack, {
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      return (
        <TabBarIcon
          focused={focused}
          routeName={routeName}
          tintColor={tintColor}
        />
      );
    },
  }),
  tabBarOptions: {
    activeTintColor: 'primary',
    inactiveTintColor: 'font',
    // activeBackgroundColor: colors.header,
    // inactiveBackgroundColor: colors.headerContrast,
    // labelStyle: { color: colors.primary },
    style: {
      paddingVertical: 8,
      height: 64,
      // borderTopColor: 'transparent',
      borderTopWidth: 0,
      elevation: 5,
      zIndex: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 2,
      shadowOpacity: 0.15,
    },
    showLabel: false,
  },
});

export default tabNavigator;
