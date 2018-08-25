"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reselect_1 = require("reselect");
var ducks_1 = require("./ducks");
var FetchDucks_1 = require("modules/FetchDucks");
exports.selectIsFetching = (_a = FetchDucks_1.fetchDucks(ducks_1.moduleName), _a.selectIsFetching), exports.selectIsLoad = _a.selectIsLoad, exports.selectErrMsg = _a.selectErrMsg, exports.selectIsError = _a.selectIsError;
var state = function (state) { return state[ducks_1.moduleName]; };
var isAuth = reselect_1.createSelector(state, function (state) { return state.getIn(['data', 'isAuth']); });
var user = reselect_1.createSelector(state, function (state) { return state.getIn(['data', 'user']); });
exports.selectUser = reselect_1.createSelector(user, function (user) {
    return user;
});
exports.selectIsAuth = reselect_1.createSelector(isAuth, function (isAuth) {
    return isAuth;
});
var _a;
