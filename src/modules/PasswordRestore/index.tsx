import PasswordRestore from './main';
import {passwordRestoreReducer, moduleName} from './ducks';
import passwordRestoreModuleSaga from './saga';

export {
  PasswordRestore,
  passwordRestoreReducer,
  passwordRestoreModuleSaga,
  moduleName
}