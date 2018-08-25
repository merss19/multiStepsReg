"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PRODUCTION = 'production';
var DEVELOPMENT = 'development';
var env = process.env.NODE_ENV || DEVELOPMENT;
var api = 'https://api.todayme.ru/api';
exports.api = api;
var host = env === PRODUCTION
    ? 'https://lk.todayme.ru'
    : 'https://lk2.todayme.ru';
exports.host = host;
