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
var react_router_1 = require("react-router");
var main_1 = require("components/Header/main");
var LayoutHOC_1 = require("components/HOC/LayoutHOC");
var PageTodayTask = /** @class */ (function (_super) {
    __extends(PageTodayTask, _super);
    function PageTodayTask() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PageTodayTask.prototype.render = function () {
        return (<main_1.Header />);
    };
    return PageTodayTask;
}(React.Component));
exports.default = LayoutHOC_1.LayoutHOC({ type: 'main' })(react_router_1.withRouter(PageTodayTask));
