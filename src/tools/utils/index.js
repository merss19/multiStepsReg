"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
function makeActionCreator(type) {
    var argNames = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        argNames[_i - 1] = arguments[_i];
    }
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var action = { type: type };
        argNames.forEach(function (arg, index) {
            if (arg === 'data') {
                action[argNames[index]] = args[index];
            }
            else if (arg === 'action') {
                var addType = args[index];
                if (addType) {
                    var addTypeArr = addType.split('/');
                    action.type = type + '/' + addTypeArr[addTypeArr.length - 1];
                }
            }
            else {
                action[argNames[index]] = args[index];
            }
        });
        return action;
    };
}
exports.makeActionCreator = makeActionCreator;
exports.addActiveFlag = function (items) {
    items = items.map(function (item) {
        return __assign({}, item, { isActive: false });
    });
    return items;
};
exports.queryParse = function (search) {
    // console.log('queryParse')
    //console.log(search)
    if (!search) {
        return null;
    }
    var parsed = search.slice(1).split('&');
    var query = {};
    parsed.forEach(function (item) {
        var arr = item.split('=');
        if (!arr.length) {
            return query;
        }
        //console.log(arr)
        // console.log(arr[0])
        //console.log(arr[1])
        query[arr[0]] = arr[1];
    });
    //console.log(parsed)
    //console.log(query)
    //console.log('queryParse')
    return query;
};
exports.isInEnum = function (en, el) {
    // console.log('isInEnum');
    var result = false;
    for (var item in en) {
        if (isNaN(Number(item))) {
            // console.log(el);
            //console.log(en[item]);
            //console.log(en[item].sort);
            if (en[item] == el) {
                result = true;
            }
        }
    }
    //console.log('result');
    //console.log(result);
    return result;
};
exports.localStorageMock = (function () {
    var store = {};
    return {
        getItem: function (key) {
            return store[key];
        },
        setItem: function (key, value) {
            store[key] = value.toString();
        },
        clear: function () {
            store = {};
        },
        removeItem: function (key) {
            delete store[key];
        }
    };
})();
