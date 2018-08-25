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
var Button_1 = require("components/Button");
var react_router_dom_1 = require("react-router-dom");
var storage_1 = require("tools/storage");
var Header = /** @class */ (function (_super) {
    __extends(Header, _super);
    function Header() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Header.prototype.logOut = function () {
        storage_1.storage.remove('token', { path: '/' });
        storage_1.storage.remove('program', { path: '/' });
        storage_1.storage.remove('promoName', { path: '/' });
        storage_1.storage.removeState('auth');
    };
    Header.prototype.render = function () {
        return (<div className='header header--hero'>
        <div className='grid header__inner'>
          <div className='grid__cell header__burger'>
            <span className='header__ico-burger'>
              <svg className='svg-icon ico-burger'>
                <use xlinkHref="#ico-burger"></use>
              </svg>
            </span>
          </div>

          <h1 className='grid__cell header__logo'>
            Ясегодня
            <svg className='svg-icon ys-logo-web'>
              <use xlinkHref="#ys-logo-web"></use>
            </svg>
          </h1>

          <div className='grid__cell header__right-side'>
            <Button_1.Button type='button' styleBtn={Button_1.ButtonTypes.info}>
              <react_router_dom_1.Link to='/' onClick={this.logOut.bind(this)}>Выход</react_router_dom_1.Link>
            </Button_1.Button>
          </div>
        </div>
      </div>);
    };
    return Header;
}(React.Component));
exports.Header = Header;
exports.default = Header;
