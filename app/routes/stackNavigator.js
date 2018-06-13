import { StackNavigator } from 'react-navigation';

import AuthScreen from './../screens/auth/authScreen';

import Home from './drawerNavigator';

import Wallets from '../screens/main/walletsScreen';

import Send from '../screens/main/sendScreen';
import Receive from '../screens/main/receiveScreen';
import QRcodeScanner from '../screens/main/qrcodeScannerScreen';

import Deposit from '../screens/main/depositScreen';
import Withdraw from '../screens/main/withdrawScreen';

import SettingsEmailAddresses from './../screens/settings/emailAddressesScreen';
import VerifyMobileNumber from './../screens/settings/verifyMobileScreen';
import SettingsMobileNumbers from './../screens/settings/mobileNumbersScreen';
import SettingsBankAccounts from './../screens/settings/bankAccountsScreen';
import SettingsCryptoAddresses from './../screens/settings/cryptoAddressesScreen';

import SettingsGetVerified from './../screens/settings/getVerified/getVerifiedScreen';
import Document from './../screens/settings/getVerified/documentScreen';

import SettingsNotifications from './../screens/settings/notifications/notificationsScreen';
import EmailNotifications from './../screens/settings/notifications/emailNotificationsScreen';
import MobileNotifications from './../screens/settings/notifications/mobileNotificationsScreen';

import ChangePassword from './../screens/settings/security/changePasswordScreen';
import TwoFactor from '../screens/settings/security/twoFactor/twoFactorScreen';
import TwoFactorSmsAuth from '../screens/settings/security/twoFactor/twoFactorSmsAuthScreen';
import TwoFactorToken from '../screens/settings/security/twoFactor/twoFactorTokenScreen';
import AuthVerifySms from '../screens/settings/security/twoFactor/authVerifySmsScreen';
import Pin from './../screens/settings/security/pinScreen';

import SettingsCards from './../screens/settings/cardsScreen';
import SettingsAddress from './../screens/settings/addressScreen';
import SettingsPersonalDetails from './../screens/settings/personalDetailsScreen';

const Stack = {
  AuthScreen: {
    screen: AuthScreen,
  },
  Home: {
    screen: Home,
  },
  Wallets: {
    screen: Wallets,
  },
  QRcodeScanner: {
    screen: QRcodeScanner,
  },
  Send: {
    screen: Send,
  },
  Receive: {
    screen: Receive,
  },
  Deposit: {
    screen: Deposit,
  },
  Withdraw: {
    screen: Withdraw,
  },
  Document: {
    screen: Document,
  },

  SettingsPersonalDetails: {
    screen: SettingsPersonalDetails,
  },
  SettingsMobileNumbers: {
    screen: SettingsMobileNumbers,
  },
  VerifyMobileNumber: {
    screen: VerifyMobileNumber,
  },
  SettingsEmailAddresses: {
    screen: SettingsEmailAddresses,
  },
  SettingsGetVerified: {
    screen: SettingsGetVerified,
  },
  SettingsAddress: {
    screen: SettingsAddress,
  },
  SettingsBankAccounts: {
    screen: SettingsBankAccounts,
  },
  SettingsCryptoAddresses: {
    screen: SettingsCryptoAddresses,
  },
  SettingsCards: {
    screen: SettingsCards,
  },
  ChangePassword: {
    screen: ChangePassword,
  },
  TwoFactor: {
    screen: TwoFactor,
  },
  TwoFactorSmsAuth: {
    screen: TwoFactorSmsAuth,
  },
  TwoFactorToken: {
    screen: TwoFactorToken,
  },
  AuthVerifySms: {
    screen: AuthVerifySms,
  },
  Pin: {
    screen: Pin,
  },
  SettingsNotifications: {
    screen: SettingsNotifications,
  },
  EmailNotifications: {
    screen: EmailNotifications,
  },
  MobileNotifications: {
    screen: MobileNotifications,
  },
};

export default StackNavigator(Stack, {
  headerMode: 'none',
});
