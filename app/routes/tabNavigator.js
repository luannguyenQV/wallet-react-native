import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';

import context from './../components/common/context';

import CustomDrawer from './../components/CustomDrawer';

import HomeScreen from './../screens/main/homeScreen';

import WalletsScreen from '../screens/main/walletsScreen';
import RewardsScreen from '../screens/main/rewardsScreen';

import GetVerifiedScreen from './../screens/settings/getVerified/getVerifiedScreen';
import SettingsScreen from './../screens/settings/settingsScreen';
import {
  colorSelector,
  themeSelector,
} from './../redux/reducers/ConfigReducer';
import { TabBarIcon } from './../components/common';
import { store } from './../redux/store';

const colors = colorSelector(store.getState());

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
    activeTintColor: colors.primary,
    inactiveTintColor: colors.grey3,
    // activeBackgroundColor: colors.header,
    // inactiveBackgroundColor: colors.headerContrast,
    // labelStyle: { color: colors.primary },
  },
});

// const tabNavigator = context(_tabNavigator);

export default tabNavigator;
