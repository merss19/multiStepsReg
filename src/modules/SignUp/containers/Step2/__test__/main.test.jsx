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
var index_1 = require("../../../../../tools/storage/index");
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
var changeStep, getPrograms, userCreate, setProgramName, handleSubmit, setToken, toggleModal, setChoosenProgram, setPackageType, getPackage, paymentCreate, setPromo, setError, isFetching, isLoad, isError, step, errMsg, programs, choosenPackageType, choosenProgram, packages, currentPackage, promo, promoError, signUpData, dataRes, match, location, callback, history;
var start = function () {
    beforeEach(function () {
        changeStep = jest.fn(),
            getPrograms = jest.fn(),
            callback = jest.fn(),
            paymentCreate = jest.fn(function (payload, callback) { return callback(); });
        setProgramName = jest.fn(),
            setToken = jest.fn(),
            handleSubmit = jest.fn(function (callback) { return callback(); }),
            toggleModal = jest.fn(),
            setError = jest.fn(),
            setChoosenProgram = jest.fn(function () { return true; }),
            setPackageType = jest.fn(),
            getPackage = jest.fn(),
            //paymentCreate = jest.fn(),
            setPromo = jest.fn(),
            isFetching = false,
            isLoad = false,
            isError = false,
            errMsg = 'error',
            step = const_1.Steps.one,
            choosenPackageType = 1,
            choosenProgram = 0,
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
        getPrograms: getPrograms,
        userCreate: userCreate,
        handleSubmit: handleSubmit,
        changeStep: changeStep,
        setProgramName: setProgramName,
        setToken: setToken,
        toggleModal: toggleModal,
        setError: setError,
        setChoosenProgram: setChoosenProgram,
        setPackageType: setPackageType,
        getPackage: getPackage,
        paymentCreate: paymentCreate,
        setPromo: setPromo,
        step: step,
        choosenPackageType: choosenPackageType,
        choosenProgram: choosenProgram,
        promo: promo,
        currentPackage: currentPackage,
        packages: packages,
        promoError: promoError,
        errMsg: errMsg,
        programs: programs,
        isFetching: isFetching,
        isLoad: isLoad,
        isError: isError,
        match: match,
        location: location,
        history: history
    };
    var buildComponent = function () {
        return enzyme_1.shallow(<main_1.StepTwoComponent {...props}/>);
    };
    var buildComponentMount = function () {
        return enzyme_1.mount(<react_redux_1.Provider store={store}>
        <react_router_dom_1.BrowserRouter>
          <main_1.StepTwo {...props}/>
        </react_router_dom_1.BrowserRouter>
      </react_redux_1.Provider>);
    };
    return {
        buildComponentMount: buildComponentMount,
        props: props,
        buildComponent: buildComponent
    };
};
describe('Component StepTwo', function () {
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
    it('getPackage', function () {
        expect(getPackage).toHaveBeenCalled();
        expect(setChoosenProgram).toHaveBeenCalledWith(1);
    });
    it('setChoosenProgram do not call', function () {
        choosenProgram = 6;
        component = start().buildComponent();
        //component.setProps({choosenProgram})
        expect(setChoosenProgram).toHaveBeenCalledWith(1);
    });
    it('Test componentWillMount', function () {
        expect(getPrograms).toHaveBeenCalled();
    });
    it('getPromo, promoText === null', function () {
        var component = start().buildComponent();
        var instance = component.instance();
        instance.getPromo();
        expect(instance.getPromo()).toBeUndefined();
    });
    it('getPromo, promoText !== null', function () {
        var component = start().buildComponent();
        var instance = component.instance();
        instance.promoText = {
            value: 'test'
        };
        instance.getPromo();
        expect(getPackage).toHaveBeenCalledWith('test', true);
        expect(setPromo).toHaveBeenCalledWith('test');
    });
    it('paymentCreate', function () {
        index_1.storage.save('token', 'test');
        var component = start().buildComponent();
        var instance = component.instance();
        instance.paymentCreate();
        var cb = sinon.spy();
        var payload = {
            authToken: 'test',
            data: {
                program: 0,
                package: 1,
            }
        };
        expect(paymentCreate).toHaveBeenCalled();
        //expect(paymentCreate).toHaveBeenCalledWith(payload, cb);
    });
    describe('Test shouldComponentUpdate', function () {
        it('step', function () {
            var instance = component.instance();
            step = const_1.Steps.two;
            var props = __assign({}, start().props, { step: step });
            var shouldUpdate = instance.shouldComponentUpdate(props);
            expect(shouldUpdate).toBe(true);
        });
        it('packages', function () {
            var instance = component.instance();
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
                }
            ]);
            var props = __assign({}, start().props, { packages: packages });
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
        it('choosenPackageType', function () {
            var instance = component.instance();
            choosenPackageType = 3;
            var props = __assign({}, start().props, { choosenPackageType: choosenPackageType });
            var shouldUpdate = instance.shouldComponentUpdate(props);
            expect(shouldUpdate).toBe(true);
        });
        it('promo', function () {
            var instance = component.instance();
            promo = 'tele2';
            var props = __assign({}, start().props, { promo: promo });
            var shouldUpdate = instance.shouldComponentUpdate(props);
            expect(shouldUpdate).toBe(true);
        });
        it('promoError', function () {
            var instance = component.instance();
            promoError = 'tele2';
            var props = __assign({}, start().props, { promoError: promoError });
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
    it('call resultAction', function () {
        var instance = component.instance();
        instance.resultAction();
        expect(changeStep).toHaveBeenCalledWith(const_1.Steps.three);
        expect(parseInt(index_1.storage.load('program'))).toBe(choosenProgram);
        index_1.storage.remove('program');
    });
    it('call renderPackages', function () {
        var instance = component.instance();
        //console.log(component.debug())
        var li = component.find('ul').at(1).find('li').at(0);
        li.simulate('click');
        expect(setPackageType).toHaveBeenCalled();
        expect(component.find('ul').at(1).find('li')).toHaveLength(5);
    });
    it('call renderPrograms', function () {
        var instance = component.instance();
        //console.log(component.debug())
        expect(component.find('ul').at(0).find('li')).toHaveLength(4);
        expect(component.find('.is-active .g-hero').exists()).toBe(true);
        expect(component.find('.is-active .g-mather').exists()).toBe(false);
        expect(component.find('.is-active .g-extreme').exists()).toBe(false);
        expect(component.find('.is-active .g-tomorrow').exists()).toBe(false);
    });
    it('call renderPrograms, is-active - g-mather', function () {
        programs = programs.map(function (item) {
            if (item.get('id') === 1) {
                return item.set('isActive', false);
            }
            if (item.get('id') === 2) {
                return item.set('isActive', true);
            }
            return item;
        });
        var component = start().buildComponent();
        var li = component.find('.g-mather');
        li.simulate('click');
        expect(setChoosenProgram).toHaveBeenCalled();
        expect(component.find('.is-active .g-hero').exists()).toBe(false);
        expect(component.find('.is-active .g-mather').exists()).toBe(true);
        expect(component.find('.is-active .g-extreme').exists()).toBe(false);
        expect(component.find('.is-active .g-tomorrow').exists()).toBe(false);
    });
    it('call renderPrograms, is-active - g-extreme', function () {
        programs = programs.map(function (item) {
            if (item.get('id') === 1) {
                return item.set('isActive', false);
            }
            if (item.get('id') === 3) {
                return item.set('isActive', true);
            }
            return item;
        });
        var component = start().buildComponent();
        var li = component.find('.g-extreme');
        li.simulate('click');
        expect(setChoosenProgram).toHaveBeenCalled();
        expect(component.find('.is-active .g-hero').exists()).toBe(false);
        expect(component.find('.is-active .g-mather').exists()).toBe(false);
        expect(component.find('.is-active .g-extreme').exists()).toBe(true);
        expect(component.find('.is-active .g-tomorrow').exists()).toBe(false);
    });
    it('call renderPrograms, is-active - g-tomorrow', function () {
        programs = programs.map(function (item) {
            if (item.get('id') === 1) {
                return item.set('isActive', false);
            }
            if (item.get('id') === 4) {
                return item.set('isActive', true);
            }
            return item;
        });
        var component = start().buildComponent();
        var li = component.find('.g-tomorrow');
        li.simulate('click');
        expect(setChoosenProgram).toHaveBeenCalled();
        expect(component.find('.is-active .g-hero').exists()).toBe(false);
        expect(component.find('.is-active .g-mather').exists()).toBe(false);
        expect(component.find('.is-active .g-extreme').exists()).toBe(false);
        expect(component.find('.is-active .g-tomorrow').exists()).toBe(true);
    });
    it('call renderPrograms, programs === null', function () {
        programs = null;
        var component = start().buildComponent();
        var instance = component.instance();
        expect(instance.renderPrograms()).toEqual(<div>Нет программ</div>);
    });
    describe('call render()', function () {
        it('call renderHeader', function () {
            var spy = sinon.spy(main_1.StepTwoComponent.prototype, 'renderHeader');
            var component = start().buildComponent();
            expect(spy.called).toBe(true);
        });
        it('call renderPackages', function () {
            var spy = sinon.spy(main_1.StepTwoComponent.prototype, 'renderPackages');
            var component = start().buildComponent();
            expect(spy.called).toBe(true);
        });
        it('call renderPrograms', function () {
            var spy = sinon.spy(main_1.StepTwoComponent.prototype, 'renderPrograms');
            var component = start().buildComponent();
            expect(spy.called).toBe(true);
        });
        it('render currentPackage', function () {
            var component = start().buildComponent();
            var price = component.find('.entry-program-price').text();
            expect(price).toBe(start().props.currentPackage.get('cost') + ' руб');
        });
        it('test input promo', function () {
            // const component = start().buildComponentMount();
            // const instance = component.instance() as StepTwoComponent;
            //const promo = component.find('input[name="promo"]');
            //console.log(component.debug())
            //console.log('promoooo')
            //console.log(component.find('input[name="promo"]').instance())
            //promo.simulate('focus');
            // promo.simulate('change', {target: {value: 'testPromo'}});
            // promo.simulate('blur');
            // console.log(instance.promoText)
            //expect(promo.props().value).toBe('testPromo');
        });
        it('render promo button', function () {
            var button = component.find(button_1.Button).at(0);
            expect(button.exists()).toBe(true);
            expect(button.props().type).toBe('button');
            expect(button.props().styleBtn).toBe(button_1.ButtonTypes.info);
            expect(button.props().wide).toBe(false);
        });
        it('click promo Button', function () {
            var spy = sinon.spy(main_1.StepTwoComponent.prototype, 'getPromo');
            var button = component.find(button_1.Button).at(0);
            button.simulate('click');
            expect(spy.called).toBe(true);
        });
        it('render next button', function () {
            var button = component.find(button_1.Button).at(1);
            expect(button.exists()).toBe(true);
            expect(button.props().type).toBe('button');
            expect(button.props().styleBtn).toBe(button_1.ButtonTypes.success);
            expect(button.props().wide).toBe(true);
        });
        it('click next Button', function () {
            var spy = sinon.spy(main_1.StepTwoComponent.prototype, 'paymentCreate');
            var button = component.find(button_1.Button).at(1);
            button.simulate('click');
            expect(spy.called).toBe(true);
        });
        it('click Link', function () {
            var spy = sinon.spy(main_1.StepTwoComponent.prototype, 'logOut');
            var button = component.find('Link');
            button.simulate('click');
            expect(spy.called).toBe(true);
        });
    });
});
