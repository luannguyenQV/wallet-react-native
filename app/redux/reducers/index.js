import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import RehiveReducer from './RehiveReducer';
import UserReducer from './UserReducer';

export default combineReducers({
  auth: AuthReducer,
  rehive: RehiveReducer,
  user: UserReducer,
});
