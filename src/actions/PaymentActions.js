/* payment related information */
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
/*import { email } from 'react-native-communications';
import Mailer from 'react-native-mail';*/
import { PAYMENT_USER, PAYMENT_DETAILS_CHANGED, RESET_SHIP_ADDR, FETCH_PAYMENT_DETAILS_SUCCESS,
  SAVE_PAYMENT_DETAILS_SUCCESS, SAVE_PAYMENT_DETAILS_FAIL, PLACE_ORDER_SUCCESS, PLACE_ORDER_FAIL,
  CART_DELETE_FAIL } from './types';
import { firebaseAuth, firebaseDatabase } from '../FirebaseConfig';
import { ERRMSG_PAYMENT_ADD_FAILED, ERRMSG_PLACE_ORDER_FAILED, ERRMSG_CART_DELETE_FAILED }
 from './errorMsgConstants';
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
  let prefAddr = {};
  //Add the preffered shipping address column
  if (shipAddrIndex !== SPACE) {
    Object.values(shipAdrs).map((addr, ind) => {
      const address = {};
      address.fullName = addr.fullName;
      address.address = addr.address;
      if (ind === shipAddrIndex) {
        address.prefShipAddr = true;
        prefAddr = address;
      } else address.prefShipAddr = false;
      shipAddresses.push(address);
      return shipAddresses;
    });
  } else {
    Object.values(shipAdrs).map((addr) => {
      if (addr.prefShipAddr) prefAddr = addr;
      return prefAddr;
    });
  }
  return (dispatch) => {
    const uniqueId = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5))
      .toUpperCase();
    const orderDetails = {
      createdAt: new Date().toString(),
      prefAddr,
      cartItems
    };
    console.log('orderDetails ', orderDetails);
    if (shipAddrIndex !== SPACE) {
      firebaseDatabase.ref(`/checkout/${currentUser.uid}/`).set({ shipAddresses })
      .then(() => {
        // Payment cards yet to implement
        firebaseDatabase.ref(`/checkout/${currentUser.uid}/`).update({ cards: shipAddresses })
        .then(() => {
          firebaseDatabase.ref(`/order/${currentUser.uid}/${uniqueId}/`).set({ orderDetails })
          .then(() => {
            dispatch({ type: PLACE_ORDER_SUCCESS, payload: uniqueId });
            firebaseDatabase.ref(`/cart/${currentUser.uid}/`).remove()
            .then(async() => await AsyncStorage.removeItem('addToCart'))
            .catch(() => {
              dispatch({ type: CART_DELETE_FAIL, payload: ERRMSG_CART_DELETE_FAILED });
            });
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
      console.log('orderDetailsinelse ', orderDetails);
      firebaseDatabase.ref(`/order/${currentUser.uid}/${uniqueId}/`).set({ orderDetails })
      .then(() => {
        dispatch({ type: PLACE_ORDER_SUCCESS, payload: uniqueId });
        const urls = [];
        Object.values(cartItems).map((cartItem) => {
          urls.push(cartItem.url);
          return cartItems;
        });
        /*console.log('urls ', urls);
        const body = (`Order id is ${uniqueId}\n${urls}`);
        email(['divya.mini4u@gmail.com'], null, null, `Order ${uniqueId}`, body);
        Mailer.mail({
     subject: `Order id ${uniqueId}`,
     recipients: ['divya.mini4u@gmail.com'],
     ccRecipients: null,
     bccRecipients: null,
     body,
     isHTML: true,
     attachment: {
       path: '',  // The absolute path of the file from which to read data.
       type: '',   // Mime Type: jpg, png, doc, ppt, html, pdf
       name: '',   // Optional: Custom filename for attachment
     }
   }, (error) => {
       console.log('error is ', error);
   });*/
        firebaseDatabase.ref(`/cart/${currentUser.uid}/`).remove()
        .then(async() => await AsyncStorage.removeItem('addToCart'))
        .catch(() => {
          dispatch({ type: CART_DELETE_FAIL, payload: ERRMSG_CART_DELETE_FAILED });
        });
      })
      .catch(() => {
        dispatch({ type: PLACE_ORDER_FAIL, payload: ERRMSG_PLACE_ORDER_FAILED });
      });
    }
    Actions.placeOrder();
  };
};
