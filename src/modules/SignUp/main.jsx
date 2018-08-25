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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var react_router_1 = require("react-router");
var Step1_1 = require("./containers/Step1");
var LogoLink_1 = require("components/LogoLink");
var Step1_2 = require("./containers/Step1");
var Step2_1 = require("./containers/Step2");
var Step3_1 = require("./containers/Step3");
var Step4_1 = require("./containers/Step4");
var const_1 = require("./const");
var utils_1 = require("tools/utils");
var selectors_1 = require("./selectors");
var LayoutHOC_1 = require("components/HOC/LayoutHOC");
var mapStateToProps = function (state, ownProps) { return ({
    step: selectors_1.selectStep(state)
}); };
var SignUpComponent = /** @class */ (function (_super) {
    __extends(SignUpComponent, _super);
    function SignUpComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SignUpComponent.prototype.componentWillMount = function () {
        var _a = this.props, changeStep = _a.changeStep, setProgramName = _a.setProgramName, location = _a.location;
        var query = utils_1.queryParse(location.search);
        if (query && query.step) {
            if (utils_1.isInEnum(const_1.Steps, query.step)) {
                changeStep(parseInt(query.step));
            }
        }
        if (query && query.name) {
            if (utils_1.isInEnum(const_1.Programs, query.name)) {
                setProgramName(query.name);
            }
        }
    };
    SignUpComponent.prototype.shouldComponentUpdate = function (nextProps) {
        return nextProps.step !== this.props.step;
    };
    SignUpComponent.prototype.renderContent = function () {
        var props = __rest(this.props, []);
        switch (this.props.step) {
            case const_1.Steps.one:
                return <Step1_2.StepOne {...props}/>;
            case const_1.Steps.two:
                return <Step2_1.StepTwo {...props}/>;
            case const_1.Steps.three:
                return <Step3_1.StepThree {...props}/>;
            case const_1.Steps.four:
                return <Step4_1.StepFour {...props}/>;
            default:
                return <Step4_1.StepFour {...props}/>;
        }
    };
    SignUpComponent.prototype.render = function () {
        var step = this.props.step;
        return (<div className='layout layout--entry'>
        <div className='grid entry-header'>
          <div className='1/4--desk grid__cell todayme-logo'>
            <LogoLink_1.default />
          </div>
          <div className='2/4--desk grid__cell text-center'>
            <div className='entry-step'>
              <span className='entry-step__title'>Шаг</span>
              <span className='entry-step__no'>#{step}</span>
              <span className='entry-step__go-to'>из 4</span>
            </div>
          </div>
        </div>

        <div className='entry entry--min'>
          <div className='entry__inner'>
            {this.renderContent()}
          </div>
        </div>
      </div>);
    };
    return SignUpComponent;
}(React.Component));
exports.SignUpComponent = SignUpComponent;
exports.SignUp = react_redux_1.connect(mapStateToProps, { changeStep: Step1_1.changeStep, userCreate: Step1_1.userCreate, setProgramName: Step1_1.setProgramName })(SignUpComponent);
exports.default = LayoutHOC_1.LayoutHOC({ notLogo: true })(react_router_1.withRouter(exports.SignUp));
