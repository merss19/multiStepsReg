"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enzyme_1 = require("enzyme");
var main_1 = require("../main");
var Loader_1 = require("../../../components/Loader");
var Button_1 = require("../../../components/Button");
var React = require("react");
var enzyme_to_json_1 = require("enzyme-to-json");
var sinon = require("sinon");
var const_1 = require("../const");
var enzyme_2 = require("enzyme");
var Adapter = require("enzyme-adapter-react-16");
var react_redux_1 = require("react-redux");
var store_1 = require("../../../store");
var react_router_dom_1 = require("react-router-dom");
var react_motion_1 = require("react-motion");
var store = store_1.default();
enzyme_2.configure({ adapter: new Adapter() });
var isLoader;
var resultText;
var modal;
var clickHandler;
var toggleModal;
var isOpen;
var start = function () {
    beforeEach(function () {
        clickHandler = jest.fn(),
            toggleModal = jest.fn(),
            isLoader = false,
            resultText = 'test',
            isOpen = false,
            modal = const_1.ModalTypes.info;
    });
    var props = {
        toggleModal: toggleModal,
        clickHandler: clickHandler,
        isLoader: isLoader,
        resultText: resultText,
        isOpen: isOpen,
        modal: modal
    };
    var buildComponent = function () {
        return enzyme_1.shallow(<main_1.CustomModalComponent {...props}/>);
    };
    var buildComponentMount = function () {
        return enzyme_1.mount(<react_redux_1.Provider store={store}>
        <react_router_dom_1.BrowserRouter>
          <main_1.CustomModalComponent {...props}/>
        </react_router_dom_1.BrowserRouter>
      </react_redux_1.Provider>);
    };
    return {
        buildComponentMount: buildComponentMount,
        props: props,
        buildComponent: buildComponent
    };
};
describe('Component CustomModalComponent', function () {
    start();
    it('renders component', function () {
        var component = start().buildComponent();
        expect(component).toHaveLength(1);
    });
    it('renders correctly', function () {
        var tree = enzyme_to_json_1.default(start().buildComponent());
        expect(tree).toMatchSnapshot();
    });
    it('check isOpen', function () {
        var component = start().buildComponent();
        expect(component.instance().props.isOpen).toBe(start().props.isOpen);
    });
    it('call setBtn', function () {
        var component = start().buildComponent();
        var instance = component.instance();
        var btn = instance.setBtn();
        expect(btn).toBe(Button_1.ButtonTypes.info);
        modal = const_1.ModalTypes.success;
        component.setProps({ modal: modal });
        btn = instance.setBtn();
        expect(btn).toBe(Button_1.ButtonTypes.success);
        modal = const_1.ModalTypes.error;
        component.setProps({ modal: modal });
        btn = instance.setBtn();
        expect(btn).toBe(Button_1.ButtonTypes.error);
        modal = const_1.ModalTypes.loading;
        component.setProps({ modal: modal });
        btn = instance.setBtn();
        expect(btn).toBe(Button_1.ButtonTypes.info);
    });
    it('call renderContent', function () {
        var spy = sinon.spy(main_1.CustomModalComponent.prototype, 'setBtn');
        var component = start().buildComponent();
        var instance = component.instance();
        instance.renderContent();
        var resultText = component.find(react_motion_1.Motion).dive().find('.modal__title').text();
        expect(spy.called).toEqual(true);
        expect(component.find(react_motion_1.Motion)).toHaveLength(1);
        expect(resultText).toEqual(start().props.resultText);
        expect(component.find(Loader_1.Loader)).toHaveLength(0);
        expect(instance.props.isLoader).toBe(start().props.isLoader);
        isLoader = true;
        component.setProps({ isLoader: isLoader });
        instance.renderContent();

        expect(component.find(react_motion_1.Motion)).toHaveLength(0);
        expect(component.find(Loader_1.Loader)).toHaveLength(1);
        expect(instance.props.isLoader).toBe(start().props.isLoader);
    });
    it('call closeModal', function () {
        var component = start().buildComponent();
        var instance = component.instance();
        instance.closeModal();
        expect(toggleModal).toHaveBeenCalledWith(false);
        expect(clickHandler).toHaveBeenCalled();
        clickHandler = null;
        component.setProps({ clickHandler: clickHandler });
        expect(instance.closeModal()).toBeUndefined();
    });
    it('check close modal', function () {
        var component = start().buildComponent();
        component.find(react_motion_1.Motion).dive().find(Button_1.Button).simulate('click');
        expect(toggleModal).toHaveBeenCalledWith(false);
        expect(clickHandler).toHaveBeenCalled();
    });
});
