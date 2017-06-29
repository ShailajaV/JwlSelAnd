/* This file contains payment related reducers */
import { PAYMENT_DETAILS_CHANGED, PAYMENT_USER, RESET_SHIP_ADDR } from '../actions/types';

const INITIAL_STATE = {
  shipFullName: '',
  error: '',
  loading: false,
  shipAddrStreet: '',
  shipAddrApt: '',
  shipState: '',
  shipCity: '',
  shipZip: '',
  shipAddr: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PAYMENT_DETAILS_CHANGED:
      return { ...state, [action.payload.prop]: action.payload.value };
    case PAYMENT_USER:
      return { ...state, loading: true };
    case RESET_SHIP_ADDR:
      return { state: INITIAL_STATE };
    default:
      return state;
  }
};
