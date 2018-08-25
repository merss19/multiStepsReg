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
var RadioInput = /** @class */ (function (_super) {
    __extends(RadioInput, _super);
    function RadioInput() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RadioInput.prototype.render = function () {
        var _a = this.props, input = _a.input, title = _a.title, name = _a.name, value = _a.value, _b = _a.meta, touched = _b.touched, error = _b.error;
        return (<span className={classNames('radio', { 'input--error': touched && !!error })}>
        <label className='radio__label' htmlFor={value}>
          <input {...input} className='radio__field' id={value} type='radio' name={name}/>
          <span className='radio__ph'/>
          <span>{title}</span>
        </label>
        {touched && error && <p className='input__alert'>{error}</p>}
			   </span>);
    };
    return RadioInput;
}(React.Component));
exports.default = RadioInput;
