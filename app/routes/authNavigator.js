import { createStackNavigator } from 'react-navigation';

import AuthScreen from './../screens/auth/authScreen';

const Stack = {
  AuthScreen: AuthScreen,
};

export default createStackNavigator(Stack, {
  headerMode: 'none',
});
