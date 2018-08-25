import {take, fork, put, all, call} from 'redux-saga/effects';
import {callApi} from 'tools/api';
import {StepOneSaga, watchChangeSteps, watchUserCreate, userCreate} from '../saga';
import * as ducks from '../ducks';
import {fetchSubmitLogin} from "modules/Login/api";
import { cloneableGenerator } from 'redux-saga/utils';
import {fetchUserCreate} from "modules/SignUp/containers/Step1/api";
let data = [
  {
    id: 1,
    name: 'hero',
    isActive: false
  },
  {
    id: 2,
    name: 'mother',
    isActive: false
  },
  {
    id: 3,
    name: 'extreme',
    isActive: false
  },
  {
    id: 4,
    name: 'tomorrow',
    isActive: false
  }
];
const cb = jest.fn();
describe('StepOneSaga', () => {
  let errorCode: number;
  let error: string;
  beforeEach(() => {
    errorCode = 1;
    error = 'ошибка';
  });
  it('StepOneSaga', () => {
    const gen = StepOneSaga();
    expect(gen.next().value).toEqual(all([
      fork(watchUserCreate),
      fork(watchChangeSteps)
    ]));
  });
  it('watchUserCreate - cycle while', () => {
    const data = {
      email: 'mail@msil.com',
      password: 'qweqew',
      passwordAgain: 'qweqwe',
      gender: 'male',
    };
    const gen = watchUserCreate();
    expect(gen.next().value).toEqual(take(ducks.USER_CREATE));
    expect(gen.next(ducks.userCreate(data, cb)).value).toEqual(put(ducks.request(ducks.USER_CREATE)));
    expect(gen.next().value).toEqual(fork(userCreate, data, cb));
    expect(gen.next().value).toEqual(take(ducks.USER_CREATE));
  });
  describe('userCreate', () => {
    const payload = {
      email: 'mail@msil.com',
      password: 'qweqew',
      passwordAgain: 'qweqwe',
      gender: 'male',
    };
   let data = {
      test:'test'
    };
    const gen = cloneableGenerator(userCreate)(payload, cb);
    expect(gen.next().value).toEqual(call(callApi, fetchUserCreate(payload)));
    it('userCreate - success', () => {
      const clone = gen.clone();
      expect(clone.next({data, errorCode}).value).toEqual(put(ducks.success(ducks.USER_CREATE, data, 'userProfile')));
      expect(clone.next().done).toEqual(true);
    });
    it('userCreate - failure: errorCode 32', () => {
      errorCode = 32;
      const clone = gen.clone();
      expect(clone.next({data, errorCode}).value).toEqual(put(ducks.failure(ducks.USER_CREATE, 'Серверная ошибка', 'userProfile')));
      expect(clone.next().done).toEqual(true);
    });
    it('userCreate - failure: data = null', () => {
      data = null;
      const clone = gen.clone();
      expect(clone.next({data, errorCode, error}).value).toEqual(put(ducks.failure(ducks.USER_CREATE, error, 'userProfile')));
      expect(clone.next().done).toEqual(true);
    });
  });
  it('watchChangeSteps - cycle while', () => {
    const data = 2;
    const gen = watchChangeSteps();
    expect(gen.next().value).toEqual(take(ducks.CHANGE_STEP));
    expect(gen.next({data}).value).toEqual(put(ducks.changeStep(data)));
    expect(gen.next().value).toEqual(take(ducks.CHANGE_STEP));
  });
});

