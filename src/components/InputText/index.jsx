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
var classNames = require("classnames");
var InputText = /** @class */ (function (_super) {
    __extends(InputText, _super);
    function InputText() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InputText.prototype.render = function () {
        var _a = this.props, input = _a.input, placeholder = _a.placeholder, _b = _a.meta, touched = _b.touched, error = _b.error;
        return (<div className={classNames('input', { 'input--error': touched && !!error })}>
        <input className='input__field' {...input} type='text' placeholder={placeholder}/>
        {touched && error && <p className='input__alert'>{error}</p>}
      </div>);
    };
    return InputText;
}(React.PureComponent));
exports.default = InputText;
