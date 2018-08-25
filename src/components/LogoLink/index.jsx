"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
var storage_1 = require("tools/storage");
var LogoLink = function () { return (<react_router_dom_1.Link to="/" onClick={function () {
    storage_1.storage.remove('token', { path: '/' });
    storage_1.storage.remove('program', { path: '/' });
    storage_1.storage.remove('promoName', { path: '/' });
}}>
    <svg className='svg-icon ys-logo-web'>
      <use xlinkHref='#ys-logo-web'/>
    </svg>
  </react_router_dom_1.Link>); };
exports.default = LogoLink;
