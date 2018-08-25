"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = require("tools/api");
var config_1 = require("../../config");
exports.fetchSubmitPassword = function (data) {
    var payload = {
        url: config_1.host + "/restore/create",
        data: data
    };
    var options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(payload)
    };
    return fetch(api_1.apiData.sendRestorePassword, options);
};
exports.fetchSubmitRestore = function (data) {
    console.log('!!!!!!!!!');
    console.log(data);
    var payload = {
        token: data.tokenPassword,
        password: data.pass
    };
    var options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(payload)
    };
    return fetch(api_1.apiData.sendRestorePassword, options);
};
