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
var redux_form_1 = require("redux-form");
var react_router_dom_1 = require("react-router-dom");
var Button_1 = require("components/Button");
var InputText_1 = require("components/InputText");
var formValidations = require("tools/validations");
var PasswordForgetForm = /** @class */ (function (_super) {
    __extends(PasswordForgetForm, _super);
    function PasswordForgetForm() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PasswordForgetForm.prototype.render = function () {
        var _a = this.props, handleSubmit = _a.handleSubmit, onSubmit = _a.onSubmit;
        return (<div className='entry__inner'>
        <div className='entry__header'>
          <h2 className='entry__title text-center'>Восстановление пароля</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='entry__box'>
          <redux_form_1.Field name='email' id='email' placeholder='Ваш email' component={InputText_1.default}/>
          <Button_1.Button styleBtn={Button_1.ButtonTypes.success} type='submit' wide={true}>
            Восстановить пароль
          </Button_1.Button>
          <ul className='entry__link text-center'>
            <li className='entry-nav__item'>
              <react_router_dom_1.Link to='/'>Вход в кабинет</react_router_dom_1.Link>
            </li>
          </ul>
        </form>
      </div>);
    };
    return PasswordForgetForm;
}(React.PureComponent));
exports.PasswordForgetForm = PasswordForgetForm;
exports.default = redux_form_1.reduxForm({
    form: 'PasswordForm',
    validate: formValidations.validateForgetPassword
})(PasswordForgetForm);
