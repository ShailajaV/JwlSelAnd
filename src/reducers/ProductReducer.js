/* This file contains Product details related reducers */
import { PRODUCT_DETAILS_CHANGED, PRODUCT_SAVE_SUCCESS, PRODUCT_SAVE_FAIL,
  PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL } from '../actions/types';

const INITIAL_STATE = {
  productName: '',
  daysOfRent: '',
  rentExpected: '',
  uploadURL: '',
  url: '',
  error: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_CHANGED:
      return { ...state, [action.payload.prop]: action.payload.value };
    case PRODUCT_SAVE_SUCCESS:
      return INITIAL_STATE;
    case PRODUCT_SAVE_FAIL:
      return { ...state, error: action.payload };
    case PRODUCT_DELETE_SUCCESS:
      return INITIAL_STATE;
    case PRODUCT_DELETE_FAIL:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
