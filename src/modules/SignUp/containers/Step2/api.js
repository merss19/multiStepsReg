"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = require("tools/api");
var fetch = require("isomorphic-fetch");
exports.fetchGetPackage = function (data) {
    var payload = data ? { promoName: data } : {};
    var options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(payload)
    };
    return fetch(api_1.apiData.packageGet, options);
};
exports.fetchUserUpdate = function (data) {
    var options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
    };
    return fetch(api_1.apiData.userUpdate, options);
};
exports.fetchPaymentCreate = function (data) {
    var options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
    };
    return fetch(api_1.apiData.paymentCreate, options);
};
exports.fetchGetPrograms = function () {
    var options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({})
    };
    return fetch(api_1.apiData.programGet, options);
};
