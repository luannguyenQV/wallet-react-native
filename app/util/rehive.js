import Rehive from 'rehive';
import { store } from './../redux/store';

// SDK initialization
export let r;
export const initializeSDK = () => {
  const token = store.getState().auth.token;
  if (token) {
    r = new Rehive({ apiVersion: 3, apiToken: token });
  } else {
    r = new Rehive({ apiVersion: 3 });
  }
};

/* AUTHENTICATION */
export const login = data =>
  r.auth.login(data, { session_duration: 2592000000 });

export const register = data =>
  r.auth.register(data, { session_duration: 2592000000 });

export const logout = () => r.auth.logout();

export const resendEmailVerification = (email, company) =>
  r.auth.email.resendEmailVerification({ email, company });

export const resendMobileVerification = (mobile, company) =>
  r.auth.mobile.resendMobileVerification({ mobile, company });

export const resetPassword = data => r.auth.password.reset(data);

export const changePassword = (old_password, new_password) =>
  r.auth.password.change({
    old_password,
    new_password1: new_password,
    new_password2: new_password,
  });

export const submitOTP = otp => r.auth.mobile.verify({ otp });

// rehive.auth..change({
//   old_password: "joe1234",
//   new_password1: "joe1234",
//   new_password2: "joe1234"
/* USERS */
// Profile
export const getProfile = () => r.user.get();

export const updateProfile = () => r.user.update();

export const updateProfileImage = file => {
  let formData = new FormData();
  formData.append('profile', file);
  r.user.update(formData);
};

// Address
export const getAddress = () => r.user.address.get();

export const updateAddress = () => r.user.address.update();

// Bank Accounts
export const getBankAccounts = () => r.user.bankAccounts.get();

export const createBankAccount = data => r.user.bankAccounts.create(data);

export const updateBankAccount = (id, data) =>
  r.user.bankAccounts.update(id, data);

export const deleteBankAccount = id => r.user.bankAccounts.delete(id);

// Crypto Accounts
export const getCryptoAccounts = () => r.user.cryptoAccounts.get();

export const createCryptoAccount = data => r.user.cryptoAccounts.create(data);

export const updateCryptoAccount = (id, data) =>
  r.user.cryptoAccounts.update(id, data);

export const deleteCryptoAccount = id => r.user.cryptoAccounts.delete(id);

// Documents
export const getDocuments = () => r.user.documents.get();

export const createDocument = (file, category, type) => {
  let formData = new FormData();
  formData.append('file', file);
  formData.append('document_category', category);
  formData.append('document_type', type);
  console.log('formData', formData);
  return r.user.documents.create(formData);
};

// Emails
export const getEmails = () => r.user.emails.get();

export const createEmail = data => r.user.emails.create(data);

export const updateEmail = (id, data) => r.user.emails.update(id, data);

export const deleteEmail = id => r.user.emails.delete(id);

// Mobiles
export const getMobiles = () => r.user.mobiles.get();

export const updateMobile = (id, data) => r.user.mobiles.update(id, data);

export const createMobile = data => r.user.mobiles.create(data);

export const deleteMobile = id => r.user.mobiles.delete(id);

/* TRANSACTIONS */
export const getTransactions = currency =>
  r.transactions.get({ filters: { currency: currency } });

export const createCredit = (amount, currency) =>
  r.transactions.createCredit({
    amount: parseInt(amount, 0),
    currency,
  });

export const createDebit = (amount, currency, reference, note, metadata) =>
  r.transactions.createDebit({
    amount: parseInt(amount, 0),
    currency,
    metadata,
    reference,
    note,
  });

export const createTransfer = (
  amount,
  recipient,
  note,
  currency,
  debit_account,
) =>
  r.transactions.createTransfer({
    amount: parseInt(amount, 0),
    recipient,
    note,
    currency,
    debit_account,
  });

/* ACCOUNTS */
export const getAccounts = () => r.accounts.get();

// Create, retrieve, currencies?

export const setActiveCurrency = (reference, currencyCode) =>
  r.accounts.currencies.update(reference, currencyCode, { active: true });

/* COMPANY */
export const getCompany = () => r.company.get();

export const getCompanyCurrencies = () => r.company.currencies.get();

export const getCompanyBankAccounts = () => r.company.bankAccounts.get();

/* GENERAL */
export const callApi = (method, route, token, data) => {
  let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Token ${token}`;
  }

  let config = {
    // credentials: 'include',
    method,
    mode: 'cors',
    headers,
  };

  if (data) {
    config['body'] = JSON.stringify(data);
  }

  return Promise.resolve(
    fetch(route, config)
      .then(response => response.json())
      .catch(err => err),
  );
};
