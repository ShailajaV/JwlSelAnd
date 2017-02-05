/* This file includes all seller profile action creaters */
import firebase from 'firebase';
import { Platform } from 'react-native'
;import { Actions } from 'react-native-router-flux';
import RNFetchBlob from 'react-native-fetch-blob';
import { SELLER_PROFILE_CHANGED, SELLER_FETCH_SUCCESS,
  SELLER_SAVE_SUCCESS, SELLER_SAVE_FAIL } from './types';
import { ERRMSG_SELLER_PROFILE_FAILED, ERRMSG_IMAGE_UPLOAD_FAILED } from './errorMsgConstants';

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;


export const sellerProfileChanged = ({ prop, value }) => {
  return {
    type: SELLER_PROFILE_CHANGED,
    payload: { prop, value }
  };
};

export const sellerProfileInfo = () => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/`)
    .on('value', snapshot => {
      dispatch({ type: SELLER_FETCH_SUCCESS, payload: snapshot.val() });
    });
  };
};

export const saveSellerProfile = ({ image, fullName, companyName, address, uid }) => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    console.log(`/users/${currentUser.uid}/${uid}`);
    firebase.database().ref(`/users/${currentUser.uid}/${uid}`)
    .set({ fullName, companyName, address })
    .then((user) => {
      uploadImageSave(dispatch, image, currentUser, uid);
      saveUserProfileSuccess(dispatch, user);
    })
    .catch(() => {
      saveUserProfileFail(dispatch, ERRMSG_SELLER_PROFILE_FAILED);
    });
  };
};

const saveUserProfileSuccess = (dispatch, user) => {
  dispatch({
    type: SELLER_SAVE_SUCCESS,
    payload: user
  });

  Actions.product();
};

const saveUserProfileFail = (dispatch, text) => {
  dispatch({
    type: SELLER_SAVE_FAIL,
    payload: text
  });
};

const uploadImageSave = (dispatch, uri, currentUser, uid, mime = 'application/octet-stream') => {
  console.log(`/uri/currentUser/uid... , ${uri}, ${currentUser.uid}, ${uid}`);
  return new Promise((resolve, reject) => {
    //const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      //const sessionId = new Date().getTime();
      let uploadBlob = null;
      const imageRef = firebase.storage().ref(`${currentUser.uid}/images`).child(`${uid}`);

      fs.readFile(uri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` });
      })
      .then((blob) => {
        uploadBlob = blob;
        return imageRef.put(blob, { contentType: mime });
      })
      .then(() => {
        console.log('imagerefb ', imageRef.getDownloadURL());
        uploadBlob.close();
        console.log('imagerefa ', imageRef.getDownloadURL());
        return imageRef.getDownloadURL();
      })
      .then((url) => {
        console.log('url ', url);
        resolve(url);
      })
      .catch((error) => {
        saveUserProfileFail(dispatch, ERRMSG_IMAGE_UPLOAD_FAILED);
        reject(error);
      });
  });
};

export const uploadImage = (uri, mime = 'application/octet-stream') => {
  return new Promise((resolve, reject) => {
    console.log('uri ui ', uri);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      const currentUser = firebase.auth();
      //const sessionId = new Date().getTime();
      let uploadBlob = null;
      const imageRef = firebase.storage().ref(`/users/${currentUser.uid}/images/`);

      fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` });
      })
      .then((blob) => {
        uploadBlob = blob;
        return imageRef.put(blob, { contentType: mime });
      })
      .then(() => {
        uploadBlob.close();
        return imageRef.getDownloadURL();
      })
      .then((url) => {
          console.log('final url ', url);
        resolve(url);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Redirect to product details page
export const landProductForm = () => {
    Actions.product();
};
