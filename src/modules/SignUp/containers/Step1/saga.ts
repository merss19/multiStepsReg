import {take, fork, put, all, call} from 'redux-saga/effects';
import {callApi} from 'tools/api';
import {request, success, failure, USER_CREATE, changeStep, CHANGE_STEP} from './ducks';
import {fetchUserCreate} from './api';
import {storage} from 'tools/storage';
import {SignUpFormData} from '../../interfaces';
import {delay} from 'redux-saga';
import {addActiveFlag} from "tools/utils";

export function* userCreate(payload: SignUpFormData, cb: (data: any) => void) {
  const {data, errorCode, error} = yield call(callApi, fetchUserCreate(payload));
  if (data && errorCode === 1) {
    yield put(success(USER_CREATE, data, 'userProfile'));
    cb(data)
  } else if (errorCode === 32) {
    yield put(failure(USER_CREATE, 'Серверная ошибка', 'userProfile'));
  } else {
    yield put(failure(USER_CREATE, error, 'userProfile'));
  }
}

export function* watchUserCreate() {
  while (true) {
    const {data, cb} = yield take(USER_CREATE);
    yield put(request(USER_CREATE));
    yield fork(userCreate, data, cb);
  }
}

export function* watchChangeSteps() {
  while (true) {
    const {data} = yield take(CHANGE_STEP);
    yield put(changeStep(data));
  }
}

export function* StepOneSaga() {
  yield all([
    fork(watchUserCreate),
    fork(watchChangeSteps)
  ])
}