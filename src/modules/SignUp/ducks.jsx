"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Step1_1 = require("./containers/Step1");
var Step2_1 = require("./containers/Step2");
var Step3_1 = require("./containers/Step3");
var redux_immutable_1 = require("redux-immutable");
exports.moduleName = 'signUp';
var reducer = redux_immutable_1.combineReducers({
    stepOne: Step1_1.stepOneReducer,
    stepTwo: Step2_1.stepTwoReducer,
    stepThree: Step3_1.stepThreeReducer
});
exports.default = reducer;
