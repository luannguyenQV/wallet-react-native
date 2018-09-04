import React from 'react';
import company_config from './../config/default_company_config.json';

export const Colors = () => {
  return company_config.colors;
};

export const ThemeContext = React.createContext({
  theme: company_config.colors,
});
