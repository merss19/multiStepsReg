"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cookie = require("react-cookie");
exports.storage = {
    save: function (name, data, path) {
        cookie.save(name, data, path);
    },
    load: function (name) {
        return cookie.load(name);
    },
    remove: function (name, path) {
        return cookie.remove(name, path);
    },
    loadState: function (name) {
        try {
            var serializedState = localStorage.getItem(name);
            if (!serializedState) {
                return undefined;
            }
            return JSON.parse(serializedState);
        }
        catch (err) {
            return undefined;
        }
    },
    saveState: function (data, name) {
        try {
            var serializedState = JSON.stringify(data);
            localStorage.setItem(name, serializedState);
        }
        catch (err) {
            //console.log(err)
        }
    },
    removeState: function (name) {
        try {
            localStorage.removeItem(name);
        }
        catch (err) {
            ///console.log(err)
        }
    }
};
