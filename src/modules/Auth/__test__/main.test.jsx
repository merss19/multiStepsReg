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
var CustomModal_1 = require("../../CustomModal");
var store = store_1.default();
var PageTodayTask_1 = require("../../../pages/PageTodayTask");
var enzyme_2 = require("enzyme");
var Adapter = require("enzyme-adapter-react-16");
var index_1 = require("../../../tools/storage/index");
var const_1 = require("../../SignUp/const");
enzyme_2.configure({ adapter: new Adapter() });
var data = {
    paidState: 2,
    program: 11,
    isFirstEdit: false,
    emailConfirmed: true,
    authToken: 'qweqwe'
};
var payload = {
    email: 'test@email.ru'
};
var changeStep, toggleModal, checkAuth, renderModal, isFetching, isLoad, isError, isAuth, errMsg, user, match, location, component, history;
var start = function () {
    beforeEach(function () {
        changeStep = jest.fn(),
            toggleModal = jest.fn(),
            checkAuth = jest.fn(),
            renderModal = jest.fn(),
            component = PageTodayTask_1.default,
            isFetching = false,
            isLoad = false,
            isAuth = false,
            isError = false,
            user = {},
            errMsg = 'Ошибка',
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
        toggleModal: toggleModal,
        isFetching: isFetching,
        checkAuth: checkAuth,
        changeStep: changeStep,
        renderModal: renderModal,
        component: component,
        user: user,
        isAuth: isAuth,
        isLoad: isLoad,
        isError: isError,
        errMsg: errMsg,
        match: match,
        location: location,
        history: history
    };
    var buildComponent = function () {
        return enzyme_1.shallow(<main_1.ProtectedRouteComponent {...props}/>);
    };
    var buildComponentMount = function () {
        return enzyme_1.mount(<react_redux_1.Provider store={store}>
        <react_router_dom_1.BrowserRouter>
          <main_1.ProtectedRouteComponent {...props}/>
        </react_router_dom_1.BrowserRouter>
      </react_redux_1.Provider>);
    };
    return {
        buildComponentMount: buildComponentMount,
        props: props,
        buildComponent: buildComponent
    };
};
describe('Component ProtectedRoute', function () {
    start();
    it('renders component', function () {
        var component = start().buildComponent();
        expect(component).toHaveLength(1);
    });
    it('renders component Mount', function () {
        var component = start().buildComponentMount();
        expect(component).toHaveLength(1);
    });
    it('renders correctly', function () {
        var tree = enzyme_to_json_1.default(start().buildComponent());
        expect(tree).toMatchSnapshot();
    });
    it('call checkAuth', function () {
        var component = start().buildComponent();
        expect(checkAuth).toHaveBeenCalled();
    });
    it('test leave method', function () {
        var component = start().buildComponent();
        var instance = component.instance();
        instance.leave();
        expect(toggleModal).toHaveBeenCalledWith(false);
        expect(history.replace).toHaveBeenCalledWith('/');
        expect(index_1.storage.load('token')).toBeUndefined();
        expect(index_1.storage.load('txId')).toBeUndefined();
        expect(index_1.storage.load('program')).toBeUndefined();
        expect(index_1.storage.load('packageType')).toBeUndefined();
        expect(index_1.storage.load('promoName')).toBeUndefined();
    });
    it('test modalClick method', function () {
        var component = start().buildComponent();
        var instance = component.instance();
        instance.modalClick();
        expect(toggleModal).toHaveBeenCalledWith(false);
        expect(history.replace).toHaveBeenCalledWith('/');
    });
    it('pass prop component ', function () {
        var component = start().buildComponent();
        expect(component.instance().props.component).toBe(start().props.component);
    });
    it('call clickHandler ', function () {
        var spy = sinon.spy(main_1.ProtectedRouteComponent.prototype, 'modalClick');
        var component = start().buildComponent();
        var instance = component.instance();
        instance.clickHandler();
        expect(spy.called).toEqual(false);
        isError = true;
        component.setProps({ isError: isError });
        instance.clickHandler();
        expect(spy.called).toEqual(true);
    });
    it('call renderModal, isAuth === false', function () {
        var props = {
            history: history,
            location: location,
            match: match
        };
        var spy = sinon.spy(main_1.ProtectedRouteComponent.prototype, 'renderModal');
        var component = start().buildComponent();
        var instance = component.instance();
        instance.renderRoute(props);
        expect(spy.calledWith(CustomModal_1.ModalTypes.info)).toEqual(true);
    });
    it('call renderContent, isAuth === true', function () {
        isAuth = true;
        var props = {
            history: history,
            location: location,
            match: match
        };
        var spy = sinon.spy(main_1.ProtectedRouteComponent.prototype, 'renderContent');
        var component = start().buildComponent();
        var instance = component.instance();
        instance.renderRoute(props);
        expect(spy.calledWith(props)).toEqual(true);
    });
    describe('componentWillReceiveProps', function () {
        start();
        it('do not call toggleModal', function () {
            var component = start().buildComponent();
            expect(toggleModal).not.toHaveBeenCalled();
            isLoad = true;
            isFetching = false;
            component.setProps({ isLoad: isLoad, isFetching: isFetching });
            expect(toggleModal).not.toHaveBeenCalled();
        });
        it('call toggleModal isFetching = true', function () {
            var component = start().buildComponent();
            isFetching = true;
            component.setProps({ isFetching: isFetching });
            expect(toggleModal).toHaveBeenCalledWith(true);
        });
        it('call toggleModal isError = true', function () {
            var component = start().buildComponent();
            isError = true;
            component.setProps({ isError: isError });
            expect(toggleModal).toHaveBeenCalledWith(true);
        });
        it('call toggleModal with false', function () {
            var component = start().buildComponent();
            isError = true;
            isFetching = true;
            component.setProps({ isError: isError, isFetching: isFetching });
            expect(toggleModal).toHaveBeenCalledWith(true);
            isError = false;
            isFetching = false;
            component.setProps({ isError: isError, isFetching: isFetching });
            expect(toggleModal).toHaveBeenCalledWith(false);
        });
    });
    describe('test checkAuth method', function () {
        start();
        it('call submitCb, paidState !== 0', function () {
            var component = start().buildComponent();
            var instance = component.instance();
            instance.checkAuth(data);
            expect(parseInt(index_1.storage.load('userProgram'))).toBe(data.program);
        });
        it('call submitCb, paidState === 2', function () {
            var component = start().buildComponent();
            var instance = component.instance();
            instance.checkAuth(data);
            expect(changeStep).toHaveBeenCalledWith(const_1.Steps.four);
            expect(history.replace).toHaveBeenCalledWith('/signup');
        });
        it('call submitCb, paidState !== 2', function () {
            var component = start().buildComponent();
            var instance = component.instance();
            data.paidState = 1;
            instance.checkAuth(data);
            expect(history.replace).toHaveBeenCalledWith('/task');
        });
        it('call submitCb, isFirstEdit === true', function () {
            var component = start().buildComponent();
            var instance = component.instance();
            data.isFirstEdit = true;
            instance.checkAuth(data);
            expect(history.replace).toHaveBeenCalledWith('/profile');
        });
        it('call submitCb, isFirstEdit !== true', function () {
            var component = start().buildComponent();
            var instance = component.instance();
            data.isFirstEdit = false;
            instance.checkAuth(data);
            expect(history.replace).toHaveBeenCalledWith('/task');
        });
        it('call submitCb, emailConfirmed === false', function () {
            data.emailConfirmed = false;
            data.isFirstEdit = false;
            data.paidState = 1;
            var component = start().buildComponent();
            var instance = component.instance();
            instance.checkAuth(data);
            expect(history.replace).not.toHaveBeenCalled();
            expect(changeStep).not.toHaveBeenCalled();
        });
        it('call submitCb, !data.program', function () {
            var component = start().buildComponent();
            var instance = component.instance();
            data.paidState = 0;
            data.program = null;
            instance.checkAuth(data);
            expect(changeStep).toHaveBeenCalledWith(const_1.Steps.two);
        });
        it('call submitCb, paidState === 0', function () {
            var component = start().buildComponent();
            var instance = component.instance();
            data.paidState = 0;
            data.isFirstEdit = true;
            data.program = 11;
            instance.checkAuth(data);
            expect(changeStep).toHaveBeenCalledWith(const_1.Steps.four);
        });
    });
});
