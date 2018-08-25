"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("tools/utils");
var Immutable = require("immutable");
var FetchDucks_1 = require("modules/FetchDucks");
var redux_immutable_1 = require("redux-immutable");
exports.moduleName = 'auth';
exports.SUCCESS = (_a = FetchDucks_1.fetchDucks(exports.moduleName), _a.SUCCESS), exports.request = _a.request, exports.success = _a.success, exports.failure = _a.failure, exports.loading = _a.loading;
// Constant
exports.CHECK_AUTH = exports.moduleName + "/CHECK_AUTH";
exports.SET_AUTH = exports.moduleName + "/SET_AUTH";
// Action Creators
exports.checkAuth = utils_1.makeActionCreator(exports.CHECK_AUTH, 'cb', 'cbFail');
exports.setAuth = utils_1.makeActionCreator(exports.SET_AUTH, 'data');
// Reducer
var initialState = {
    user: {},
    isAuth: false,
    errMsg: ''
};
exports.initialStateImmutable = Immutable.fromJS(initialState);
exports.data = function (state, action) {
    if (state === void 0) { state = exports.initialStateImmutable; }
    if (~action.type.indexOf(exports.SUCCESS)) {
        return state.merge((_a = {},
            _a[action.field] = action.data,
            _a));
    }
    switch (action.type) {
        case exports.SET_AUTH:
            return state.merge({
                isAuth: action.data
            });
        default:
            return state;
    }
    var _a;
};
exports.reducer = redux_immutable_1.combineReducers({
    loading: exports.loading,
    data: exports.data
});
var _a;
