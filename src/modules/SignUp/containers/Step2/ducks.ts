import * as Immutable from 'immutable';
import {StepTwo, Payment} from '../../interfaces';
import {fetchDucks} from "modules/FetchDucks";
import {makeActionCreator} from "tools/utils";
import {combineReducers} from "redux-immutable";
import {Actions} from "interfaces/index";

export const moduleName = 'signUp';
export const subModuleName = 'stepTwo';
export const {
  SUCCESS,
  request,
  success,
  failure,
  loading
} = fetchDucks(moduleName, subModuleName);
// Constant
export const module = `${moduleName}/${subModuleName}`;

export const CHOOSEN_PROGRAM = `${module}/CHOOSEN_PROGRAM`;
export const GET_PROGRAMS = `${module}/GET_PROGRAMS`;
export const SET_PACKAGE_TYPE = `${module}/SET_PACKAGE_TYPE`;
export const SET_PROMO = `${module}/SET_PROMO`;
export const GET_PACKAGE = `${module}/GET_PACKAGE`;
export const PAYMENT_CREATE = `${module}/PAYMENT_CREATE`;
export const PROMO_ERROR = `${module}/PROMO_ERROR`;
// Action Creators
export const getPrograms = makeActionCreator(GET_PROGRAMS);
export const getPackage = makeActionCreator<string | null>(GET_PACKAGE, 'data', 'flg');
export const paymentCreate = makeActionCreator<Payment>(PAYMENT_CREATE, 'data', 'cb');
export const setPromo = makeActionCreator<string>(SET_PROMO, 'data');
export const setChoosenProgram = makeActionCreator<number>(CHOOSEN_PROGRAM, 'data');
export const setPackageType = makeActionCreator<number>(SET_PACKAGE_TYPE, 'data');
export const promoError = makeActionCreator<string>(PROMO_ERROR, 'data');

// Reducer
const initialState: StepTwo = {
  choosenProgram: 0,
  choosenPackageType: 1,
  packages: [],
  programs: [],
  promo: '',
  promoError: '',
  payment: {}
};

export const initialStateImmutable = Immutable.fromJS(initialState);

export const data = (state = initialStateImmutable, action: Actions) => {
  if (~action.type.indexOf(SUCCESS)) {
    return state.merge({
      [action.field]: action.data
    });
  }
  switch (action.type) {
    case CHOOSEN_PROGRAM:
      return state.set('choosenProgram', action.data);
    case SET_PACKAGE_TYPE:
      return state.set('choosenPackageType', action.data);
    case SET_PROMO:
      return state.merge({
        promo: action.data
      });
    case PROMO_ERROR:
      return state.merge({
        promoError: action.data
      });
    default:
      return state;
  }
};
export const stepTwoReducer = combineReducers({
  loading,
  data
});