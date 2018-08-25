import Login from './main';
import {reducer, setToken, moduleName} from './ducks';
import loginModuleSaga from './saga';
import {StateLogin} from './interfaces';
import {selectAuthToken} from './selectors'

const loginReducer = reducer;
export {
  Login,
  loginReducer,
  loginModuleSaga,
  setToken,
  moduleName,
  StateLogin,
  selectAuthToken
};
