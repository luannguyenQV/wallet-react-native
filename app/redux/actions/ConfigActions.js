/* CONFIG ACTIONS */

/* 
This file contains all the TYPE declarations and ACTION functions 
that relate to the app configuration including company config and appearance
*/

export const CHANGE_THEME = 'change_theme';
export const changeTheme = theme => {
  return {
    type: CHANGE_THEME,
    payload: theme,
  };
};
