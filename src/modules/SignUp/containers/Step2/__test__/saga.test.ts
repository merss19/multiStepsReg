import {take, fork, put, all, call, select} from 'redux-saga/effects';
import {callApi} from 'tools/api';
import {StepTwoSaga, watchGetPackage, watchGetPrograms, watchPaymentCreate, getPackage, paymentCreate} from '../saga';
import * as ducks from '../ducks';
import {fetchGetPackage, fetchPaymentCreate} from "../api";
import {cloneableGenerator} from 'redux-saga/utils';
import {selectPackages} from "../../../selectors";
import configureStore from '../../../../../store';
const store = configureStore();
const cb = jest.fn();
let flg = true;
const errorMessage = 'errorMessage';
let data = [
  {
    name: '1 человек',
    isActive: false,
    id: 1
  },
  {
    name: '2 человек',
    isActive: false,
    id: 2
  },
  {
    name: '1 ЧЕЛОВЕК + ФИТНЕС-БРАСЛЕТ',
    isActive: false,
    id: 3
  },
  {
    name: '1 ЧЕЛОВЕК + КОВРИК',
    isActive: false,
    id: 4
  },
  {
    name: '3 человек',
    isActive: false,
    id: 5
  }
];
/*describe('StepTwoSaga', () => {
  let errorCode: number;
  let error: string;
  beforeEach(() => {
    errorCode = 1;
    error = 'ошибка';
  });
  it('StepTwoSaga', () => {
    const gen = StepTwoSaga();
    expect(gen.next().value).toEqual(all([
      fork(watchGetPrograms),
      fork(watchGetPackage),
      fork(watchPaymentCreate)
    ]));
  });
  it('watchGetPrograms - cycle while', () => {
    const gen = watchGetPrograms()
    expect(gen.next().value).toEqual(take(ducks.GET_PROGRAMS));
    expect(gen.next(ducks.getPrograms(data, cb)).value).toEqual(put(ducks.request(ducks.GET_PROGRAMS)));
    expect(gen.next().value).toEqual(fork(getPrograms));
    expect(gen.next().value).toEqual(take(ducks.GET_PROGRAMS));
  });
    describe('getPrograms', () => {
    const gen = cloneableGenerator(getPrograms)();
    expect(gen.next().value).toEqual(call(callApi, fetchGetPrograms()));
    it('getPrograms - success', () => {
      const clone = gen.clone();
      expect(clone.next({data, errorCode}).value).toEqual(put(ducks.success(ducks.GET_PROGRAMS, data, 'programs')));
      expect(clone.next().done).toEqual(true);
    });
    it('getPrograms - failure: errorCode 32', () => {
      errorCode = 32;
      const clone = gen.clone();
      expect(clone.next({data, errorCode}).value).toEqual(put(ducks.failure(ducks.GET_PROGRAMS, 'Серверная ошибка', 'programs')));
      expect(clone.next().done).toEqual(true);
    });
    it('getPrograms - failure: data = null', () => {
      data = null;
      const clone = gen.clone();
      expect(clone.next({data, errorCode, error}).value).toEqual(put(ducks.failure(ducks.GET_PROGRAMS, error, 'programs')));
      expect(clone.next().done).toEqual(true);
    });
  });
  it('watchGetPackage - cycle while', () => {
    const gen = watchGetPackage();
    const data = 'test';
    expect(gen.next().value).toEqual(take(ducks.GET_PACKAGE));
    expect(gen.next({data, flg}).value).toEqual(fork(getPackage, data, flg));
    expect(gen.next().value).toEqual(take(ducks.GET_PACKAGE));
  });
  describe('getPackage', () => {
    const payload = 'test';
    const gen = cloneableGenerator(getPackage)(payload, flg);
    //expect(gen.next().value).toEqual(select(selectPackages));
    it('pack === {}, flg === true', () => {
      const clone = gen.clone();
      const payload = 'test';
      expect(clone.next().value).toEqual(select(selectPackages));
      expect(clone.next(ducks.getPackage()).value).toEqual(put(ducks.request(ducks.GET_PACKAGE)));
      expect(clone.next().value).toEqual(call(callApi, fetchGetPackage(payload)));
      expect(clone.next({data, errorCode}).value).toEqual(put(ducks.success(ducks.GET_PACKAGE, data, 'packages')));
      expect(clone.next().done).toEqual(true);
    });
    it(' failure: errorCode 32', () => {
      errorCode = 32;
      const clone = gen.clone();
      const payload = 'qweqwe';
      expect(clone.next().value).toEqual(select(selectPackages));
      expect(clone.next(ducks.getPackage()).value).toEqual(put(ducks.request(ducks.GET_PACKAGE)));
      expect(clone.next().value).toEqual(call(callApi, fetchGetPackage(payload)));
      expect(clone.next({
        data,
        errorCode
      }).value).toEqual(put(ducks.failure(ducks.GET_PACKAGE, 'Серверная ошибка', 'packages')));
      expect(clone.next().done).toEqual(true);
    });
    it('failure: errorCode 3', () => {
      errorCode = 3;
      const clone = gen.clone();
      const payload = 'qweqwe';
      expect(clone.next().value).toEqual(select(selectPackages));
      expect(clone.next(ducks.getPackage()).value).toEqual(put(ducks.request(ducks.GET_PACKAGE)));
      expect(clone.next().value).toEqual(call(callApi, fetchGetPackage(payload)));
      expect(clone.next({
        data,
        errorCode,
        errorMessage
      }).value).toEqual(put(ducks.failure(ducks.GET_PACKAGE, errorMessage, 'packages')));
      expect(clone.next().value).toEqual(put(ducks.promoError(errorMessage)));
      expect(clone.next().done).toEqual(true);
    });
    it('paymentManual - failure: data = null', () => {
      data = null;
      const clone = gen.clone();
      const payload = 'qweqwe';
      expect(clone.next().value).toEqual(select(selectPackages));
      expect(clone.next(ducks.getPackage()).value).toEqual(put(ducks.request(ducks.GET_PACKAGE)));
      expect(clone.next().value).toEqual(call(callApi, fetchGetPackage(payload)));
      expect(clone.next({
        data,
        errorCode,
        error
      }).value).toEqual(put(ducks.failure(ducks.GET_PACKAGE, error, 'packages')));
      expect(clone.next().done).toEqual(true);
    });
  });
  /!*it('pack === {}, flg === false', () => {
    const payload = 'asdasd';
    flg = false;
    store.dispatch(ducks.success(ducks.GET_PACKAGE, data, 'packages'));
    console.log('---------------')
    const gen = cloneableGenerator(getPackage)(payload, false);
    expect(gen.next({asd:'asd'}).value).toEqual(select(selectPackages));
    console.log('++++++++')
    console.log(gen.next().value)
  });*!/
  it('watchPaymentCreate - cycle while', () => {
    const data = {
      authToken: 'test',
      data: {
        program: 1,
        package: 2,
        promoName : 'tele2',
        isShare : true
      }
    };
    const gen = watchPaymentCreate();
    expect(gen.next().value).toEqual(take(ducks.PAYMENT_CREATE));
    expect(gen.next(ducks.paymentCreate(data, cb)).value).toEqual(put(ducks.request(ducks.PAYMENT_CREATE)));
    expect(gen.next().value).toEqual(fork(paymentCreate, data, cb));
    expect(gen.next().value).toEqual(take(ducks.PAYMENT_CREATE));
  });
  describe('paymentCreate', () => {
    const payload = {
      authToken: 'test',
      data: {
        program: 1,
        package: 2,
        promoName : 'tele2',
        isShare : true
      }
    };
    const token = 'qweqwe';
    const gen = cloneableGenerator(paymentCreate)(payload, cb);
    expect(gen.next().value).toEqual(call(callApi, fetchPaymentCreate(payload)));
    it('paymentCreate, success', () => {
      let data = {
          email: 'test@mail.ru',
          password: '123456'
      };
      const clone = gen.clone();
      expect(clone.next({data, errorCode}).value).toEqual(put(ducks.success(ducks.PAYMENT_CREATE, data, 'payment')));
      clone.next()
      expect(cb).toHaveBeenCalledWith(data);
      expect(clone.next().done).toEqual(true);
    });
    it('paymentCreate - failure: errorCode 32', () => {
      errorCode = 32;
      const clone = gen.clone();
      expect(clone.next({
        data,
        errorCode
      }).value).toEqual(put(ducks.failure(ducks.PAYMENT_CREATE, 'Серверная ошибка', 'payment')));
      expect(clone.next().done).toEqual(true);
    });
    it('paymentCreate - failure: data = null', () => {
      data = null;
      const clone = gen.clone();
      expect(clone.next({
        data,
        errorCode,
        error
      }).value).toEqual(put(ducks.failure(ducks.PAYMENT_CREATE, error, 'payment')));
      expect(clone.next().done).toEqual(true);
    });
  });
});*/

