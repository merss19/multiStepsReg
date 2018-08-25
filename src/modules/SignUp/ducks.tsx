import {stepOneReducer} from './containers/Step1';
import {stepTwoReducer} from './containers/Step2';
import {stepThreeReducer} from './containers/Step3';
import {combineReducers} from 'redux-immutable';

export const moduleName = 'signUp';

const reducer = combineReducers({
  stepOne: stepOneReducer,
  stepTwo: stepTwoReducer,
  stepThree: stepThreeReducer
});
export default reducer;