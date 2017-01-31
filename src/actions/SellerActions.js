/* This file includes all seller profile action creaters */
import firebase from 'firebase';
//import { Actions } from 'react-native-router-flux';
import { SELLER_PROFILE_CHANGED, SELLER_FETCH_SUCCESS } from './types';

export const sellerProfileChanged = ({ prop, value }) => {
  return {
    type: SELLER_PROFILE_CHANGED,
    payload: { prop, value }
  };
};

export const sellerProfileInfo = () => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/`)
    .on('value', snapshot => {
      dispatch({ type: SELLER_FETCH_SUCCESS, payload: snapshot.val() });
    });
  };
};
