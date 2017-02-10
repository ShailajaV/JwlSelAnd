/* This file includes all image related action creators */
import firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob';
import { Actions } from 'react-native-router-flux';
import { SELLER_SAVE_SUCCESS, SELLER_SAVE_FAIL } from '../types';
import { ERRMSG_PROFILE_IMAGE_FAILED, ERR_STORAGE_UNAUTH, ERRMSG_STRG_UNAUTH, ERR_STRG_UNAUTHORIZED,
  ERRMSG_STRG_UNAUTHORIZED, ERR_STRG_LIMIT_EXCEED, ERRMSG_STRG_LIMIT_EXCEED,
  ERR_STRG_INV_CHECKSUM, ERRMSG_STRG_INV_CHECKSUM, ERR_STRG_CANCELLED, ERRMSG_STRG_CANCELLED,
  ERR_STRG_INV_ARG, ERRMSG_STRG_INV_ARG, ERR_STRG_CANT_SLICE_BLOB, ERRMSG_STRG_CANT_SLICE_BLOB,
  ERR_STRG_FILESIZE, ERRMSG_STRG_FILESIZE } from '../errorMsgConstants';
import { SELLER_ACCOUNT_SETTINGS } from '../constants';

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

/* save image into firebase storage
* @parameter: uri, imageRef, callingScreen
* @return : ProductForm
*/
export const saveProfileImage = (uri, imageRef, callingScreen,
  mime = 'application/octet-stream') => {
  return (dispatch) => {
      let uploadBlob = null;
      const imageReference = firebase.storage().ref(imageRef);

      fs.readFile(uri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` });
      })
      .then((blob) => {
        uploadBlob = blob;
        return imageReference.put(blob, { contentType: mime });
      })
      .then(() => {
        uploadBlob.close();
        saveUserProfileSuccess(dispatch, callingScreen);
         Actions.product();
        return imageReference.getDownloadURL();
      })
      .catch((error) => {
        handleImgErrorMessages(dispatch, error.code, callingScreen);
      });
  };
};

/* delete image from firebase storage
* @parameter: imageRef, callingScreen
* @return : ProductForm
*/
export const deleteProfileImage = (imageRef, callingScreen) => {
  return (dispatch) => {
    firebase.storage().ref(imageRef)
    .delete()
    .then(() => {
      saveUserProfileSuccess(dispatch, callingScreen);
       Actions.product();
    })
    .catch((error) => {
      handleImgErrorMessages(dispatch, error.code, callingScreen);
    });
  };
};

// Handle profile image error messages
const handleImgErrorMessages = (dispatch, errorCode, callingScreen) => {
  let errorMsg;
  switch (errorCode) {
    case ERR_STORAGE_UNAUTH:
      errorMsg = ERRMSG_STRG_UNAUTH;
      break;
    case ERR_STRG_UNAUTHORIZED:
      errorMsg = ERRMSG_STRG_UNAUTHORIZED;
      break;
    case ERR_STRG_LIMIT_EXCEED:
      errorMsg = ERRMSG_STRG_LIMIT_EXCEED;
      break;
    case ERR_STRG_INV_CHECKSUM:
      errorMsg = ERRMSG_STRG_INV_CHECKSUM;
      break;
    case ERR_STRG_CANCELLED:
      errorMsg = ERRMSG_STRG_CANCELLED;
      break;
    case ERR_STRG_INV_ARG:
      errorMsg = ERRMSG_STRG_INV_ARG;
      break;
    case ERR_STRG_CANT_SLICE_BLOB:
      errorMsg = ERRMSG_STRG_CANT_SLICE_BLOB;
      break;
    case ERR_STRG_FILESIZE:
      errorMsg = ERRMSG_STRG_FILESIZE;
      break;
    default:
      errorMsg = ERRMSG_PROFILE_IMAGE_FAILED;
    }
    handleFail(dispatch, errorMsg, callingScreen);
};

// Save user profile fail
const handleFail = (dispatch, text, callingScreen) => {
  let dispatchType = '';
  switch (callingScreen) {
    case SELLER_ACCOUNT_SETTINGS:
      dispatchType = SELLER_SAVE_FAIL;
      break;
    default:
      dispatchType = '';
  }
  dispatch({
    type: dispatchType,
    payload: text
  });
};

//Save user profile success
const saveUserProfileSuccess = (dispatch, callingScreen) => {
  let dispatchType = '';
  switch (callingScreen) {
    case SELLER_ACCOUNT_SETTINGS:
      dispatchType = SELLER_SAVE_SUCCESS;
      break;
    default:
      dispatchType = '';
  }
  dispatch({ type: dispatchType });
};
