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
var react_router_dom_1 = require("react-router-dom");
var ducks_1 = require("./ducks");
var CustomModal_1 = require("modules/CustomModal");
var SignUp_1 = require("modules/SignUp");
var storage_1 = require("tools/storage");
var selectors_1 = require("./selectors");
var mapStateToProps = function (state, ownProps) { return ({
    isFetching: selectors_1.selectIsFetching(state),
    isLoad: selectors_1.selectIsLoad(state),
    isAuth: selectors_1.selectIsAuth(state),
    isError: selectors_1.selectIsError(state),
    errMsg: selectors_1.selectErrMsg(state),
    user: selectors_1.selectUser(state)
}); };
var ProtectedRouteComponent = /** @class */ (function (_super) {
    __extends(ProtectedRouteComponent, _super);
    function ProtectedRouteComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProtectedRouteComponent.prototype.componentWillMount = function () {
        var _this = this;
        var checkAuth = this.props.checkAuth;
        checkAuth(function (data) { return _this.checkAuth(data); }, function () { return _this.leave(); });
    };
    ProtectedRouteComponent.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.isFetching !== this.props.isFetching ||
            nextProps.isError !== this.props.isError) {
            var isOpen = nextProps.isFetching || nextProps.isError;
            this.props.toggleModal(isOpen);
        }
    };
    ProtectedRouteComponent.prototype.leave = function () {
        var _a = this.props, history = _a.history, toggleModal = _a.toggleModal;
        toggleModal(false);
        storage_1.storage.remove('token', { path: '/' });
        storage_1.storage.remove('txId', { path: '/' });
        storage_1.storage.remove('program', { path: '/' });
        storage_1.storage.remove('packageType', { path: '/' });
        storage_1.storage.remove('promoName', { path: '/' });
        history.replace('/');
    };
    ProtectedRouteComponent.prototype.checkAuth = function (data) {
        var _a = this.props, changeStep = _a.changeStep, history = _a.history;
        if (data.paidState !== 0) {
            storage_1.storage.save('userProgram', data.program, { path: '/', maxAge: 60 * 60 * 24 * 365 * 10 });
            if (data.paidState === 2) {
                changeStep(SignUp_1.Steps.four);
                history.replace('/signup');
            }
            else if (data.isFirstEdit) {
                history.replace('/profile');
            }
            else if (!data.emailConfirmed) {
                return null;
            }
            else {
                history.replace('/task');
            }
        }
        else if (!data.program) {
            changeStep(SignUp_1.Steps.two);
        }
        else {
            changeStep(SignUp_1.Steps.four);
        }
    };
    ProtectedRouteComponent.prototype.modalClick = function () {
        var _a = this.props, history = _a.history, toggleModal = _a.toggleModal;
        toggleModal(false);
        history.replace('/');
    };
    ProtectedRouteComponent.prototype.clickHandler = function () {
        var isError = this.props.isError;
        if (!isError) {
            return null;
        }
        return this.modalClick();
    };
    ProtectedRouteComponent.prototype.renderModal = function (modal) {
        var _a = this.props, isFetching = _a.isFetching, errMsg = _a.errMsg, isError = _a.isError;
        return (<CustomModal_1.CustomModal modal={modal} resultText={errMsg} clickHandler={this.clickHandler.bind(this)} isLoader={isFetching}/>);
    };
    ProtectedRouteComponent.prototype.renderContent = function (props) {
        var _a = this.props, ProtectedComponent = _a.component, isFetching = _a.isFetching, errMsg = _a.errMsg;
        return (<div>
        <ProtectedComponent {...props}/>
        {this.renderModal(CustomModal_1.ModalTypes.error)}
      </div>);
    };
    ProtectedRouteComponent.prototype.renderRoute = function (props) {
        var isAuth = this.props.isAuth;
        return (<div>
        {isAuth ?
            this.renderContent(props) :
            this.renderModal(CustomModal_1.ModalTypes.info)}
      </div>);
    };
    ProtectedRouteComponent.prototype.render = function () {
        var _this = this;
        var _a = this.props, ProtectedComponent = _a.component, isAuth = _a.isAuth, isError = _a.isError, isFetching = _a.isFetching, errMsg = _a.errMsg, rest = __rest(_a, ["component", "isAuth", "isError", "isFetching", "errMsg"]);
        return (<react_router_dom_1.Route {...rest} render={function (props) {
            return _this.renderRoute(props);
        }}/>);
    };
    return ProtectedRouteComponent;
}(React.Component));
exports.ProtectedRouteComponent = ProtectedRouteComponent;
exports.ProtectedRoute = react_redux_1.connect(mapStateToProps, {
    checkAuth: ducks_1.checkAuth,
    changeStep: SignUp_1.changeStep,
    toggleModal: CustomModal_1.toggleModal
})(ProtectedRouteComponent);
exports.default = react_router_1.withRouter(exports.ProtectedRoute);
