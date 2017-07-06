/* This file contains order related reducers */
import { PLACE_ORDER_SUCCESS, PLACE_ORDER_FAIL } from '../actions/types';

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
    default:
      return state;
  }
};
