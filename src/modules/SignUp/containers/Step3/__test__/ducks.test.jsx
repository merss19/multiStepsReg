"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ducks = require("../ducks");
var Immutable = require("immutable");
var payInfo = {
    test: 'test'
};
var cb = function (data) { return console.log(data); };
describe('actions creator', function () {
    it('paymentManual', function () {
        var data = 'tele2';
        var expectedAction = {
            type: ducks.PAYMENT_MANUAL,
            data: data,
            cb: cb
        };
        expect(ducks.paymentManual(data, cb)).toEqual(expectedAction);
    });
    it('paymentInfo', function () {
        var data = 'asdasd';
        var expectedAction = {
            type: ducks.PAYMENT_INFO,
            data: data
        };
        expect(ducks.paymentInfo(data)).toEqual(expectedAction);
    });
});
describe('reducer', function () {
    it('should return the initial state', function () {
        expect(ducks.data(undefined, { type: 'test' })).toEqual(ducks.initialStateImmutable);
    });
    it('case SUCCESS', function () {
        expect(ducks.data(ducks.initialStateImmutable, ducks.success('PAYMENT_MANUAL', payInfo, 'payInfo')))
            .toEqual(Immutable.fromJS({
            payInfo: payInfo
        }));
    });
});
