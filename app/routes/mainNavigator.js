import { createSwitchNavigator } from 'react-navigation';
import authNavigator from './authNavigator';
import appNavigator from './appNavigator';
// import HomeScreen from './../screens/main/homeScreen';

export default createSwitchNavigator(
  {
    Auth: authNavigator,
    App: appNavigator,
  },
  {
    initialRouteName: 'Auth',
  },
);
