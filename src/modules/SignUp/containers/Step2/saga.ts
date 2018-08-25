import {take, fork, put, all, call, select} from 'redux-saga/effects';
import {callApi} from 'tools/api';
import {request, success, failure, promoError, GET_PROGRAMS, PROMO_ERROR, GET_PACKAGE, PAYMENT_CREATE} from './ducks';
import {fetchGetPackage, fetchPaymentCreate, fetchGetPrograms} from './api';
import {delay} from 'redux-saga';
import {addActiveFlag} from "tools/utils";
import {Payment} from "modules/SignUp/interfaces";
import {selectPackages} from "../../selectors";

export function* getPackage(payload: string) {
  const pack = yield select(selectPackages);
  console.log('selectttttt')
  console.log(payload)
  console.log(pack)
 /* if (pack && !flg) {
    console.log('returnnnnnn')
    return;
  }*/
  yield put(request(GET_PACKAGE));
  const {data, errorCode, error, errorMessage} = yield call(callApi, fetchGetPackage(payload));
  if (data && errorCode === 1) {
    yield put(success(GET_PACKAGE, addActiveFlag(data), 'packages'));
  } else if (errorCode === 32) {
    yield put(failure(GET_PACKAGE, 'Серверная ошибка', 'packages'));
  } else if(errorCode === 3){
    yield put(failure(GET_PACKAGE, errorMessage, 'packages'));
    yield put(promoError(errorMessage));
  } else {
    yield put(failure(GET_PACKAGE, error, 'packages'));
  }
}

export function* paymentCreate(payload: Payment, cb: any) {
  const {data, errorCode, error} = yield call(callApi, fetchPaymentCreate(payload));
  if (data && errorCode === 1) {
    yield put(success(PAYMENT_CREATE, data, 'payment'));
    yield cb(data)
  } else if (errorCode === 32) {
    yield put(failure(PAYMENT_CREATE, 'Серверная ошибка', 'payment'));
  } else {
    yield put(failure(PAYMENT_CREATE, error, 'payment'));
  }
}

export function* getPrograms() {
  const {data, errorCode, error} = yield call(callApi, fetchGetPrograms());
  if (data && errorCode === 1) {
    yield put(success(GET_PROGRAMS, addActiveFlag(data), 'programs'));
  } else if (errorCode === 32) {
    yield put(failure(GET_PROGRAMS, 'Серверная ошибка', 'programs'));
  } else {
    yield put(failure(GET_PROGRAMS, error, 'programs'));
  }
}

export function* watchGetPackage() {
  while (true) {
    const {data} = yield take(GET_PACKAGE);
    yield fork(getPackage, data);
  }
}

export function* watchGetPrograms() {
  while (true) {
    yield take(GET_PROGRAMS);
    yield put(request(GET_PROGRAMS));
    yield fork(getPrograms);
  }
}

export function* watchPaymentCreate() {
  while (true) {
    const {data, cb} = yield take(PAYMENT_CREATE);
    console.log('watchPaymentCreate')
    console.log(data)
    yield put(request(PAYMENT_CREATE));
    yield fork(paymentCreate, data, cb);
  }
}

export function* StepTwoSaga() {
  yield all([
    fork(watchGetPrograms),
    fork(watchGetPackage),
    fork(watchPaymentCreate)
  ])
}