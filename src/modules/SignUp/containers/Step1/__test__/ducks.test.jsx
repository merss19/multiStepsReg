"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ducks = require("../ducks");
var Immutable = require("immutable");
var const_1 = require("../../../const");
var data = {
    pass: 'sdfsdf',
    passAgain: 'sdfsdf',
    tokenPassword: 'qwe123qweqwe'
};
var cb = function (data) { return console.log(data); };
var programs = { test: 'test' };
describe('actions creator', function () {
    it('userCreate', function () {
        var data = {
            email: 'mail@mail.ru'
        };
        var expectedAction = {
            type: ducks.USER_CREATE,
            data: data,
            cb: cb
        };
        expect(ducks.userCreate(data, cb)).toEqual(expectedAction);
    });
    it('changeStep', function () {
        var expectedAction = {
            type: ducks.CHANGE_STEP,
            data: data
        };
        expect(ducks.changeStep(data)).toEqual(expectedAction);
    });
    it('setProgramName', function () {
        var expectedAction = {
            type: ducks.SET_PROGRAM_NAME,
            data: data
        };
        expect(ducks.setProgramName(data)).toEqual(expectedAction);
    });
});
describe('reducer', function () {
    it('should return the initial state', function () {
        expect(ducks.data(undefined, { type: 'test' })).toEqual(ducks.initialStateImmutable);
    });
    it('case SET_PROGRAM_NAME', function () {
        expect(ducks.data(ducks.initialStateImmutable, ducks.setProgramName('hero')))
            .toEqual(Immutable.fromJS({
            step: const_1.Steps.one,
            programName: 'hero',
            userProfile: {}
        }));
    });
    it('case CHANGE_STEP', function () {
        expect(ducks.data(ducks.initialStateImmutable, ducks.changeStep(const_1.Steps.two)))
            .toEqual(Immutable.fromJS({
            step: const_1.Steps.two,
            programName: '',
            userProfile: {}
        }));
    });
});
