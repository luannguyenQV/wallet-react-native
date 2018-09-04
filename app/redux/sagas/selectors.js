export const getToken = state => state.auth.token;
export const getCompany = state => state.auth.company;
export const getAuth = state => state.auth;
export const getAuthUser = state => state.auth.user;
export const getUser = state => state.user;
export const getWallets = state => state.accounts.wallets;
export const getCrypto = state => state.crypto;

export const companyConfigSelector = state => state.config.company_config;
export const themeSelector = state => state.config.theme;
