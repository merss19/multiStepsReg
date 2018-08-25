"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var effects_1 = require("redux-saga/effects");
var api_1 = require("tools/api");
var ducks_1 = require("./ducks");
var api_2 = require("./api");
var utils_1 = require("tools/utils");
var selectors_1 = require("../../selectors");
function getPackage(payload) {
    var pack, _a, data, errorCode, error, errorMessage;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, effects_1.select(selectors_1.selectPackages)];
            case 1:
                pack = _b.sent();
                console.log('selectttttt');
                console.log(payload);
                console.log(pack);
                /* if (pack && !flg) {
                   console.log('returnnnnnn')
                   return;
                 }*/
                return [4 /*yield*/, effects_1.put(ducks_1.request(ducks_1.GET_PACKAGE))];
            case 2:
                /* if (pack && !flg) {
                   console.log('returnnnnnn')
                   return;
                 }*/
                _b.sent();
                return [4 /*yield*/, effects_1.call(api_1.callApi, api_2.fetchGetPackage(payload))];
            case 3:
                _a = _b.sent(), data = _a.data, errorCode = _a.errorCode, error = _a.error, errorMessage = _a.errorMessage;
                if (!(data && errorCode === 1)) return [3 /*break*/, 5];
                return [4 /*yield*/, effects_1.put(ducks_1.success(ducks_1.GET_PACKAGE, utils_1.addActiveFlag(data), 'packages'))];
            case 4:
                _b.sent();
                return [3 /*break*/, 12];
            case 5:
                if (!(errorCode === 32)) return [3 /*break*/, 7];
                return [4 /*yield*/, effects_1.put(ducks_1.failure(ducks_1.GET_PACKAGE, 'Серверная ошибка', 'packages'))];
            case 6:
                _b.sent();
                return [3 /*break*/, 12];
            case 7:
                if (!(errorCode === 3)) return [3 /*break*/, 10];
                return [4 /*yield*/, effects_1.put(ducks_1.failure(ducks_1.GET_PACKAGE, errorMessage, 'packages'))];
            case 8:
                _b.sent();
                return [4 /*yield*/, effects_1.put(ducks_1.promoError(errorMessage))];
            case 9:
                _b.sent();
                return [3 /*break*/, 12];
            case 10: return [4 /*yield*/, effects_1.put(ducks_1.failure(ducks_1.GET_PACKAGE, error, 'packages'))];
            case 11:
                _b.sent();
                _b.label = 12;
            case 12: return [2 /*return*/];
        }
    });
}
exports.getPackage = getPackage;
function paymentCreate(payload, cb) {
    var _a, data, errorCode, error;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, effects_1.call(api_1.callApi, api_2.fetchPaymentCreate(payload))];
            case 1:
                _a = _b.sent(), data = _a.data, errorCode = _a.errorCode, error = _a.error;
                if (!(data && errorCode === 1)) return [3 /*break*/, 4];
                return [4 /*yield*/, effects_1.put(ducks_1.success(ducks_1.PAYMENT_CREATE, data, 'payment'))];
            case 2:
                _b.sent();
                return [4 /*yield*/, cb(data)];
            case 3:
                _b.sent();
                return [3 /*break*/, 8];
            case 4:
                if (!(errorCode === 32)) return [3 /*break*/, 6];
                return [4 /*yield*/, effects_1.put(ducks_1.failure(ducks_1.PAYMENT_CREATE, 'Серверная ошибка', 'payment'))];
            case 5:
                _b.sent();
                return [3 /*break*/, 8];
            case 6: return [4 /*yield*/, effects_1.put(ducks_1.failure(ducks_1.PAYMENT_CREATE, error, 'payment'))];
            case 7:
                _b.sent();
                _b.label = 8;
            case 8: return [2 /*return*/];
        }
    });
}
exports.paymentCreate = paymentCreate;
function getPrograms() {
    var _a, data, errorCode, error;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, effects_1.call(api_1.callApi, api_2.fetchGetPrograms())];
            case 1:
                _a = _b.sent(), data = _a.data, errorCode = _a.errorCode, error = _a.error;
                if (!(data && errorCode === 1)) return [3 /*break*/, 3];
                return [4 /*yield*/, effects_1.put(ducks_1.success(ducks_1.GET_PROGRAMS, utils_1.addActiveFlag(data), 'programs'))];
            case 2:
                _b.sent();
                return [3 /*break*/, 7];
            case 3:
                if (!(errorCode === 32)) return [3 /*break*/, 5];
                return [4 /*yield*/, effects_1.put(ducks_1.failure(ducks_1.GET_PROGRAMS, 'Серверная ошибка', 'programs'))];
            case 4:
                _b.sent();
                return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, effects_1.put(ducks_1.failure(ducks_1.GET_PROGRAMS, error, 'programs'))];
            case 6:
                _b.sent();
                _b.label = 7;
            case 7: return [2 /*return*/];
        }
    });
}
exports.getPrograms = getPrograms;
function watchGetPackage() {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!true) return [3 /*break*/, 3];
                return [4 /*yield*/, effects_1.take(ducks_1.GET_PACKAGE)];
            case 1:
                data = (_a.sent()).data;
                return [4 /*yield*/, effects_1.fork(getPackage, data)];
            case 2:
                _a.sent();
                return [3 /*break*/, 0];
            case 3: return [2 /*return*/];
        }
    });
}
exports.watchGetPackage = watchGetPackage;
function watchGetPrograms() {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!true) return [3 /*break*/, 4];
                return [4 /*yield*/, effects_1.take(ducks_1.GET_PROGRAMS)];
            case 1:
                _a.sent();
                return [4 /*yield*/, effects_1.put(ducks_1.request(ducks_1.GET_PROGRAMS))];
            case 2:
                _a.sent();
                return [4 /*yield*/, effects_1.fork(getPrograms)];
            case 3:
                _a.sent();
                return [3 /*break*/, 0];
            case 4: return [2 /*return*/];
        }
    });
}
exports.watchGetPrograms = watchGetPrograms;
function watchPaymentCreate() {
    var _a, data, cb;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!true) return [3 /*break*/, 4];
                return [4 /*yield*/, effects_1.take(ducks_1.PAYMENT_CREATE)];
            case 1:
                _a = _b.sent(), data = _a.data, cb = _a.cb;
                console.log('watchPaymentCreate');
                console.log(data);
                return [4 /*yield*/, effects_1.put(ducks_1.request(ducks_1.PAYMENT_CREATE))];
            case 2:
                _b.sent();
                return [4 /*yield*/, effects_1.fork(paymentCreate, data, cb)];
            case 3:
                _b.sent();
                return [3 /*break*/, 0];
            case 4: return [2 /*return*/];
        }
    });
}
exports.watchPaymentCreate = watchPaymentCreate;
function StepTwoSaga() {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.all([
                    effects_1.fork(watchGetPrograms),
                    effects_1.fork(watchGetPackage),
                    effects_1.fork(watchPaymentCreate)
                ])];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
exports.StepTwoSaga = StepTwoSaga;
