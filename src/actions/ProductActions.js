/* This file includes all product details action creators */
import RNFetchBlob from 'react-native-fetch-blob';
import { Actions } from 'react-native-router-flux';
import { firebaseDatabase, firebaseAuth, firebaseStorage } from '../FirebaseConfig';
import { PRODUCT_DETAILS_CHANGED, PRODUCT_SAVE_FAIL, PRODUCTSLIST_FETCH_SUCCESS,
  PRODUCT_SAVE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_SAVE, PRODUCT_SUBMIT,
  SELLERS_FETCH_SUCCESS, SELECTED_SELLER_SUCCESS } from './types';
import { PRODUCT_DETAILS_ADDMORE, PRODUCT_DETAILS_SUBMIT,
  PRODUCT_DETAILS_EDIT, PRODUCT_DETAILS_DELETE } from './constants';
import { ERRMSG_PROFILE_IMAGE_FAILED, ERR_STORAGE_UNAUTH, ERRMSG_STRG_UNAUTH, ERR_STRG_UNAUTHORIZED,
  ERRMSG_STRG_UNAUTHORIZED, ERR_STRG_LIMIT_EXCEED, ERRMSG_STRG_LIMIT_EXCEED,
  ERR_STRG_INV_CHECKSUM, ERRMSG_STRG_INV_CHECKSUM, ERR_STRG_CANCELLED, ERRMSG_STRG_CANCELLED,
  ERR_STRG_INV_ARG, ERRMSG_STRG_INV_ARG, ERR_STRG_CANT_SLICE_BLOB, ERRMSG_STRG_CANT_SLICE_BLOB,
  ERR_STRG_FILESIZE, ERRMSG_STRG_FILESIZE,
  ERRMSG_PRODUCT_DETAILS_FAILED, ERRMSG_PRODUCT_DELETE_FAILED } from './errorMsgConstants';
import { deleteImage } from './common/ImgOperations';

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;
/* Assign all product values to corresponding keys
* @parameter: prop, value
* @return : prop, value
*/
export const productDetailsChanged = ({ prop, value }) => {
  return {
      type: PRODUCT_DETAILS_CHANGED,
      payload: { prop, value }
  };
};

/* Save product details
* @parameter: imageURL, productName, daysOfRent, rentExpected
* @return : productForm/RentedJewelleryForm
*/
export const productCreate = ({ uploadURL, productName, daysOfRent,
  rentExpected, shippingCost, estTax, quantity, onSubmit }) => {
  return (dispatch) => {
    const { uri } = uploadURL;
    if (onSubmit) {
      dispatch({ type: PRODUCT_SUBMIT });
      dispatch(saveProductDetails(dispatch, uri, productName, daysOfRent,
        rentExpected, shippingCost, estTax, quantity, null, PRODUCT_DETAILS_SUBMIT));
    } else {
      dispatch({ type: PRODUCT_SAVE });
      dispatch(saveProductDetails(dispatch, uri, productName, daysOfRent,
        rentExpected, shippingCost, estTax, quantity, null, PRODUCT_DETAILS_ADDMORE));
    }
  };
};

/* Fetch product details
* @return : productForm/RentedJewelleryForm
*/
export const getProductsDetails = (id, companyName) => {
  const { currentUser } = firebaseAuth;
  return (dispatch) => {
    const selectedSeller = {
      sellerId: id,
      sellerCompanyName: companyName
    };
    dispatch({ type: SELECTED_SELLER_SUCCESS, payload: selectedSeller });
    let dbRef = '';
    if (id !== null) dbRef = firebaseDatabase.ref(`/products/${id}`);
    else dbRef = firebaseDatabase.ref(`/products/${currentUser.uid}`);
    dbRef.on('value', snapshot => {
      dispatch({ type: PRODUCTSLIST_FETCH_SUCCESS, payload: snapshot.val() });
      if (id !== null) Actions.buyerProductsList();
    });
  };
};

