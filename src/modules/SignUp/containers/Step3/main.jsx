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
var react_router_dom_1 = require("react-router-dom");
var CustomSteps_1 = require("../CustomSteps");
var const_1 = require("../../const");
var Button_1 = require("components/Button");
var Login_1 = require("modules/Login");
var FetchDucks_1 = require("modules/FetchDucks");
var ModalHOC_1 = require("components/HOC/ModalHOC");
var ducks_1 = require("./ducks");
var selectors_1 = require("../../selectors");
var _a = FetchDucks_1.fetchDucks(ducks_1.moduleName, ducks_1.subModuleName), selectIsFetching = _a.selectIsFetching, selectIsLoad = _a.selectIsLoad, selectIsError = _a.selectIsError, selectErrMsg = _a.selectErrMsg;
var mapStateToProps = function (state) { return ({
    authToken: Login_1.selectAuthToken(state),
    currentPackage: selectors_1.selectPackage(state),
    choosenProgram: selectors_1.selectChoosenProgram(state),
    payInfo: selectors_1.selectPayInfo(state)
}); };
var StepThreeComponent = /** @class */ (function (_super) {
    __extends(StepThreeComponent, _super);
    function StepThreeComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StepThreeComponent.prototype.componentWillMount = function () {
        var _a = this.props, authToken = _a.authToken, paymentInfo = _a.paymentInfo;
        paymentInfo(authToken);
    };
    StepThreeComponent.prototype.shouldComponentUpdate = function (nextProps) {
        return (nextProps.step !== this.props.step
            || nextProps.authToken !== this.props.authToken
            || nextProps.choosenProgram !== this.props.choosenProgram
            || nextProps.payInfo !== this.props.payInfo
            || nextProps.currentPackage !== this.props.currentPackage);
    };
    StepThreeComponent.prototype.payManual = function () {
        var _a = this.props, paymentManual = _a.paymentManual, payInfo = _a.payInfo, changeStep = _a.changeStep;
        paymentManual(payInfo.get('txId'), function (data) {
            changeStep(const_1.Steps.four);
        });
    };
    StepThreeComponent.prototype.back = function (e) {
        var changeStep = this.props.changeStep;
        changeStep(const_1.Steps.two);
    };
    StepThreeComponent.prototype.renderContent = function () {
        var _this = this;
        var _a = this.props, payInfo = _a.payInfo, changeStep = _a.changeStep;
        if (payInfo.get('amount') !== 0) {
            if (payInfo.get('isPaid')) {
                return (<div className='entry__box'>
            <div className='entry-ico-box'>
              <img className='entry-ico-box__img' src={'/img/ico-success.svg'} alt=""/>
              <p className='entry-ico-box__title'>Оплачен!</p>
            </div>

            <Button_1.Button type={'button'} styleBtn={Button_1.ButtonTypes.info} wide={true}>
              <react_router_dom_1.Link to="/profile">Продолжить</react_router_dom_1.Link>
            </Button_1.Button>
          </div>);
            }
            else {
                return (<div className='entry__box'>
            <h3 className='text-center mtb20'>Выберите способ оплаты:</h3>
            <ul className='options--with-img wide mb20'>
              <li className='options__item'>
                <form id='yaForm' ref={function (el) { return _this.yandex = el; }} action='https://money.yandex.ru/eshop.xml' className='form-pay' target='_blank' method='POST'>
                  <input name='shopId' defaultValue='' type='hidden'/>
                  <input name='scid' defaultValue='' type='hidden'/>
                  <input name='customerNumber' defaultValue={'HertysKJ'} type='hidden'/>
                  <input name='sum' defaultValue={payInfo.get('amount')} type='hidden'/>
                  <input name='orderNumber' defaultValue={payInfo.get('txId')} type='hidden'/>
                  <input name='paymentType' defaultValue='' type='hidden'/>
                  <div className='form-pay__submit' onClick={function () {
                    _this.yandex.submit();
                }}>
                    <img className='ico-yandexkassa mt5' src={process.env.PUBLIC_URL + '/img/png/pay/yandexkassa.png'} alt=''/>
                  </div>

                </form>
              </li>
              <li className='options__item'>
                <form id='robokassaForm' action='https://auth.robokassa.ru/Merchant/Index.aspx' ref={function (el) { return _this.robokassa = el; }} className='form-pay' target='_blank' method='POST'>
                  <input type='hidden' name='MrchLogin' defaultValue=''/>
                  <input type='hidden' name='OutSum' defaultValue={payInfo.get('amount')}/>
                  <input type='hidden' name='Desc' defaultValue='Text description'/>
                  <input type='hidden' name='SignatureValue' defaultValue=''/>
                  <input type='hidden' name='shp_txid' defaultValue={payInfo.get('txId')}/>
                  <input type='hidden' name='Culture' defaultValue='ru'/>
                  <div className='form-pay__submit' onClick={function () {
                    _this.robokassa.submit();
                }}>
                    <img className='ico-robokassa mt20' src={'/img/png/pay/robokassa.png'} alt=''/>
                  </div>

                </form>
              </li>
            </ul>

            <ul className='entry-nav'>
              <li className='entry-nav__item'>
                <a href='#' className='entry-nav__link' onClick={function (e) {
                    _this.back(e);
                }}>Вернуться на шаг назад</a>
              </li>
            </ul>

            <ul className='entry-nav'>
              <li className='entry-nav__item'>
                <react_router_dom_1.Link to='/' onClick={function () { return _this.logOut(); }}>Выйти</react_router_dom_1.Link>
              </li>
            </ul>
          </div>);
            }
        }
        else {
            return (<div className='entry__box'>
          <div className='entry-ico-box '>
            <img className='entry-ico-box__img' src='/assets/img/svg/ico-freebie.svg' alt=''/>
            <p className='entry-ico-box__title'>Халява!</p>
          </div>
          <Button_1.Button onClick={function () { return _this.payManual(); }} type={'button'} styleBtn={Button_1.ButtonTypes.info} wide={true}>
            Продолжить
          </Button_1.Button>
        </div>);
        }
    };
    StepThreeComponent.prototype.renderPrice = function () {
        var payInfo = this.props.payInfo;
        if (!payInfo.get('isPaid')) {
            return (<p className='entry-program-price highlight md30'>
          {payInfo.get('amount')} руб.
        </p>);
        }
        return null;
    };
    StepThreeComponent.prototype.render = function () {
        var _a = this.props, choosenProgram = _a.choosenProgram, currentPackage = _a.currentPackage;
        return (<div>
        {this.renderHeader()}
        {choosenProgram % const_1.ProgramNum.count !== 0 && <p className='entry-packet-name'>{currentPackage.get('name')}</p>}
        {this.renderPrice()}
        {this.renderContent()}
      </div>);
    };
    return StepThreeComponent;
}(CustomSteps_1.default));
exports.StepThreeComponent = StepThreeComponent;
exports.StepThree = react_redux_1.connect(mapStateToProps, {
    paymentInfo: ducks_1.paymentInfo,
    paymentManual: ducks_1.paymentManual
})(StepThreeComponent);
exports.default = ModalHOC_1.modalHOC(exports.StepThree, ducks_1.moduleName, ducks_1.subModuleName);
