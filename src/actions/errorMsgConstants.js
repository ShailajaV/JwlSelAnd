/* error related message constants */
//Auth error messages
export const ERRMSG_AUTH_FAILED = 'Authentication Failed.';
export const ERRCODE_EMAIL_INUSE = 'auth/email-already-in-use';
export const ERRMSG_EMAIL_INUSE = 'Email id is already exists.';
export const ERRCODE_INVALID_EMAIL = 'auth/invalid-email';
export const ERRMSG_INVALID_EMAIL = 'Email address is not valid.';
export const ERRCODE_WEAK_PASSWORD = 'auth/weak-password';
export const ERRMSG_WEAK_PASSWORD = 'Password is not strong enough.';

export const ERRCODE_USER_DISABLED = 'auth/user-disabled';
export const ERRMSG_USER_DISABLED = 'Email address has been disabled.';
export const ERRCODE_USER_NOTFOUND = 'auth/user-not-found';
export const ERRMSG_USER_NOTFOUND = 'No account found with that email address';
export const ERRCODE_WRONG_PASSWORD = 'auth/wrong-password';
export const ERRMSG_WRONG_PASSWORD = 'Password is invalid.';
export const ERRCODE_NETWORK_ERROR = 'auth/network-request-failed';
export const ERRMSG_NETWEORK_ERROR = 'Network error. Please try again after sometime.';
export const ERRMSG_SIGNUP_FAILED = 'creation failed.!!!';

export const ERRMSG_PASSWORD_RESET_FAILED = 'Failed to reset the password. Please try again.';

// Selelr error messages
export const ERRMSG_SELLER_PROFILE_FAILED = 'User profile information save failed.';
export const ERRMSG_PROFILE_IMAGE_FAILED = 'Profile image upload/delete failed. Please try again.';
export const ERR_STRG_OBJ_NOTFOUND = 'storage/object-not-found';
export const ERRMSG_STRG_OBJ_NOTFOUND = 'image not found';
export const ERR_STORAGE_UNAUTH = 'storage/unauthenticated';
export const ERRMSG_STRG_UNAUTH = 'User is unauthenticated, please authenticate and try again.';
export const ERR_STRG_UNAUTHORIZED = 'storage/unauthorized';
export const ERRMSG_STRG_UNAUTHORIZED =
  'User is not authorized to perform the desired action, check your security rules.';
export const ERR_STRG_LIMIT_EXCEED = 'storage/retry-limit-exceeded';
export const ERRMSG_STRG_LIMIT_EXCEED =
  'The maximum time limit on an operation has been excceded. Try uploading again.';
export const ERR_STRG_INV_CHECKSUM = 'storage/invalid-checksum';
export const ERRMSG_STRG_INV_CHECKSUM =
  'Checksum of the file does not match on client and server. Try uploading again.';
export const ERR_STRG_CANCELLED = 'storage/canceled';
export const ERRMSG_STRG_CANCELLED = 'User canceled the operation.';
export const ERR_STRG_INV_ARG = 'storage/invalid-argument';
export const ERRMSG_STRG_INV_ARG =
  'The uploaded file must be  must be `File`, `Blob`, or `UInt8` Array.';
export const ERR_STRG_CANT_SLICE_BLOB = 'storage/cannot-slice-blob';
export const ERRMSG_STRG_CANT_SLICE_BLOB =
  'The local file has changed (deleted, saved again, etc.).' +
  'Try uploading again after verifying that the file has not changed.';
export const ERR_STRG_FILESIZE = 'storage/server-wrong-file-size';
export const ERRMSG_STRG_FILESIZE =
  'File on the client does not match the size of the file recieved by the server. ' +
  'Try uploading again.';
  export const ERRMSG_STRG_IMG_FAILED = 'Failed to retrieve the profile picture.';

  //Product error messages
  export const ERRMSG_PRODUCT_DETAILS_FAILED = 'Product details save failed.';
  export const ERRMSG_PRODUCT_DELETE_FAILED = 'Product details delete failed.';

  //cart error messages
  export const ERRMSG_CART_ADD_FAILED = 'Adding cart details failed.';

  //payment error messages
  export const ERRMSG_PAYMENT_ADD_FAILED = 'Adding payment details failed.';

  //Order error messages
  export const ERRMSG_PLACE_ORDER_FAILED = 'Order failed. Please try again.';
