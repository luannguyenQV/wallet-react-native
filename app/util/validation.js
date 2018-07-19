export const IsEmail = email => {
  // let reg = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (reg.test(email)) {
    return true;
  }
  return false;
};

export const validateEmail = email => {
  if (!IsEmail(email)) {
    return 'Please enter a valid email address';
  }
  return '';
};

export const validatePassword = password => {
  if (password.length < 8) {
    return 'Password must be at least 8 characters in length';
  }
  return '';
};

export const validateMobile = mobile => {
  if (!mobile) {
    return 'Please enter a valid mobile number';
  }
  return '';
};

export const validateCrypto = (address, type) => {
  if (address) {
    console.log(address);
    console.log(address.length);
    switch (type) {
      case 'stellar':
        if (address.length === 56) {
          // TODO: add proper validation here
          return '';
        }
        break;
      case 'bitcoin':
        if (address.length === 58) {
          // TODO: add proper validation here
          return '';
        }
        break;
      case 'ethereum':
        if (address.length === 58) {
          // TODO: add proper validation here
          return '';
        }
        break;
    }
  }
  return 'Please enter a valid ' + type + ' address';
};
