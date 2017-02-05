/* This file includes all auth action creaters */
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
//import Communications from 'react-native-communications';
import {
  USER_DETAILS_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  LOGOUT_USER
} from './types';
import {
  ERR_AUTH_FAILED,
  ERRCODE_EMAIL_INUSE,
  ERRMSG_EMAIL_INUSE,
  ERRCODE_INVALID_EMAIL,
  ERRMSG_INVALID_EMAIL,
  ERRCODE_WEAK_PASSWORD,
  ERRMSG_WEAK_PASSWORD,
  ERRCODE_USER_DISABLED,
  ERRMSG_USER_DISABLED,
  ERRCODE_USER_NOTFOUND,
  ERRMSG_USER_NOTFOUND,
  ERRCODE_WRONG_PASSWORD,
  ERRMSG_WRONG_PASSWORD,
  ERRMSG_SIGNUP_FAILED
} from './errorMsgConstants';
//import { EMAIL_SUBJECT, EMAIL_BODY } from './constants';

export const signIn = () => {
  return (dispatch) => {
    logInPage(dispatch);
    Actions.logIn();
  };
};

export const signUp = () => {
  return (dispatch) => {
    logInPage(dispatch);
    Actions.signUp();
  };
};
export const forgotPassword = () => {
  return () => {
    Actions.forgotPassword();
  };
};

const logInPage = (dispatch) => {
  dispatch({ type: LOGOUT_USER });
};

export const userDetailsChanged = ({ prop, value }) => {
  return {
    type: USER_DETAILS_CHANGED,
    payload: { prop, value }
  };
};

/* log into user account
* @parameter: email and password
* @return : SellerProfileForm
*/
export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch((error) => {
        handleSignInErrorMessages(dispatch, error.code);
    });
  };
};

const loginUserFail = (dispatch, text) => {
  dispatch({
    type: LOGIN_USER_FAIL,
    payload: text
  });
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });

  Actions.seller();
};

/* Register new account
* @parameter: AllUserDetails
* @return : SellerProfileForm
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
  phoneNum
}) => {
  console.log('fullName ', fullName, 'addrStreet', addrStreet, 'addrApt', addrApt, 'state', state,
  'city', city, 'zip', zip, 'phoneNum', phoneNum);
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        const { currentUser } = firebase.auth();
        const address = `${addrStreet},${addrApt},${city},${state},${zip}`;
        firebase.database().ref(`/users/${currentUser.uid}/`)
          .push({ fullName, companyName, address, phoneNum })
          .then(() => {
            loginUserSuccess(dispatch, user);
          })
          .catch(() => {
            firebase.database().ref(`/users/${currentUser.uid}/`)
            .remove()
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
    firebase.auth().signOut()
    .then(() => {
      dispatch({ type: LOGOUT_USER });
      Actions.auth();
    })
    .catch((error) => console.log(error));
  };
};

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
    default:
      errorMsg = ERR_AUTH_FAILED;
    }
    loginUserFail(dispatch, errorMsg);
};

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
      errorMsg = ERR_AUTH_FAILED;
    }
    loginUserFail(dispatch, errorMsg);
};
