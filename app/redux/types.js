import { createAsyncTypes } from './store/Utilities';

// AUTH
export const LOGIN_USER_ASYNC = createAsyncTypes('login_user');
export const REGISTER_USER_ASYNC = createAsyncTypes('register_user');
export const LOGOUT_USER_ASYNC = createAsyncTypes('logout_user');
export const AUTH_FIELD_CHANGED = 'auth_field_changed';
export const AUTH_FIELD_ERROR = 'auth_field_error';
export const TERMS_CHANGED = 'terms_changed';
export const UPDATE_AUTH_FORM_FIELD = 'update_auth_form_field';
export const UPDATE_AUTH_FORM_FIELD_SUCCESS = 'update_auth_form_field_success';
export const UPDATE_AUTH_FORM_FIELD_FAIL = 'update_auth_form_field_fail';
export const UPDATE_AUTH_FORM_STATE = 'update_auth_form_state';
export const UPDATE_AUTH_INPUT_STATE = 'update_auth_input_state';
export const LOGIN_USER = 'login_user';
export const AUTH_FIELD_FOCUS = 'auth_field_focus';
export const LOGOUT_USER = 'logout_user';
export const APP_LOAD_START = 'APP_LOAD_START';
export const APP_LOAD_FINISH = 'APP_LOAD_FINISH';
export const LOADING = 'loading';
export const CHANGE_PASSWORD_ASYNC = createAsyncTypes('change_password');
export const VALIDATE_COMPANY_ASYNC = createAsyncTypes('validate_company');
export const RESET_AUTH = 'reset_auth';
export const RESET_PASSWORD_ASYNC = createAsyncTypes('reset_password');

// ACCOUNTS
export const FETCH_ACCOUNTS_ASYNC = createAsyncTypes('fetch_accounts');
export const UPDATE_CURRENT_INDEX = 'update_current_index';
export const SET_ACTIVE_CURRENCY_ASYNC = createAsyncTypes(
  'set_active_currency',
);

export const SET_PIN = 'set_pin';

export const INPUT_FIELD_UPDATE = 'input_field_update';
export const INPUT_FIELD_ERROR = 'input_field_error';
export const SEND_ASYNC = createAsyncTypes('send');
export const SET_SEND_WALLET = 'set_send_wallet';
export const SET_SEND_AMOUNT = 'set_send_amount';
export const SET_SEND_RECIPIENT = 'set_send_recipient';
export const SET_SEND_NOTE = 'set_send_note';
export const SET_SEND_STATE = 'set_send_state';
export const RESET_SEND = 'reset_send';

export const VIEW_WALLET = 'view_wallet';
export const HIDE_WALLET = 'hide_wallet';

export const WITHDRAW_FIELD_UPDATE = 'withdraw_field_update';
export const WITHDRAW_FIELD_ERROR = 'withdraw_field_error';
export const WITHDRAW_ASYNC = createAsyncTypes('withdraw');
export const SET_WITHDRAW_WALLET = 'set_withdraw_wallet';
export const SET_WITHDRAW_AMOUNT = 'set_withdraw_amount';
export const SET_WITHDRAW_BANK_ACCOUNT = 'set_withdraw_bank_account';
export const SET_WITHDRAW_STATE = 'set_withdraw_state';
export const RESET_WITHDRAW = 'reset_withdraw';

// USER
export const FETCH_DATA_ASYNC = createAsyncTypes('fetch_data');
export const REFRESH_PROFILE_ASYNC = createAsyncTypes('refresh_profile');
export const INPUT_FIELD_CHANGED = 'input_field_changed';
export const UPDATE_ASYNC = createAsyncTypes('update');
export const DELETE_ASYNC = createAsyncTypes('delete');
// export const DEFAULT_ASYNC = createAsyncTypes('default');
export const VERIFY_ASYNC = createAsyncTypes('verify');
export const EDIT_ITEM = 'edit_item';
export const PRIMARY_ITEM = 'primary_item';
export const NEW_ITEM = 'new_item';
export const EDIT_PROFILE = 'edit_profile';
export const HIDE_MODAL = 'hide_modal';
export const SHOW_MODAL = 'show_modal';
export const UPLOAD_PROFILE_PHOTO = 'upload_profile_photo';
export const CARD_DISMISS = 'card_dismiss';
export const CARD_RESTORE_ALL = 'card_restore_all';