/* save product image and details into firebase storage
* @parameter: uri, productName, daysOfRent, rentExpected, callingScreen
* @return : ProductForm
*/
const saveProductDetails = (dispatch, uri, productName, daysOfRent,
  rentExpected, shippingCost, estTax, quantity, uid, callingScreen,
  mime = 'application/octet-stream') => {
  const { currentUser } = firebaseAuth;
  return () => {
    const imageRef = `/images/products/${currentUser.uid}/${productName}`;
    let uploadBlob = null;
    const imageReference = firebaseStorage.ref(imageRef);

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
      return imageReference.getDownloadURL();
    })
    .then((url) => {
      if (callingScreen === PRODUCT_DETAILS_EDIT) {
        firebaseDatabase.ref(`/products/${currentUser.uid}/${uid}`)
        .set({ productName,
          daysOfRent: parseFloat(daysOfRent),
          rentExpected: parseFloat(rentExpected),
          shippingCost: parseFloat(shippingCost),
          estTax: parseFloat(estTax),
          quantity: parseInt(quantity, 10),
          url })
        .then(() => {
          handleSuccess(dispatch, callingScreen);
        })
        .catch(() => {
          dispatch({ type: PRODUCT_SAVE_FAIL, payload: ERRMSG_PRODUCT_DETAILS_FAILED });
        });
      } else {
        firebaseDatabase.ref(`/products/${currentUser.uid}`)
        .push({ productName,
          daysOfRent: parseFloat(daysOfRent),
          rentExpected: parseFloat(rentExpected),
          shippingCost: parseFloat(shippingCost),
          estTax: parseFloat(estTax),
          quantity: parseInt(quantity, 10),
          url })
        .then(() => {
          handleSuccess(dispatch, callingScreen);
        })
        .catch(() => {
          dispatch({ type: PRODUCT_SAVE_FAIL, payload: ERRMSG_PRODUCT_DETAILS_FAILED });
        });
      }
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

// handle fail
const handleFail = (dispatch, text, callingScreen) => {
  let dispatchType = '';
  switch (callingScreen) {
    case PRODUCT_DETAILS_ADDMORE:
    case PRODUCT_DETAILS_SUBMIT:
    case PRODUCT_DETAILS_EDIT:
      dispatchType = PRODUCT_SAVE_FAIL;
      break;
    default:
      dispatchType = '';
  }
  dispatch({
    type: dispatchType,
    payload: text
  });
};

// handle success
const handleSuccess = (dispatch, callingScreen) => {
  let dispatchType = '';
  switch (callingScreen) {
    case PRODUCT_DETAILS_ADDMORE:
      dispatchType = PRODUCT_SAVE_SUCCESS;
      Actions.productDetails({ type: 'reset' });
      break;
    case PRODUCT_DETAILS_SUBMIT:
    case PRODUCT_DETAILS_EDIT:
      dispatchType = PRODUCT_SAVE_SUCCESS;
      Actions.productsList({ type: 'reset' });
      break;
    default:
      dispatchType = '';
  }
  dispatch({ type: dispatchType });
};

/* update product details
* @parameter: uploadURL, productName, daysOfRent, rentExpected
* @return : productForm/ProductListForm
*/
export const productUpdate = ({ productName, daysOfRent,
  rentExpected, shippingCost, estTax, quantity, url, uploadURL, uid }) => {
  const { currentUser } = firebaseAuth;
  return (dispatch) => {
    dispatch({ type: PRODUCT_SAVE });
    if (uploadURL !== null && uploadURL !== '') {
      const { uri } = uploadURL;
      dispatch(saveProductDetails(dispatch, uri, productName, daysOfRent,
            rentExpected, shippingCost, estTax, quantity, uid, PRODUCT_DETAILS_EDIT));
    } else {
      firebaseDatabase.ref(`/products/${currentUser.uid}/${uid}`)
      .set({ productName, daysOfRent, rentExpected, shippingCost, estTax, quantity, url })
      .then(() => {
        handleSuccess(dispatch, PRODUCT_DETAILS_EDIT);
      })
      .catch(() => {
        dispatch({ type: PRODUCT_SAVE_FAIL, payload: ERRMSG_PRODUCT_DETAILS_FAILED });
      });
    }
  };
};

/* Delete product details from firebase storage
* @parameter: uid, productName
* @return : ProductList
*/
export const productDelete = ({ uid, productName }) => {
  const { currentUser } = firebaseAuth;
  return (dispatch) => {
    firebaseDatabase.ref(`/products/${currentUser.uid}/${uid}`)
    .remove()
    .then(() => {
      const imageRef = `/images/products/${currentUser.uid}/${productName}`;
      dispatch(deleteImage(imageRef, PRODUCT_DETAILS_DELETE));
    })
    .catch(() => {
      dispatch({
        type: PRODUCT_DELETE_FAIL,
        payload: ERRMSG_PRODUCT_DELETE_FAILED
      });
    });
  };
};


/* Fetch seller profile info for buyer
* @return : sellersList
*/
export const getAllSellers = () => {
  return (dispatch) => {
    firebaseDatabase.ref('users')
    .orderByChild('isBuyer').equalTo(false)
    .on('value', snapshot => {
      dispatch({ type: SELLERS_FETCH_SUCCESS, payload: snapshot.val() });
      Actions.buyerMenu();
    });
  };
};

/* Fetch all product details
* @return : productForm/RentedJewelleryForm

export const getAllProductDetails = () => {
  return (dispatch) => {
    firebaseDatabase.ref('products')
    .on('value', snapshot => {
      dispatch({ type: PRODUCTSLIST_FETCH_SUCCESS, payload: snapshot.val() });
    });
  };
};*/
