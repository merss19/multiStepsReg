import {take, fork, put, all, call} from 'redux-saga/effects';
import {callApi} from 'tools/api';
import {request, success, failure, SUBMIT_RESTORE, SUBMIT_PASSWORD} from './ducks';
import {fetchSubmitRestore, fetchSubmitPassword} from './api';
import {RestoreFormData, PasswordFormData} from './interfaces';


export function* submitRestore(payload: RestoreFormData) {
  const {data, errorCode, error} = yield call(callApi, fetchSubmitRestore(payload));
  if (data && errorCode === 1) {
    yield put(success(SUBMIT_RESTORE, data, 'restore'));
  } else if (errorCode === 32) {
    yield put(failure(SUBMIT_RESTORE, 'Серверная ошибка', 'restore'));
  } else {
    yield put(failure(SUBMIT_RESTORE, error, 'restore'));
  }
}

export function* submitPassword(payload: PasswordFormData) {
  const {data, errorCode, error} = yield call(callApi, fetchSubmitPassword(payload));
  if (data && errorCode === 1) {
    yield put(success(SUBMIT_PASSWORD, data, 'user'));
  } else if (errorCode === 32) {
    yield put(failure(SUBMIT_PASSWORD, 'Серверная ошибка', 'user'));
  } else {
    yield put(failure(SUBMIT_PASSWORD, error, 'user'));
  }
}

export function* watchSubmitRestore() {
  while (true) {
    const {data} = yield take(SUBMIT_RESTORE);
    yield put(request(SUBMIT_RESTORE));
    yield fork(submitRestore, data);
  }
}

export function* watchSubmitPassword() {
  while (true) {
    const {data} = yield take(SUBMIT_PASSWORD);
    yield put(request(SUBMIT_PASSWORD));
    yield fork(submitPassword, data);
  }
}

export default function* passwordRestoreModuleSaga() {
  yield all([
    fork(watchSubmitRestore),
    fork(watchSubmitPassword)
  ])
}