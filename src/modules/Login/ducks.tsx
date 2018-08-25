import {LoginFormData, StateLogin} from './interfaces';
import {makeActionCreator} from 'tools/utils';
import * as Immutable from 'immutable';
import {fetchDucks} from 'modules/FetchDucks';
import {Actions} from 'interfaces';
import {combineReducers} from 'redux-immutable';

export const moduleName = 'login';

export const {
  SUCCESS,
  request,
  success,
  failure,
  setError,
  loading
} = fetchDucks(moduleName);

//Constants
export const SET_TOKEN = `${moduleName}/SET_TOKEN`;
export const SUBMIT_LOGIN = `${moduleName}/SUBMIT_LOGIN`;

// Action Creators
export const submitLogin = makeActionCreator<LoginFormData>(SUBMIT_LOGIN, 'data', 'cb');
export const setToken = makeActionCreator<string>(SET_TOKEN, 'data');



// Reducer
export const initialState: StateLogin = {
  authToken: '',
  profile: {},
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
    case SET_TOKEN:
      return state.set('authToken', action.data);
    default:
      return state;
  }
};


export const reducer = combineReducers({
  loading,
  data
});
