import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import AccountsReducer from './AccountsReducer';
import UserReducer from './UserReducer';
import ContactsReducer from './ContactsReducer';

export default combineReducers({
  auth: AuthReducer,
  accounts: AccountsReducer,
  user: UserReducer,
  contacts: ContactsReducer,
});
