"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var enzyme_1 = require("enzyme");
var main_1 = require("../main");
var React = require("react");
var enzyme_to_json_1 = require("enzyme-to-json");
var sinon = require("sinon");
var react_redux_1 = require("react-redux");
var store_1 = require("../../../../../store");
var react_router_dom_1 = require("react-router-dom");
var enzyme_2 = require("enzyme");
var Adapter = require("enzyme-adapter-react-16");
var const_1 = require("../../../const");
var button_1 = require("../../../../../components/Button/button");
var Immutable = require("immutable");
var store = store_1.default();
enzyme_2.configure({ adapter: new Adapter() });
var data = [
    {
        id: 1,
        name: 'hero',
        isActive: true
    },
    {
        id: 2,
        name: 'mother',
        isActive: false
    },
    {
        id: 3,
        name: 'extreme',
        isActive: false
    },
    {
        id: 4,
        name: 'tomorrow',
        isActive: false
    }
];
var changeStep, handleSubmit, setToken, toggleModal, setPackageType, authToken, payInfo, paymentInfo, paymentManual, setError, isFetching, isLoad, isError, step, errMsg, programs, choosenPackageType, choosenProgram, packages, currentPackage, promo, promoError, match, location, callback, history;
var start = function () {
    beforeEach(function () {
        changeStep = jest.fn(),
            callback = jest.fn(),
            paymentManual = jest.fn(function (payload, callback) { return callback(); });
        setToken = jest.fn(),
            handleSubmit = jest.fn(function (callback) { return callback(); }),
            toggleModal = jest.fn(),
            setError = jest.fn(),
            paymentInfo = jest.fn(),
            authToken = 'test',
            payInfo = Immutable.fromJS({
                txId: 'qweqwe',
                isPaid: true,
                amount: 3000
            }),
            isFetching = false,
            isLoad = false,
            isError = false,
            errMsg = 'error',
            step = const_1.Steps.one,
            packages = Immutable.fromJS([
                {
                    name: '1 человек',
                    isActive: false,
                    id: 1
                },
                {
                    name: '2 человек',
                    isActive: false,
                    id: 2
                },
                {
                    name: '1 ЧЕЛОВЕК + ФИТНЕС-БРАСЛЕТ',
                    isActive: false,
                    id: 3
                },
                {
                    name: '1 ЧЕЛОВЕК + КОВРИК',
                    isActive: false,
                    id: 4
                },
                {
                    name: '3 человек',
                    isActive: false,
                    id: 5
                },
            ]),
            currentPackage = Immutable.fromJS({
                cost: 3000,
                name: '1 человек',
                isActive: true,
                id: 1
            }),
            promo = '',
            promoError = '',
            programs = Immutable.fromJS(data),
            /*signUpData = {
              email: 'mail@mail.ru',
              password: 'qweqwe',
              passwordAgain: 'qweqwe',
              gender: 'male',
            },*/
            match = {
                isExact: true,
                params: {},
                path: "/task",
                url: "/task"
            },
            location = {},
            history = {
                replace: jest.fn()
            };
    });
    var props = {
        handleSubmit: handleSubmit,
        changeStep: changeStep,
        paymentInfo: paymentInfo,
        paymentManual: paymentManual,
        toggleModal: toggleModal,
        setError: setError,
        authToken: authToken,
        payInfo: payInfo,
        setPackageType: setPackageType,
        step: step,
        choosenPackageType: choosenPackageType,
        choosenProgram: choosenProgram,
        currentPackage: currentPackage,
        errMsg: errMsg,
        isFetching: isFetching,
        isLoad: isLoad,
        isError: isError,
        match: match,
        location: location,
        history: history
    };
    var buildComponent = function () {
        return enzyme_1.shallow(<main_1.StepThreeComponent {...props}/>);
    };
    var buildComponentMount = function () {
        return enzyme_1.mount(<react_redux_1.Provider store={store}>
        <react_router_dom_1.BrowserRouter>
          <main_1.StepThree {...props}/>
        </react_router_dom_1.BrowserRouter>
      </react_redux_1.Provider>);
    };
    return {
        buildComponentMount: buildComponentMount,
        props: props,
        buildComponent: buildComponent
    };
};
describe('Component StepThree', function () {
    var component;
    start();
    beforeEach(function () {
        component = start().buildComponent();
    });
    it('renders component', function () {
        expect(component).toHaveLength(1);
    });
    it('renders component Mount', function () {
        var component = start().buildComponentMount();
        expect(component).toHaveLength(1);
    });
    it('renders correctly', function () {
        var tree = enzyme_to_json_1.default(component);
        expect(tree).toMatchSnapshot();
    });
    it('call paymentInfo', function () {
        component = start().buildComponent();
        expect(paymentInfo).toHaveBeenCalled();
    });
    it('call payManual', function () {
        var component = start().buildComponent();
        var instance = component.instance();
        instance.payManual();
        expect(paymentManual).toHaveBeenCalled();
        //expect(paymentCreate).toHaveBeenCalledWith(payload, cb);
    });
    it('call back', function () {
        var component = start().buildComponent();
        var instance = component.instance();
        var e = {
            preventDefault: function () { return true; }
        };
        instance.back(e);
        expect(changeStep).toHaveBeenCalledWith(const_1.Steps.two);
    });
    describe('Call renderContent', function () {
        it('amount !== 0, isPaid === true', function () {
            var component = start().buildComponent();
            expect(component.find('.entry-ico-box__title').text()).toBe('Оплачен!');
            expect(component.find(button_1.Button).exists()).toBe(true);
        });
        it('amount !== 0, isPaid === false', function () {
            payInfo = Immutable.fromJS({
                txId: 'qweqwe',
                isPaid: false,
                amount: 3000
            });
            var component = start().buildComponent();
            expect(component.find('.form-pay')).toHaveLength(2);
            expect(component.find('.entry-nav')).toHaveLength(2);
            expect(component.find(button_1.Button).exists()).toBe(false);
        });
        it('amount === 0', function () {
            payInfo = Immutable.fromJS({
                txId: 'qweqwe',
                isPaid: false,
                amount: 0
            });
            var component = start().buildComponent();
            console.log('step333');
            console.log(component.find('.entry-ico-box__img').prop('src'));
            expect(component.find('.entry-ico-box__title').text()).toBe('Халява!');
            //expect(component.find('.entry-nav')).toHaveLength(2);
            expect(component.find('.entry-ico-box__title').text()).toBe('Халява!');
            expect(component.find(button_1.Button).exists()).toBe(true);
            expect(component.find('.entry-ico-box__img').prop('src')).toBe('/assets/img/svg/ico-freebie.svg');
        });
    });
    it('call renderPrice, isPaid === true', function () {
        var component = start().buildComponent();
        var instance = component.instance();
        instance.renderPrice();
        expect(component.find('.entry-program-price')).toHaveLength(0);
    });
    it('call renderPrice, isPaid === false', function () {
        payInfo = Immutable.fromJS({
            txId: 'qweqwe',
            isPaid: false,
            amount: 3000
        });
        var component = start().buildComponent();
        var instance = component.instance();
        instance.renderPrice();
        expect(component.find('.entry-program-price')).toHaveLength(1);
        expect(component.find('.entry-program-price').text()).toBe(start().props.payInfo.get('amount') + ' руб.');
    });
    it('click back', function () {
        payInfo = Immutable.fromJS({
            txId: 'qweqwe',
            isPaid: false,
            amount: 3000
        });
        var component = start().buildComponent();
        var spy = sinon.spy(main_1.StepThreeComponent.prototype, 'back');
        var button = component.find('.entry-nav').at(0).find('.entry-nav__link');
        button.simulate('click');
        expect(spy.called).toBe(true);
    });
    it('click logOut', function () {
        payInfo = Immutable.fromJS({
            txId: 'qweqwe',
            isPaid: false,
            amount: 3000
        });
        var component = start().buildComponent();
        var spy = sinon.spy(main_1.StepThreeComponent.prototype, 'logOut');
        var button = component.find('.entry-nav').at(1).find(react_router_dom_1.Link);
        button.simulate('click');
        expect(spy.called).toBe(true);
    });
    it('click payManual', function () {
        payInfo = Immutable.fromJS({
            txId: 'qweqwe',
            isPaid: false,
            amount: 0
        });
        var component = start().buildComponent();
        var spy = sinon.spy(main_1.StepThreeComponent.prototype, 'payManual');
        var button = component.find(button_1.Button);
        button.simulate('click');
        expect(spy.called).toBe(true);
    });
    describe('Test shouldComponentUpdate', function () {
        it('step', function () {
            var instance = component.instance();
            step = const_1.Steps.three;
            var props = __assign({}, start().props, { step: step });
            var shouldUpdate = instance.shouldComponentUpdate(props);
            expect(shouldUpdate).toBe(true);
        });
        it('authToken', function () {
            var instance = component.instance();
            authToken = 'qwerty';
            var props = __assign({}, start().props, { authToken: authToken });
            var shouldUpdate = instance.shouldComponentUpdate(props);
            expect(shouldUpdate).toBe(true);
        });
        it('payInfo', function () {
            var instance = component.instance();
            payInfo = {
                txId: 'qweqwe',
                test: {}
            };
            var props = __assign({}, start().props, { payInfo: payInfo });
            var shouldUpdate = instance.shouldComponentUpdate(props);
            expect(shouldUpdate).toBe(true);
        });
        it('choosenProgram', function () {
            var instance = component.instance();
            choosenProgram = 3;
            var props = __assign({}, start().props, { choosenProgram: choosenProgram });
            var shouldUpdate = instance.shouldComponentUpdate(props);
            expect(shouldUpdate).toBe(true);
        });
        it('currentPackage', function () {
            var instance = component.instance();
            currentPackage = Immutable.fromJS({
                name: '2 человек',
                isActive: true,
                id: 2
            });
            var props = __assign({}, start().props, { currentPackage: currentPackage });
            var shouldUpdate = instance.shouldComponentUpdate(props);
            expect(shouldUpdate).toBe(true);
        });
    });
});
