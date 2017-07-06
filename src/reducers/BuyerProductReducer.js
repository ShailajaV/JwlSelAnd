/* This file contains Product details related reducers */
import { SELLERS_FETCH_SUCCESS, SELECTED_SELLER_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
  /*loading: false,
  productName: '',
  daysOfRent: '',
  rentExpected: '',
  uploadURL: '',
  url: '',
  error: '',
  search: ''*/
  sellers: [],
  selectedSeller: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELLERS_FETCH_SUCCESS:
      return Object.assign({}, state, {
        sellers: action.payload
      });
    case SELECTED_SELLER_SUCCESS:
      return Object.assign({}, state, {
        selectedSeller: action.payload
    });
    default:
      return state;
  }
};
