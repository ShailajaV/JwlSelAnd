/* payment related information */
import { Actions } from 'react-native-router-flux';
import { PAYMENT_USER, PAYMENT_DETAILS_CHANGED, RESET_SHIP_ADDR, FETCH_PAYMENT_DETAILS_SUCCESS,
  SAVE_PAYMENT_DETAILS_SUCCESS, SAVE_PAYMENT_DETAILS_FAIL, PLACE_ORDER_SUCCESS, PLACE_ORDER_FAIL
 } from './types';
import { firebaseAuth, firebaseDatabase } from '../FirebaseConfig';
import { ERRMSG_PAYMENT_ADD_FAILED, ERRMSG_PLACE_ORDER_FAILED } from './errorMsgConstants';
import { SPACE } from './constants';

/* Assign all payment values to corresponding keys
* @parameter: prop, value
* @return : prop, value
*/
export const paymentDetailsChanged = ({ prop, value }) => {
  return {
    type: PAYMENT_DETAILS_CHANGED,
    payload: { prop, value }
  };
};

/* Checkout the cart
* @parameter:
* @return : PaymentForm
*/
export const checkout = () => {
  const { currentUser } = firebaseAuth;
  return (dispatch) => {
    if (currentUser === null) Actions.auth();
    else {
      firebaseDatabase.ref(`/checkout/${currentUser.uid}/`)
      .once('value').then(snapshot => {
          dispatch({ type: FETCH_PAYMENT_DETAILS_SUCCESS,
            shipAddresses: snapshot.val().shipAddresses,
            cards: snapshot.val().cards });
          //dispatch({ type: FETCH_CARDS_SUCCESS, cards: snapshot.val().cards });
      })
      .then(() => {
        dispatch({ type: PAYMENT_USER });
        Actions.payment();
      });
    }
  };
};

/* set address values to default
* @parameter:
* @return : PaymentForm
*/
export const resetShipAddrValues = () => {
  return (dispatch) => {
    dispatch({ type: RESET_SHIP_ADDR });
    //Actions.payment();
  };
};

/* insert payment details
* @parameter:
* @return : ReviewOrderForm
*/
export const reviewOrder = ({ shipAdrs, shipAddrIndex }) => {
  const { currentUser } = firebaseAuth;
  const shipAddresses = [];
  //Add the preffered shipping address column
  if (shipAddrIndex !== SPACE) {
    Object.values(shipAdrs).map((addr, ind) => {
      const address = {};
      address.fullName = addr.fullName;
      address.address = addr.address;
      if (ind === shipAddrIndex) address.prefShipAddr = true;
      else address.prefShipAddr = false;
      shipAddresses.push(address);
      return shipAddresses;
    });
  }
  return (dispatch) => {
    if (shipAddrIndex !== SPACE) {
      firebaseDatabase.ref(`/checkout/${currentUser.uid}/`).set({ shipAddresses })
      .then(() => {
        // Payment cards yet to implement
        firebaseDatabase.ref(`/checkout/${currentUser.uid}/`).update({ cards: shipAddresses })
        .then(() => {
          dispatch({ type: SAVE_PAYMENT_DETAILS_SUCCESS, shipAddresses, cards: shipAddresses });
          Actions.reviewOrder();
        })
        .catch(() => {
          dispatch({ type: SAVE_PAYMENT_DETAILS_FAIL, payload: ERRMSG_PAYMENT_ADD_FAILED });
        });
      })
      .catch(() => {
        dispatch({ type: SAVE_PAYMENT_DETAILS_FAIL, payload: ERRMSG_PAYMENT_ADD_FAILED });
      });
    }
  };
};

/* insert payment details and generate order
* @parameter:
* @return : ConfirmOrder
*/
export const placeOrder = ({ cartItems, shipAdrs, shipAddrIndex }) => {
  const { currentUser } = firebaseAuth;
  const shipAddresses = [];
  let perfAddr = {};
  //Add the preffered shipping address column
  if (shipAddrIndex !== SPACE) {
    Object.values(shipAdrs).map((addr, ind) => {
      const address = {};
      address.fullName = addr.fullName;
      address.address = addr.address;
      if (ind === shipAddrIndex) {
        address.prefShipAddr = true;
        perfAddr = address;
      } else address.prefShipAddr = false;
      shipAddresses.push(address);
      return shipAddresses;
    });
  } else {
    Object.values(shipAdrs).map((addr) => {
      if (addr.prefShipAddr) perfAddr = addr;
      return perfAddr;
    });
  }
  return (dispatch) => {
    const uniqueId = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5))
      .toUpperCase();
    const orderDetails = {
      perfAddr,
      cartItems
    };
    if (shipAddrIndex !== SPACE) {
      firebaseDatabase.ref(`/checkout/${currentUser.uid}/`).set({ shipAddresses })
      .then(() => {
        // Payment cards yet to implement
        firebaseDatabase.ref(`/checkout/${currentUser.uid}/`).update({ cards: shipAddresses })
        .then(() => {
          firebaseDatabase.ref(`/order/${currentUser.uid}/${uniqueId}/`).set({ orderDetails })
          .then(() => {
            dispatch({ type: PLACE_ORDER_SUCCESS, payload: uniqueId });
            firebaseDatabase.ref(`/cart/${currentUser.uid}`).delete();
          })
          .catch(() => {
            dispatch({ type: PLACE_ORDER_FAIL, payload: ERRMSG_PLACE_ORDER_FAILED });
          });
        })
        .catch(() => {
          dispatch({ type: SAVE_PAYMENT_DETAILS_FAIL, payload: ERRMSG_PAYMENT_ADD_FAILED });
        });
      })
      .catch(() => {
        dispatch({ type: SAVE_PAYMENT_DETAILS_FAIL, payload: ERRMSG_PAYMENT_ADD_FAILED });
      });
    } else {
      firebaseDatabase.ref(`/order/${currentUser.uid}/${uniqueId}/`).set({ orderDetails })
      .then(() => {
        dispatch({ type: PLACE_ORDER_SUCCESS, payload: uniqueId });
        firebaseDatabase.ref(`/cart/${currentUser.uid}/`).remove();
      })
      .catch(() => {
        dispatch({ type: PLACE_ORDER_FAIL, payload: ERRMSG_PLACE_ORDER_FAILED });
      });
    }
    Actions.placeOrder();
  };
};
