/* This file contains authentication related reducers */
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  ADDRSTREET_CHANGED,
  ADDRAPT_CHANGED,
  ADDRREST_CHANGED,
  CITY_CHANGED,
  ZIP_CHANGED,
  PHONENUM_CHANGED,
  USER_SIGN_UP
 } from '../actions/types';
 import { AUTH_FAILED } from '../actions/constants';

const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  error: '',
  loading: false,
  addrStreet: '',
  addrApt: '',
  addrRest: '',
  city: '',
  zip: '',
  phoneNum: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_USER:
      return { ...state, loading: true };
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.paylod };
    case LOGIN_USER_FAIL:
      return { ...state, error: AUTH_FAILED, password: '', loading: false };
    case ADDRSTREET_CHANGED:
      return { ...state, addrStreet: action.payload };
    case ADDRAPT_CHANGED:
      return { ...state, addrApt: action.payload };
    case ADDRREST_CHANGED:
      return { ...state, addrRest: action.payload };
    case CITY_CHANGED:
      return { ...state, city: action.payload };
    case ZIP_CHANGED:
      return { ...state, zip: action.payload };
    case PHONENUM_CHANGED:
      return { ...state, phoneNum: action.payload };
    case USER_SIGN_UP:
      return { ...state, ...INITIAL_STATE, user: action.paylod };
    default:
      return state;
  }
};
