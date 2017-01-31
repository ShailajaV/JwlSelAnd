/* This file contains Seller profile info related reducers */
import { SELLER_PROFILE_CHANGED } from '../actions/types';

const INITIAL_STATE = {
  fullName: '',
  companyName: '',
  address: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELLER_PROFILE_CHANGED:
      return { ...state, [action.payload.prop]: action.payload.value };
    default:
      return state;
    }
};
