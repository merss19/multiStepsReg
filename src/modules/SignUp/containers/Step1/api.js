"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = require("tools/api");
var fetch = require("isomorphic-fetch");
exports.fetchUserCreate = function (data) {
    var options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
    };
    return fetch(api_1.apiData.userCreate, options);
};
exports.asyncValidate = function (values) {
    return fetch(api_1.apiData.userCheck, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ email: values.email })
    })
        .then(function (response) { return response.json(); })
        .then(function (json) {
        if (json.data) {
            throw { email: 'Такой email уже существует' };
        }
    });
};
