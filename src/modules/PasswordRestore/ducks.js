"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Immutable = require("immutable");
var redux_immutable_1 = require("redux-immutable");
var FetchDucks_1 = require("modules/FetchDucks");
var utils_1 = require("tools/utils");
exports.moduleName = 'passwordRestore';
exports.SUCCESS = (_a = FetchDucks_1.fetchDucks(exports.moduleName), _a.SUCCESS), exports.request = _a.request, exports.success = _a.success, exports.failure = _a.failure, exports.setError = _a.setError, exports.loading = _a.loading;
// Constant
exports.SUBMIT_RESTORE = exports.moduleName + "/SUBMIT_RESTORE";
exports.SUBMIT_PASSWORD = exports.moduleName + "/SUBMIT_PASSWORD";
exports.SET_RESTORE_TOKEN = exports.moduleName + "/SET_RESTORE_TOKEN";
// Action Creators
exports.submitRestore = utils_1.makeActionCreator(exports.SUBMIT_RESTORE, 'data');
exports.submitPassword = utils_1.makeActionCreator(exports.SUBMIT_PASSWORD, 'data');
exports.setRestoreToken = utils_1.makeActionCreator(exports.SET_RESTORE_TOKEN, 'data');
// Reducer
var initialState = {
    token: null,
    user: {},
    restore: {}
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
        case exports.SET_RESTORE_TOKEN:
            return state.set('token', action.data);
        default:
            return state;
    }
    var _a;
};
exports.passwordRestoreReducer = redux_immutable_1.combineReducers({
    loading: exports.loading,
    data: exports.data
});
var _a;
