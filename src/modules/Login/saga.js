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
function submitLogin(payload, cb) {
    var _a, data, errorCode, error;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, effects_1.call(api_1.callApi, api_2.fetchSubmitLogin(payload))];
            case 1:
                _a = _b.sent(), data = _a.data, errorCode = _a.errorCode, error = _a.error;
                if (!(data && errorCode === 1)) return [3 /*break*/, 4];
                return [4 /*yield*/, effects_1.put(ducks_1.success(ducks_1.SUBMIT_LOGIN, data, 'profile'))];
            case 2:
                _b.sent();
                return [4 /*yield*/, cb(data)];
            case 3:
                _b.sent();
                return [3 /*break*/, 12];
            case 4:
                if (!(errorCode === 32)) return [3 /*break*/, 6];
                return [4 /*yield*/, effects_1.put(ducks_1.failure(ducks_1.SUBMIT_LOGIN, 'Серверная ошибка', 'profile'))];
            case 5:
                _b.sent();
                return [3 /*break*/, 12];
            case 6:
                if (!(errorCode === 130)) return [3 /*break*/, 8];
                return [4 /*yield*/, effects_1.put(ducks_1.failure(ducks_1.SUBMIT_LOGIN, 'Неверный пароль', 'profile'))];
            case 7:
                _b.sent();
                return [3 /*break*/, 12];
            case 8:
                if (!(errorCode === 4)) return [3 /*break*/, 10];
                return [4 /*yield*/, effects_1.put(ducks_1.failure(ducks_1.SUBMIT_LOGIN, 'Пользователь не найден', 'profile'))];
            case 9:
                _b.sent();
                return [3 /*break*/, 12];
            case 10: return [4 /*yield*/, effects_1.put(ducks_1.failure(ducks_1.SUBMIT_LOGIN, error, 'profile'))];
            case 11:
                _b.sent();
                _b.label = 12;
            case 12: return [2 /*return*/];
        }
    });
}
exports.submitLogin = submitLogin;
function watchSubmitLogin() {
    var _a, data, cb;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!true) return [3 /*break*/, 4];
                return [4 /*yield*/, effects_1.take(ducks_1.SUBMIT_LOGIN)];
            case 1:
                _a = _b.sent(), data = _a.data, cb = _a.cb;
                return [4 /*yield*/, effects_1.put(ducks_1.request(ducks_1.SUBMIT_LOGIN))];
            case 2:
                _b.sent();
                return [4 /*yield*/, effects_1.fork(submitLogin, data, cb)];
            case 3:
                _b.sent();
                return [3 /*break*/, 0];
            case 4: return [2 /*return*/];
        }
    });
}
exports.watchSubmitLogin = watchSubmitLogin;
function loginModuleSaga() {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.all([
                    effects_1.fork(watchSubmitLogin)
                ])];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
exports.default = loginModuleSaga;
