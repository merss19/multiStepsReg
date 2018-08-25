"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enzyme_1 = require("enzyme");
var index_1 = require("./index");
var React = require("react");
var enzyme_to_json_1 = require("enzyme-to-json");
var enzyme_2 = require("enzyme");
var Adapter = require("enzyme-adapter-react-16");
enzyme_2.configure({ adapter: new Adapter() });
var touched = false;
var props = {
    placeholder: 'Ваш email',
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
    },
};
describe('Component InputText', function () {
    var component = enzyme_1.shallow(<index_1.default {...props}/>);
    it('renders component', function () {
        expect(component).toHaveLength(1);
    });
    it('renders correctly', function () {
        var tree = enzyme_to_json_1.default(enzyme_1.shallow(<index_1.default {...props}/>));
        expect(tree).toMatchSnapshot();
    });
    it('render placeholder', function () {
        expect(component.find('.input__field').prop('placeholder')).toEqual('Ваш email');
    });
    it('render input', function () {
        var component = enzyme_1.shallow(<index_1.default {...props}/>);
        expect(component.find('.input__field').exists()).toBe(true);
    });
    describe('Render error', function () {
        beforeEach(function () {
            props.meta.touched = true;
        });
        it('render error', function () {
            var component = enzyme_1.shallow(<index_1.default {...props}/>);
            expect(component.find('.input__alert').exists()).toBe(true);
        });
        it('render error text', function () {
            var component = enzyme_1.shallow(<index_1.default {...props}/>);
            expect(component.find('.input__alert').text()).toEqual('Email должен быть заполнен');
        });
        it('render error class', function () {
            var component = enzyme_1.shallow(<index_1.default {...props}/>);
            expect(component.find('.input--error').exists()).toBe(true);
        });
    });
    describe('do not Render error', function () {
        beforeEach(function () {
            props.meta.touched = true;
            props.meta.error = '';
        });
        it('do not render error', function () {
            var component = enzyme_1.shallow(<index_1.default {...props}/>);
            expect(component.find('.input__alert').exists()).toBe(false);
        });
        it('do not render error class', function () {
            var component = enzyme_1.shallow(<index_1.default {...props}/>);
            expect(component.find('.input--error').exists()).toBe(false);
        });
    });
});
