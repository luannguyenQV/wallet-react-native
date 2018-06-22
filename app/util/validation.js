export const IsEmail = email => {
  let reg = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  // let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (reg.test(email)) {
    return true;
  }
  return false;
};

export const authValidation = props => {
  let error = '';

  switch (props.inputState) {
    case 'email':
      if (!IsEmail(props.email)) {
        error = 'Please enter a valid email address';
      }
      break;
    case 'password':
      if (props.password.length < 8) {
        error = 'Password must be at least 8 characters in length';
      }
      break;
    case 'company':
      if (!props.company) {
        error = 'Please enter a company ID';
      }
      break;
    // case 'mobile':
    //   if (!value) {
    //     error = 'Please enter a company ID';
    //   }
    //   break;
    default:
      error = '';
  }
  return error;
};
