/* This file includes all auth action creators */
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
//import Communications from 'react-native-communications';
import { firebaseDatabase, firebaseAuth } from '../FirebaseConfig';
import { USER_DETAILS_CHANGED, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER,
  LOGOUT_USER, PASSWORD_RESET_SUCCESS, PASSWORD_RESET_FAIL, USER_FETCH_SUCCESS
} from './types';
import { ERRMSG_AUTH_FAILED, ERRCODE_EMAIL_INUSE, ERRMSG_EMAIL_INUSE, ERRCODE_INVALID_EMAIL,
  ERRMSG_INVALID_EMAIL, ERRCODE_WEAK_PASSWORD, ERRMSG_WEAK_PASSWORD, ERRCODE_USER_DISABLED,
  ERRMSG_USER_DISABLED, ERRCODE_USER_NOTFOUND, ERRMSG_USER_NOTFOUND, ERRCODE_WRONG_PASSWORD,
  ERRMSG_WRONG_PASSWORD, ERRMSG_SIGNUP_FAILED, ERRMSG_PASSWORD_RESET_FAILED, ERRCODE_NETWORK_ERROR,
  ERRMSG_NETWEORK_ERROR
} from './errorMsgConstants';
import { getAllSellers } from './ProductActions';
import { addCartItems } from './CartActions';

/* Sign in page
* @parameter
* @return : login form
*/
export const signIn = () => {
  return (dispatch) => {
    logInPage(dispatch);
    Actions.logIn();
  };
};

/* Sign up page
* @parameter
* @return : register form
*/
export const signUp = () => {
  return (dispatch) => {
    logInPage(dispatch);
    Actions.signUp();
  };
};

/* Password reset
* @parameter: email
* @return : OTPForm
*/
export const passwordReset = ({ email }) => {
  return (dispatch) => {
    firebaseAuth.sendPasswordResetEmail(email)
    .then(() => {
      dispatch({
        type: PASSWORD_RESET_SUCCESS
      });
      Actions.logIn();
    })
    .catch((error) => {
      handleForgotPasswordErrorMessages(dispatch, error.code);
    });
  };
};

// move to login or register page
const logInPage = (dispatch) => {
  dispatch({ type: LOGOUT_USER });
};

/* Assign all auth values to corresponding keys
* @parameter: prop, value
* @return : prop, value
*/
export const userDetailsChanged = ({ prop, value }) => {
  return {
    type: USER_DETAILS_CHANGED,
    payload: { prop, value }
  };
};

/* log into user account
* @parameter: email and password
* @return : SellerProfileForm/BuyerProductList
*/
export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch((error) => {
        handleSignInErrorMessages(dispatch, error.code);
    });
  };
};

// User login fail
const loginUserFail = (dispatch, text) => {
  dispatch({
    type: LOGIN_USER_FAIL,
    payload: text
  });
};

// User login success
const loginUserSuccess = async (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
  //get the cart items from session and add it into db
  addCartItems(dispatch);
  dispatch(userProfileInfo());
};

// Password reset fail
const passwordResetFail = (dispatch, text) => {
  dispatch({
    type: PASSWORD_RESET_FAIL,
    payload: text
  });
};

/* Register new account
* @parameter: AllUserDetails
* @return : SellerProfileForm/BuyerProductList
*/
export const createUserAccount = ({ fullName,
  email,
  password,
  companyName,
  addrStreet,
  addrApt,
  state,
  city,
  zip,
  phoneNum,
  drLicense,
  isBuyer
}) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
      firebaseAuth.createUserWithEmailAndPassword(email, password)
       .then((user) => {
         const { currentUser } = firebaseAuth;
         const address = `${addrStreet},${addrApt},${city},${state},${zip}`;
         firebaseDatabase.ref(`/users/${currentUser.uid}/`)
           .set({ fullName, companyName, address, phoneNum, drLicense, isBuyer })
           .then(() => {
             loginUserSuccess(dispatch, user);
           })
           .catch(() => {
             firebaseAuth.currentUser.delete()
             .then(() => {
               loginUserFail(dispatch, ERRMSG_SIGNUP_FAILED);
             })
             .catch(() => {
               loginUserFail(dispatch, ERRMSG_SIGNUP_FAILED);
             });
           });
         })
       .catch((error) => {
         handleSignUpErrorMessages(dispatch, error.code);
       });
  };
};

/* User logout
* @parameter:
* @return : Home page
*/
export const logOut = () => {
  return (dispatch) => {
    firebaseAuth.signOut()
    .then(async () => {
      await AsyncStorage.removeItem('addToCart');
      dispatch({ type: LOGOUT_USER });
      Actions.auth({ type: 'reset' });
    })
    .catch((error) => console.log(error));
  };
};

/* Buyer login
* @return : BuyerProductList
*/
export const buyerLogin = () => {
  return (dispatch) => {
    /*dispatch({ type: BUYER_LOGIN });
    Actions.buyerMenu();*/
    dispatch(getAllSellers());
  };
};

// User sign in error messages
const handleSignInErrorMessages = (dispatch, errorCode) => {
  let errorMsg;
  switch (errorCode) {
    case ERRCODE_INVALID_EMAIL:
      errorMsg = ERRMSG_INVALID_EMAIL;
      break;
    case ERRCODE_USER_DISABLED:
      errorMsg = ERRMSG_USER_DISABLED;
      break;
    case ERRCODE_USER_NOTFOUND:
      errorMsg = ERRMSG_USER_NOTFOUND;
      break;
    case ERRCODE_WRONG_PASSWORD:
      errorMsg = ERRMSG_WRONG_PASSWORD;
      break;
    case ERRCODE_NETWORK_ERROR:
      errorMsg = ERRMSG_NETWEORK_ERROR;
      break;
    default:
      errorMsg = ERRMSG_AUTH_FAILED;
    }
    loginUserFail(dispatch, errorMsg);
};

// User sign up error messages
const handleSignUpErrorMessages = (dispatch, errorCode) => {
  let errorMsg;
  switch (errorCode) {
    case ERRCODE_EMAIL_INUSE:
      errorMsg = ERRMSG_EMAIL_INUSE;
      break;
    case ERRCODE_INVALID_EMAIL:
      errorMsg = ERRMSG_INVALID_EMAIL;
      break;
    case ERRCODE_WEAK_PASSWORD:
      errorMsg = ERRMSG_WEAK_PASSWORD;
      break;
    default:
      errorMsg = ERRMSG_AUTH_FAILED;
    }
    loginUserFail(dispatch, errorMsg);
};

// Forgot password error messages
const handleForgotPasswordErrorMessages = (dispatch, errorCode) => {
  let errorMsg;
  switch (errorCode) {
    case ERRCODE_INVALID_EMAIL:
      errorMsg = ERRMSG_INVALID_EMAIL;
      break;
    case ERRCODE_USER_NOTFOUND:
      errorMsg = ERRMSG_USER_NOTFOUND;
      break;
    default:
      errorMsg = ERRMSG_PASSWORD_RESET_FAILED;
    }
    passwordResetFail(dispatch, errorMsg);
};

/* Fetch user profile info
* @return : SellerProfileForm/BuyerProductList
*/
export const userProfileInfo = () => {
  const { currentUser } = firebaseAuth;
  return (dispatch) => {
    let userProfile = null;
    firebaseDatabase.ref(`/users/${currentUser.uid}/`)
    .on('value', snapshot => {
      userProfile = snapshot.val();
      dispatch({ type: USER_FETCH_SUCCESS, payload: snapshot.val() });
      if (userProfile.isBuyer) dispatch(getAllSellers());
      else Actions.sellerMenu();
    });
  };
};
