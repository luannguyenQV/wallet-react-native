import { PERSIST_REHYDRATE } from 'redux-persist/es/constants';
import { createSelector } from 'reselect';
import { CHANGE_THEME, SET_COMPANY } from '../actions';
import {
  companyConfigSelector,
  themeStateSelector,
} from './../sagas/selectors';

import themes from './../../config/themes.json';
import default_company_config from './../../config/default_company_config.json';

const INITIAL_STATE = {
  company_config: {},
  theme: 'light',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PERSIST_REHYDRATE:
      return action.payload.auth || INITIAL_STATE;

    case CHANGE_THEME:
      return {
        ...state,
        theme: action.payload,
      };

    case SET_COMPANY:
      return {
        ...state,
        company_config: action.payload.company_config,
      };

    default:
      return state;
  }
};

export const colorSelector = createSelector(
  [companyConfigSelector, themeStateSelector],
  (company_config, theme) => {
    const _colors =
      company_config && company_config.colors
        ? company_config.colors
        : default_company_config.colors;

    let selectedTheme = themes[theme] ? themes[theme] : {};

    const colors = {
      ..._colors,
      header: selectColor('header', selectedTheme, _colors, 'primary'),
      headerContrast: selectColor(
        'headerContrast',
        selectedTheme,
        _colors,
        'primaryContrast',
      ),
      drawerHeader: selectColor(
        'drawerHeader',
        selectedTheme,
        _colors,
        'primary',
      ),
      drawerHeaderContrast: selectColor(
        'drawerHeaderContrast',
        selectedTheme,
        _colors,
        'primaryContrast',
      ),
      authScreen: selectColor('authScreen', selectedTheme, _colors, 'primary'),
      authScreenContrast: selectColor(
        'authScreenContrast',
        selectedTheme,
        _colors,
        'primaryContrast',
      ),
      sendScreen: selectColor('sendScreen', selectedTheme, _colors, 'focus'),
      sendScreenContrast: selectColor(
        'sendScreenContrast',
        selectedTheme,
        _colors,
        'focusContrast',
      ),
      grey1: '#F8F8FA',
      grey2: '#EAEAEF',
      grey3: '#B8B7C6',
      font: '#707070',
    };
    return colors;
  },
);

export const getColor = auth => auth.company_config.colors;

const selectColor = (component, theme, _colors, _default) => {
  // console.log('in deep select', theme[component]);
  let color = theme[component]
    ? theme[component]
    : theme[_default]
      ? theme[_default]
      : _colors[component]
        ? _colors[component]
        : _colors[_default]
          ? _colors[_default]
          : default_company_config.colors[_default];

  if (
    color === 'primary' ||
    color === 'secondary' ||
    color === 'tertiary' ||
    color === 'focus' ||
    color === 'primaryContrast' ||
    color === 'secondaryContrast' ||
    color === 'tertiaryContrast' ||
    color === 'focusContrast'
  ) {
    return _colors[color];
  }
  return color;
};

export const themeSelector = createSelector(
  [companyConfigSelector, themeStateSelector],
  (company_config, theme) => {
    // const _colors =
    //   company_config && company_config.colors ? company_config.colors : Colors;

    // let selectedTheme = themes[theme] ? themes[theme] : {};

    // if(company_config.theme && company_config.theme.authSpinner){
    //   return

    // }

    return {
      // authSpinner:
      //   company_config.theme && company_config.theme.authSpinner
      //     ? company_config.theme.authSpinner
      //     : '',
    };

    // const colors = {
    //   ..._colors,
    //   header: selectColor('header', selectedTheme, _colors, 'primary'),
    //   headerContrast: selectColor(
    //     'headerContrast',
    //     selectedTheme,
    //     _colors,
    //     'primaryContrast',
    //   ),
    //   drawerHeader: selectColor(
    //     'drawerHeader',
    //     selectedTheme,
    //     _colors,
    //     'primary',
    //   ),
    //   drawerHeaderContrast: selectColor(
    //     'drawerHeaderContrast',
    //     selectedTheme,
    //     _colors,
    //     'primaryContrast',
    //   ),
    //   authScreen: selectColor('authScreen', selectedTheme, _colors, 'primary'),
    //   authScreenContrast: selectColor(
    //     'authScreenContrast',
    //     selectedTheme,
    //     _colors,
    //     'primaryContrast',
    //   ),
    //   sendScreen: selectColor('sendScreen', selectedTheme, _colors, 'focus'),
    //   sendScreenContrast: selectColor(
    //     'sendScreenContrast',
    //     selectedTheme,
    //     _colors,
    //     'focusContrast',
    //   ),
    // };
    // return colors;
  },
);
