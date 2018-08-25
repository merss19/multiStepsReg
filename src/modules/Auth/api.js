"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = require("tools/api");
exports.fetchUserGet = function (token) {
    var payload = {
        authToken: token,
        data: {}
    };
    console.log(payload);
    console.log('payloaddd');
    var options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(payload)
    };
    return fetch(api_1.apiData.userGet, options);
};
