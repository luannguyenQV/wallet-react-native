import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import AccountsReducer from './AccountsReducer';
import UserReducer from './UserReducer';
import ContactsReducer from './ContactsReducer';
import RewardsReducer from './RewardsReducer';
import CryptoReducer from './CryptoReducer';
import ConfigReducer from './ConfigReducer';

export default combineReducers({
  auth: AuthReducer,
  accounts: AccountsReducer,
  user: UserReducer,
  contacts: ContactsReducer,
  rewards: RewardsReducer,
  crypto: CryptoReducer,
  config: ConfigReducer,
});
