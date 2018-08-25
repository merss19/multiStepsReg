import reducer, {moduleName} from './ducks';
import {changeStep} from './containers/Step1'
import SignUp from './main';
import {Steps} from './const';
import signUpModuleSaga from './saga'

const signUpReducer = reducer;

export {SignUp, signUpReducer, signUpModuleSaga, changeStep, moduleName, Steps};
