import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';

import CustomDrawer from './../components/CustomDrawer';

import HomeScreen from './../screens/main/homeScreen';

import WalletsScreen from '../screens/main/walletsScreen';
import RewardsScreen from '../screens/main/rewardsScreen';

import GetVerifiedScreen from './../screens/settings/getVerified/getVerifiedScreen';
import SettingsScreen from './../screens/settings/settingsScreen';
import About from './../screens/main/aboutScreen';
import LogoutScreen from './../screens/auth/logoutScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = {
  Home: HomeScreen,
  Wallets: WalletsScreen,
  Rewards: RewardsScreen,
  GetVerified: GetVerifiedScreen,
  Settings: SettingsScreen,
};

const tabNavigator = createBottomTabNavigator(Stack, {
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Home') {
        iconName = `home${focused ? '' : '-outline'}`;
      } else if (routeName === 'Wallets') {
        iconName = `wallet${focused ? '' : '-outline'}`;
      } else if (routeName === 'Rewards') {
        iconName = `cart${focused ? '' : '-outline'}`;
        // iconName = `star-box`;
      } else if (routeName === 'GetVerified') {
        iconName = `account${focused ? '' : '-outline'}`;
      } else if (routeName === 'Settings') {
        iconName = 'wrench';
        // iconName = `settings${focused ? '' : '-outline'}`;
      }

      // You can return any component that you like here! We usually use an
      // icon component from react-native-vector-icons
      return (
        <MaterialCommunityIcons name={iconName} size={25} color={tintColor} />
      );
    },
  }),
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
    showLabel: false,
  },
});

export default tabNavigator;
