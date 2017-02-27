/* Common js */
let errors = {};
export const validateEmail = (email, stateErrors) => {
  errors = stateErrors;
  if (email === '') errors.email = 'Please enter email.';
  else if (!validateEmailPattern(email)) {
    errors.email = 'Invalid email pattern.';
  }
  return errors;
};

export const validatePassword = (password, stateErrors) => {
  errors = stateErrors;
  if (password === '') errors.password = 'Please enter Password.';
  else if (!validatePasswordPattern(password)) {
    errors.password = 'Password should contain at least 1 alphabet and 1 number';
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
