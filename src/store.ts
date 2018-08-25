import {Store, createStore, applyMiddleware, compose} from 'redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import {routerMiddleware} from 'react-router-redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import history from './history'
import createSagaMiddleware, { END, SagaMiddleware} from 'redux-saga'
import {all, fork} from 'redux-saga/effects'
import {loginModuleSaga, StateLogin} from 'modules/Login'
import {authModuleSaga} from 'modules/Auth'
import {signUpModuleSaga} from 'modules/SignUp';
import {passwordRestoreModuleSaga} from "modules/PasswordRestore";

const sagaMiddleware = createSagaMiddleware()
export function* rootSaga() {
  yield all([
    fork(loginModuleSaga),
    fork(authModuleSaga),
				fork(signUpModuleSaga),
				fork(passwordRestoreModuleSaga)
  ])
}
let middleware = [
	thunk,
	sagaMiddleware,
	routerMiddleware(history)
]

let  enhancer = compose(
	applyMiddleware(...middleware)
)

if(process.env.NODE_ENV === 'development'){
  middleware.push(logger)
  enhancer = composeWithDevTools(
    applyMiddleware(...middleware)
  )
}
//const initialState = Immutable.fromJS({});
export default function configureStore() {
  const store: Store<any> = createStore(rootReducer, enhancer)

	if (module.hot) {
		module.hot.accept('./reducers', () => {
			const nextRootReducer = require('./reducers')
			store.replaceReducer(nextRootReducer)
		})
	}
  sagaMiddleware.run(rootSaga)
	//console.log(store.getState())
	//	console.log('storerrrrrrrrrrrr')
	return store
}
