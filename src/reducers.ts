import {combineReducers} from 'redux'
import {routerReducer as router, RouterState} from 'react-router-redux'
import {reducer as reduxFormReducer} from 'redux-form'
import {loginReducer, moduleName as login, StateLogin} from 'modules/Login'
import {passwordRestoreReducer, moduleName as passwordRestore} from 'modules/PasswordRestore'
import {modalReducer, moduleName as modal} from 'modules/CustomModal'
import {signUpReducer, moduleName as signUp} from 'modules/SignUp'
import {authReducer, moduleName as auth} from 'modules/Auth'


export default combineReducers({
  routing: router,
  form: reduxFormReducer,
  [login]: loginReducer,
  [auth]: authReducer,
  [signUp]: signUpReducer,
  [modal]: modalReducer,
  [passwordRestore]: passwordRestoreReducer
})
