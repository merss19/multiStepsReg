import {take, fork, put, all, call} from 'redux-saga/effects';
import {callApi} from 'tools/api';
import {request, success, failure, SUBMIT_LOGIN} from './ducks';
import {fetchSubmitLogin} from './api';
import {LoginFormData} from './interfaces';

export function* submitLogin(payload: LoginFormData, cb: any) {
  const {data, errorCode, error} = yield call(callApi, fetchSubmitLogin(payload));
  if (data && errorCode === 1) {
    yield put(success(SUBMIT_LOGIN, data, 'profile'));
    yield cb(data);
  } else if (errorCode === 32) {
    yield put(failure(SUBMIT_LOGIN, 'Серверная ошибка', 'profile'));
  } else if (errorCode === 130) {
    yield put(failure(SUBMIT_LOGIN, 'Неверный пароль', 'profile'));
  } else if (errorCode === 4) {
    yield put(failure(SUBMIT_LOGIN, 'Пользователь не найден', 'profile'));
  } else {
    yield put(failure(SUBMIT_LOGIN, error, 'profile'));
  }
}

export function* watchSubmitLogin() {
  while (true) {
    const {data, cb} = yield take(SUBMIT_LOGIN);
    yield put(request(SUBMIT_LOGIN));
    yield fork(submitLogin, data, cb);
  }
}

export default function* loginModuleSaga() {
  yield all([
    fork(watchSubmitLogin)
  ])
}