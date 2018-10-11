import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';

import CustomDrawer from './../components/CustomDrawer';

import HomeScreen from './../screens/main/homeScreen';

import WalletsScreen from '../screens/main/walletsScreen';
import RewardsScreen from '../screens/main/rewardsScreen';

import GetVerifiedScreen from './../screens/settings/getVerified/getVerifiedScreen';
import SettingsScreen from './../screens/settings/settingsScreen';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

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
      const color = focused ? tintColor : 'lightgray';

      // You can return any component that you like here! We usually use an
      // icon component from react-native-vector-icons
      switch (routeName) {
        case 'Wallets':
        case 'Rewards':
          return (
            <MaterialCommunityIcons name={iconName} size={25} color={color} />
          );
        default:
          return <Ionicons name={iconName} size={25} color={color} />;
      }
    },
  }),
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
    showLabel: false,
  },
});

export default tabNavigator;
