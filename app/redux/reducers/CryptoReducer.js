import { PERSIST_REHYDRATE } from 'redux-persist/es/constants';
import {
  FETCH_CRYPTO_ASYNC,
  CLAIM_REWARD_ASYNC,
  VIEW_REWARD,
  HIDE_REWARD,
} from '../actions/';

const INITIAL_STATE = {
  stellar: [],
  ethereum: [],
  bitcoin: [],
};

export default (state = INITIAL_STATE, action) => {
  // console.log(action);
  switch (action.type) {
    case PERSIST_REHYDRATE:
      return action.payload.auth || INITIAL_STATE;

    case FETCH_CRYPTO_ASYNC.pending:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CRYPTO_ASYNC.success:
      const { type, assets } = action.payload;
      return {
        ...state,
        [type]: assets,
        loading: false,
        error: '',
      };
    case FETCH_CRYPTO_ASYNC.error:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
