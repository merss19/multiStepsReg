import * as Immutable from 'immutable';
import {StepOne, Program, SignUpFormData} from '../../interfaces';
import {Actions} from 'interfaces';
import {combineReducers} from 'redux-immutable';
import {fetchDucks} from 'modules/FetchDucks';
import {makeActionCreator} from 'tools/utils';
import {Steps} from '../../const';

export const moduleName = 'signUp';
export const subModuleName = 'stepOne';

export const {
  SUCCESS,
  request,
  success,
  failure,
  setError,
  loading
} = fetchDucks(moduleName, subModuleName);
// Constant
export const module = `${moduleName}/${subModuleName}`;

export const SET_PROGRAM_NAME = `${module}/SET_PROGRAM_NAME`;
export const USER_CREATE = `${module}/USER_CREATE`;
export const CHANGE_STEP = `${module}/CHANGE_STEP`;
// Action Creators
export const userCreate = makeActionCreator<SignUpFormData>(USER_CREATE, 'data', 'cb');
export const changeStep = makeActionCreator<Steps>(CHANGE_STEP, 'data');
export const setProgramName = makeActionCreator<string>(SET_PROGRAM_NAME, 'data');
// Reducer
const initialState: StepOne = {
  step: Steps.one,
  programName: '',
  userProfile: {}
};

export const initialStateImmutable = Immutable.fromJS(initialState);

export const data = (state = initialStateImmutable, action: Actions): StepOne => {
  if (~action.type.indexOf(SUCCESS)) {
    return state.merge({
      [action.field]: action.data
    });
  }
  switch (action.type) {
    case SET_PROGRAM_NAME:
      return state.set('programName', action.data);
    case CHANGE_STEP:
      return state.set('step', action.data);

    default:
      return state;
  }
};

export const stepOneReducer = combineReducers({
  loading,
  data
});
