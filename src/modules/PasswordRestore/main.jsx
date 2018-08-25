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
var react_router_1 = require("react-router");
var PasswordForgetForm_1 = require("./components/PasswordForgetForm");
var PasswordRestoreForm_1 = require("./components/PasswordRestoreForm");
var ducks_1 = require("./ducks");
var CustomModal_1 = require("../CustomModal");
var LayoutAddHOC_1 = require("components/HOC/LayoutAddHOC");
var utils_1 = require("tools/utils");
var selectors_1 = require("./selectors");
var mapStateToProps = function (state, OwnProps) { return ({
    isFetching: selectors_1.selectIsFetching(state),
    token: selectors_1.selectToken(state),
    isLoad: selectors_1.selectIsLoad(state),
    isError: selectors_1.selectIsError(state),
    resultText: selectors_1.selectResultText(state),
    resultCode: selectors_1.selectResultCode(state),
    errorMessage: selectors_1.selectErrorMessage(state)
}); };
var PasswordRestoreComponent = /** @class */ (function (_super) {
    __extends(PasswordRestoreComponent, _super);
    function PasswordRestoreComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PasswordRestoreComponent.prototype.componentWillMount = function () {
        var _a = this.props, location = _a.location, setRestoreToken = _a.setRestoreToken;
        var query = {};
        if (location.search) {
            console.log('111111111111111111');
            query = utils_1.queryParse(location.search);
            if (query.token) {
                console.log('222222222222222222222');
                setRestoreToken(query.token);
            }
        }
    };
    PasswordRestoreComponent.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.isFetching !== this.props.isFetching ||
            nextProps.isError !== this.props.isError ||
            nextProps.isLoad !== this.props.isLoad) {
            var isOpen = nextProps.isFetching || nextProps.isError || nextProps.isLoad;
            this.props.toggleModal(isOpen);
        }
    };
    PasswordRestoreComponent.prototype.onSubmit = function (data) {
        var submitPassword = this.props.submitPassword;
        submitPassword(data);
    };
    PasswordRestoreComponent.prototype.onSubmitRestore = function (data) {
        var _a = this.props, submitRestore = _a.submitRestore, token = _a.token;
        data.tokenPassword = token;
        submitRestore(data);
    };
    PasswordRestoreComponent.prototype.setModal = function () {
        var _a = this.props, isLoad = _a.isLoad, isError = _a.isError, resultCode = _a.resultCode;
        var modal = CustomModal_1.ModalTypes.info;
        if (isError) {
            modal = CustomModal_1.ModalTypes.error;
        }
        if (isLoad) {
            if (resultCode === 1) {
                modal = CustomModal_1.ModalTypes.success;
            }
        }
        return modal;
    };
    PasswordRestoreComponent.prototype.clickHandler = function () {
        var _a = this.props, token = _a.token, history = _a.history;
        var modal = this.setModal();
        // console.log('clickkkkkkkkkkk')
        // console.log(token && modal === ModalTypes.success)
        if (token && modal === CustomModal_1.ModalTypes.success) {
            console.log('!!!!!!');
            history.replace('/');
        }
    };
    PasswordRestoreComponent.prototype.render = function () {
        var _a = this.props, isFetching = _a.isFetching, token = _a.token, isError = _a.isError, resultText = _a.resultText, errorMessage = _a.errorMessage;
        var modal = this.setModal();
        var text = isError ? errorMessage : resultText;
        return (<div className='entry--min'>
        {!token
            ?
                <PasswordForgetForm_1.default onSubmit={this.onSubmit.bind(this)}/>
            :
                <PasswordRestoreForm_1.default onSubmit={this.onSubmitRestore.bind(this)}/>}
        <CustomModal_1.CustomModal modal={modal} resultText={text} clickHandler={this.clickHandler.bind(this)} isLoader={isFetching}/>
      </div>);
    };
    return PasswordRestoreComponent;
}(React.PureComponent));
exports.PasswordRestoreComponent = PasswordRestoreComponent;
exports.PasswordRestore = react_redux_1.connect(mapStateToProps, {
    submitPassword: ducks_1.submitPassword,
    submitRestore: ducks_1.submitRestore,
    setRestoreToken: ducks_1.setRestoreToken,
    toggleModal: CustomModal_1.toggleModal
})(PasswordRestoreComponent);
exports.default = LayoutAddHOC_1.LayoutAddHOC()(react_router_1.withRouter(exports.PasswordRestore));
