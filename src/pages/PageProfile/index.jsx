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
var Header_1 = require("components/Header");
var LayoutHOC_1 = require("components/HOC/LayoutHOC");
var PageProfile = /** @class */ (function (_super) {
    __extends(PageProfile, _super);
    function PageProfile() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PageProfile.prototype.render = function () {
        return (<Header_1.Header />);
    };
    return PageProfile;
}(React.Component));
exports.default = LayoutHOC_1.LayoutHOC({ type: 'main' })(PageProfile);
