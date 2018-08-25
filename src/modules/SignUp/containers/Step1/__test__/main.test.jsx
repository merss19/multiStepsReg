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
var changeStep, getPrograms, userCreate, setProgramName, handleSubmit, setToken, toggleModal, setError, isFetching, isLoad, isError, step, errMsg, signUpData, dataRes, match, location, history;
var start = function () {
    beforeEach(function () {
        changeStep = jest.fn(),
            getPrograms = jest.fn(),
            userCreate = jest.fn(function (data, callback) { return callback(); }),
            setProgramName = jest.fn(),
            setToken = jest.fn(),
            handleSubmit = jest.fn(function (callback) { return callback(); }),
            toggleModal = jest.fn(),
            setError = jest.fn(),
            isFetching = false,
            isLoad = false,
            isError = false,
            errMsg = 'error',
            step = const_1.Steps.one,
            dataRes = {
                authToken: 'qweqwe',
                promoName: 'tele2'
            },
            signUpData = {
                email: 'mail@mail.ru',
                password: 'qweqwe',
                passwordAgain: 'qweqwe',
                gender: 'male',
            },
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
        step: step,
        errMsg: errMsg,
        isFetching: isFetching,
        isLoad: isLoad,
        isError: isError,
        match: match,
        location: location,
        history: history
    };
    var buildComponent = function () {
        return enzyme_1.shallow(<main_1.StepOneComponent {...props}/>);
    };
    var buildComponentMount = function () {
        return enzyme_1.mount(<react_redux_1.Provider store={store}>
        <react_router_dom_1.BrowserRouter>
          <main_1.default {...props}/>
        </react_router_dom_1.BrowserRouter>
      </react_redux_1.Provider>);
    };
    return {
        buildComponentMount: buildComponentMount,
        props: props,
        buildComponent: buildComponent
    };
};
describe('Component StepOne', function () {
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
    describe('Test shouldComponentUpdate', function () {
        it('step', function () {
            var instance = component.instance();
            step = const_1.Steps.two;
            var props = __assign({}, start().props, { step: step });
            var shouldUpdate = instance.shouldComponentUpdate(props);
            expect(shouldUpdate).toBe(true);
        });
        /*   it('isFetching', () => {
             const instance = component.instance() as StepOneComponent;
             isFetching = true;
             let props = {
               ...start().props,
               isFetching: isFetching
             };
             const shouldUpdate = instance.shouldComponentUpdate(props);
             expect(shouldUpdate).toBe(true)
           });
           it('isError', () => {
             const instance = component.instance() as StepOneComponent;
             isError = true;
             let props = {
               ...start().props,
               isError: isError
             };
             const shouldUpdate = instance.shouldComponentUpdate(props);
             expect(shouldUpdate).toBe(true)
           });
           it('errMsg', () => {
             const instance = component.instance() as StepOneComponent;
             errMsg = 'test';
             let props = {
               ...start().props,
               errMsg: errMsg
             };
             const shouldUpdate = instance.shouldComponentUpdate(props);
             expect(shouldUpdate).toBe(true)
           });*/
    });
    it('call onSubmit', function () {
        var spy = sinon.spy(main_1.StepOneComponent.prototype, 'resultAction');
        var component = start().buildComponent();
        var instance = component.instance();
        instance.onSubmit(signUpData);
        var cb = jest.fn(function () { return true; });
        expect(userCreate).toHaveBeenCalled();
        component.instance().props.userCreate(signUpData, cb);
        expect(spy.called).toBe(true);
    });
    it('call resultAction, dataRes.authToken !== null', function () {
        var instance = component.instance();
        instance.resultAction(dataRes);
        expect(setToken).toHaveBeenCalledWith(dataRes.authToken);
        expect(changeStep).toHaveBeenCalledWith(const_1.Steps.two);
        expect(index_1.storage.load('token')).toBe(dataRes.authToken);
        expect(index_1.storage.load('promoName')).toBe(dataRes.promoName);
        index_1.storage.remove('token');
        index_1.storage.remove('promoName');
    });
    it('call resultAction, dataRes.authToken === null', function () {
        dataRes = {
            authToken: null,
            promoName: 'tele2'
        };
        var instance = component.instance();
        instance.resultAction(dataRes);
        expect(setToken).not.toHaveBeenCalled();
        expect(changeStep).not.toHaveBeenCalled();
        expect(index_1.storage.load('token')).toBeUndefined();
        expect(index_1.storage.load('promoName')).toBeUndefined();
    });
    describe('call render()', function () {
        it('call renderHeader', function () {
            var spy = sinon.spy(main_1.StepOneComponent.prototype, 'renderHeader');
            var component = start().buildComponent();
            expect(spy.called).toBe(true);
        });
        it('render button', function () {
            var component = start().buildComponent();
            var button = component.find(button_1.Button);
            expect(button.exists()).toBe(true);
            expect(button.props().type).toBe('submit');
            expect(button.props().styleBtn).toBe(button_1.ButtonTypes.info);
            expect(button.props().wide).toBe(true);
        });
        it('render Fields', function () {
            var component = start().buildComponent();
            var email = component.find('Field[name="email"]');
            var password = component.find('Field[name="password"]');
            var passwordAgain = component.find('Field[name="passwordAgain"]');
            var gender = component.find('Field[name="gender"]');
            var accept = component.find('Field[name="accept"]');
            expect(email.exists()).toBe(true);
            expect(password.exists()).toBe(true);
            expect(accept.exists()).toBe(true);
            expect(passwordAgain.exists()).toBe(true);
            expect(gender).toHaveLength(2);
        });
        it('click Button', function () {
            var component = start().buildComponent();
            component.find('form').simulate('submit');
            expect(component.instance().props.handleSubmit).toHaveBeenCalled();
        });
    });
});
