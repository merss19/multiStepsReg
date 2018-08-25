"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reselect_1 = require("reselect");
var ducks_1 = require("./ducks");
var FetchDucks_1 = require("modules/FetchDucks");
exports.selectIsFetching = (_a = FetchDucks_1.fetchDucks(ducks_1.moduleName), _a.selectIsFetching), exports.selectIsLoad = _a.selectIsLoad, exports.selectErrMsg = _a.selectErrMsg, exports.selectIsError = _a.selectIsError;
var state = function (state) { return state[ducks_1.moduleName]; };
var profile = reselect_1.createSelector(state, function (state) {
    return state.getIn(['data', 'profile']);
});
var authToken = reselect_1.createSelector(state, function (state) { return state.getIn(['data', 'authToken']); });
exports.selectAuthToken = reselect_1.createSelector(authToken, function (authToken) {
    return authToken;
});
exports.selectProfile = reselect_1.createSelector(profile, function (profile) {
    return profile;
});
var _a;
