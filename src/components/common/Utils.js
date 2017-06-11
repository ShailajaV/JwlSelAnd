/* Common js */
import { EMPTY_EMAIL, INVALID_EMAIL_PATTERN, EMPTY_PASSWORD,
  INVALID_PASSWORD_PATTERN, EMPTY_FULLNAME, EMPTY_COMPANY_NAME, EMPTY_ADDR_STREET,
  EMPTY_ADDR_APT, INVALID_PHONE_NUMBER, INVALID_ZIP, EMPTY_PHONE_NUMBER, FULLNAME, COMPANYNAME,
  ADDRESS_STREET, ADDRESS_APT, STATE, CITY, PLEASE_ENTER, ADDRESS, PRODUCT_NAME,
  LENGTH_PHONE_NUMBER, EMPTY_IMAGE, EMPTY_DAYS_OF_RENT, INVALID_DAYS_OF_RENT,
  EMPTY_RENT_EXPECTED, INVALID_RENT_EXPECTED, EMPTY_PRODUCT_NAME, EMPTY_QUANTITY, INVALID_QUANTITY,
  EMPTY_SHIPPING_COST, INVALID_SHIPPING_COST, EMPTY_EST_TAX, INVALID_EST_TAX
  //EMPTY_DRLICENSE_NUMBER, INVALID_DRLICENSE_NUMBER
} from '../../actions/constants';

let errors = {};
export const validateEmail = (email, stateErrors) => {
  errors = stateErrors;
  if (!email.replace(/\s/g, '').length) errors.email = EMPTY_EMAIL;
  else if (!validateEmailPattern(email)) {
    errors.email = INVALID_EMAIL_PATTERN;
  }
  return errors;
};

export const validatePassword = (password, stateErrors) => {
  errors = stateErrors;
  if (!password.replace(/\s/g, '').length) errors.password = EMPTY_PASSWORD;
  else if (!validatePasswordPattern(password)) {
    errors.password = INVALID_PASSWORD_PATTERN;
  }
  return errors;
};

const validateEmailPattern = (value) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(value);
};

const validatePasswordPattern = (value) => {
  //Minimum 8 characters at least 1 Alphabet and 1 Number
  const re = /^.*(?=.{8,})(?=.*\d)(?=.*[a-zA-Z]).*$/;
  return re.test(value);
};

export const validateEmptyFields = (fieldName, fieldValue, stateErrors) => {
  errors = stateErrors;
  if (!fieldValue.replace(/\s/g, '').length) {
    if (fieldName === FULLNAME) errors.fullName = EMPTY_FULLNAME;
    if (fieldName === COMPANYNAME) errors.companyName = EMPTY_COMPANY_NAME;
    if (fieldName === ADDRESS_STREET) errors.addrStreet = EMPTY_ADDR_STREET;
    if (fieldName === ADDRESS_APT) errors.addrApt = EMPTY_ADDR_APT;
    if (fieldName === STATE) errors.state = `${PLEASE_ENTER}${fieldName}`;
    if (fieldName === CITY) errors.city = `${PLEASE_ENTER}${fieldName}`;
    if (fieldName === ADDRESS) errors.address = `${PLEASE_ENTER}${fieldName}`;
    if (fieldName === PRODUCT_NAME) errors.productName = EMPTY_PRODUCT_NAME;
  }
  return errors;
};

export const validateZip = (fieldName, fieldValue, stateErrors) => {
  errors = stateErrors;
  if (!fieldValue.replace(/\s/g, '').length) errors.zip = `${PLEASE_ENTER}${fieldName}`;
  else if (!validateOnlyNumbers(fieldValue)) {
    errors.zip = INVALID_ZIP;
  }
  return errors;
};

export const validatePhoneNumber = (value, stateErrors) => {
  errors = stateErrors;
  if (!value.replace(/\s/g, '').length) errors.phoneNumber = EMPTY_PHONE_NUMBER;
  else if (!validateOnlyNumbers(value)) {
    errors.phoneNumber = INVALID_PHONE_NUMBER;
  } else if (value.length !== 10) {
    errors.phoneNumber = LENGTH_PHONE_NUMBER;
  }
  return errors;
};

const validateOnlyNumbers = (fieldValue) => {
  // Only numbers
  const re = /^[0-9]+$/;
  return re.test(fieldValue);
};


/*export const validateDrLicense = (value, stateErrors) => {
  errors = stateErrors;
  if (!value.replace(/\s/g, '').length) errors.phoneNumber = EMPTY_DRLICENSE_NUMBER;
  else if (!validateAlphaNumeric(value)) {
    errors.phoneNumber = INVALID_DRLICENSE_NUMBER;
  }
  return errors;
};

const validateAlphaNumeric = (fieldValue) => {
  // Only numbers
  const re = /^[0-9]+$/;
  return re.test(fieldValue);
};*/

export const validateURLField = (uploadURL, url, stateErrors) => {
  errors = stateErrors;
  if (uploadURL === '' && url === '') errors.url = EMPTY_IMAGE;
  return errors;
};

export const validateDaysOfRent = (value, stateErrors) => {
  errors = stateErrors;
  if (!String(value).replace(/\s/g, '').length) errors.daysOfRent = EMPTY_DAYS_OF_RENT;
  else if (!validateOnlyNumbers(value)) {
    errors.daysOfRent = INVALID_DAYS_OF_RENT;
  }
  return errors;
};

export const validateRentExpected = (value, stateErrors) => {
  errors = stateErrors;
  if (!String(value).replace(/\s/g, '').length) errors.rentExpected = EMPTY_RENT_EXPECTED;
  else if (value <= 0 || !validateDecimalDigits(value)) {
    errors.rentExpected = INVALID_RENT_EXPECTED;
  }
  return errors;
};

export const validateShippingCost = (value, stateErrors) => {
  errors = stateErrors;
  if (!String(value).replace(/\s/g, '').length) errors.shippingCost = EMPTY_SHIPPING_COST;
  else if (!validateDecimalDigits(value)) {
    errors.shippingCost = INVALID_SHIPPING_COST;
  }
  return errors;
};

export const validateEstTax = (value, stateErrors) => {
  errors = stateErrors;
  if (!String(value).replace(/\s/g, '').length) errors.estTax = EMPTY_EST_TAX;
  else if (!validateDecimalDigits(value)) {
    errors.estTax = INVALID_EST_TAX;
  }
  return errors;
};

export const validateQuantity = (value, stateErrors) => {
  errors = stateErrors;
  if (!String(value).replace(/\s/g, '').length) {
    errors.quantity = EMPTY_QUANTITY;
  } else if (!validateOnlyNumbers(value) || value <= 0) {
    errors.quantity = INVALID_QUANTITY;
  }
  return errors;
};

const validateDecimalDigits = (value) => {
  const re = /^(0|0?[1-9]\d*)(?:\.\d{0,2})?$/;
  return re.test(value);
};
