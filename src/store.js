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
var redux_1 = require("redux");
var reducers_1 = require("./reducers");
var redux_thunk_1 = require("redux-thunk");
var redux_logger_1 = require("redux-logger");
var react_router_redux_1 = require("react-router-redux");
var redux_devtools_extension_1 = require("redux-devtools-extension");
var history_1 = require("./history");
var redux_saga_1 = require("redux-saga");
var effects_1 = require("redux-saga/effects");
var Login_1 = require("modules/Login");
var Auth_1 = require("modules/Auth");
var SignUp_1 = require("modules/SignUp");
var PasswordRestore_1 = require("modules/PasswordRestore");
var sagaMiddleware = redux_saga_1.default();
function rootSaga() {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.all([
                    effects_1.fork(Login_1.loginModuleSaga),
                    effects_1.fork(Auth_1.authModuleSaga),
                    effects_1.fork(SignUp_1.signUpModuleSaga),
                    effects_1.fork(PasswordRestore_1.passwordRestoreModuleSaga)
                ])];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
exports.rootSaga = rootSaga;
var middleware = [
    redux_thunk_1.default,
    sagaMiddleware,
    react_router_redux_1.routerMiddleware(history_1.default)
];
var enhancer = redux_1.compose(redux_1.applyMiddleware.apply(void 0, middleware));
if (process.env.NODE_ENV === 'development') {
    middleware.push(redux_logger_1.default);
    enhancer = redux_devtools_extension_1.composeWithDevTools(redux_1.applyMiddleware.apply(void 0, middleware));
}
//const initialState = Immutable.fromJS({});
function configureStore() {
    var store = redux_1.createStore(reducers_1.default, enhancer);
    if (module.hot) {
        module.hot.accept('./reducers', function () {
            var nextRootReducer = require('./reducers');
            store.replaceReducer(nextRootReducer);
        });
    }
    sagaMiddleware.run(rootSaga);
    //console.log(store.getState())
    //	console.log('storerrrrrrrrrrrr')
    return store;
}
exports.default = configureStore;
