import { createDrawerNavigator } from 'react-navigation';

import CustomDrawer from './../components/CustomDrawer';

import HomeScreen from './../screens/main/homeScreen';

import WalletsScreen from '../screens/main/walletsScreen';
import RewardsScreen from '../screens/main/rewardsScreen';

import ProfileScreen from '../screens/settings/getVerified/profileScreen';
import SettingsScreen from './../screens/settings/settingsScreen';

const Stack = {
  Home: HomeScreen,
  Wallets: WalletsScreen,
  Rewards: RewardsScreen,
  Profile: ProfileScreen,
  Settings: SettingsScreen,
};

const drawerNavigator = createDrawerNavigator(Stack, {
  drawerWidth: 200,
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle',
  contentComponent: CustomDrawer,
});

export default drawerNavigator;
