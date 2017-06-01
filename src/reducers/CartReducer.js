/* This file contains cart details related reducers */
import { CARTITEMS_FETCH_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
  cartItems: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CARTITEMS_FETCH_SUCCESS:
      return Object.assign({}, state, {
        cartItems: action.payload
      });
    default:
      return state;
  }
};
