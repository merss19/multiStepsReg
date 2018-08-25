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
var react_redux_1 = require("react-redux");
var LoginForm_1 = require("./containers/LoginForm");
var ducks_1 = require("./ducks");
var react_router_1 = require("react-router");
var CustomModal_1 = require("../CustomModal");
var LayoutHOC_1 = require("components/HOC/LayoutHOC");
var storage_1 = require("tools/storage");
var SignUp_1 = require("../SignUp");
var selectors_1 = require("./selectors");
var mapStateToProps = function (state) { return ({
    isFetching: selectors_1.selectIsFetching(state),
    isLoad: selectors_1.selectIsLoad(state),
    isError: selectors_1.selectIsError(state),
    errMsg: selectors_1.selectErrMsg(state),
    profile: selectors_1.selectProfile(state)
}); };
var LoginComponent = /** @class */ (function (_super) {
    __extends(LoginComponent, _super);
    function LoginComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoginComponent.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.isFetching !== this.props.isFetching || nextProps.isError !== this.props.isError) {
            var isOpen = nextProps.isFetching || nextProps.isError;
            this.props.toggleModal(isOpen);
        }
    };
    LoginComponent.prototype.onSubmit = function (data) {
        var _this = this;
        this.props.submitLogin(data, function (data) { return _this.submitCb(data); });
    };
    LoginComponent.prototype.submitCb = function (data) {
        var _a = this.props, changeStep = _a.changeStep, setToken = _a.setToken, history = _a.history;
        if (data && data.paidState !== 0) {
            setToken(data.authToken);
            storage_1.storage.save('token', data.authToken, { path: '/', maxAge: 60 * 60 * 24 * 365 * 10 });
            storage_1.storage.save('userProgram', data.program, { path: '/', maxAge: 60 * 60 * 24 * 365 * 10 });
            if (data.paidState === 2) {
                changeStep(SignUp_1.Steps.four);
            }
            else if (data.isFirstEdit) {
                history.replace('/profile');
            }
            else {
                history.replace('/task');
            }
        }
        else if (!data.program) {
            storage_1.storage.save('token', data.authToken, { path: '/', maxAge: 60 * 60 * 24 * 365 * 10 });
            changeStep(SignUp_1.Steps.two);
            history.replace('/signup');
        }
        else {
            storage_1.storage.save('token', data.authToken, { path: '/', maxAge: 60 * 60 * 24 * 365 * 10 });
            changeStep(SignUp_1.Steps.three);
            history.replace('/signup');
        }
    };
    LoginComponent.prototype.setError = function () {
        this.props.setError(false);
    };
    LoginComponent.prototype.render = function () {
        var _a = this.props, isFetching = _a.isFetching, errMsg = _a.errMsg;
        return (<LoginForm_1.LoginForm onSubmit={this.onSubmit.bind(this)}>
        <CustomModal_1.CustomModal modal={CustomModal_1.ModalTypes.error} resultText={errMsg} isLoader={isFetching} clickHandler={this.setError.bind(this)}/>
      </LoginForm_1.LoginForm>);
    };
    return LoginComponent;
}(React.Component));
exports.LoginComponent = LoginComponent;
exports.Login = react_redux_1.connect(mapStateToProps, {
    submitLogin: ducks_1.submitLogin,
    changeStep: SignUp_1.changeStep,
    setToken: ducks_1.setToken,
    setError: ducks_1.setError,
    toggleModal: CustomModal_1.toggleModal
})(LoginComponent);
exports.default = LayoutHOC_1.LayoutHOC()(react_router_1.withRouter(exports.Login));
