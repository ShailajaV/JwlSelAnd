/* This file contains Seller profile info related reducers */
import { SELLER_PROFILE_CHANGED, SELLER_SAVE_SUCCESS, SELLER_SAVE_FAIL } from '../actions/types';

const INITIAL_STATE = {
  fullName: '',
  companyName: '',
  address: '',
  image: '',
  error: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELLER_PROFILE_CHANGED:
      return { ...state, [action.payload.prop]: action.payload.value };
    case SELLER_SAVE_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.paylod };
    case SELLER_SAVE_FAIL:
      return { ...state, error: action.payload };
    default:
      return state;
    }
};
