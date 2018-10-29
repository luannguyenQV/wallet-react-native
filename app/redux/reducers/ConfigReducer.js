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
  configStateSelector,
  configState => safe(configState, 'verification', default_verification),
);

/* Other selectors */

export const themeCurrentThemeSelector = createSelector(
  [configCurrentThemeStateSelector, configThemeThemesStateSelector],
  (configCurrentThemeState, themeThemes) =>
    safe(themeThemes, configCurrentThemeState, defaultTheme),
);

export const defaultTheme = safe(
  default_theme.themes,
  default_theme.default,
  {},
);

export const themeColorsSelector = createSelector(
  [configCurrentThemeStateSelector, configThemeColorsStateSelector],
  (currentTheme, themeColors) => {
    const colors = {
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
    };
    return colors;
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
    return {
      cardCornerRadius: safe(
        themeDesign,
        'cardCornerRadius',
        defaultTheme.cardCornerRadius,
      ),
      roundButtons: safe(
        themeDesign,
        'roundButtons',
        defaultTheme.roundButtons,
      ),
    };
  },
);

export const configAuthSelector = createSelector(
  [configAuthStateSelector],
  configAuthState => {
    return {
      identifier: safe(configAuthState, 'identifier', default_auth.identifier),
      email: safe(configAuthState, 'email', default_auth.email),
      mobile: safe(configAuthState, 'mobile', default_auth.mobile),
      terms: safe(configAuthState, 'terms', default_auth.terms),
      first_name: safe(configAuthState, 'first_name', default_auth.first_name),
      last_name: safe(configAuthState, 'last_name', default_auth.last_name),
      username: safe(configAuthState, 'username', default_auth.username),
      country: safe(configAuthState, 'country', default_auth.country),
      pin: safe(configAuthState, 'pin', default_auth.pin),
      mfa: safe(configAuthState, 'mfa', default_auth.mfa),
    };
  },
);

// export const configCardsSelector = createSelector(
//   [configCardsStateSelector],
//   configCardsState => {
//     const cards = {
//       home: {
//         general: {
//           welcome: safe(
//             configCardsState,
//             'identifier',
//             default_auth.identifier,
//           ),
//           verify: true,
//         },
//         custom: [
//           {
//             id: 0,
//             title: 'Card 1',
//             description: 'This is your custom text for card 1',
//             image: 'card1',
//             dismiss: true,
//           },
//           {
//             id: 1,
//             title: 'Card 2',
//             description: 'This is your custom text for card 2',
//             image: 'card2',
//             dismiss: false,
//           },
//         ],
//       },
//     };
//     return cards;
//   },
// );

export const configCardsHomeSelector = createSelector(
  [configCardsHomeStateSelector],
  configCardsHomeState => {
    return {
      general: {
        welcome: safe(
          safe(configCardsHomeState, 'general', default_cards.home.general),
          'welcome',
          default_cards.home.general.welcome,
        ),
        verify: safe(
          safe(configCardsHomeState, 'general', default_cards.home.general),
          'verify',
          default_cards.home.general.verify,
        ),
      },
      custom: safe(configCardsHomeState, 'custom', default_cards.home.custom),
    };
  },
);

export const configServicesSelector = createSelector(
  [configServicesStateSelector],
  configServicesState => {
    return {
      bitcoin: safe(configServicesState, 'bitcoin', default_services.bitcoin),
      stellar: safe(configServicesState, 'stellar', default_services.stellar),
      ethereum: safe(
        configServicesState,
        'ethereum',
        default_services.ethereum,
      ),
      rewards: safe(configServicesState, 'rewards', default_services.rewards),
    };
  },
);

export const configVerificationSelector = createSelector(
  [configVerificationStateSelector],
  configVerificationState => {
    return {
      requireDocumentID: safe(
        configVerificationState,
        'requireDocumentID',
        default_verification.requireDocumentID,
      ),
      requireDocumentAddress: safe(
        configVerificationState,
        'requireDocumentAddress',
        default_verification.requireDocumentAddress,
      ),
      requireDocumentAdvID: safe(
        configVerificationState,
        'requireDocumentAdvID',
        default_verification.requireDocumentAdvID,
      ),
    };
  },
);

export const configSlidesAuthSelector = createSelector(
  configSlidersStateSelector,
  configSlidersState => safe(configSlidersState, 'auth', default_sliders.auth),
);

export const configPinSelector = createSelector(
  [configPinStateSelector],
  configPinState => {
    return {
      appLoad: safe(configPinState, 'appLoad', default_pin.appLoad),
      security: safe(configPinState, 'security', default_pin.security),
      send: safe(configPinState, 'send', default_pin.send),
      withdraw: safe(configPinState, 'withdraw', default_pin.withdraw),
      updateDetails: safe(
        configPinState,
        'updateDetails',
        default_pin.updateDetails,
      ),
    };
  },
);
