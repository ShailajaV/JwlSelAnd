/* add products to the cart */
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CARTITEMS_FETCH_SUCCESS } from './types';

//import { firebaseDatabase, firebaseAuth, firebaseStorage } from '../FirebaseConfig';

/* add product to cart
* @parameter:
* @return : CartForm
*/
export const addToCart = () => {
  return async (dispatch) => {
    const cartItems = JSON.parse(await AsyncStorage.getItem('addToCart'));
    dispatch({ type: CARTITEMS_FETCH_SUCCESS, payload: cartItems });
    Actions.cart();
  };
};
