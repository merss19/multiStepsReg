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
var SignUp_1 = require("modules/SignUp");
var PageSignUp = /** @class */ (function (_super) {
    __extends(PageSignUp, _super);
    function PageSignUp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PageSignUp.prototype.render = function () {
        return (<SignUp_1.SignUp />);
    };
    return PageSignUp;
}(React.Component));
exports.default = PageSignUp;
