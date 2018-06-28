import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { createDrawerNavigator, DrawerItems } from 'react-navigation';

import DrawerHeader from './../components/drawerHeader';
import Colors from './../config/colors';

import Home from './../screens/main/homeScreen';

import Wallets from '../screens/main/walletsScreen';

import GetVerified from './../screens/settings/getVerified/getVerifiedScreen';
import Settings from './../screens/settings/settingsScreen';
import About from './../screens/main/aboutScreen';

const RouteConfigs = {
  Home: {
    screen: Home,
  },
  Wallets: {
    screen: Wallets,
  },
  // Transactions: {
  //   screen: Transactions,
  // },
  // Deposit: {
  //   screen: Deposit,
  // },
  // Withdraw: {
  //   screen: Withdraw,
  // },
  // SendTo: {
  //   screen: Send,
  // },
  // Receive: {
  //   screen: Receive,
  // },
  GetVerified: {
    screen: GetVerified,
  },
  Settings: {
    screen: Settings,
  },
  // About: {
  //   screen: About,
  // },
};

export default createDrawerNavigator(RouteConfigs, {
  drawerWidth: 200,
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle',
  contentComponent: props => (
    <View style={styles.container}>
      <View>
        <DrawerHeader navigation={props.navigation} />
      </View>

      <ScrollView>
        <DrawerItems
          {...props}
          activeTintColor={Colors.onSecondary}
          activeBackgroundColor={Colors.secondary}
          inactiveTintColor={Colors.primary}
          inactiveBackgroundColor="transparent"
          labelStyle={{
            margin: 15,
            alignItems: 'center',
            fontSize: 16,
            fontWeight: 'normal',
          }}
        />
      </ScrollView>
    </View>
  ),
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.onPrimary,
  },
});
