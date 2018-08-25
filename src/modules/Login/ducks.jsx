"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("tools/utils");
var Immutable = require("immutable");
var FetchDucks_1 = require("modules/FetchDucks");
var redux_immutable_1 = require("redux-immutable");
exports.moduleName = 'login';
exports.SUCCESS = (_a = FetchDucks_1.fetchDucks(exports.moduleName), _a.SUCCESS), exports.request = _a.request, exports.success = _a.success, exports.failure = _a.failure, exports.setError = _a.setError, exports.loading = _a.loading;
//Constants
exports.SET_TOKEN = exports.moduleName + "/SET_TOKEN";
exports.SUBMIT_LOGIN = exports.moduleName + "/SUBMIT_LOGIN";
// Action Creators
exports.submitLogin = utils_1.makeActionCreator(exports.SUBMIT_LOGIN, 'data', 'cb');
exports.setToken = utils_1.makeActionCreator(exports.SET_TOKEN, 'data');
// Reducer
exports.initialState = {
    authToken: '',
    profile: {},
    errMsg: ''
};
exports.initialStateImmutable = Immutable.fromJS(exports.initialState);
exports.data = function (state, action) {
    if (state === void 0) { state = exports.initialStateImmutable; }
    if (~action.type.indexOf(exports.SUCCESS)) {
        return state.merge((_a = {},
            _a[action.field] = action.data,
            _a));
    }
    switch (action.type) {
        case exports.SET_TOKEN:
            return state.set('authToken', action.data);
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
