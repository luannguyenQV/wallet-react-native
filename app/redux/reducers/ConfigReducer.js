import { PERSIST_REHYDRATE } from 'redux-persist/es/constants';
import { createSelector } from 'reselect';
import { CHANGE_THEME, SET_COMPANY } from '../actions';

import default_auth from './../../config/default/auth.json';
import default_cards from './../../config/default/cards.json';
import default_pin from './../../config/default/pin.json';
import default_services from './../../config/default/services.json';
import default_sliders from './../../config/default/sliders.json';
import default_theme from './../../config/default/theme.json';
import default_verification from './../../config/default/verification.json';
import { safe } from '../../util/general';

const INITIAL_STATE = {
  company_config: {},
  currentTheme: 'default',

  auth: default_auth,
  cards: default_cards,
  pin: default_pin,
  services: default_services,
  sliders: default_sliders,
  theme: default_theme,
  verification: default_verification,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PERSIST_REHYDRATE:
      return action.payload.auth || INITIAL_STATE;

    case CHANGE_THEME:
      return {
        ...state,
        currentTheme: action.payload,
      };

    case SET_COMPANY:
      const { config } = action.payload;
      return {
        ...state,
        company_config: config.company_config,
        auth: config.auth ? config.auth : state.auth,
        cards: config.cards ? config.cards : state.cards,
        pin: config.pin ? config.pin : state.pin,
        services: config.services ? config.services : state.services,
        sliders: config.sliders ? config.sliders : state.sliders,
        theme: config.theme ? config.theme : state.theme,
        verification: config.verification
          ? config.verification
          : state.verification,
      };

    default:
      return state;
  }
};

/* State selectors */
export const configStateSelector = state => state.config;

export const configAuthStateSelector = createSelector(
  configStateSelector,
  configState => safe(configState, 'auth', default_auth),
);

export const configCardsStateSelector = createSelector(
  configStateSelector,
  configState => safe(configState, 'cards', default_cards),
);

export const configCardsHomeStateSelector = createSelector(
  configCardsStateSelector,
  configCardsState => safe(configCardsState, 'home', default_cards.home),
);

export const configPinStateSelector = createSelector(
  configStateSelector,
  configState => safe(configState, 'pin', default_pin),
);

export const configServicesStateSelector = createSelector(
  configStateSelector,
  configState => safe(configState, 'services', default_services),
);

export const configSlidersStateSelector = createSelector(
  configStateSelector,
  configState => safe(configState, 'sliders', default_sliders),
);

export const configThemeStateSelector = createSelector(
  configStateSelector,
  configState => safe(configState, 'theme', default_theme),
);

export const configThemeDefaultStateSelector = createSelector(
  configThemeStateSelector,
  configThemeState => safe(configThemeState, 'default', default_theme.default),
);

export const configThemeThemesStateSelector = createSelector(
  configThemeStateSelector,
  configThemeState => safe(configThemeState, 'themes', default_theme.themes),
);

export const configThemeColorsStateSelector = createSelector(
  configThemeStateSelector,
  configThemeState => {
    return {
      ...default_theme.colors,
      ...safe(configThemeState, 'colors', default_theme.colors),
    };
  },
);

export const configThemeDesignStateSelector = createSelector(
  configThemeStateSelector,
  configThemeState => safe(configThemeState, 'design', default_theme.design),
);

export const configVerificationStateSelector = createSelector(
  configStateSelector,
  configState => safe(configState, 'verification', default_verification),
);

export const configCurrentThemeStateSelector = createSelector(
  [configStateSelector, configThemeDefaultStateSelector],
  (configState, configThemeDefaultState) =>
    safe(configState, 'currentTheme', configThemeDefaultState),
);

/* Other selectors */

export const themeCurrentThemeSelector = createSelector(
  [configCurrentThemeStateSelector, configThemeThemesStateSelector],
  (configCurrentThemeState, themeThemes) => {
    return safe(themeThemes, configCurrentThemeState, defaultTheme);
  },
);

export const defaultTheme = safe(
  default_theme.themes,
  default_theme.default,
  {},
);

export const themeColorsSelector = createSelector(
  [themeCurrentThemeSelector, configThemeColorsStateSelector],
  (currentTheme, themeColors) => {
    // console.log(currentTheme, themeColors);
    return {
      ...themeColors,
      header: selectColor('header', currentTheme, themeColors),
      headerContrast: selectColor('headerContrast', currentTheme, themeColors),
      drawerHeader: selectColor('drawerHeader', currentTheme, themeColors),
      drawerHeaderContrast: selectColor(
        'drawerHeaderContrast',
        currentTheme,
        themeColors,
      ),
      authScreen: selectColor('authScreen', currentTheme, themeColors),
      authScreenContrast: selectColor(
        'authScreenContrast',
        currentTheme,
        themeColors,
      ),
      sendScreen: selectColor('sendScreen', currentTheme, themeColors),
      sendScreenContrast: selectColor(
        'sendScreenContrast',
        currentTheme,
        themeColors,
      ),
      cardBackgroundColor: selectColor(
        'cardBackgroundColor',
        currentTheme,
        themeColors,
      ),
    };
  },
);

const selectColor = (component, theme, colors) => {
  let color = safe(
    theme,
    component,
    safe(
      safe(default_theme.themes, configCurrentThemeStateSelector, defaultTheme),
      component,
      'black',
    ),
  );

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
    return colors[color];
  }
  return color;
};

export const themeDesignSelector = createSelector(
  [configThemeDesignStateSelector],
  themeDesign => {
    return { ...default_theme.design, ...themeDesign };
  },
);

export const configAuthSelector = createSelector(
  [configAuthStateSelector],
  configAuthState => {
    return { ...default_auth, ...configAuthState };
  },
);

export const configCardsHomeSelector = createSelector(
  [configCardsHomeStateSelector],
  configCardsHomeState => {
    return {
      ...default_cards.home,
      ...configCardsHomeState,
      general: {
        ...default_cards.home.general,
        ...configCardsHomeState.general,
      },
    };
  },
);

export const configServicesSelector = createSelector(
  [configServicesStateSelector],
  configServicesState => {
    return { ...default_services, ...configServicesState };
  },
);

export const configVerificationSelector = createSelector(
  [configVerificationStateSelector],
  configVerificationState => {
    return { ...default_verification, ...configVerificationState };
  },
);

export const configSlidesAuthSelector = createSelector(
  configSlidersStateSelector,
  configSlidersState => {
    return safe(configSlidersState, 'auth', default_sliders.auth);
  },
);

export const configPinSelector = createSelector(
  [configPinStateSelector],
  configPinState => {
    return { ...default_pin, ...configPinState };
  },
);
