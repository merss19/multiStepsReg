"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("tools/utils");
var Immutable = require("immutable");
var reselect_1 = require("reselect");
function fetchDucks(moduleName, subModuleName) {
    var module = subModuleName ? moduleName + "/" + subModuleName : "" + moduleName;
    var REQUEST = module + "/REQUEST";
    var SUCCESS = module + "/SUCCESS";
    var FAILURE = module + "/ERROR";
    var SET_ERROR = module + "/SET_ERROR";
    var request = utils_1.makeActionCreator(REQUEST, 'action');
    var success = utils_1.makeActionCreator(SUCCESS, 'action', 'data', 'field');
    var failure = utils_1.makeActionCreator(FAILURE, 'action', 'data');
    var setError = utils_1.makeActionCreator(SET_ERROR, 'data');
    var initialState = {
        isFetching: false,
        isLoad: false,
        isError: false,
        errMsg: ''
        //item: {}
    };
    // Reducer
    var initialStateImmutable = Immutable.fromJS(initialState);
    var loading = function (state, action) {
        if (state === void 0) { state = initialStateImmutable; }
        if (~action.type.indexOf(REQUEST)) {
            return state.merge({
                isFetching: true,
                isError: false,
                isLoad: false
            });
        }
        if (~action.type.indexOf(SUCCESS)) {
            return state.merge({
                isFetching: false,
                isLoad: true,
                isError: false
            });
        }
        if (~action.type.indexOf(FAILURE)) {
            return state.merge({
                isFetching: false,
                isLoad: false,
                isError: true,
                errMsg: action.data
            });
        }
        switch (action.type) {
            case SET_ERROR:
                return state.set('isError', action.data);
            default:
                return state;
        }
    };
    //selectors
    var state = function (state) { return state[moduleName]; };
    if (subModuleName) {
        state = function (state) { return state[moduleName].get(subModuleName); };
    }
    var isFetching = reselect_1.createSelector(state, function (state) {
        return state.getIn(['loading', 'isFetching']);
    });
    var isLoad = reselect_1.createSelector(state, function (state) { return state.getIn(['loading', 'isLoad']); });
    var isError = reselect_1.createSelector(state, function (state) { return state.getIn(['loading', 'isError']); });
    var errMsg = reselect_1.createSelector(state, function (state) { return state.getIn(['loading', 'errMsg']); });
    var selectErrMsg = reselect_1.createSelector(errMsg, function (errMsg) {
        return errMsg;
    });
    var selectIsFetching = reselect_1.createSelector(isFetching, function (isFetching) {
        return isFetching;
    });
    var selectIsLoad = reselect_1.createSelector(isLoad, function (isLoad) {
        return isLoad;
    });
    var selectIsError = reselect_1.createSelector(isError, function (isError) {
        return isError;
    });
    return {
        REQUEST: REQUEST,
        SUCCESS: SUCCESS,
        FAILURE: FAILURE,
        SET_ERROR: SET_ERROR,
        request: request,
        success: success,
        failure: failure,
        setError: setError,
        loading: loading,
        initialStateImmutable: initialStateImmutable,
        selectIsFetching: selectIsFetching,
        selectIsLoad: selectIsLoad,
        selectIsError: selectIsError,
        selectErrMsg: selectErrMsg
    };
}
exports.fetchDucks = fetchDucks;
