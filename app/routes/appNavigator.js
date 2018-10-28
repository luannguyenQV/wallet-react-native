import { createStackNavigator } from 'react-navigation';

import Home from './tabNavigator';
// import Home from './drawerNavigator';

import Wallets from '../screens/main/walletsScreen';
import Rewards from '../screens/main/rewardsScreen';

import Send from '../screens/main/sendScreen';
import Receive from '../screens/main/receiveScreen';
import QRCodeScanner from '../screens/main/qrScannerScreen';
import InputScanner from '../screens/main/inputScannerScreen';

import Deposit from '../screens/main/depositScreen';
import Withdraw from '../screens/main/withdrawScreen';

import Profile from '../screens/profile/profileScreen';
import EmailAddresses from '../screens/profile/emailAddressesScreen';
import MobileNumbers from '../screens/profile/mobileNumbersScreen';
import Addresses from '../screens/profile/addressesScreen';
import PersonalDetails from '../screens/profile/personalDetailsScreen';
import Document from '../screens/profile/documentScreen';

import BankAccounts from '../screens/settings/bankAccountsScreen';
import CryptoAddresses from '../screens/settings/cryptoAddressesScreen';

import ChangePassword from '../screens/settings/security/changePasswordScreen';
import TwoFactor from '../screens/settings/security/twoFactorScreen';
import Pin from '../screens/settings/security/pinScreen';

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
  PersonalDetails: PersonalDetails,
  MobileNumbers: MobileNumbers,
  EmailAddresses: EmailAddresses,
  Profile: Profile,
  Addresses: Addresses,
  SettingsBankAccounts: BankAccounts,
  CryptoAddresses: CryptoAddresses,
  ChangePassword: ChangePassword,
  TwoFactor: TwoFactor,
  Pin: Pin,
  InputScanner: InputScanner,
};

export default createStackNavigator(Stack, {
  headerMode: 'none',
  cardStyle: { backgroundColor: '#FFFFFF' },
});
