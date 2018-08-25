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
var CustomSteps_1 = require("../CustomSteps");
var react_router_dom_1 = require("react-router-dom");
var classNames = require("classnames");
var storage_1 = require("tools/storage");
var const_1 = require("../../const");
var Button_1 = require("components/Button");
var CustomModal_1 = require("modules/CustomModal");
var ModalHOC_1 = require("components/HOC/ModalHOC");
var ducks_1 = require("./ducks");
var selectors_1 = require("../../selectors");
var mapStateToProps = function (state) { return ({
    programs: selectors_1.selectPrograms(state),
    choosenProgram: selectors_1.selectChoosenProgram(state),
    choosenPackageType: selectors_1.selectPackageType(state),
    packages: selectors_1.selectPackages(state),
    promo: selectors_1.selectPromo(state),
    currentPackage: selectors_1.selectPackage(state),
    promoError: selectors_1.selectPromoError(state)
}); };
var StepTwoComponent = /** @class */ (function (_super) {
    __extends(StepTwoComponent, _super);
    function StepTwoComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StepTwoComponent.prototype.componentWillMount = function () {
        var _a = this.props, programs = _a.programs, getPrograms = _a.getPrograms, packages = _a.packages, setChoosenProgram = _a.setChoosenProgram, choosenProgram = _a.choosenProgram, getPackage = _a.getPackage;
        if (!packages) {
            getPackage();
        }
        if (!programs) {
            getPrograms();
        }
    };
    StepTwoComponent.prototype.componentWillReceiveProps = function (nextProps) {
        var _a = this.props, programs = _a.programs, choosenProgram = _a.choosenProgram, setChoosenProgram = _a.setChoosenProgram;
        if (nextProps.programs) {
            if (!choosenProgram) {
                if (nextProps.programs) {
                    nextProps.programs.map(function (program) {
                        if (program.get('id') % const_1.ProgramNum.count === const_1.ProgramNum.hero) {
                            setChoosenProgram(program.get('id'));
                        }
                    });
                }
            }
        }
    };
    StepTwoComponent.prototype.shouldComponentUpdate = function (nextProps) {
        return (nextProps.step !== this.props.step
            || nextProps.packages !== this.props.packages
            || nextProps.programs !== this.props.programs
            || nextProps.choosenProgram !== this.props.choosenProgram
            || nextProps.choosenPackageType !== this.props.choosenPackageType
            || nextProps.promo !== this.props.promo
            || nextProps.currentPackage !== this.props.currentPackage
            || nextProps.promoError !== this.props.promoError);
    };
    StepTwoComponent.prototype.getPromo = function () {
        var _a = this.props, getPackage = _a.getPackage, setPromo = _a.setPromo;
        if (!this.promoText || !this.promoText.value.length) {
            return;
        }
        getPackage(this.promoText.value);
        setPromo(this.promoText.value);
    };
    StepTwoComponent.prototype.paymentCreate = function () {
        var _this = this;
        var _a = this.props, choosenProgram = _a.choosenProgram, choosenPackageType = _a.choosenPackageType, paymentCreate = _a.paymentCreate, promo = _a.promo;
        var payload = {
            authToken: storage_1.storage.load('token'),
            data: {
                program: choosenProgram,
                package: choosenPackageType,
                promoName: promo
            }
        };
        paymentCreate(payload, function () { return _this.resultAction(); });
    };
    StepTwoComponent.prototype.resultAction = function () {
        var _a = this.props, changeStep = _a.changeStep, choosenProgram = _a.choosenProgram;
        storage_1.storage.save('program', choosenProgram, { path: '/', maxAge: 60 * 60 * 24 * 365 * 10 });
        changeStep(const_1.Steps.three);
    };
    StepTwoComponent.prototype.renderPrograms = function () {
        var _a = this.props, programs = _a.programs, setChoosenProgram = _a.setChoosenProgram;
        if (!programs) {
            return <div>Нет программ</div>;
        }
        else {
            return (programs.map(function (program) { return (<li key={program.get('id')} onClick={function () { setChoosenProgram(program.get('id')); }} className={classNames('options__item', {
                'is-active': program.get('isActive'),
                'g-hero': program.get('id') % const_1.ProgramNum.count == const_1.ProgramNum.hero,
                'g-mather': program.get('id') % const_1.ProgramNum.count == const_1.ProgramNum.mother,
                'g-extreme': program.get('id') % const_1.ProgramNum.count == const_1.ProgramNum.extreme,
                'g-tomorrow': program.get('id') % const_1.ProgramNum.count == const_1.ProgramNum.tomorrow,
            })}>
            {program.get('name')}
          </li>); }));
        }
    };
    StepTwoComponent.prototype.renderPackages = function () {
        var _a = this.props, packages = _a.packages, setPackageType = _a.setPackageType;
        if (!packages) {
            return null;
        }
        return (packages.map(function (pckg) {
            return (<li key={pckg.get('id')} className={classNames('options__item', {
                'is-active': pckg.get('isActive')
            })} onClick={function () { return setPackageType(pckg.get('id')); }}>
            {pckg.get('name')}
          </li>);
        }));
    };
    StepTwoComponent.prototype.render = function () {
        var _this = this;
        var currentPackage = this.props.currentPackage;
        return (<div>
        {this.renderHeader()}
        <div className='entry__box'>
          <ul className='options options--white wide mb30'>
            {this.renderPrograms()}
          </ul>
          <ul className='options options--white options--types wide mt30'>
            {this.renderPackages()}
          </ul>
        </div>
        <div className='entry__box'>
          <div className='entry-program-price'>{currentPackage ? currentPackage.get('cost') + ' руб' : ''}</div>
          <div className='input--btn'>
            <input ref={function (input) { return _this.promoText = input; }} type='text' name='promo' className='input__field' placeholder='Eсть промокод, вводи'/>
            <Button_1.Button onClick={function () { return _this.getPromo(); }} type='button' styleBtn={Button_1.ButtonTypes.info}>
              Применить
            </Button_1.Button>
          </div>
          <Button_1.Button onClick={function () { return _this.paymentCreate(); }} type='button' styleBtn={Button_1.ButtonTypes.success} wide={true}>
            Далее
          </Button_1.Button>
        </div>

        <div className='entry__link text-center'>
          <div className='entry-nav__item'>
            <react_router_dom_1.Link to='/' onClick={function () { return _this.logOut(); }}>Выйти</react_router_dom_1.Link>
          </div>
        </div>
      </div>);
    };
    return StepTwoComponent;
}(CustomSteps_1.default));
exports.StepTwoComponent = StepTwoComponent;
exports.StepTwo = react_redux_1.connect(mapStateToProps, {
    setChoosenProgram: ducks_1.setChoosenProgram,
    setPackageType: ducks_1.setPackageType,
    toggleModal: CustomModal_1.toggleModal,
    paymentCreate: ducks_1.paymentCreate,
    setPromo: ducks_1.setPromo,
    getPackage: ducks_1.getPackage,
    getPrograms: ducks_1.getPrograms
})(StepTwoComponent);
exports.default = ModalHOC_1.modalHOC(exports.StepTwo, ducks_1.moduleName, ducks_1.subModuleName);
