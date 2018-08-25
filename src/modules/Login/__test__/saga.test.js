"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var effects_1 = require("redux-saga/effects");
var api_1 = require("tools/api");
var saga_1 = require("../saga");
var ducks = require("../ducks");
var api_2 = require("modules/Login/api");
var utils_1 = require("redux-saga/utils");
var cb = jest.fn();
describe('loginModuleSaga', function () {
    var errorCode;
    var data;
    var error;
    beforeEach(function () {
        errorCode = 1;
        data = {
            email: 'test@mail.ru',
            password: 'qweqew'
        };
        error = 'ошибка';
    });
    it('loginModuleSaga', function () {
        var gen = saga_1.default();
        expect(gen.next().value).toEqual(effects_1.all([effects_1.fork(saga_1.watchSubmitLogin)]));
    });
    it('watchSubmitLogin - cycle while', function () {
        var gen = saga_1.watchSubmitLogin();
        expect(gen.next().value).toEqual(effects_1.take(ducks.SUBMIT_LOGIN));
        expect(gen.next(ducks.submitLogin(data, cb)).value).toEqual(effects_1.put(ducks.request(ducks.SUBMIT_LOGIN)));
        expect(gen.next().value).toEqual(effects_1.fork(saga_1.submitLogin, data, cb));
        expect(gen.next().value).toEqual(effects_1.take(ducks.SUBMIT_LOGIN));
    });
    describe('submitLogin', function () {
        var gen = utils_1.cloneableGenerator(saga_1.submitLogin)(data, cb);
        expect(gen.next().value).toEqual(effects_1.call(api_1.callApi, api_2.fetchSubmitLogin(data)));
        it('submitLogin - success', function () {
            var clone = gen.clone();
            expect(clone.next({ data: data, errorCode: errorCode }).value).toEqual(effects_1.put(ducks.success(ducks.SUBMIT_LOGIN, data, 'profile')));
            clone.next();
            expect(cb).toHaveBeenCalledWith(data);
            expect(clone.next().done).toEqual(true);
        });
        it('submitLogin - failure: errorCode 32', function () {
            errorCode = 32;
            var clone = gen.clone();
            expect(clone.next({ data: data, errorCode: errorCode }).value).toEqual(effects_1.put(ducks.failure(ducks.SUBMIT_LOGIN, 'Серверная ошибка', 'profile')));
            expect(clone.next().done).toEqual(true);
        });
        it('submitLogin - failure: errorCode 130', function () {
            errorCode = 130;
            var clone = gen.clone();
            expect(clone.next({ data: data, errorCode: errorCode }).value).toEqual(effects_1.put(ducks.failure(ducks.SUBMIT_LOGIN, 'Неверный пароль', 'profile')));
            expect(clone.next().done).toEqual(true);
        });
        it('submitLogin - failure: errorCode 4', function () {
            errorCode = 4;
            var clone = gen.clone();
            expect(clone.next({ data: data, errorCode: errorCode }).value).toEqual(effects_1.put(ducks.failure(ducks.SUBMIT_LOGIN, 'Пользователь не найден', 'profile')));
            expect(clone.next().done).toEqual(true);
        });
        it('submitLogin - failure: data = null', function () {
            data = null;
            var clone = gen.clone();
            expect(clone.next({ data: data, errorCode: errorCode, error: error }).value).toEqual(effects_1.put(ducks.failure(ducks.SUBMIT_LOGIN, error, 'profile')));
            expect(clone.next().done).toEqual(true);
        });
    });
});
