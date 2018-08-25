"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var react_router_redux_1 = require("react-router-redux");
var redux_form_1 = require("redux-form");
var Login_1 = require("modules/Login");
var PasswordRestore_1 = require("modules/PasswordRestore");
var CustomModal_1 = require("modules/CustomModal");
var SignUp_1 = require("modules/SignUp");
var Auth_1 = require("modules/Auth");
exports.default = redux_1.combineReducers((_a = {
        routing: react_router_redux_1.routerReducer,
        form: redux_form_1.reducer
    },
    _a[Login_1.moduleName] = Login_1.loginReducer,
    _a[Auth_1.moduleName] = Auth_1.authReducer,
    _a[SignUp_1.moduleName] = SignUp_1.signUpReducer,
    _a[CustomModal_1.moduleName] = CustomModal_1.modalReducer,
    _a[PasswordRestore_1.moduleName] = PasswordRestore_1.passwordRestoreReducer,
    _a));
var _a;
