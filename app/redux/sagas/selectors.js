import default_company_config from './../../config/default_company_config.json';

export const getToken = state => state.auth.token;
export const getCompany = state => state.auth.company;
export const getAuthUser = state => state.auth.user;
export const getUser = state => state.user;
export const getWallets = state => state.accounts.wallets;

export const authStateSelector = state => state.auth;
export const themeStateSelector = state => state.config.theme;

export const accountsSelector = state => state.accounts;
export const cryptoSelector = state => state.crypto;

export const contactsStateSelector = state => state.contacts;

export const companyConfigSelector = state =>
  state.config.company_config && state.config.company_config.auth
    ? state.config.company_config
    : default_company_config;
