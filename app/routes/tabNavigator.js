import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';

import CustomDrawer from './../components/CustomDrawer';

import HomeScreen from './../screens/main/homeScreen';

import WalletsScreen from '../screens/main/walletsScreen';
import RewardsScreen from '../screens/main/rewardsScreen';

import GetVerifiedScreen from './../screens/settings/getVerified/getVerifiedScreen';
import SettingsScreen from './../screens/settings/settingsScreen';
import { TabBarIcon } from './../components/common';

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
      return <TabBarIcon focused={focused} routeName={routeName} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
    showLabel: false,
  },
});

export default tabNavigator;
