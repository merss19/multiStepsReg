import {take, fork, put, all, call} from 'redux-saga/effects';
import {callApi} from 'tools/api';
import authModuleSaga, {watchCheckAuth, checkAuth} from '../saga';
import * as ducks from '../ducks';
import {fetchUserGet} from "../api";
import {cloneableGenerator} from 'redux-saga/utils';
import {setToken} from 'modules/Login/ducks';
import {storage} from "tools/storage";
import {localStorageMock} from 'tools/utils';

const {JSDOM} = require('jsdom');
const dom = new JSDOM(`
<!doctype html>
<html>
  <body>
  </body>
</html>`);
const {window} = dom;

const globalAny:any = global;
globalAny.localStorage = localStorageMock;

const cb = jest.fn();
const cbFail = jest.fn();
const token = 'test';
describe('authModuleSaga', () => {
  let errorCode: number;
  let data: any;
  let error: string;
  beforeEach(() => {
    errorCode = 1;
    data = {
      0: {
        email: 'test@mail.ru',
        password: '123456'
      },
    };
    error = 'ошибка';
  });
  it('authModuleSaga', () => {
    const gen = authModuleSaga();
    expect(gen.next().value).toEqual(all([fork(watchCheckAuth)]));
  });
  describe('watchCheckAuth - cycle while', () => {
    const gen = cloneableGenerator(watchCheckAuth)();
    storage.saveState({}, 'auth');
    storage.save('token', 'test');
    const state = storage.loadState('auth');
    const token = storage.load('token');
    expect(gen.next().value).toEqual(take(ducks.CHECK_AUTH));
    it('state === null, token === null', () => {
      storage.removeState('auth');
      storage.remove('token');
      const state = storage.loadState('auth');
      const clone = gen.clone();
      clone.next({cb, cbFail});
      expect(cbFail).toHaveBeenCalled();
      expect(clone.next().value).toEqual(put(ducks.setAuth(false)));
      expect(clone.next().value).toEqual(take(ducks.CHECK_AUTH));
    });
    it('state === null, token !== null', () => {
      storage.removeState('auth');
      storage.save('token', 'test');
      const token = storage.load('token');
      const clone = gen.clone();
      expect(clone.next({cb, cbFail}).value).toEqual(put(ducks.request(ducks.CHECK_AUTH)));
      expect(clone.next().value).toEqual(fork(checkAuth, token, cb));
      expect(clone.next().value).toEqual(take(ducks.CHECK_AUTH));
    });
    it('state !== null', () => {
      storage.saveState({}, 'auth');
      const state = storage.loadState('auth');
      const clone = gen.clone();
      expect(clone.next(ducks.checkAuth(cb, cbFail)).value).toEqual(put(ducks.success(ducks.CHECK_AUTH, state, 'user')));
      expect(clone.next().value).toEqual(put(ducks.setAuth(true)));
      expect(clone.next().value).toEqual(put(setToken(token)));
      clone.next();
      expect(cb).toHaveBeenCalledWith(state);
      expect(clone.next().done).toEqual(true);
    });
  });
  describe('checkAuth', () => {
    const gen = cloneableGenerator(checkAuth)(token, cb);
    expect(gen.next().value).toEqual(call(callApi, fetchUserGet(token)));
    it('checkAuth - success', () => {
      const clone = gen.clone();
      expect(clone.next({data, errorCode}).value).toEqual(put(ducks.success(ducks.CHECK_AUTH, data[0], 'user')));
      expect(clone.next().value).toEqual(put(ducks.setAuth(true)));
      clone.next();
      expect(cb).toHaveBeenCalledWith(data[0]);
      expect(clone.next().done).toEqual(true);
    });
    it('submitLogin - failure: errorCode 32', () => {
      errorCode = 32;
      const clone = gen.clone();
      expect(clone.next({
        data,
        errorCode
      }).value).toEqual(put(ducks.failure(ducks.CHECK_AUTH, 'Серверная ошибка', 'user')));
      expect(clone.next().value).toEqual(put(ducks.setAuth(false)));
      expect(clone.next().done).toEqual(true);
    });
    it('submitLogin - failure: data = null', () => {
      data = null;
      const clone = gen.clone();
      expect(clone.next({data, errorCode, error}).value).toEqual(put(ducks.failure(ducks.CHECK_AUTH, error, 'user')));
      expect(clone.next().value).toEqual(put(ducks.setAuth(false)));
      expect(clone.next().done).toEqual(true);
    });
  });
});

