"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enzyme_1 = require("enzyme");
var main_1 = require("./main");
var React = require("react");
var enzyme_to_json_1 = require("enzyme-to-json");
var Button_1 = require("../../../../components/Button");
var enzyme_2 = require("enzyme");
var Adapter = require("enzyme-adapter-react-16");
enzyme_2.configure({ adapter: new Adapter() });
var onSubmit;
var handleSubmit;
var start = function () {
    beforeEach(function () {
        onSubmit = jest.fn(),
            handleSubmit = jest.fn();
    });
    var props = {
        onSubmit: onSubmit,
        handleSubmit: handleSubmit
    };
    var buildComponent = function () {
        return enzyme_1.shallow(<main_1.PasswordRestoreForm {...props}/>);
    };
    return {
        buildComponent: buildComponent,
        props: props
    };
};
describe('Component PasswordRestoreForm', function () {
    start();
    it('renders component', function () {
        var component = start().buildComponent();
        expect(component).toHaveLength(1);
    });
    it('renders correctly', function () {
        var component = start().buildComponent();
        var tree = enzyme_to_json_1.default(start().buildComponent());
        expect(tree).toMatchSnapshot();
    });
    it('pass prop onSubmit', function () {
        var component = start().buildComponent();
        expect(component.instance().props.onSubmit).toBe(start().props.onSubmit);
    });
    it('call handleSubmit', function () {
        var component = start().buildComponent();
        component.find(Button_1.Button).simulate('click');
        expect(start().props.handleSubmit).toHaveBeenCalledWith(start().props.onSubmit);
    });
});
