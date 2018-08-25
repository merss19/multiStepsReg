import {take, fork, put, all, call} from 'redux-saga/effects';
import {callApi} from 'tools/api';
import loginModuleSaga, {submitLogin, watchSubmitLogin} from '../saga';
import * as ducks from '../ducks';
import {fetchSubmitLogin} from "modules/Login/api";
import { cloneableGenerator } from 'redux-saga/utils';

const cb = jest.fn();
describe('loginModuleSaga', () => {
  let errorCode: number;
  let data: any;
  let error: string;
  beforeEach(() => {
    errorCode = 1;
    data = {
      email: 'test@mail.ru',
      password: 'qweqew'
    };
    error = 'ошибка';
  });
  it('loginModuleSaga', () => {
    const gen = loginModuleSaga();
    expect(gen.next().value).toEqual(all([fork(watchSubmitLogin)]));
  });
  it('watchSubmitLogin - cycle while', () => {
    const gen = watchSubmitLogin()
    expect(gen.next().value).toEqual(take(ducks.SUBMIT_LOGIN));
    expect(gen.next(ducks.submitLogin(data, cb)).value).toEqual(put(ducks.request(ducks.SUBMIT_LOGIN)));
    expect(gen.next().value).toEqual(fork(submitLogin, data, cb));
    expect(gen.next().value).toEqual(take(ducks.SUBMIT_LOGIN));
  });
  describe('submitLogin', () => {
    const gen = cloneableGenerator(submitLogin)(data,cb);
    expect(gen.next().value).toEqual(call(callApi, fetchSubmitLogin(data)));
    it('submitLogin - success', () => {
      const clone = gen.clone();
      expect(clone.next({data, errorCode}).value).toEqual(put(ducks.success(ducks.SUBMIT_LOGIN, data, 'profile')));
      clone.next()
      expect(cb).toHaveBeenCalledWith(data);
      expect(clone.next().done).toEqual(true);
    });
    it('submitLogin - failure: errorCode 32', () => {
      errorCode = 32;
      const clone = gen.clone();
      expect(clone.next({data, errorCode}).value).toEqual(put(ducks.failure(ducks.SUBMIT_LOGIN, 'Серверная ошибка', 'profile')));
      expect(clone.next().done).toEqual(true);
    });
    it('submitLogin - failure: errorCode 130', () => {
      errorCode = 130;
      const clone = gen.clone();
      expect(clone.next({data, errorCode}).value).toEqual(put(ducks.failure(ducks.SUBMIT_LOGIN, 'Неверный пароль', 'profile')));
      expect(clone.next().done).toEqual(true);
    });
    it('submitLogin - failure: errorCode 4', () => {
      errorCode = 4;
      const clone = gen.clone();
      expect(clone.next({data, errorCode}).value).toEqual(put(ducks.failure(ducks.SUBMIT_LOGIN, 'Пользователь не найден', 'profile')));
      expect(clone.next().done).toEqual(true);
    });
    it('submitLogin - failure: data = null', () => {
      data = null;
      const clone = gen.clone();
      expect(clone.next({data, errorCode, error}).value).toEqual(put(ducks.failure(ducks.SUBMIT_LOGIN, error, 'profile')));
      expect(clone.next().done).toEqual(true);
    });
  });
});

