/* This file contains payment related reducers */
import { PAYMENT_DETAILS_CHANGED, PAYMENT_USER } from '../actions/types';

const INITIAL_STATE = {
  shipFullName: '',
  error: '',
  loading: false,
  shipAddrStreet: '',
  shipAddrApt: '',
  shipState: '',
  shipCity: '',
  shipZip: '',
  shipAddr: '',
  shipPrefAddr: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PAYMENT_DETAILS_CHANGED:
      return { ...state, [action.payload.prop]: action.payload.value };
    case PAYMENT_USER:
      return { ...state, loading: true };
    default:
      return state;
  }
};
