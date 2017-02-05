/* error related message constants */
export const ERR_AUTH_FAILED = 'Authentication Failed.';
export const ERRCODE_EMAIL_INUSE = 'auth/email-already-in-use';
export const ERRMSG_EMAIL_INUSE = 'Email id is already exists.';
export const ERRCODE_INVALID_EMAIL = 'auth/invalid-email';
export const ERRMSG_INVALID_EMAIL = 'Email address is not valid.';
export const ERRCODE_WEAK_PASSWORD = 'auth/weak-password';
export const ERRMSG_WEAK_PASSWORD = 'Password is not strong enough.';

export const ERRCODE_USER_DISABLED = 'auth/user-disabled';
export const ERRMSG_USER_DISABLED = 'Email address has been disabled.';
export const ERRCODE_USER_NOTFOUND = 'auth/user-not-found';
export const ERRMSG_USER_NOTFOUND = 'There is no user corresponding to the given email.';
export const ERRCODE_WRONG_PASSWORD = 'auth/wrong-password';
export const ERRMSG_WRONG_PASSWORD = 'Password is invalid.';
export const ERRMSG_SIGNUP_FAILED = 'creation failed.!!!';

export const ERRMSG_SELLER_PROFILE_FAILED = 'User profile information save failed.';
export const ERRMSG_IMAGE_UPLOAD_FAILED = 'Image upload failed. Please try again.';
export const ERR_STORAGE_UNAUTH = 'storage/unauthenticated';
export const ERRMSG_STRG_UNAUTH = 'User is unauthenticated, please authenticate and try again.';
export const ERR_STRG_UNAUTHORIZED = 'storage/unauthorized';
export const ERRMSG_STRG_UNAUTHORIZED =
 'User is not authorized to perform the desired action, check your security rules.';
export const ERR_STRG_LIMIT_EXCEED = 'storage/retry_limit_exceeded';
export const ERRMSG_STRG_LIMIT_EXCEED =
  'The maximum time limit on an operation has been excceded. Try uploading again.';
export const ERR_STRG_INV_CHECKSUM = 'storage/invalid_checksum';
export const ERRMSG_STRG_INV_CHECKSUM =
'Checksum of the file does not match on client and server. Try uploading again.';
export const ERR_STRG_CANCELLED = 'storage/canceled';
export const ERRMSG_STRG_CANCELLED = 'User canceled the operation.';
