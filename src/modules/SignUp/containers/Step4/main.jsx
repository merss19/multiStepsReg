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
var react_router_dom_1 = require("react-router-dom");
var Button_1 = require("components/Button");
var CustomSteps_1 = require("../CustomSteps");
var StepFour = /** @class */ (function (_super) {
    __extends(StepFour, _super);
    function StepFour() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StepFour.prototype.render = function () {
        var _this = this;
        return (<div className='entry__success'>
        <h3>Ваша заявка принята.</h3>
        <p>В ближайшее время мы с вами свяжемся!</p>
        <div className='text-center pt20'>
          <Button_1.Button type={'button'} styleBtn={Button_1.ButtonTypes.info}>
            <react_router_dom_1.Link to='/' onClick={function () { return _this.logOut(); }}>Вернуться на главный сайт</react_router_dom_1.Link>
          </Button_1.Button>
        </div>
      </div>);
    };
    return StepFour;
}(CustomSteps_1.default));
exports.StepFour = StepFour;
exports.default = StepFour;
