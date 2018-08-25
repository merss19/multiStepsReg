"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ducks = require("../ducks");
var Immutable = require("immutable");
var packages = {
    pass: 'sdfsdf',
    passAgain: 'sdfsdf',
    tokenPassword: 'qwe123qweqwe'
};
var cb = function (data) { return console.log(data); };
var flg = true;
describe('actions creator', function () {
    it('getPrograms', function () {
        var expectedAction = {
            type: ducks.GET_PROGRAMS
        };
        expect(ducks.getPrograms()).toEqual(expectedAction);
    });
    it('getPackage', function () {
        var data = 'tele2';
        var expectedAction = {
            type: ducks.GET_PACKAGE,
            data: data,
            flg: flg
        };
        expect(ducks.getPackage(data, flg)).toEqual(expectedAction);
    });
    it('paymentCreate', function () {
        var data = {
            email: 'mail@mail.ru'
        };
        var expectedAction = {
            type: ducks.PAYMENT_CREATE,
            data: data,
            cb: cb
        };
        expect(ducks.paymentCreate(data, cb)).toEqual(expectedAction);
    });
    it('setPromo', function () {
        var data = 'tele2';
        var expectedAction = {
            type: ducks.SET_PROMO,
            data: data
        };
        expect(ducks.setPromo(data)).toEqual(expectedAction);
    });
    it('setChoosenProgram', function () {
        var data = 17;
        var expectedAction = {
            type: ducks.CHOOSEN_PROGRAM,
            data: data
        };
        expect(ducks.setChoosenProgram(data)).toEqual(expectedAction);
    });
    it('setPackageType', function () {
        var data = 1;
        var expectedAction = {
            type: ducks.SET_PACKAGE_TYPE,
            data: data
        };
        expect(ducks.setPackageType(data)).toEqual(expectedAction);
    });
});
describe('reducer', function () {
    it('should return the initial state', function () {
        expect(ducks.data(undefined, { type: 'test' })).toEqual(ducks.initialStateImmutable);
    });
    it('case SUCCESS', function () {
        expect(ducks.data(ducks.initialStateImmutable, ducks.success('GET_PACKAGE', packages, 'packages')))
            .toEqual(Immutable.fromJS({
            choosenProgram: 0,
            choosenPackageType: 1,
            packages: packages,
            programs: [],
            promo: '',
            promoError: '',
            payment: {}
        }));
    });
    it('case CHOOSEN_PROGRAM', function () {
        expect(ducks.data(ducks.initialStateImmutable, ducks.setChoosenProgram(17)))
            .toEqual(Immutable.fromJS({
            choosenProgram: 17,
            choosenPackageType: 1,
            packages: [],
            programs: [],
            promo: '',
            promoError: '',
            payment: {}
        }));
    });
    it('case SET_PACKAGE_TYPE', function () {
        expect(ducks.data(ducks.initialStateImmutable, ducks.setPackageType(1)))
            .toEqual(Immutable.fromJS({
            choosenProgram: 0,
            choosenPackageType: 1,
            packages: [],
            programs: [],
            promo: '',
            promoError: '',
            payment: {}
        }));
    });
    it('case SET_PROMO', function () {
        expect(ducks.data(ducks.initialStateImmutable, ducks.setPromo('tele2')))
            .toEqual(Immutable.fromJS({
            choosenProgram: 0,
            choosenPackageType: 1,
            packages: [],
            programs: [],
            promo: 'tele2',
            promoError: '',
            payment: {}
        }));
    });
    it('case PROMO_ERROR', function () {
        expect(ducks.data(ducks.initialStateImmutable, ducks.promoError('error')))
            .toEqual(Immutable.fromJS({
            choosenProgram: 0,
            choosenPackageType: 1,
            packages: [],
            programs: [],
            promo: '',
            promoError: 'error',
            payment: {}
        }));
    });
});
