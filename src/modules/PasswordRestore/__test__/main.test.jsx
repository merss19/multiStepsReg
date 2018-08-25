"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enzyme_1 = require("enzyme");
var main_1 = require("../main");
var PasswordForgetForm_1 = require("../components/PasswordForgetForm");
var PasswordRestoreForm_1 = require("../components/PasswordRestoreForm");
var React = require("react");
var enzyme_to_json_1 = require("enzyme-to-json");
var sinon = require("sinon");
var react_redux_1 = require("react-redux");
var store_1 = require("../../../store");
var react_router_dom_1 = require("react-router-dom");
var CustomModal_1 = require("../../CustomModal");
var enzyme_2 = require("enzyme");
var Adapter = require("enzyme-adapter-react-16");
var index_1 = require("../../../tools/utils/index");
var store = store_1.default();
enzyme_2.configure({ adapter: new Adapter() });
var data = {
    pass: 'qeqwe',
    passAgain: 'qweqwe',
    tokenPassword: 'asdasdasdasd'
};
var payload = {
    email: 'test@email.ru'
};
var changeStep, submitLogin, toggleModal, onSubmit, submitPassword, submitRestore, setRestoreToken, setToken, setError, isFetching, isLoad, isError, errMsg, token, resultText, resultCode, errorMessage, match, location, history;
var start = function () {
    beforeEach(function () {
        changeStep = jest.fn(),
            toggleModal = jest.fn(),
            setToken = jest.fn(),
            onSubmit = jest.fn(),
            submitPassword = jest.fn(),
            submitRestore = jest.fn(),
            setRestoreToken = jest.fn(),
            isFetching = false,
            isLoad = false,
            isError = false,
            errMsg = 'Ошибка',
            token = 'token',
            resultText = 'resultText',
            resultCode = 1,
            errorMessage = 'errorMessage',
            match = {},
            location = {
                search: ''
            };
        history = {
            replace: jest.fn()
        };
    });
    var props = {
        submitPassword: submitPassword,
        submitRestore: submitRestore,
        setRestoreToken: setRestoreToken,
        toggleModal: toggleModal,
        setToken: setToken,
        setError: setError,
        isFetching: isFetching,
        isLoad: isLoad,
        isError: isError,
        errMsg: errMsg,
        match: match,
        location: location,
        history: history,
        token: token,
        resultText: resultText,
        resultCode: resultCode,
        errorMessage: errorMessage
    };
    var buildComponent = function () {
        return enzyme_1.shallow(<main_1.PasswordRestoreComponent {...props}/>);
    };
    var buildComponentMount = function () {
        return enzyme_1.mount(<react_redux_1.Provider store={store}>
        <react_router_dom_1.BrowserRouter>
          <main_1.PasswordRestore {...props}/>
        </react_router_dom_1.BrowserRouter>
      </react_redux_1.Provider>);
    };
    return {
        buildComponentMount: buildComponentMount,
        buildComponent: buildComponent
    };
};
describe('Component PasswordRestore', function () {
    start();
    it('renders component', function () {
        var component = start().buildComponent();
        expect(component).toHaveLength(1);
    });
    it('renders correctly', function () {
        var tree = enzyme_to_json_1.default(start().buildComponent());
        expect(tree).toMatchSnapshot();
    });
    it('renders component Mount', function () {
        var component = start().buildComponentMount();
        expect(component).toHaveLength(1);
    });
    it('call setRestoreToken,  location.search === null', function () {
        var component = start().buildComponent();
        var query = index_1.queryParse(component.instance().props.location.search);
        expect(query).toBeNull();
        expect(setRestoreToken).not.toHaveBeenCalled();
    });
    it('call setRestoreToken, location.search !== null', function () {
        location = {
            search: '?token=asdasd'
        };
        var component = start().buildComponent();
        var query = index_1.queryParse(component.instance().props.location.search);
        expect(setRestoreToken).toHaveBeenCalledWith(query.token);
    });
    it('call setRestoreToken, location.search === null', function () {
        location = {
            search: '?token'
        };
        var component = start().buildComponent();
        var query = index_1.queryParse(component.instance().props.location.search);
        expect(query.token).toBeUndefined();
        expect(setRestoreToken).not.toHaveBeenCalled();
    });
    it('call onSubmit - call submitPassword', function () {
        var component = start().buildComponent();
        var instance = component.instance();
        instance.onSubmit(payload);
        expect(submitPassword).toHaveBeenCalledWith(payload);
    });
    it('call onSubmitRestore - call submitRestore', function () {
        var component = start().buildComponent();
        var instance = component.instance();
        instance.onSubmitRestore(data);
        expect(submitRestore).toHaveBeenCalledWith(data);
    });
    it('render PasswordRestoreForm', function () {
        var component = start().buildComponent();
        expect(component.find(PasswordRestoreForm_1.default)).toHaveLength(1);
        expect(component.find(PasswordForgetForm_1.default)).toHaveLength(0);
    });
    it('render PasswordForgetForm', function () {
        token = null;
        var component = start().buildComponent();
        expect(component.find(PasswordForgetForm_1.default)).toHaveLength(1);
        expect(component.find(PasswordRestoreForm_1.default)).toHaveLength(0);
    });
    it('call clickHandler', function () {
        var component = start().buildComponent();
        var spy = sinon.spy(main_1.PasswordRestoreComponent.prototype, 'setModal');
        var instance = component.instance();
        instance.clickHandler();
        expect(spy.called).toEqual(true);
    });
    it('call clickHandler - do not call location.replace(): modal!== success', function () {
        var component = start().buildComponent();
        var instance = component.instance();
        instance.clickHandler();
        expect(history.replace).not.toHaveBeenCalled();
    });
    it('call clickHandler - do not call location.replace(): modal === error', function () {
        isError = true;
        var component = start().buildComponent();
        var instance = component.instance();
        instance.clickHandler();
        expect(history.replace).not.toHaveBeenCalled();
    });
    it('call clickHandler - do not call location.replace(): token = null', function () {
        isLoad = true;
        token = null;
        var component = start().buildComponent();
        var instance = component.instance();
        instance.clickHandler();
        expect(history.replace).not.toHaveBeenCalled();
    });
    it('call clickHandler - call location.replace(): modal === success', function () {
        isLoad = true;
        var component = start().buildComponent();
        var instance = component.instance();
        instance.clickHandler();
        expect(history.replace).toHaveBeenCalledWith('/');
    });
    describe('componentWillReceiveProps', function () {
        start();
        it('do not call toggleModal', function () {
            var component = start().buildComponent();
            expect(toggleModal).not.toHaveBeenCalled();
            token = 'error';
            isFetching = false;
            component.setProps({ token: token, isFetching: isFetching });
            expect(toggleModal).not.toHaveBeenCalled();
        });
        it('call toggleModal isFetching = true', function () {
            var component = start().buildComponent();
            isFetching = true;
            component.setProps({ isFetching: isFetching });
            expect(toggleModal).toHaveBeenCalledWith(true);
        });
        it('call toggleModal isLoad = true', function () {
            var component = start().buildComponent();
            isLoad = true;
            component.setProps({ isLoad: isLoad });
            expect(toggleModal).toHaveBeenCalledWith(true);
        });
        it('call toggleModal isError = true', function () {
            var component = start().buildComponent();
            isError = true;
            component.setProps({ isError: isError });
            expect(toggleModal).toHaveBeenCalledWith(true);
        });
    });
    describe('setModal', function () {
        start();
        it('modal === ModalTypes.info', function () {
            var component = start().buildComponent();
            var instance = component.instance();
            var modal = instance.setModal();
            expect(modal).toBe(CustomModal_1.ModalTypes.info);
        });
        it('modal === ModalTypes.error', function () {
            isError = true;
            var component = start().buildComponent();
            var instance = component.instance();
            var modal = instance.setModal();
            expect(modal).toBe(CustomModal_1.ModalTypes.error);
        });
        it('modal === ModalTypes.success', function () {
            isLoad = true;
            var component = start().buildComponent();
            var instance = component.instance();
            var modal = instance.setModal();
            expect(modal).toBe(CustomModal_1.ModalTypes.success);
        });
        it('modal !== ModalTypes.success', function () {
            isLoad = true;
            resultCode = 32;
            var component = start().buildComponent();
            var instance = component.instance();
            var modal = instance.setModal();
            expect(modal).toBe(CustomModal_1.ModalTypes.info);
        });
    });
});
