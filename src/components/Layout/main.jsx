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
var Background_1 = require("../Background");
var LogoLink_1 = require("../LogoLink");
var SVGInjector = require("svg-injector");
var Header_1 = require("components/Header");
var Layout = /** @class */ (function (_super) {
    __extends(Layout, _super);
    function Layout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Layout.prototype.componentDidMount = function () {
        this.svgInject();
    };
    Layout.prototype.svgInject = function () {
        var sprite = {
            body: document.querySelector('body'),
            img: document.createElement('img')
        };
        sprite.img.className = 'injected-svg';
        sprite.img.id = 'svg-inject-me';
        sprite.img.src = process.env.PUBLIC_URL + '/img/symbol-sprite.svg';
        sprite.body.appendChild(sprite.img);
        var mySVGsToInject = document.querySelector('#svg-inject-me');
        SVGInjector(mySVGsToInject);
    };
    Layout.prototype.renderLogo = function () {
        if (!this.props.notLogo) {
            return (<div className='grid entry-header'>
          <div className='grid__cell todayme-logo'>
            <LogoLink_1.default />
          </div>
        </div>);
        }
    };
    Layout.prototype.render = function () {
        var _a = this.props, children = _a.children, type = _a.type;
        if (type === 'main') {
            return (<Header_1.Header />);
        }
        else {
            return (<div className='layout layout--entry'>
          {this.renderLogo()}
          {children}
          <Background_1.default />
        </div>);
        }
    };
    Layout.defaultProps = {
        notLogo: false,
        type: 'signUP'
    };
    return Layout;
}(React.Component));
exports.Layout = Layout;
exports.default = Layout;
