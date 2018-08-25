import {makeActionCreator} from 'tools/utils';
import * as Immutable from 'immutable';
import {StateAuth} from './interfaces';
import {fetchDucks} from 'modules/FetchDucks';
import {Actions} from 'interfaces';
import {combineReducers} from 'redux-immutable';

export const moduleName = 'auth'
export const {
  SUCCESS,
  request,
  success,
  failure,
  loading
} = fetchDucks(moduleName);
// Constant
export const CHECK_AUTH = `${moduleName}/CHECK_AUTH`;
export const SET_AUTH = `${moduleName}/SET_AUTH`;

// Action Creators
export const checkAuth = makeActionCreator(CHECK_AUTH, 'cb', 'cbFail');
export const setAuth = makeActionCreator<boolean>(SET_AUTH, 'data');

// Reducer
const initialState: StateAuth = {
  user: {},
  isAuth: false,
  errMsg: ''
};
export const initialStateImmutable = Immutable.fromJS(initialState);

export const data = (state = initialStateImmutable, action: Actions) => {
  if (~action.type.indexOf(SUCCESS)) {
    return state.merge({
      [action.field]: action.data
    });
  }
  switch (action.type) {
    case SET_AUTH:
      return state.merge({
        isAuth: action.data
      });
    default:
      return state;
  }
}

export const reducer = combineReducers({
  loading,
  data
});