"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enzyme_1 = require("enzyme");
var main_1 = require("../main");
var React = require("react");
var enzyme_to_json_1 = require("enzyme-to-json");
var sinon = require("sinon");
var react_redux_1 = require("react-redux");
var store_1 = require("../../../store");
var react_router_dom_1 = require("react-router-dom");
var enzyme_2 = require("enzyme");
var Adapter = require("enzyme-adapter-react-16");
var const_1 = require("../../SignUp/const");
var index_1 = require("../../../tools/storage/index");
var store = store_1.default();
enzyme_2.configure({ adapter: new Adapter() });
var data = {
    paidState: 2,
    program: 11,
    isFirstEdit: false,
    authToken: 'qweqwe'
};
var payload = {
    email: 'test@email.ru',
    password: 'qweqwe'
};
describe('Component LoginForm', function () {
    var changeStep, submitLogin, toggleModal, setToken, setError, isFetching, isLoad, isError, errMsg, profile, match, location, history;
    beforeEach(function () {
        changeStep = jest.fn(),
            submitLogin = jest.fn(),
            toggleModal = jest.fn(),
            setToken = jest.fn(),
            setError = jest.fn(),
            isFetching = false,
            isLoad = false,
            isError = false,
            errMsg = 'Ошибка',
            profile = {},
            match = {},
            location = {},
            history = {
                replace: jest.fn()
            };
    });
    var buildComponent = function () {
        var props = {
            changeStep: changeStep,
            submitLogin: submitLogin,
            toggleModal: toggleModal,
            setToken: setToken,
            setError: setError,
            isFetching: isFetching,
            isLoad: isLoad,
            isError: isError,
            errMsg: errMsg,
            profile: profile,
            match: match,
            location: location,
            history: history
        };
        return enzyme_1.shallow(<main_1.LoginComponent {...props}/>);
    };
    var buildComponentMount = function () {
        var props = {
            changeStep: changeStep,
            submitLogin: submitLogin,
            toggleModal: toggleModal,
            isFetching: isFetching,
            isLoad: isLoad,
            isError: isError,
            profile: profile
        };
        return enzyme_1.mount(<react_redux_1.Provider store={store}>
        <react_router_dom_1.BrowserRouter>
          <main_1.Login {...props}/>
        </react_router_dom_1.BrowserRouter>
      </react_redux_1.Provider>);
    };
    var spy = sinon.spy(main_1.Login.prototype, 'componentWillReceiveProps');
    it('renders component', function () {
        var component = buildComponent();
        expect(component).toHaveLength(1);
    });
    it('renders correctly', function () {
        var tree = enzyme_to_json_1.default(buildComponent());
        expect(tree).toMatchSnapshot();
    });
    it('renders component Mount', function () {
        var component = buildComponentMount();
        expect(component).toHaveLength(1);
    });
    it('do not call toggleModal', function () {
        var component = buildComponent();
        expect(toggleModal).not.toHaveBeenCalled();
        isLoad = true;
        isFetching = false;
        component.setProps({ isLoad: isLoad, isFetching: isFetching });
        expect(toggleModal).not.toHaveBeenCalled();
    });
    it('call toggleModal isFetching = true', function () {
        var component = buildComponent();
        isFetching = true;
        component.setProps({ isFetching: isFetching });
        expect(toggleModal).toHaveBeenCalledWith(true);
    });
    it('call toggleModal isError = true', function () {
        var component = buildComponent();
        isError = true;
        component.setProps({ isError: isError });
        expect(toggleModal).toHaveBeenCalledWith(true);
    });
    it('call setError', function () {
        var component = buildComponent();
        var instance = component.instance();
        instance.setError();
        expect(setError).toHaveBeenCalledWith(false);
    });
    it('call submitCb - call submitLogin', function () {
        var component = buildComponent();
        var instance = component.instance();
        instance.onSubmit(payload);
        expect(submitLogin).toHaveBeenCalled();
    });
    it('call submitCb, paidState !== 0', function () {
        var component = buildComponent();
        var instance = component.instance();
        instance.submitCb(data);
        expect(changeStep).toHaveBeenCalledWith(const_1.Steps.four);
        expect(setToken).toHaveBeenCalledWith(data.authToken);
        expect(index_1.storage.load('token')).toBe(data.authToken);
        expect(parseInt(index_1.storage.load('userProgram'))).toBe(data.program);
    });
    it('call submitCb, paidState === 2', function () {
        var component = buildComponent();
        var instance = component.instance();
        instance.submitCb(data);
        expect(changeStep).toHaveBeenCalledWith(const_1.Steps.four);
    });
    it('call submitCb, paidState !== 2', function () {
        var component = buildComponent();
        var instance = component.instance();
        data.paidState = 1;
        instance.submitCb(data);
        expect(history.replace).toHaveBeenCalledWith('/task');
    });
    it('call submitCb, isFirstEdit === true', function () {
        var component = buildComponent();
        var instance = component.instance();
        data.isFirstEdit = true;
        instance.submitCb(data);
        expect(history.replace).toHaveBeenCalledWith('/profile');
    });
    it('call submitCb, isFirstEdit !== true', function () {
        var component = buildComponent();
        var instance = component.instance();
        data.isFirstEdit = false;
        instance.submitCb(data);
        expect(history.replace).toHaveBeenCalledWith('/task');
    });
    it('call submitCb, !data.program', function () {
        var component = buildComponent();
        var instance = component.instance();
        data.paidState = 0;
        data.program = null;
        instance.submitCb(data);
        expect(history.replace).toHaveBeenCalledWith('/signup');
        expect(changeStep).toHaveBeenCalledWith(const_1.Steps.two);
        expect(index_1.storage.load('token')).toBe(data.authToken);
    });
    it('call submitCb, paidState === 0', function () {
        var component = buildComponent();
        var instance = component.instance();
        data.paidState = 0;
        data.isFirstEdit = true;
        data.program = 11;
        instance.submitCb(data);
        expect(history.replace).toHaveBeenCalledWith('/signup');
        expect(changeStep).toHaveBeenCalledWith(const_1.Steps.three);
        expect(index_1.storage.load('token')).toBe(data.authToken);
    });
});
