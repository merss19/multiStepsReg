"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reselect_1 = require("reselect");
var isOpen = function (state) { return state.modal.get('isOpen'); };
exports.selectIsOpen = reselect_1.createSelector(isOpen, function (isOpen) {
    return isOpen;
});
