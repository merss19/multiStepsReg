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
var CheckboxInput = /** @class */ (function (_super) {
    __extends(CheckboxInput, _super);
    function CheckboxInput() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CheckboxInput.prototype.render = function () {
        var _a = this.props, input = _a.input, title = _a.title, id = _a.id, _b = _a.meta, touched = _b.touched, error = _b.error;
        return (<div className='checkboxes__item'>
				<span className='checkbox'>
					<label className='checkbox__label' htmlFor={id}>
						<input {...input} className='checkbox__field' checked={input.value} id={id} type='checkbox'/>
						<span className='checkbox__ph'>
						<svg className='svg ico-tick'>
							<use xlinkHref='#ico-tick'/>
						</svg>
				 </span>
					<div className='checkbox__group'>
						<span className='checkbox__title'>{title}</span>
							<react_router_dom_1.Link target='_blank' className='checkbox__link' to='http://todayme.ru/dogovor-oferty#.WGFQqrZ95E4'>
								оферты
							</react_router_dom_1.Link>
							<span className='checkbox__divider'>и</span>
							<react_router_dom_1.Link target='_blank' className='checkbox__link' to='https://todayme.ru/rules.pdf'>
								правил
							</react_router_dom_1.Link>
					</div>
				</label>
				</span>
        {touched && error && <span className='checkbox__error'>{error}</span>}
      </div>);
    };
    return CheckboxInput;
}(React.Component));
exports.default = CheckboxInput;
