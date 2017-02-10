/* This file contains Product details related reducers */
import { PRODUCT_DETAILS_CHANGED } from '../actions/types';

const INITIAL_STATE = {
  productName: '',
  rentDays: '',
  rentExpected: '',
  error: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_CHANGED:
      return { ...state, [action.payload.prop]: action.payload.value };
    default:
      return state;
  }
};
