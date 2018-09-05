export const getToken = state => state.auth.token;
export const getCompany = state => state.auth.company;
export const getAuth = state => state.auth;
export const getAuthUser = state => state.auth.user;
export const getUser = state => state.user;
export const getWallets = state => state.accounts.wallets;

export const companyConfigSelector = state => state.config.company_config;
export const themeSelector = state => state.config.theme;

export const accountsSelector = state => state.accounts;
export const cryptoSelector = state => state.crypto;
