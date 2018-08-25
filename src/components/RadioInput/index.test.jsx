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
    name: 'gender',
    id: 'gender1',
    title: 'Мужчина',
    value: 'male',
    meta: {
        touched: true,
        error: 'Пол должен быть заполнен',
        asyncValidating: false,
        autofilled: false,
        invalid: false,
        pristine: false,
        dirty: false,
        dispatch: function (fn) { return fn; },
        valid: false
    },
};
describe('Component RadioInput', function () {
    var component = enzyme_1.shallow(<index_1.default {...props}/>);
    it('renders component', function () {
        expect(component).toHaveLength(1);
    });
    it('renders correctly', function () {
        var tree = enzyme_to_json_1.default(enzyme_1.shallow(<index_1.default {...props}/>));
        expect(tree).toMatchSnapshot();
    });
});
describe('Component RadioInput DOM', function () {
    var component = enzyme_1.mount(<index_1.default {...props}/>);
    describe('render props', function () {
        it('render name', function () {
            expect(component.props().name).toBe(props.name);
        });
        it('render id', function () {
            expect(component.props().id).toBe(props.id);
        });
        it('render title', function () {
            expect(component.props().title).toBe(props.title);
        });
        it('do not calls setRadioError, touched = false', function () {
            var props2 = {
                name: 'gender',
                id: 'gender1',
                title: 'Мужчина',
                setRadioError: jest.fn(),
                removeRadioError: jest.fn(),
                meta: {
                    touched: false,
                    error: 'Пол должен быть заполнен',
                    asyncValidating: false,
                    autofilled: false,
                    invalid: false,
                    pristine: false,
                    dirty: false,
                    dispatch: function (fn) { return fn; },
                    valid: false
                },
            };
            component.setProps({ props2: props2 });
            expect(props2.setRadioError).not.toHaveBeenCalled();
        });
        it('calls removeRadioError, error = ""', function () {
            var props3 = {
                name: 'gender',
                id: 'gender1',
                title: 'Мужчина',
                setRadioError: jest.fn(),
                removeRadioError: jest.fn(),
                meta: {
                    touched: true,
                    error: '',
                    asyncValidating: false,
                    autofilled: false,
                    invalid: false,
                    pristine: false,
                    dirty: false,
                    dispatch: function (fn) { return fn; },
                    valid: false
                },
            };
            component.setProps({ props3: props3 });
            expect(props3.removeRadioError).not.toHaveBeenCalled();
            expect(props3.setRadioError).not.toHaveBeenCalled();
        });
    });
});
