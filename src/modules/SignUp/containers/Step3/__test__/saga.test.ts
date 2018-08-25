import {take, fork, put, all, call} from 'redux-saga/effects';
import {callApi} from 'tools/api';
import {stepThreeSaga, watchPaymentManual, watchPaymentInfo, paymentManual, paymentInfo} from '../saga';
import * as ducks from '../ducks';
import {fetchPaymentManual, fetchPaymentInfo} from "../api";
import {cloneableGenerator} from 'redux-saga/utils';

const cb = jest.fn();
const error = 'error';
describe('StepThreeSaga', () => {
  let errorCode: number;
  let data: any;
  let error: string;
  beforeEach(() => {
    errorCode = 1;
    data = {
        email: 'test@mail.ru',
        password: '123456'
    };
    error = 'ошибка';
  });
  it('StepThreeSaga', () => {
    const gen = stepThreeSaga();
    expect(gen.next().value).toEqual(all([
      fork(watchPaymentManual),
      fork(watchPaymentInfo)
    ]));
  });
  it('watchPaymentManual - cycle while', () => {
    const gen = watchPaymentManual();
    expect(gen.next().value).toEqual(take(ducks.PAYMENT_MANUAL));
    expect(gen.next(ducks.paymentManual(data, cb)).value).toEqual(put(ducks.request(ducks.PAYMENT_MANUAL)));
    expect(gen.next().value).toEqual(fork(paymentManual, data, cb));
    expect(gen.next().value).toEqual(take(ducks.PAYMENT_MANUAL));
  });
  describe('paymentManual', () => {
    const gen = cloneableGenerator(paymentManual)(data, cb);
    expect(gen.next().value).toEqual(call(callApi, fetchPaymentManual(data)));
    it('paymentManual - success', () => {
      const clone = gen.clone();
      expect(clone.next({data, errorCode}).value).toEqual(put(ducks.success(ducks.PAYMENT_MANUAL, data, 'payManual')));
      clone.next();
      expect(cb).toHaveBeenCalledWith(data);
      expect(clone.next().done).toEqual(true);
    });
    it('paymentManual - failure: errorCode 32', () => {
      errorCode = 32;
      const clone = gen.clone();
      expect(clone.next({
        data,
        errorCode
      }).value).toEqual(put(ducks.failure(ducks.PAYMENT_MANUAL, 'Серверная ошибка', 'payManual')));
      expect(clone.next().done).toEqual(true);
    });
    it('paymentManual - failure: data = null', () => {
      data = null;
      const clone = gen.clone();
      expect(clone.next({
        data,
        errorCode,
        error
      }).value).toEqual(put(ducks.failure(ducks.PAYMENT_MANUAL, error, 'payManual')));
      expect(clone.next().done).toEqual(true);
    });
  });
  it('watchPaymentInfo - cycle while', () => {
    const gen = watchPaymentInfo();
    expect(gen.next().value).toEqual(take(ducks.PAYMENT_INFO));
    expect(gen.next(ducks.paymentInfo(data)).value).toEqual(put(ducks.request(ducks.PAYMENT_INFO)));
    expect(gen.next().value).toEqual(fork(paymentInfo, data));
    expect(gen.next().value).toEqual(take(ducks.PAYMENT_INFO));
  });
  describe('paymentInfo', () => {
    const token = 'qweqwe';
    const gen = cloneableGenerator(paymentInfo)(token);
    expect(gen.next().value).toEqual(call(callApi, fetchPaymentInfo(token)));
    it('paymentInfo - success', () => {
      let data = {
        0: {
          email: 'test@mail.ru',
          password: '123456'
        },
      };
      const clone = gen.clone();
      expect(clone.next({data, errorCode}).value).toEqual(put(ducks.success(ducks.PAYMENT_INFO, data[0], 'payInfo')));
      expect(clone.next().done).toEqual(true);
    });
    it('paymentInfo - failure: errorCode 32', () => {
      errorCode = 32;
      const clone = gen.clone();
      expect(clone.next({
        data,
        errorCode
      }).value).toEqual(put(ducks.failure(ducks.PAYMENT_INFO, 'Серверная ошибка', 'payInfo')));
      expect(clone.next().done).toEqual(true);
    });
    it('paymentInfo - failure: data = null', () => {
      data = null;
      const clone = gen.clone();
      expect(clone.next({
        data,
        errorCode,
        error
      }).value).toEqual(put(ducks.failure(ducks.PAYMENT_INFO, error, 'payInfo')));
      expect(clone.next().done).toEqual(true);
    });
  });
});

