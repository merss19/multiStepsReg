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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var ReactModal = require("react-modal");
var const_1 = require("./const");
var Button_1 = require("components/Button");
var Loader_1 = require("components/Loader");
var ducks_1 = require("./ducks");
var selectors_1 = require("./selectors");
var react_motion_1 = require("react-motion");
var style = {
    overlay: {
        backgroundColor: 'rgba(45, 43, 43, 0.85)',
        zIndex: '2'
    },
    content: {
        transform: 'translate3d(0%, -50%, 0px)',
        top: '50%',
        padding: '40px',
        maxHeight: '300px',
        maxWidth: '400px',
        overflow: 'none',
        borderRadius: '12px',
        margin: '0 auto',
        textAlign: 'center',
        bottom: 'auto'
    }
};
var mapStateToProps = function (state, ownProps) { return ({
    isOpen: selectors_1.selectIsOpen(state)
}); };
var CustomModalComponent = /** @class */ (function (_super) {
    __extends(CustomModalComponent, _super);
    function CustomModalComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomModalComponent.prototype.setBtn = function () {
        var modal = this.props.modal;
        var btn = Button_1.ButtonTypes.info;
        switch (modal) {
            case const_1.ModalTypes.success:
                btn = Button_1.ButtonTypes.success;
                break;
            case const_1.ModalTypes.error:
                btn = Button_1.ButtonTypes.error;
                break;
            case const_1.ModalTypes.info:
                btn = Button_1.ButtonTypes.info;
                break;
            default:
                btn = Button_1.ButtonTypes.info;
        }
        return btn;
    };
    CustomModalComponent.prototype.renderContent = function () {
        var _this = this;
        var _a = this.props, resultText = _a.resultText, isLoader = _a.isLoader;
        var btn = this.setBtn();
        if (isLoader) {
            return <Loader_1.Loader />;
        }
        else {
            return (<react_motion_1.Motion defaultStyle={{ opacity: 0 }} style={{ opacity: react_motion_1.spring(1, { stiffness: 70 }) }}>
          {function (interpolatedStyle) {
                return (<div className='modal' style={__assign({}, interpolatedStyle)}>
                  <h2 className='modal__title'>{resultText}</h2>
                  <Button_1.Button onClick={_this.closeModal.bind(_this)} styleBtn={btn}>
                    Продолжить
                  </Button_1.Button>
                </div>);
            }}
        </react_motion_1.Motion>);
        }
    };
    CustomModalComponent.prototype.closeModal = function () {
        var _a = this.props, toggleModal = _a.toggleModal, clickHandler = _a.clickHandler;
        toggleModal(false);
        if (!clickHandler) {
            return;
        }
        clickHandler();
    };
    CustomModalComponent.prototype.render = function () {
        var isOpen = this.props.isOpen;
        return (<div>
        <ReactModal isOpen={isOpen} style={style} contentLabel='Action Modal' onRequestClose={this.closeModal.bind(this)}>
          <div className='modal__content'>
            {this.renderContent()}
          </div>

        </ReactModal>
      </div>);
    };
    CustomModalComponent.defaultProps = {
        isLoader: false
    };
    return CustomModalComponent;
}(React.PureComponent));
exports.CustomModalComponent = CustomModalComponent;
exports.CustomModal = react_redux_1.connect(mapStateToProps, { toggleModal: ducks_1.toggleModal })(CustomModalComponent);
exports.default = exports.CustomModal;
