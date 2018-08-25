import {take, fork, put, all, call} from 'redux-saga/effects';
import {delay} from 'redux-saga'
import {callApi} from 'tools/api';
import {request, success, failure, setAuth, CHECK_AUTH, moduleName} from './ducks';
import {fetchUserGet} from './api';
import {storage} from 'tools/storage';
import {setToken} from 'modules/Login/ducks';


export function* checkAuth(token: string, cb: (data: any) => any) {
  let  {data, errorCode, error} = yield call(callApi, fetchUserGet(token));
  if (data && errorCode === 1 && data[0]) {
    storage.saveState(data[0], moduleName);
    yield put(success(CHECK_AUTH, data[0], 'user'));
    yield put(setAuth(true));
    yield cb(data[0]);
  } else if (errorCode === 32) {
    yield put(failure(CHECK_AUTH, 'Серверная ошибка', 'user'));
    yield put(setAuth(false));
  } else {
    yield put(failure(CHECK_AUTH, error, 'user'));
    yield put(setAuth(false));
  }
}

export function* watchCheckAuth() {
  while (true) {
    const {cb, cbFail} = yield take(CHECK_AUTH);
    const token = storage.load('token');
    const state = storage.loadState(moduleName);
    if (state) {
      yield put(success(CHECK_AUTH, state, 'user'));
      yield put(setAuth(true));
      yield put(setToken(token));
      yield cb(state);
      return;
    }
    if (!token) {
      yield cbFail();
      yield put(setAuth(false));
    } else {
      yield put(request(CHECK_AUTH));
      yield fork(checkAuth, token, cb);
    }
  }
}

export default function* authModuleSaga() {
  yield all([
    fork(watchCheckAuth)
  ])
}