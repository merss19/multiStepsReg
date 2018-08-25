"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Immutable = require("immutable");
var index_1 = require("./index");
var store_1 = require("../../store");
var store = store_1.default();
var _a = index_1.fetchDucks('signUp', 'stepOne'), REQUEST = _a.REQUEST, SUCCESS = _a.SUCCESS, FAILURE = _a.FAILURE, SET_ERROR = _a.SET_ERROR, request = _a.request, success = _a.success, failure = _a.failure, setError = _a.setError, loading = _a.loading, initialStateImmutable = _a.initialStateImmutable, selectIsFetching = _a.selectIsFetching, selectIsLoad = _a.selectIsLoad, selectIsError = _a.selectIsError, selectErrMsg = _a.selectErrMsg;
describe('actions creators', function () {
    var GET_PROGRAMS = 'signUp/stepOne/GET_PROGRAMS';
    it('request', function () {
        var expectedAction = {
            type: REQUEST + '/GET_PROGRAMS'
        };
        expect(request(GET_PROGRAMS)).toEqual(expectedAction);
    });
    it('success', function () {
        var data = {
            test: 'test'
        };
        var field = 'programs';
        var expectedAction = {
            type: SUCCESS + '/GET_PROGRAMS',
            data: data,
            field: field
        };
        expect(success(GET_PROGRAMS, data, 'programs')).toEqual(expectedAction);
    });
    it('failure', function () {
        var data = 'error';
        var expectedAction = {
            type: FAILURE + '/GET_PROGRAMS',
            data: data
        };
        expect(failure(GET_PROGRAMS, data)).toEqual(expectedAction);
    });
    it('setError', function () {
        var data = true;
        var expectedAction = {
            type: SET_ERROR,
            data: data
        };
        expect(setError(data)).toEqual(expectedAction);
    });
});
describe('reducer', function () {
    it('should return the initial state', function () {
        expect(loading(undefined, { type: 'test' })).toEqual(initialStateImmutable);
    });
    it('case REQUEST', function () {
        expect(loading(initialStateImmutable, request()))
            .toEqual(Immutable.fromJS({
            isFetching: true,
            isLoad: false,
            isError: false,
            errMsg: ''
        }));
    });
    it('case SUCCESS', function () {
        var profile = {
            test: 'test'
        };
        expect(loading(initialStateImmutable, success('GET_PROFILE', profile, 'profile')))
            .toEqual(Immutable.fromJS({
            isFetching: false,
            isLoad: true,
            isError: false,
            errMsg: ''
        }));
    });
    it('case FAILURE', function () {
        var error = 'error';
        expect(loading(initialStateImmutable, failure('GET_PROFILE', error, 'profile')))
            .toEqual(Immutable.fromJS({
            isFetching: false,
            isLoad: false,
            isError: true,
            errMsg: error
        }));
    });
    it('case SET_ERROR', function () {
        var data = true;
        expect(loading(initialStateImmutable, setError(data)))
            .toEqual(Immutable.fromJS({
            isFetching: false,
            isLoad: false,
            isError: data,
            errMsg: ''
        }));
    });
});
describe('selectorsr', function () {
    var state = store.getState();
    var isFetching = state.signUp.getIn(['stepOne', 'loading', 'isFetching']);
    var isLoad = state.signUp.getIn(['stepOne', 'loading', 'isLoad']);
    var isError = state.signUp.getIn(['stepOne', 'loading', 'isError']);
    var errMsg = state.signUp.getIn(['stepOne', 'loading', 'errMsg']);
    it('selectIsFetching', function () {
        expect(selectIsFetching(state)).toEqual(isFetching);
    });
    it(' selectIsLoad', function () {
        expect(selectIsLoad(state)).toEqual(isLoad);
    });
    it('selectIsError', function () {
        expect(selectIsError(state)).toEqual(isError);
    });
    it('selectErrMsg', function () {
        expect(selectErrMsg(state)).toEqual(errMsg);
    });
});
