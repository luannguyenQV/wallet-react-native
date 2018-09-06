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
      const { type, assets } = action.payload;
      return {
        ...state,
        [type]: { ...state.type, currencies: assets },
        loading: false,
        error: '',
      };
    case FETCH_CRYPTO_ASYNC.error:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case SET_RECEIVE_ADDRESS:
      const { address, memo } = action.payload;
      return {
        ...state,
        [type]: {
          ...state.type,
          address: address,
          memo: memo ? memo : '',
        },
      };

    default:
      return state;
  }
};
