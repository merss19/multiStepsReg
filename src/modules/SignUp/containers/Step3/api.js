"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = require("tools/api");
var storage_1 = require("tools/storage");
var fetch = require("isomorphic-fetch");
exports.fetchPaymentInfo = function (authToken) {
    var payload = {
        authToken: authToken || storage_1.storage.load('token'),
        data: { take: 1 }
    };
    var options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(payload)
    };
    return fetch(api_1.apiData.paymentGetInfo, options);
};
exports.fetchPaymentManual = function (txId) {
    var payload = {
        authToken: storage_1.storage.load('token'),
        data: { txId: txId }
    };
    var options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(payload)
    };
    return fetch(api_1.apiData.paymentSetpaidManual, options);
};
