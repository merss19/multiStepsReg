"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reselect_1 = require("reselect");
var ducks_1 = require("./containers/Step1/ducks");
var ducks_2 = require("./containers/Step2/ducks");
var ducks_3 = require("./containers/Step3/ducks");
var stateOne = function (state) { return state[ducks_1.moduleName].get(ducks_1.subModuleName); };
var stateTwo = function (state) { return state[ducks_1.moduleName].get(ducks_2.subModuleName); };
var stateThree = function (state) { return state[ducks_1.moduleName].get(ducks_3.subModuleName); };
var step = reselect_1.createSelector(stateOne, function (state) { return state.getIn(['data', 'step']); });
var genderError = reselect_1.createSelector(stateOne, function (state) { return state.getIn(['data', 'genderError']); });
var userProfile = reselect_1.createSelector(stateOne, function (state) { return state.getIn(['data', 'userProfile']); });
var programName = reselect_1.createSelector(stateOne, function (state) { return state.getIn(['data', 'programName']); });
var choosenProgram = reselect_1.createSelector(stateTwo, function (state) {
    return state.getIn(['data', 'choosenProgram']);
});
var choosenPackageType = reselect_1.createSelector(stateTwo, function (state) { return state.getIn(['data', 'choosenPackageType']); });
var packages = reselect_1.createSelector(stateTwo, function (state) { return state.getIn(['data', 'packages']); });
var programs = reselect_1.createSelector(stateTwo, function (state) { return state.getIn(['data', 'programs']); });
var promo = reselect_1.createSelector(stateTwo, function (state) { return state.getIn(['data', 'promo']); });
var promoError = reselect_1.createSelector(stateTwo, function (state) { return state.getIn(['data', 'promoError']); });
var payment = reselect_1.createSelector(stateTwo, function (state) { return state.getIn(['data', 'payment']); });
var payInfo = reselect_1.createSelector(stateThree, function (state) { return state.getIn(['data', 'payInfo']); });
exports.selectProgramName = reselect_1.createSelector(programName, function (programName) { return programName; });
exports.selectUserProfile = reselect_1.createSelector(userProfile, function (userProfile) { return userProfile; });
exports.selectStep = reselect_1.createSelector(step, function (step) { return step; });
exports.selectPromoError = reselect_1.createSelector(promoError, function (promoError) { return promoError; });
exports.selectPromo = reselect_1.createSelector(promo, function (promo) { return promo; });
exports.selectPackages = reselect_1.createSelector(packages, choosenPackageType, function (packages, choosenPackageType) {
    if (!packages.size) {
        return null;
    }
    packages = packages.map(function (pt) {
        if (pt.get('id') == choosenPackageType) {
            return pt.set('isActive', true);
        }
        return pt;
    });
    return packages;
});
exports.selectChoosenProgram = reselect_1.createSelector(choosenProgram, function (choosenProgram) { return choosenProgram; });
exports.selectPrograms = reselect_1.createSelector(programs, choosenProgram, function (programs, choosenProgram) {
    console.log('!programs.size');
    console.log(!programs.size);
    if (!programs.size) {
        console.log('!programs.size22');
        return null;
    }
    programs = programs.map(function (program) {
        if (choosenProgram == 0) {
            if (program.get('id') % 4 == 1) {
                return program.set('isActive', true);
            }
        }
        if (program.get('id') == choosenProgram) {
            return program.set('isActive', true);
        }
        return program;
    });
    return programs;
});
exports.selectPackage = reselect_1.createSelector(choosenPackageType, packages, function (choosenPackageType, packages) {
    if (!packages.size) {
        return null;
    }
    var packageItem;
    packages.forEach(function (item) {
        if (item.get('id') == choosenPackageType) {
            packageItem = item;
        }
    });
    return packageItem;
});
exports.selectPackageType = reselect_1.createSelector(choosenPackageType, function (choosenPackageType) { return choosenPackageType; });
exports.selectPayInfo = reselect_1.createSelector(payInfo, function (payInfo) { return payInfo; });
