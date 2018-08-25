"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Immutable = require("immutable");
var FetchDucks_1 = require("modules/FetchDucks");
var utils_1 = require("tools/utils");
var redux_immutable_1 = require("redux-immutable");
exports.moduleName = 'signUp';
exports.subModuleName = 'stepTwo';
exports.SUCCESS = (_a = FetchDucks_1.fetchDucks(exports.moduleName, exports.subModuleName), _a.SUCCESS), exports.request = _a.request, exports.success = _a.success, exports.failure = _a.failure, exports.loading = _a.loading;
// Constant
exports.module = exports.moduleName + "/" + exports.subModuleName;
exports.CHOOSEN_PROGRAM = exports.module + "/CHOOSEN_PROGRAM";
exports.GET_PROGRAMS = exports.module + "/GET_PROGRAMS";
exports.SET_PACKAGE_TYPE = exports.module + "/SET_PACKAGE_TYPE";
exports.SET_PROMO = exports.module + "/SET_PROMO";
exports.GET_PACKAGE = exports.module + "/GET_PACKAGE";
exports.PAYMENT_CREATE = exports.module + "/PAYMENT_CREATE";
exports.PROMO_ERROR = exports.module + "/PROMO_ERROR";
// Action Creators
exports.getPrograms = utils_1.makeActionCreator(exports.GET_PROGRAMS);
exports.getPackage = utils_1.makeActionCreator(exports.GET_PACKAGE, 'data', 'flg');
exports.paymentCreate = utils_1.makeActionCreator(exports.PAYMENT_CREATE, 'data', 'cb');
exports.setPromo = utils_1.makeActionCreator(exports.SET_PROMO, 'data');
exports.setChoosenProgram = utils_1.makeActionCreator(exports.CHOOSEN_PROGRAM, 'data');
exports.setPackageType = utils_1.makeActionCreator(exports.SET_PACKAGE_TYPE, 'data');
exports.promoError = utils_1.makeActionCreator(exports.PROMO_ERROR, 'data');
// Reducer
var initialState = {
    choosenProgram: 0,
    choosenPackageType: 1,
    packages: [],
    programs: [],
    promo: '',
    promoError: '',
    payment: {}
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
        case exports.CHOOSEN_PROGRAM:
            return state.set('choosenProgram', action.data);
        case exports.SET_PACKAGE_TYPE:
            return state.set('choosenPackageType', action.data);
        case exports.SET_PROMO:
            return state.merge({
                promo: action.data
            });
        case exports.PROMO_ERROR:
            return state.merge({
                promoError: action.data
            });
        default:
            return state;
    }
    var _a;
};
exports.stepTwoReducer = redux_immutable_1.combineReducers({
    loading: exports.loading,
    data: exports.data
});
var _a;
