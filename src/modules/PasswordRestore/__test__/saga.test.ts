import {take, fork, put, all, call} from 'redux-saga/effects';
import {callApi} from 'tools/api';
import passwordRestoreModuleSaga, {
  watchSubmitRestore,
  watchSubmitPassword,
  submitRestore,
  submitPassword
} from '../saga';
import * as ducks from '../ducks';
import {fetchSubmitRestore, fetchSubmitPassword} from "../api";
import { cloneableGenerator } from 'redux-saga/utils';

let errorCode: number;
let data: any;
let email: any;
let error: string;
describe('passwordRestoreModuleSaga', () => {
  beforeEach(() => {
    errorCode = 1;
    data = {
      pass: 'qweqew',
      passAgain: 'qweqew',
      tokenPassword: 'asdasdasd'
    };
     email = {
      email:'mail@mail.ru'
    };
    error = 'ошибка';
  });
  it('passwordRestoreModuleSaga', () => {
    const gen = passwordRestoreModuleSaga();
    expect(gen.next().value).toEqual(all([
      fork(watchSubmitRestore),
      fork(watchSubmitPassword)
    ]));
  });
  it('watchSubmitRestore - cycle while', () => {
    const gen = watchSubmitRestore()
    expect(gen.next().value).toEqual(take(ducks.SUBMIT_RESTORE));
    expect(gen.next(ducks.submitRestore(data)).value).toEqual(put(ducks.request(ducks.SUBMIT_RESTORE)));
    expect(gen.next().value).toEqual(fork(submitRestore, data));
    expect(gen.next().value).toEqual(take(ducks.SUBMIT_RESTORE));
  });
  it('watchSubmitPassword - cycle while', () => {
    const gen = watchSubmitPassword();
    expect(gen.next().value).toEqual(take(ducks.SUBMIT_PASSWORD));
    expect(gen.next(ducks.submitPassword(email)).value).toEqual(put(ducks.request(ducks.SUBMIT_PASSWORD)));
    expect(gen.next().value).toEqual(fork(submitPassword, email));
    expect(gen.next().value).toEqual(take(ducks.SUBMIT_PASSWORD));
  });
});
describe('submitPassword', () => {
  beforeEach(() => {
    errorCode = 1;
    email = {
      email:'mail@mail.ru'
    };
    error = 'ошибка';
  });
  const gen = cloneableGenerator(submitPassword)(email);
  expect(gen.next().value).toEqual(call(callApi, fetchSubmitPassword(email)));
  it('submitPassword - success', () => {
    const clone = gen.clone();
    expect(clone.next({data, errorCode}).value).toEqual(put(ducks.success(ducks.SUBMIT_PASSWORD, data, 'user')));
    clone.next();
    expect(clone.next().done).toEqual(true);
  });
  it('submitPassword - failure: errorCode 32', () => {
    errorCode = 32;
    const clone = gen.clone();
    expect(clone.next({data, errorCode}).value).toEqual(put(ducks.failure(ducks.SUBMIT_PASSWORD, 'Серверная ошибка', 'user')));
    expect(clone.next().done).toEqual(true);
  });
  it('submitPassword - failure: data = null', () => {
    data = null;
    const clone = gen.clone();
    expect(clone.next({data, errorCode, error}).value).toEqual(put(ducks.failure(ducks.SUBMIT_PASSWORD, error, 'user')));
    expect(clone.next().done).toEqual(true);
  });
});
describe('submitRestore', () => {
  let gen: any;
  beforeEach(() => {
    errorCode = 1;
    data = {
      pass: 'qweqew',
      passAgain: 'qweqew',
      tokenPassword: 'asdasdasd'
    };
    error = 'ошибка';
  });
  it('submitRestore - callApi', () => {
    gen = cloneableGenerator(submitRestore)(data);
    expect(gen.next().value).toEqual(call(callApi, fetchSubmitRestore(data)));
  });
  it('submitRestore - success', () => {
    const clone = gen.clone();
    expect(clone.next({data, errorCode}).value).toEqual(put(ducks.success(ducks.SUBMIT_RESTORE, data, 'restore')));
    clone.next();
    expect(clone.next().done).toEqual(true);
  });
  it('submitRestore - failure: errorCode 32', () => {
    errorCode = 32;
    const clone = gen.clone();
    expect(clone.next({data, errorCode}).value).toEqual(put(ducks.failure(ducks.SUBMIT_RESTORE, 'Серверная ошибка', 'restore')));
    expect(clone.next().done).toEqual(true);
  });
  it('submitRestore - failure: data = null', () => {
    data = null;
    const clone = gen.clone();
    expect(clone.next({data, errorCode, error}).value).toEqual(put(ducks.failure(ducks.SUBMIT_RESTORE, error, 'restore')));
    expect(clone.next().done).toEqual(true);
  });
});

