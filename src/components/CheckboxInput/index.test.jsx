"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enzyme_1 = require("enzyme");
var index_1 = require("./index");
var React = require("react");
var enzyme_to_json_1 = require("enzyme-to-json");
var enzyme_2 = require("enzyme");
var Adapter = require("enzyme-adapter-react-16");
enzyme_2.configure({ adapter: new Adapter() });
var props = {
    id: 'offert',
    title: 'Оферта',
    meta: {
        touched: true,
        error: 'Email должен быть заполнен',
        asyncValidating: false,
        autofilled: false,
        invalid: false,
        pristine: false,
        dirty: false,
        dispatch: function (fn) { return fn; },
        valid: false
    },
};
var id;
var title;
var touched;
var value;
var start = function () {
    beforeEach(function () {
        id = 'offert',
            title = 'Оферта',
            touched = false,
            value = '';
    });
    var props = {
        id: id,
        title: title,
        input: {
            name: 'accept',
            onBlur: jest.fn(),
            onChange: jest.fn(),
            onDragStart: jest.fn(),
            onDrop: jest.fn(),
            onFocus: jest.fn(),
            value: value
        },
        meta: {
            touched: touched,
            error: 'Email должен быть заполнен',
            asyncValidating: false,
            autofilled: false,
            invalid: false,
            pristine: false,
            dirty: false,
            dispatch: function (fn) { return fn; },
            valid: false
        }
    };
    var buildComponent = function () {
        return enzyme_1.shallow(<index_1.default {...props}/>);
    };
    return {
        props: props,
        buildComponent: buildComponent
    };
};
describe('Component CheckboxInput', function () {
    it('renders component', function () {
        var component = start().buildComponent();
        expect(component).toHaveLength(1);
    });
    it('renders correctly', function () {
        var tree = enzyme_to_json_1.default(start().buildComponent());
        expect(tree).toMatchSnapshot();
    });
    it('renders title', function () {
        var component = start().buildComponent();
        expect(component.find('.checkbox__title').text()).toBe(start().props.title);
        expect(component.find('.checkbox__error').exists()).toBe(false);
    });
    it('renders id', function () {
        var component = start().buildComponent();
        expect(component.find('.checkbox__label').props().htmlFor).toBe(start().props.id);
        expect(component.find('.checkbox__field').props().id).toBe(start().props.id);
    });
    describe('Render error', function () {
        it('render error', function () {
            touched = true;
            var component = start().buildComponent();
            expect(component.find('.checkbox__error').exists()).toBe(true);
            expect(component.find('.checkbox__error').text()).toEqual(start().props.meta.error);
        });
    });
});
