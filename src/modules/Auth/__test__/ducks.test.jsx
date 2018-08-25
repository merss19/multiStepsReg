"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ducks = require("../ducks");
var Immutable = require("immutable");
var data = { test: 'test' };
var cb = function (data) { return console.log(data); };
var cbFail = function (data) { return console.log(data); };
var isAuth = false;
var user = { test: 'test' };
describe('actions creator', function () {
    it('checkAuth', function () {
        var expectedAction = {
            type: ducks.CHECK_AUTH,
            cb: cb,
            cbFail: cbFail
        };
        expect(ducks.checkAuth(cb, cbFail)).toEqual(expectedAction);
    });
    it('setAuth', function () {
        var expectedAction = {
            type: ducks.SET_AUTH,
            data: data
        };
        expect(ducks.setAuth(data)).toEqual(expectedAction);
    });
});
describe('reducer', function () {
    it('should return the initial state', function () {
        expect(ducks.data(undefined, { type: 'test' })).toEqual(ducks.initialStateImmutable);
    });
    it('case SUCCESS', function () {
        expect(ducks.data(ducks.initialStateImmutable, ducks.success('CHECK_AUTH', user, 'user')))
            .toEqual(Immutable.fromJS({
            user: user,
            isAuth: false,
            errMsg: ''
        }));
    });
    it('case SET_AUTH', function () {
        expect(ducks.data(ducks.initialStateImmutable, ducks.setAuth(isAuth)))
            .toEqual(Immutable.fromJS({
            user: {},
            isAuth: isAuth,
            errMsg: ''
        }));
    });
});
