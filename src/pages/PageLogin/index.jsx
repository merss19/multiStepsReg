"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Login_1 = require("../../modules/Login");
var PageLogin = /** @class */ (function (_super) {
    __extends(PageLogin, _super);
    function PageLogin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PageLogin.prototype.render = function () {
        return (<Login_1.Login />);
    };
    return PageLogin;
}(React.Component));
exports.default = PageLogin;
