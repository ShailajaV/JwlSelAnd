/* This file contains authentication related reducers */
import {
  USER_DETAILS_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  LOGOUT_USER,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL
 } from '../actions/types';

const INITIAL_STATE = {
  fullName: '',
  email: '',
  password: '',
  companyName: '',
  user: null,
  error: '',
  loading: false,
  addrStreet: '',
  addrApt: '',
  state: '',
  city: '',
  zip: '',
  phoneNum: '',
  drLicense: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_DETAILS_CHANGED:
      return { ...state, [action.payload.prop]: action.payload.value };
    case LOGIN_USER:
      return { ...state, loading: true };
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case LOGIN_USER_FAIL:
      return { ...state, error: action.payload, password: '', loading: false };
    case LOGOUT_USER:
      return { ...state, ...INITIAL_STATE };
    case PASSWORD_RESET_SUCCESS:
      return { INITIAL_STATE };
    case PASSWORD_RESET_FAIL:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
