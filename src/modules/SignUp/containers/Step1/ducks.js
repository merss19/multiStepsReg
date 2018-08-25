"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Immutable = require("immutable");
var redux_immutable_1 = require("redux-immutable");
var FetchDucks_1 = require("modules/FetchDucks");
var utils_1 = require("tools/utils");
var const_1 = require("../../const");
exports.moduleName = 'signUp';
exports.subModuleName = 'stepOne';
exports.SUCCESS = (_a = FetchDucks_1.fetchDucks(exports.moduleName, exports.subModuleName), _a.SUCCESS), exports.request = _a.request, exports.success = _a.success, exports.failure = _a.failure, exports.setError = _a.setError, exports.loading = _a.loading;
// Constant
exports.module = exports.moduleName + "/" + exports.subModuleName;
exports.SET_PROGRAM_NAME = exports.module + "/SET_PROGRAM_NAME";
exports.USER_CREATE = exports.module + "/USER_CREATE";
exports.CHANGE_STEP = exports.module + "/CHANGE_STEP";
// Action Creators
exports.userCreate = utils_1.makeActionCreator(exports.USER_CREATE, 'data', 'cb');
exports.changeStep = utils_1.makeActionCreator(exports.CHANGE_STEP, 'data');
exports.setProgramName = utils_1.makeActionCreator(exports.SET_PROGRAM_NAME, 'data');
// Reducer
var initialState = {
    step: const_1.Steps.one,
    programName: '',
    userProfile: {}
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
        case exports.SET_PROGRAM_NAME:
            return state.set('programName', action.data);
        case exports.CHANGE_STEP:
            return state.set('step', action.data);
        default:
            return state;
    }
    var _a;
};
exports.stepOneReducer = redux_immutable_1.combineReducers({
    loading: exports.loading,
    data: exports.data
});
var _a;
