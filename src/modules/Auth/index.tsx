import ProtectedRoute from './main';
import {reducer, checkAuth, moduleName} from './ducks';
import authModuleSaga from './saga';

const authReducer = reducer;
export {ProtectedRoute, authReducer, authModuleSaga, checkAuth, moduleName};
