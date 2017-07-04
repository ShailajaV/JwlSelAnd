/* This file contains payment related reducers */
import { PAYMENT_DETAILS_CHANGED, PAYMENT_USER, RESET_SHIP_ADDR, FETCH_PAYMENT_DETAILS_SUCCESS,
  SAVE_PAYMENT_DETAILS_SUCCESS, SAVE_PAYMENT_DETAILS_FAIL } from '../actions/types';

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
  shipAdrs: [],
  cards: [],
  revShipAddr: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PAYMENT_DETAILS_CHANGED:
      return { ...state, [action.payload.prop]: action.payload.value };
    case PAYMENT_USER:
      return { ...state, loading: true };
    case RESET_SHIP_ADDR:
      return { state: INITIAL_STATE };
    case FETCH_PAYMENT_DETAILS_SUCCESS:
    case SAVE_PAYMENT_DETAILS_SUCCESS:
      return Object.assign({}, state, {
          shipAdrs: action.shipAddresses,
          cards: action.cards
      });
    case SAVE_PAYMENT_DETAILS_FAIL:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
