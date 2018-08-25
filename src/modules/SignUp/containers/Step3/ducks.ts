import * as Immutable from 'immutable';
import {StepThree} from '../../interfaces';
import {fetchDucks} from "modules/FetchDucks";
import {makeActionCreator} from "tools/utils";
import {combineReducers} from "redux-immutable";
import {Actions} from "interfaces/index";

export const moduleName = 'signUp';
export const subModuleName = 'stepThree';

export const {
  SUCCESS,
  request,
  success,
  failure,
  loading
} = fetchDucks(moduleName, subModuleName);

// Constant
const module = `${moduleName}/${subModuleName}`;

export const PAYMENT_MANUAL = `${module}/PAYMENT_MANUAL`;
export const PAYMENT_INFO = `${module}/PAYMENT_INFO`;
// Action Creators
export const paymentManual = makeActionCreator<string>(PAYMENT_MANUAL, 'data', 'cb');
export const paymentInfo = makeActionCreator<string>(PAYMENT_INFO, 'data');

// Reducer
const initialState: StepThree = {
  payInfo: {}
};

export const initialStateImmutable = Immutable.fromJS(initialState);

export const data = (state = initialStateImmutable, action: Actions): StepThree => {
  if (~action.type.indexOf(SUCCESS)) {
    return state.merge({
      [action.field]: action.data
    });
  }
  switch (action.type) {
    default:
      return state;
  }
};

export const stepThreeReducer = combineReducers({
  loading,
  data
});