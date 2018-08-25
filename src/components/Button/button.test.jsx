"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enzyme_1 = require("enzyme");
var index_1 = require("./index");
var React = require("react");
var enzyme_to_json_1 = require("enzyme-to-json");
var enzyme_2 = require("enzyme");
var Adapter = require("enzyme-adapter-react-16");
enzyme_2.configure({ adapter: new Adapter() });
var styleBtn;
var onClick;
var type;
var wide;
var prefix;
var start = function () {
    beforeEach(function () {
        styleBtn = index_1.ButtonTypes.error,
            onClick = jest.fn(),
            type = 'submit',
            wide = true,
            prefix = 'btn-group';
    });
    var props = {
        styleBtn: styleBtn,
        onClick: onClick,
        type: type,
        wide: wide,
        prefix: prefix
    };
    var buildComponent = function () {
        return enzyme_1.shallow(<index_1.Button {...props}>Продолжить</index_1.Button>);
    };
    return {
        props: props,
        buildComponent: buildComponent
    };
};
describe('Component Button', function () {
    it('renders component', function () {
        var component = start().buildComponent();
        expect(component).toHaveLength(1);
    });
    it('renders correctly', function () {
        var tree = enzyme_to_json_1.default(start().buildComponent());
        expect(tree).toMatchSnapshot();
    });
});
describe('Component Button render props', function () {
    it('render prefix(main class)', function () {
        var component = start().buildComponent();
        expect(component.find('.' + start().props.prefix)).toHaveLength(1);
    });
    it('render styleBtn class', function () {
        var component = start().buildComponent();
        expect(component.find('.' + start().props.prefix + '--' + start().props.styleBtn)).toHaveLength(1);
    });
    it('render type', function () {
        var component = start().buildComponent();
        expect(component.props().type).toEqual('submit');
    });
    it('render wide', function () {
        var component = start().buildComponent();
        expect(component.find('.wide')).toHaveLength(1);
    });
    it('render children', function () {
        var component = start().buildComponent();
        expect(component.props().children).toEqual('Продолжить');
    });
    it('simulate click', function () {
        //const onButtonClick = sinon.spy();
        var component = start().buildComponent();
        component.find('button').simulate('click');
        expect(onClick).toHaveBeenCalled();
    });
    it('check defaultProps', function () {
        styleBtn = undefined;
        type = undefined;
        wide = undefined;
        prefix = undefined;
        var component = start().buildComponent();
        expect(component.find('.btn')).toHaveLength(1);
        expect(component.props().type).toEqual('button');
        expect(component.find('.wide')).toHaveLength(0);
        expect(component.find('.btn' + '--' + index_1.ButtonTypes.info)).toHaveLength(1);
    });
    it('check ButtonTypes', function () {
        prefix = 'btn';
        var component = start().buildComponent();
        console.log(component.debug());
        expect(component.find('.btn--error').exists()).toEqual(true);
        styleBtn = index_1.ButtonTypes.info;
        component.setProps({ styleBtn: styleBtn });
        expect(component.find('.btn--secondary').exists()).toEqual(true);
        styleBtn = index_1.ButtonTypes.success;
        component.setProps({ styleBtn: styleBtn });
        expect(component.find('.btn--primary').exists()).toEqual(true);
    });
    it('call ', function () {
    });
});
