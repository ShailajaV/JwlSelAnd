/* This file contains Product details related reducers */
import { SELLERS_FETCH_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
  /*loading: false,
  productName: '',
  daysOfRent: '',
  rentExpected: '',
  uploadURL: '',
  url: '',
  error: '',
  search: ''*/
  sellers: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELLERS_FETCH_SUCCESS:
      return Object.assign({}, state, {
        sellers: action.payload
      });
    default:
      return state;
  }
};
