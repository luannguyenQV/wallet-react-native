import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import RehiveReducer from './RehiveReducer';

export default combineReducers({
  auth: AuthReducer,
  rehive: RehiveReducer,
});
