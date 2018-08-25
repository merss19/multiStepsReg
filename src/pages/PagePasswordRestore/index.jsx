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
var PasswordRestore_1 = require("modules/PasswordRestore");
var PagePasswordRestore = /** @class */ (function (_super) {
    __extends(PagePasswordRestore, _super);
    function PagePasswordRestore() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PagePasswordRestore.prototype.render = function () {
        return (<PasswordRestore_1.PasswordRestore />);
    };
    return PagePasswordRestore;
}(React.Component));
exports.default = PagePasswordRestore;
