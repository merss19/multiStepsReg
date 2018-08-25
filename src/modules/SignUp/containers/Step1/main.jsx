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
var redux_form_1 = require("redux-form");
var react_router_dom_1 = require("react-router-dom");
var ducks_1 = require("./ducks");
var api_1 = require("./api");
var InputText_1 = require("components/InputText");
var RadioInput_1 = require("components/RadioInput");
var CheckboxInput_1 = require("components/CheckboxInput");
var Button_1 = require("components/Button");
var storage_1 = require("tools/storage");
var const_1 = require("../../const");
var CustomSteps_1 = require("../CustomSteps");
var CustomModal_1 = require("modules/CustomModal");
var ducks_2 = require("modules/Login/ducks");
var formValidations = require("tools/validations");
var ModalHOC_1 = require("components/HOC/ModalHOC");
var StepOneComponent = /** @class */ (function (_super) {
    __extends(StepOneComponent, _super);
    function StepOneComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StepOneComponent.prototype.shouldComponentUpdate = function (nextProps) {
        return (nextProps.step !== this.props.step);
    };
    StepOneComponent.prototype.onSubmit = function (data) {
        var _this = this;
        this.props.userCreate(data, function (data) { return _this.resultAction(data); });
    };
    StepOneComponent.prototype.resultAction = function (data) {
        var _a = this.props, changeStep = _a.changeStep, setToken = _a.setToken;
        if (data && data.authToken) {
            setToken(data.authToken);
            storage_1.storage.save('token', data.authToken, { path: '/', maxAge: 60 * 60 * 24 * 365 * 10 });
            storage_1.storage.save('promoName', data.promoName, { path: '/', maxAge: 60 * 60 * 24 * 365 * 10 });
            changeStep(const_1.Steps.two);
        }
    };
    StepOneComponent.prototype.render = function () {
        var _this = this;
        var handleSubmit = this.props.handleSubmit;
        return (<div>
        {this.renderHeader()}
        <form className='entry__box' onSubmit={handleSubmit(function (data) { return _this.onSubmit(data); })}>
          <redux_form_1.Field name='email' placeholder='Ваш e-mail' type='text' component={InputText_1.default}/>
          <redux_form_1.Field name='password' placeholder='Ваш пароль' type='password' component={InputText_1.default}/>
          <redux_form_1.Field name='passwordAgain' placeholder='Пароль повторно' type='password' component={InputText_1.default}/>

          <div className='gender'>
            <div className='gender__group'>
              <p className='gender__title'>Ваш пол:</p>
              <redux_form_1.Field name='gender' id='male' value='male' type='radio' title='Мужчина' validate={formValidations.validateGender} component={RadioInput_1.default}/>
              <redux_form_1.Field name='gender' id='female' value='female' type='radio' title='Женщина' validate={formValidations.validateGender} component={RadioInput_1.default}/>
            </div>
            <hr className='gender__hr'/>
          </div>

          <div className='checkboxes'>
            <redux_form_1.Field name='accept' title='Принять условия ' id='accept' component={CheckboxInput_1.default}/>
          </div>

          <Button_1.Button type='submit' styleBtn={Button_1.ButtonTypes.info} wide={true}>
            Зарегистрироваться
          </Button_1.Button>


          <div className='entry__link text-center mtb20'>
            <div className='entry-nav__item'>
              <react_router_dom_1.Link to='/'>Войти</react_router_dom_1.Link>
            </div>
            <div className='entry-nav__item'>
              <react_router_dom_1.Link to='/restore'>Забыли пароль?</react_router_dom_1.Link>
            </div>
          </div>
        </form>
      </div>);
    };
    return StepOneComponent;
}(CustomSteps_1.default));
exports.StepOneComponent = StepOneComponent;
exports.StepOne = react_redux_1.connect(null, {
    toggleModal: CustomModal_1.toggleModal,
    setError: ducks_1.setError,
    userCreate: ducks_1.userCreate,
    setToken: ducks_2.setToken
})(StepOneComponent);
exports.default = ModalHOC_1.modalHOC(redux_form_1.reduxForm({
    form: 'StepOne',
    validate: formValidations.validateSignUp,
    asyncValidate: api_1.asyncValidate,
    asyncBlurFields: ['email']
})(exports.StepOne), ducks_1.moduleName, ducks_1.subModuleName);
