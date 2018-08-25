import * as Immutable from 'immutable';
import {combineReducers} from 'redux-immutable';
import {PasswordFormData, RestoreFormData, StateProfilePassword} from './interfaces';
import {Actions} from 'interfaces';
import {fetchDucks} from "modules/FetchDucks";
import {makeActionCreator} from 'tools/utils';

export const moduleName = 'passwordRestore';

export const {
  SUCCESS,
  request,
  success,
  failure,
  setError,
  loading
} = fetchDucks(moduleName);

// Constant
export const SUBMIT_RESTORE = `${moduleName}/SUBMIT_RESTORE`;
export const SUBMIT_PASSWORD = `${moduleName}/SUBMIT_PASSWORD`;
export const SET_RESTORE_TOKEN = `${moduleName}/SET_RESTORE_TOKEN`;

// Action Creators
export const submitRestore = makeActionCreator<RestoreFormData>(SUBMIT_RESTORE, 'data');
export const submitPassword = makeActionCreator<PasswordFormData>(SUBMIT_PASSWORD, 'data');
export const setRestoreToken = makeActionCreator<string>(SET_RESTORE_TOKEN, 'data');

// Reducer
const initialState: StateProfilePassword = {
  token: null,
  user: {},
  restore: {}
};
export const initialStateImmutable = Immutable.fromJS(initialState);

export const data = (state = initialStateImmutable, action: Actions) => {
  if (~action.type.indexOf(SUCCESS)) {
    return state.merge({
      [action.field]: action.data
    });
  }

  switch (action.type) {
    case SET_RESTORE_TOKEN:
      return state.set('token', action.data);
    default:
      return state;
  }
};

export const passwordRestoreReducer = combineReducers({
  loading,
  data
});