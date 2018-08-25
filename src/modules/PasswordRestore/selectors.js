"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reselect_1 = require("reselect");
var FetchDucks_1 = require("modules/FetchDucks");
var ducks_1 = require("./ducks");
exports.selectIsFetching = (_a = FetchDucks_1.fetchDucks(ducks_1.moduleName), _a.selectIsFetching), exports.selectIsLoad = _a.selectIsLoad, exports.selectErrMsg = _a.selectErrMsg, exports.selectIsError = _a.selectIsError;
var state = function (state) { return state[ducks_1.moduleName]; };
var resultText = reselect_1.createSelector(state, function (state) { return state.getIn(['data', 'user', 'resultText']); });
var resultCode = reselect_1.createSelector(state, function (state) { return state.getIn(['data', 'user', 'resultCode']); });
var errorMessage = reselect_1.createSelector(state, function (state) { return state.getIn(['data', 'user', 'errorMessage']); });
var token = reselect_1.createSelector(state, function (state) { return state.getIn(['data', 'token']); });
exports.selectToken = reselect_1.createSelector(token, function (token) {
    return token;
});
exports.selectResultText = reselect_1.createSelector(resultText, function (resultText) {
    return resultText;
});
exports.selectResultCode = reselect_1.createSelector(resultCode, function (resultCode) {
    return resultCode;
});
exports.selectErrorMessage = reselect_1.createSelector(errorMessage, function (errorMessage) {
    return errorMessage;
});
var _a;
