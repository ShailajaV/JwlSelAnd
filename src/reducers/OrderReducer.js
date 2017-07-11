/* This file contains order related reducers */
import { PLACE_ORDER_SUCCESS, PLACE_ORDER_FAIL, FETCH_ORDER_HISTORY_SUCCESS, CART_DELETE_FAIL }
  from '../actions/types';

const INITIAL_STATE = {
  orderId: '',
  error: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PLACE_ORDER_SUCCESS:
      return Object.assign({}, state, { orderId: action.payload });
    case PLACE_ORDER_FAIL:
      return { ...state, error: action.payload };
    case CART_DELETE_FAIL:
      return { ...state, error: action.payload };
    case FETCH_ORDER_HISTORY_SUCCESS:
      return Object.assign({}, state, { orders: action.payload });
    default:
      return state;
  }
};
