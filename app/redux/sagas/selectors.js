export const getToken = state => state.auth.token;
export const getCompany = state => state.auth.company;
export const getAuth = state => state.auth;
export const getAuthUser = state => state.auth.user;
export const getWallets = state => state.accounts.wallets;

export const companyConfigSelector = state => state.config.company_config;
export const themeStateSelector = state => state.config.theme;

export const userSelector = state => state.user;
export const rewardsSelector = state => state.rewards;

export const accountsSelector = state => state.accounts;
export const cryptoSelector = state => state.crypto;

export const contactsStateSelector = state => state.contacts;
