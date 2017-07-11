/* This file includes all order details action creators */
//import { Actions } from 'react-native-router-flux';
import { FETCH_ORDER_HISTORY_SUCCESS } from './types';
import { firebaseAuth, firebaseDatabase } from '../FirebaseConfig';

/* Fetch orders details
* @return : OrdersHistoryList
*/
export const getOrdersDetails = () => {
  const { currentUser } = firebaseAuth;
  return (dispatch) => {
    firebaseDatabase.ref(`/order/${currentUser.uid}/`)
    .on('value', snapshot => {
      dispatch({ type: FETCH_ORDER_HISTORY_SUCCESS, payload: snapshot.val() });
    });
  };
};
