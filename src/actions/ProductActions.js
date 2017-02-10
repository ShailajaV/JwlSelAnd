/* This file includes all product details action creators */
//import firebase from 'firebase';
//import { Actions } from 'react-native-router-flux';
import { PRODUCT_DETAILS_CHANGED } from './types';

/* Assign all product values to corresponding keys
* @parameter: prop, value
* @return : prop, value
*/
export const productDetailsChanged = ({ prop, value }) => {
  return {
      type: PRODUCT_DETAILS_CHANGED,
      payload: { prop, value }
  };
};
