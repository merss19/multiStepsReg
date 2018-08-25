"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Immutable = require("immutable");
var FetchDucks_1 = require("modules/FetchDucks");
var utils_1 = require("tools/utils");
var redux_immutable_1 = require("redux-immutable");
exports.moduleName = 'signUp';
exports.subModuleName = 'stepThree';
exports.SUCCESS = (_a = FetchDucks_1.fetchDucks(exports.moduleName, exports.subModuleName), _a.SUCCESS), exports.request = _a.request, exports.success = _a.success, exports.failure = _a.failure, exports.loading = _a.loading;
// Constant
var module = exports.moduleName + "/" + exports.subModuleName;
exports.PAYMENT_MANUAL = module + "/PAYMENT_MANUAL";
exports.PAYMENT_INFO = module + "/PAYMENT_INFO";
// Action Creators
exports.paymentManual = utils_1.makeActionCreator(exports.PAYMENT_MANUAL, 'data', 'cb');
exports.paymentInfo = utils_1.makeActionCreator(exports.PAYMENT_INFO, 'data');
// Reducer
var initialState = {
    payInfo: {}
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
        default:
            return state;
    }
    var _a;
};
exports.stepThreeReducer = redux_immutable_1.combineReducers({
    loading: exports.loading,
    data: exports.data
});
var _a;
