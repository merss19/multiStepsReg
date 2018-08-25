"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ducks = require("../ducks");
var Immutable = require("immutable");
var data = { test: 'test' };
var cb = function (data) { return console.log(data); };
var token = 'test';
var profile = { test: 'test' };
describe('actions creator', function () {
    it('setToken', function () {
        var expectedAction = {
            type: ducks.SET_TOKEN,
            data: data
        };
        expect(ducks.setToken(data)).toEqual(expectedAction);
    });
    it('submitLogin', function () {
        var expectedAction = {
            type: ducks.SUBMIT_LOGIN,
            data: data,
            cb: cb
        };
        expect(ducks.submitLogin(data, cb)).toEqual(expectedAction);
    });
});
describe('reducer', function () {
    it('should return the initial state', function () {
        expect(ducks.data(undefined, { type: 'test' })).toEqual(ducks.initialStateImmutable);
    });
    it('case SUCCESS', function () {
        expect(ducks.data(ducks.initialStateImmutable, ducks.success('GET_PROFILE', profile, 'profile')))
            .toEqual(Immutable.fromJS({
            authToken: '',
            profile: profile,
            errMsg: ''
        }));
    });
    it('case SET_TOKEN', function () {
        expect(ducks.data(ducks.initialStateImmutable, ducks.setToken(token)))
            .toEqual(Immutable.fromJS({
            authToken: token,
            profile: {},
            errMsg: ''
        }));
    });
});
