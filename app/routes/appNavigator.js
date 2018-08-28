import { createStackNavigator } from 'react-navigation';

import Home from './drawerNavigator';

import Wallets from '../screens/main/walletsScreen';
import Rewards from '../screens/main/rewardsScreen';

import Send from '../screens/main/sendScreen';
import Receive from '../screens/main/receiveScreen';
import QRCodeScanner from '../screens/main/qrScannerScreen';

import Deposit from '../screens/main/depositScreen';
import Withdraw from '../screens/main/withdrawScreen';

import SettingsEmailAddresses from '../screens/settings/emailAddressesScreen';
import SettingsMobileNumbers from '../screens/settings/mobileNumbersScreen';
import SettingsBankAccounts from '../screens/settings/bankAccountsScreen';
import SettingsCryptoAddresses from '../screens/settings/cryptoAddressesScreen';

import SettingsGetVerified from '../screens/settings/getVerified/getVerifiedScreen';
import Document from '../screens/settings/getVerified/documentScreen';

// import SettingsNotifications from './../screens/settings/notifications/notificationsScreen';
// import EmailNotifications from './../screens/settings/notifications/emailNotificationsScreen';
// import MobileNotifications from './../screens/settings/notifications/mobileNotificationsScreen';

import ChangePassword from '../screens/settings/security/changePasswordScreen';
import TwoFactor from '../screens/settings/security/twoFactorScreen';
import Pin from '../screens/settings/security/pinScreen';

import SettingsAddress from '../screens/settings/addressScreen';
import SettingsPersonalDetails from '../screens/settings/personalDetailsScreen';

const Stack = {
  Home: Home,
  Wallets: Wallets,
  Rewards: Rewards,
  QRCodeScanner: QRCodeScanner,
  Send: Send,
  Receive: Receive,
  Deposit: Deposit,
  Withdraw: Withdraw,
  Document: Document,
  SettingsPersonalDetails: SettingsPersonalDetails,
  SettingsMobileNumbers: SettingsMobileNumbers,
  SettingsEmailAddresses: SettingsEmailAddresses,
  SettingsGetVerified: SettingsGetVerified,
  SettingsAddress: SettingsAddress,
  SettingsBankAccounts: SettingsBankAccounts,
  SettingsCryptoAddresses: SettingsCryptoAddresses,
  ChangePassword: ChangePassword,
  TwoFactor: TwoFactor,
  Pin: Pin,
  // SettingsNotifications: {
  //   screen: SettingsNotifications,
  // },
  // EmailNotifications: {
  //   screen: EmailNotifications,
  // },
  // MobileNotifications: {
  //   screen: MobileNotifications,
  // },
};

export default createStackNavigator(Stack, {
  headerMode: 'none',
});
