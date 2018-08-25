"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = require("tools/api");
var fetch = require("isomorphic-fetch");
exports.fetchSubmitLogin = function (data) {
    var options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
    };
    return fetch(api_1.apiData.authenticate, options);
};
