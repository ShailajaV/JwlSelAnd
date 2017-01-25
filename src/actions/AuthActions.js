/* This file includes all auth action creaters */
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
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
} from './types';

export const signIn = () => {
  return () => {
    Actions.logIn();
  };
};

export const signUp = () => {
  return () => {
    Actions.signUp();
  };
};

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const addrStreetChanged = (text) => {
  return {
    type: ADDRSTREET_CHANGED,
    payload: text
  };
};

export const addrAptChanged = (text) => {
  return {
    type: ADDRAPT_CHANGED,
    payload: text
  };
};

export const addrRestChanged = (text) => {
  return {
    type: ADDRREST_CHANGED,
    payload: text
  };
};

export const cityChanged = (text) => {
  return {
    type: CITY_CHANGED,
    payload: text
  };
};

export const zipChanged = (text) => {
  return {
    type: ZIP_CHANGED,
    payload: text
  };
};

export const phoneNumChanged = (text) => {
  return {
    type: PHONENUM_CHANGED,
    payload: text
  };
};

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch(() => {
        loginUserFail(dispatch);
    });
  };
};

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });

  Actions.main();
};


export const createUserAccount = ({ email,
  password,
  addrStreet,
  addrApt,
  addrRest,
  city,
  zip,
  phoneNum
}) => {
  console.log('addrStreet', addrStreet, 'addrApt', addrApt, 'addrRest', addrRest,
  'city', city, 'zip', zip, 'phoneNum', phoneNum);
  return (dispatch) => {
    dispatch({ type: USER_SIGN_UP });
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => signUpUserSuccess(dispatch, user))
      .catch(() => loginUserFail(dispatch));
  };
};

const signUpUserSuccess = (dispatch, user) => {
  console.log('userdata ', user);
};
