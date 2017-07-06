/* This file contains cart details related reducers */
import { CARTITEMS_FETCH_SUCCESS, ADD_CART_SUCCESS, ADD_CART_FAIL } from '../actions/types';

const INITIAL_STATE = {
  cartItems: [],
  addCartFail: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CARTITEMS_FETCH_SUCCESS:
      return Object.assign({}, state, {
        cartItems: (action.payload === null ? [] : action.payload)
      });
    case ADD_CART_SUCCESS:
      return Object.assign({}, state, {
        cartItems: (action.payload === null ? [] : action.payload)
      });
    case ADD_CART_FAIL:
      return Object.assign({}, state, {
        addCartFail: action.payload
      });
    default:
      return state;
  }
};
