/* add products to the cart */
//import { Actions } from 'react-native-router-flux';
//import { firebaseDatabase, firebaseAuth, firebaseStorage } from '../FirebaseConfig';

/* add product to cart
* @parameter: imageURL, productName, daysOfRent, rentExpected
* @return : CartForm
*/
export const addToCart = ({ product }) => {
  return () => {
    console.log('product is ', product, { product });
  };
};
