import { PERSIST_REHYDRATE } from 'redux-persist/es/constants';
import { FETCH_CRYPTO_ASYNC, SET_RECEIVE_ADDRESS } from '../actions/';

const INITIAL_STATE = {
  stellar: { currencies: [], address: '', memo: '' },
  ethereum: { currencies: [], address: '' },
  bitcoin: { currencies: [], address: '' },
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
      return {
        ...state,
        loading: false,
        error: '',
        [action.payload.type]: {
          ...state[action.payload.type],
          address: action.payload.address,
          memo: action.payload.memo,
          currencies: action.payload.assets,
        },
      };
    case FETCH_CRYPTO_ASYNC.error:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case SET_RECEIVE_ADDRESS:
      return {
        ...state,
      };

    default:
      return state;
  }
};
