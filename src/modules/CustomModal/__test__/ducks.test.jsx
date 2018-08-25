"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ducks_1 = require("../ducks"), ducks = ducks_1;
var Immutable = require("immutable");
var data = false;
describe('actions creator', function () {
    it('toggleModal', function () {
        var expectedAction = {
            type: ducks.TOGGLE_MODAL,
            data: data
        };
        expect(ducks.toggleModal(data)).toEqual(expectedAction);
    });
});
describe('reducer', function () {
    it('should return the initial state', function () {
        expect(ducks_1.default(undefined, { type: 'test' })).toEqual(ducks.initialStateImmutable);
    });
    it('case TOGGLE_MODAL', function () {
        expect(ducks_1.default(ducks.initialStateImmutable, ducks.toggleModal(data)))
            .toEqual(Immutable.fromJS({
            isOpen: data
        }));
    });
});
