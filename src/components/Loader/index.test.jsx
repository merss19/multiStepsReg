"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enzyme_1 = require("enzyme");
var index_1 = require("./index");
var React = require("react");
var enzyme_to_json_1 = require("enzyme-to-json");
var enzyme_2 = require("enzyme");
var Adapter = require("enzyme-adapter-react-16");
enzyme_2.configure({ adapter: new Adapter() });
var text;
var isError;
var start = function () {
    beforeEach(function () {
        text = 'Подождите',
            isError = false;
    });
    var props = {
        text: text,
        isError: isError
    };
    var buildComponent = function () {
        return enzyme_1.shallow(<index_1.Loader {...props}/>);
    };
    return {
        props: props,
        buildComponent: buildComponent
    };
};
describe('Component Loader', function () {
    it('renders component', function () {
        var component = start().buildComponent();
        expect(component).toHaveLength(1);
    });
    it('renders correctly', function () {
        var tree = enzyme_to_json_1.default(start().buildComponent());
        expect(tree).toMatchSnapshot();
    });
    it('render loader', function () {
        var component = start().buildComponent();
        expect(component.find('.loader')).toHaveLength(1);
        expect(component.find('.loading__desc')).toHaveLength(0);
    });
    it('render text', function () {
        isError = true;
        var component = start().buildComponent();
        expect(component.find('h2').text()).toEqual(start().props.text);
        expect(component.find('.loading__desc')).toHaveLength(1);
        expect(component.find('.loader')).toHaveLength(0);
        text = undefined;
        component.setProps({ text: text });
        expect(component.find('h2').text()).toEqual('Загружается');
    });
});
