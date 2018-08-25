import {take, fork, put, all, call} from 'redux-saga/effects';
import {callApi} from 'tools/api';
import {request, success, failure, PAYMENT_MANUAL, PAYMENT_INFO} from './ducks';
import {fetchPaymentInfo, fetchPaymentManual} from './api';
import {delay} from 'redux-saga';

export function* paymentManual(payload: string, cb: (data: boolean) => void) {
  let {data, errorCode, error} = yield call(callApi, fetchPaymentManual(payload));
  if (data && errorCode === 1) {
    yield put(success(PAYMENT_MANUAL, data, 'payManual'));
    cb(data)
  } else if (errorCode === 32) {
    yield put(failure(PAYMENT_MANUAL, 'Серверная ошибка', 'payManual'));
  } else {
    yield put(failure(PAYMENT_MANUAL, error, 'payManual'));
  }
}
export function* paymentInfo(payload: string) {
  const {data, errorCode, error} = yield call(callApi, fetchPaymentInfo(payload));
  if (data && data[0] && errorCode === 1) {
    yield put(success(PAYMENT_INFO, data[0], 'payInfo'));
  } else if (errorCode === 32) {
    yield put(failure(PAYMENT_INFO, 'Серверная ошибка', 'payInfo'));
  } else {
    yield put(failure(PAYMENT_INFO, error, 'payInfo'));
  }
}

export function* watchPaymentInfo() {
  while (true) {
    const {data} = yield take(PAYMENT_INFO);
    yield put(request(PAYMENT_INFO));
    yield fork(paymentInfo, data);
  }
}

export function* watchPaymentManual() {
  while (true) {
    const {data, cb} = yield take(PAYMENT_MANUAL);
    yield put(request(PAYMENT_MANUAL));
    yield fork(paymentManual, data, cb);
  }
}

export  function* stepThreeSaga() {
  yield all([
    fork(watchPaymentManual),
    fork(watchPaymentInfo)
  ])
}