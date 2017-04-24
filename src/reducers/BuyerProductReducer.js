/* This file contains Product details related reducers */
import { BUYER_LOGIN } from '../actions/types';

const INITIAL_STATE = {
  loading: false,
  productName: '',
  daysOfRent: '',
  rentExpected: '',
  uploadURL: '',
  url: '',
  error: '',
  search: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BUYER_LOGIN:
      return INITIAL_STATE;
    default:
      return state;
  }
};
