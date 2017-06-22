/* payment related information */
import { Actions } from 'react-native-router-flux';
import { PAYMENT_USER, PAYMENT_DETAILS_CHANGED } from './types';
import { firebaseAuth } from '../FirebaseConfig';

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
* @return : BillingForm
*/
export const checkout = () => {
  const { currentUser } = firebaseAuth;
  return (dispatch) => {
    if (currentUser === null) Actions.auth();
    else {
      dispatch({ type: PAYMENT_USER });
      Actions.payment();
    }
  };
};
