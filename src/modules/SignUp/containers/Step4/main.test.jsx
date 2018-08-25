"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enzyme_1 = require("enzyme");
var main_1 = require("./main");
var React = require("react");
var enzyme_to_json_1 = require("enzyme-to-json");
var sinon = require("sinon");
var react_redux_1 = require("react-redux");
var store_1 = require("../../../../store");
var react_router_dom_1 = require("react-router-dom");
var enzyme_2 = require("enzyme");
var Adapter = require("enzyme-adapter-react-16");
var store = store_1.default();
enzyme_2.configure({ adapter: new Adapter() });
var match, location, changeStep, history;
var start = function () {
    beforeEach(function () {
        changeStep = jest.fn(),
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
        match: match,
        changeStep: changeStep,
        location: location,
        history: history
    };
    var buildComponent = function () {
        return enzyme_1.shallow(<main_1.StepFour {...props}/>);
    };
    var buildComponentMount = function () {
        return enzyme_1.mount(<react_redux_1.Provider store={store}>
        <react_router_dom_1.BrowserRouter>
          <main_1.StepFour {...props}/>
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
    it('click Link', function () {
        var spy = sinon.spy(main_1.StepFour.prototype, 'logOut');
        var button = component.find('Link');
        button.simulate('click');
        expect(spy.called).toBe(true);
    });
});
