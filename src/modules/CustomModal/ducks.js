"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Immutable = require("immutable");
var utils_1 = require("tools/utils");
exports.moduleName = 'modal';
// Constant
exports.TOGGLE_MODAL = exports.moduleName + "/TOGGLE_MODAL";
// Action Creators
exports.toggleModal = utils_1.makeActionCreator(exports.TOGGLE_MODAL, 'data');
// Reducer
var initialState = {
    isOpen: false
};
exports.initialStateImmutable = Immutable.fromJS(initialState);
exports.default = function (state, action) {
    if (state === void 0) { state = exports.initialStateImmutable; }
    switch (action.type) {
        case exports.TOGGLE_MODAL:
            return state.merge({
                isOpen: action.data
            });
        default:
            return state;
    }
};
