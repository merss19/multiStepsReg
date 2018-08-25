"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ducks = require("../ducks");
var Immutable = require("immutable");
var data = {
    pass: 'sdfsdf',
    passAgain: 'sdfsdf',
    tokenPassword: 'qwe123qweqwe'
};
var restore = { test: 'test' };
describe('actions creator', function () {
    it('submitRestore', function () {
        var expectedAction = {
            type: ducks.SUBMIT_RESTORE,
            data: data
        };
        expect(ducks.submitRestore(data)).toEqual(expectedAction);
    });
    it('submitPassword', function () {
        var data = {
            email: 'mail@mail.ru'
        };
        var expectedAction = {
            type: ducks.SUBMIT_PASSWORD,
            data: data
        };
        expect(ducks.submitPassword(data)).toEqual(expectedAction);
    });
    it('setRestoreToken', function () {
        var data = 'token';
        var expectedAction = {
            type: ducks.SET_RESTORE_TOKEN,
            data: data
        };
        expect(ducks.setRestoreToken(data)).toEqual(expectedAction);
    });
});
describe('reducer', function () {
    it('should return the initial state', function () {
        expect(ducks.data(undefined, { type: 'test' })).toEqual(ducks.initialStateImmutable);
    });
    it('case SUCCESS', function () {
        expect(ducks.data(ducks.initialStateImmutable, ducks.success('SUBMIT_RESTORE', restore, 'restore')))
            .toEqual(Immutable.fromJS({
            token: null,
            user: {},
            restore: restore,
        }));
    });
    it('case SET_RESTORE_TOKEN', function () {
        expect(ducks.data(ducks.initialStateImmutable, ducks.setRestoreToken('token')))
            .toEqual(Immutable.fromJS({
            token: 'token',
            user: {},
            restore: {}
        }));
    });
});
