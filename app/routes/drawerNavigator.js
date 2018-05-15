import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { DrawerNavigator, DrawerItems } from 'react-navigation';

import DrawerHeader from './../components/drawerHeader';
import Colors from './../config/colors';

import Home from './../screens/main/homeScreen';

import Transactions from './../screens/main/transactions/transactionHistoryScreen';
import Send from './../screens/main/transactions/sendScreen';
import Receive from './../screens/main/transactions/receiveScreen';

import Wallets from './../screens/main/accounts/walletsScreen';
import Deposit from './../screens/main/wallets/depositScreen';
import Withdraw from './../screens/main/wallets/withdrawScreen';

import GetVerified from './../screens/settings/getVerified/getVerifiedScreen';
import Settings from './../screens/settings/settingsScreen';
import About from './../screens/main/aboutScreen';
import Logout from './../screens/auth/logoutScreen';

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
  About: {
    screen: About,
  },
  Logout: {
    screen: Logout,
  },
};

export default DrawerNavigator(RouteConfigs, {
  drawerWidth: 300,
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle',
  contentComponent: props => (
    <View style={styles.container}>
      <DrawerHeader navigation={props.navigation} />
      <ScrollView>
        <DrawerItems
          {...props}
          activeTintColor="#6EBDF7"
          activeBackgroundColor="#485159"
          inactiveTintColor="white"
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
    backgroundColor: Colors.drawerColor,
  },
});
