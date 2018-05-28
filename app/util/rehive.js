import Rehive from 'rehive';

let r = new Rehive({ apiVersion: 3 });

export const rehive = r;

export const login = data => r.auth.login(data).then(user => user, err => err);

export const register = data =>
  r.auth.register(data).then(user => user, err => err);

export const logout = () => r.auth.logout().then(res => res, err => err);

export const getAccounts = () => r.accounts.get().then(res => res, err => err);

export const getTransactions = currency =>
  r.transactions
    .get({ filters: { currency: currency } })
    .then(res => res, err => err);

export const createTransfer = (amount, recipient, memo, currency) =>
  r.transactions.createTransfer({
    amount: parseInt(amount, 0),
    recipient,
    currency,
  });

export const createDebit = (amount, currency) =>
  r.transactions.createDebit({
    amount: parseInt(amount, 0),
    currency,
  });

export const getProfile = () => r.user.get().then(res => res, err => err);

// Mobiles
export const getMobiles = () =>
  r.user.mobiles.get().then(res => res, err => err);

export const updateMobile = (id, primary) =>
  r.user.mobiles.update(id, { primary }).then(res => res, err => err);

export const createMobile = (number, primary) =>
  r.user.mobiles.create({ number, primary }).then(res => res, err => err);

export const deleteMobile = id =>
  r.user.mobiles.delete(id).then(res => res, err => err);

// Address
export const getAddress = () =>
  r.user.address.get().then(res => res, err => err);

// Company Bank Accounts
export const getCompanyBankAccounts = () =>
  r.company.bankAccounts.get().then(res => res, err => err);

// Bank Accounts
export const getBankAccounts = () =>
  r.user.bankAccounts.get().then(res => res, err => err);

export const updateBankAccount = (id, data) =>
  r.user.bankAccounts.update(id, data).then(res => res, err => err);

export const createBankAccount = data =>
  r.user.bankAccounts.create(data).then(res => res, err => err);

export const deleteBankAccount = id =>
  r.user.bankAccounts.delete(id).then(res => res, err => err);

export const updateCurrency = (reference, currencyCode) =>
  r.accounts.currencies
    .update(reference, currencyCode, { active: true })
    .then(res => res, err => err);

// Crypto Accounts
export const getCryptoAccounts = () =>
  r.user.cryptoAccounts.get().then(res => res, err => err);

export const updateCryptoAccount = (id, data) =>
  r.user.cryptoAccounts.update(id, data).then(res => res, err => err);

export const createCryptoAccount = data =>
  r.user.cryptoAccounts.create(data).then(res => res, err => err);

export const deleteCryptoAccount = id =>
  r.user.cryptoAccounts.delete(id).then(res => res, err => err);

// Documents
export const getDocuments = () =>
  r.user.documents.get().then(res => res, err => err);

export const createDocument = data =>
  r.user.documents.create(data).then(res => res, err => err);

// Emails
export const getEmails = () => r.user.emails.get().then(res => res, err => err);

export const updateEmail = (id, email, primary) =>
  r.user.emails.update(id, { email, primary }).then(res => res, err => err);

export const createEmail = (email, primary) =>
  r.user.emails.create({ email, primary }).then(res => res, err => err);

export const deleteEmail = id =>
  r.user.emails.delete(id).then(res => res, err => err);

export const resendEmailVerification = (email, company) =>
  r.auth.email
    .resendEmailVerification({ email, company })
    .then(res => res, err => err);

export const resendMobileVerification = (mobile, company) =>
  r.auth.mobile
    .resendMobileVerification({ mobile, company })
    .then(res => res, err => err);

export const submitOTP = otp =>
  r.auth.mobile.verify({ otp }).then(res => res, err => err);

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
