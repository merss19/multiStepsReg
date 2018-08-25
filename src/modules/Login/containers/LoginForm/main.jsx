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
var InputText_1 = require("components/InputText");
var _1 = require("components/Button/");
var formValidations = require("tools/validations");
var LoginForm = /** @class */ (function (_super) {
    __extends(LoginForm, _super);
    function LoginForm() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoginForm.prototype.render = function () {
        var _a = this.props, handleSubmit = _a.handleSubmit, onSubmit = _a.onSubmit;
        return (<div className='entry entry--min'>
        <div className='entry__inner'>

          <div className='entry__header'>
            <h2 className='entry__title text-center'>Вход в Личный кабинет</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className='entry__box'>
            <redux_form_1.Field name='email' placeholder='Ваш e-mail' type='email' component={InputText_1.default}/>
            <redux_form_1.Field name='password' placeholder='Ваш пароль' type='password' component={InputText_1.default}/>

            <_1.Button type='submit' styleBtn={_1.ButtonTypes.info} wide={true}>
              Войти
            </_1.Button>

            <ul className='entry-nav mtb20'>
              <li className='entry-nav__item'>
                <react_router_dom_1.Link to='/signup'>Регистрация</react_router_dom_1.Link>
              </li>
              <li className='entry-nav__item'>
                <react_router_dom_1.Link to='/restore'>Забыли пароль?</react_router_dom_1.Link>
              </li>
            </ul>

          </form>
          {this.props.children}
        </div>
      </div>);
    };
    return LoginForm;
}(React.PureComponent));
exports.LoginForm = LoginForm;
exports.default = redux_form_1.reduxForm({
    form: 'LoginFormm',
    validate: formValidations.validateLogin
})(LoginForm);
