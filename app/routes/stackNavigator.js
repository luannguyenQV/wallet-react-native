import { StackNavigator } from 'react-navigation';

import InitialScreen from './../screens/auth/initialScreen';
import Login from './../screens/auth/loginScreen';
import Register from './../screens/auth/registerScreen';
import AuthVerifyMobile from './../screens/auth/verifyMobileScreen';
import ForgotPassword from './../screens/auth/forgotPasswordScreen';
import NoNetConnection from './../screens/auth/noNetConnectionScreen';

import Home from './drawerNavigator';

// import AccountsB from './../screens/accounts/accountsB';
import Wallets from './../screens/main/accounts/walletsScreen';
import AddAccount from './../screens/main/accounts/addAccountScreen';

import Send from './../screens/main/transactions/sendScreen';
import Receive from './../screens/main/transactions/receiveScreen';
import QRcodeScanner from './../screens/main/transactions/qrcodeScannerScreen';

import BankAccounts from './../screens/main/wallets/withdrawBankAccountsScreen';
import BitcoinAddresses from './../screens/main/wallets/withdrawBitcoinAddressesScreen';
import WithdrawAmountEntry from './../screens/main/wallets/withdrawAmountEntryScreen';

import SettingsBankAccounts from './../screens/settings/bankAccounts/bankAccountsScreen';
import AddBankAccount from './../screens/settings/bankAccounts/addBankAccountScreen';
import EditBankAccount from './../screens/settings/bankAccounts/editBankAccountScreen';

import SettingsBitcoinAddresses from './../screens/settings/bitcoinAddresses/bitcoinAddressesScreen';
import AddBitcoinAddress from './../screens/settings/bitcoinAddresses/addBitcoinAddressScreen';
import EditBitcoinAddress from './../screens/settings/bitcoinAddresses/editBitcoinAddressScreen';

import SettingsEmailAddresses from './../screens/settings/emailAddresses/emailAddressesScreen';
import AddEmailAddress from './../screens/settings/emailAddresses/addEmailAddressScreen';

import SettingsGetVerified from './../screens/settings/getVerified/getVerifiedScreen';
import Document from './../screens/settings/getVerified/documentScreen';
import DocumentUpload from './../screens/settings/getVerified/documentUploadScreen';

import AddMobileNumber from './../screens/settings/mobileNumbers/addMobileNumberScreen';
import VerifyMobileNumber from './../screens/settings/mobileNumbers/verifyMobileScreen';
import SettingsMobileNumbers from './../screens/settings/mobileNumbers/mobileNumbersScreen';

import SettingsNotifications from './../screens/settings/notifications/notificationsScreen';
import EmailNotifications from './../screens/settings/notifications/emailNotificationsScreen';
import MobileNotifications from './../screens/settings/notifications/mobileNotificationsScreen';

import UploadImage from './../screens/settings/profileImage/uploadImageScreen';

import SettingsSecurity from './../screens/settings/security/securityScreen';
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
  InitialScreen: {
    screen: InitialScreen,
  },
  Home: {
    screen: Home,
  },
  Login: {
    screen: Login,
  },
  Register: {
    screen: Register,
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
  BitcoinAddresses: {
    screen: BitcoinAddresses,
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
  AddAccount: {
    screen: AddAccount,
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
  AddMobileNumber: {
    screen: AddMobileNumber,
  },
  VerifyMobileNumber: {
    screen: VerifyMobileNumber,
  },
  SettingsEmailAddresses: {
    screen: SettingsEmailAddresses,
  },
  AddEmailAddress: {
    screen: AddEmailAddress,
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
  SettingsBitcoinAddresses: {
    screen: SettingsBitcoinAddresses,
  },
  AddBankAccount: {
    screen: AddBankAccount,
  },
  EditBankAccount: {
    screen: EditBankAccount,
  },
  AddBitcoinAddress: {
    screen: AddBitcoinAddress,
  },
  EditBitcoinAddress: {
    screen: EditBitcoinAddress,
  },
  SettingsCards: {
    screen: SettingsCards,
  },
  SettingsSecurity: {
    screen: SettingsSecurity,
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
