import { StackNavigator } from 'react-navigation';

import AuthScreen from './../screens/auth/authScreen';
import AuthVerifyMobile from './../screens/auth/verifyMobileScreen';
import ForgotPassword from './../screens/auth/forgotPasswordScreen';
import NoNetConnection from './../screens/auth/noNetConnectionScreen';

import Home from './drawerNavigator';

import Wallets from './../screens/main/accounts/walletsScreen';

import Send from './../screens/main/transactions/sendScreen';
import Receive from './../screens/main/transactions/receiveScreen';
import QRcodeScanner from './../screens/main/transactions/qrcodeScannerScreen';

import BankAccounts from './../screens/main/wallets/withdrawBankAccountsScreen';
import CryptoAddresses from './../screens/main/wallets/withdrawCryptoAddressesScreen';
import WithdrawAmountEntry from './../screens/main/wallets/withdrawAmountEntryScreen';

import SettingsEmailAddresses from './../screens/settings/emailAddressesScreen';
import VerifyMobileNumber from './../screens/settings/verifyMobileScreen';
import SettingsMobileNumbers from './../screens/settings/mobileNumbersScreen';
import SettingsBankAccounts from './../screens/settings/bankAccountsScreen';
import SettingsCryptoAddresses from './../screens/settings/cryptoAddressesScreen';

import SettingsGetVerified from './../screens/settings/getVerified/getVerifiedScreen';
import Document from './../screens/settings/getVerified/documentScreen';
import DocumentUpload from './../screens/settings/getVerified/documentUploadScreen';

import SettingsNotifications from './../screens/settings/notifications/notificationsScreen';
import EmailNotifications from './../screens/settings/notifications/emailNotificationsScreen';
import MobileNotifications from './../screens/settings/notifications/mobileNotificationsScreen';

import UploadImage from './../screens/settings/profileImage/uploadImageScreen';

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
  ForgotPassword: {
    screen: ForgotPassword,
  },
  NoNetConnection: {
    screen: NoNetConnection,
  },
  AuthVerifyMobile: {
    screen: AuthVerifyMobile,
  },
  Send: {
    screen: Send,
  },
  Receive: {
    screen: Receive,
  },
  BankAccounts: {
    screen: BankAccounts,
  },
  CryptoAddresses: {
    screen: CryptoAddresses,
  },
  WithdrawAmountEntry: {
    screen: WithdrawAmountEntry,
  },
  QRcodeScanner: {
    screen: QRcodeScanner,
  },
  Wallets: {
    screen: Wallets,
  },
  UploadImage: {
    screen: UploadImage,
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
  Document: {
    screen: Document,
  },
  DocumentUpload: {
    screen: DocumentUpload,
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
