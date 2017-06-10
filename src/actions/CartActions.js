/* add products to the cart */
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CARTITEMS_FETCH_SUCCESS, ADD_CART_SUCCESS, ADD_CART_FAIL } from './types';
import { ERRMSG_CART_ADD_FAILED } from './errorMsgConstants';
import { firebaseDatabase, firebaseAuth } from '../FirebaseConfig';

/* add product to cart
* @parameter:
* @return : CartForm
*/
export const addToCart = () => {
  return async (dispatch) => {
    const cartItems = JSON.parse(await AsyncStorage.getItem('addToCart'));
    const { currentUser } = firebaseAuth;
    if (currentUser !== null) {
      firebaseDatabase.ref(`/cart/${currentUser.uid}/`).set({ cartItems })
      .then(() => {
        dispatch({ type: ADD_CART_SUCCESS, payload: cartItems });
      })
      .catch(() => {
        dispatch({ type: ADD_CART_FAIL, payload: ERRMSG_CART_ADD_FAILED });
      });
    }
    dispatch({ type: CARTITEMS_FETCH_SUCCESS, payload: cartItems });
    Actions.cart();
  };
};

// When the user logged in add the session items to db
export const addCartItems = async (dispatch) => {
  const cartItems = JSON.parse(await AsyncStorage.getItem('addToCart'));
  const { currentUser } = firebaseAuth;
  if (currentUser !== null) {
    firebaseDatabase.ref(`/cart/${currentUser.uid}/cartItems`)
    .on('value', snapshot => {
      setTimeout(async () => {
        if (snapshot.val() === null) {
          firebaseDatabase.ref(`/cart/${currentUser.uid}/`).set({ cartItems })
            .then(() => {
              dispatch({ type: ADD_CART_SUCCESS, payload: cartItems });
            })
            .catch(() => {
              dispatch({ type: ADD_CART_FAIL, payload: ERRMSG_CART_ADD_FAILED });
            });
          }
        }, 0);
      });
  }
  dispatch({ type: CARTITEMS_FETCH_SUCCESS, payload: cartItems });
};

/* get the products in cart
* @parameter:
* @return : CartForm
*/
export const getCart = () => {
  return async (dispatch) => {
    const cartItems = JSON.parse(await AsyncStorage.getItem('addToCart'));
    const { currentUser } = firebaseAuth;
    //If the user logged in get it from db
    if (currentUser !== null) {
      firebaseDatabase.ref(`/cart/${currentUser.uid}/cartItems`)
      .on('value', snapshot => {
        setTimeout(async () => {
          await AsyncStorage.setItem('addToCart', JSON.stringify(snapshot.val()));
          dispatch({ type: CARTITEMS_FETCH_SUCCESS, payload: snapshot.val() });
        }, 0);
      });
    } else dispatch({ type: CARTITEMS_FETCH_SUCCESS, payload: cartItems });
    Actions.cart();
  };
};
