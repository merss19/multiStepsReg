"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enzyme_1 = require("enzyme");
var main_1 = require("./main");
var React = require("react");
var enzyme_to_json_1 = require("enzyme-to-json");
var Background_1 = require("../Background");
var LogoLink_1 = require("../LogoLink");
var sinon = require("sinon");
var enzyme_2 = require("enzyme");
var Adapter = require("enzyme-adapter-react-16");
var index_1 = require("../Loader/index");
var main_2 = require("../Header/main");
enzyme_2.configure({ adapter: new Adapter() });
/*process.env.NODE_ENV = 'test'*/
var notLogo;
var type;
var start = function () {
    beforeEach(function () {
        notLogo = false;
        type = 'signUp';
    });
    var props = {
        notLogo: notLogo,
        type: type
    };
    var buildComponent = function () {
        return enzyme_1.shallow(<main_1.default {...props}><index_1.Loader /></main_1.default>);
    };
    return {
        props: props,
        buildComponent: buildComponent
    };
};
describe('Component Layout', function () {
    it('renders component', function () {
        var component = start().buildComponent();
        expect(component).toHaveLength(1);
    });
    it('renders correctly', function () {
        var tree = enzyme_to_json_1.default(start().buildComponent());
        expect(tree).toMatchSnapshot();
    });
    it('check prop notLogo', function () {
        var component = start().buildComponent();
        expect(component.find('.entry-header').exists()).toBe(true);
        expect(component.find(LogoLink_1.default).exists()).toBe(true);
        notLogo = true;
        component.setProps({ notLogo: notLogo });
        expect(component.find('.entry-header').exists()).toBe(false);
        expect(component.find(LogoLink_1.default).exists()).toBe(false);
        notLogo = undefined;
        component.setProps({ notLogo: notLogo });
        expect(component.find('.entry-header').exists()).toBe(true);
        expect(component.find(LogoLink_1.default).exists()).toBe(true);
    });
    it('renders the Background', function () {
        var component = start().buildComponent();
        expect(component.find(Background_1.default).exists()).toBe(true);
    });
    it('render children component', function () {
        var component = start().buildComponent();
        expect(component.find(index_1.Loader).exists()).toBe(true);
    });
    it('render Header', function () {
        type = 'main';
        var component = start().buildComponent();
        expect(component.find(main_2.Header).exists()).toBe(true);
    });
    it('call svgInject', function () {
        var spy = sinon.spy(main_1.default.prototype, 'svgInject');
        var component = start().buildComponent();
        expect(spy.calledOnce).toEqual(true);
    });
});
/*
describe('Component Layout DOM', () => {
    const component = mount(<Layout>
        <div>test</div>
    </Layout>)
    it('children component defined', () => {
        expect(component.props().children).toBeDefined()
    })
    it('do not render logo', () => {
        const component = mount(<Layout notLogo={true} />)
        expect(component.find(LogoLink).exists()).toBe(false)
    })
    it('calls componentDidMount', () => {
        const spy = sinon.spy(Layout.prototype, 'componentDidMount')
        const wrapper = mount(<Layout />)
        expect(spy.calledOnce).toEqual(true)
    })
/!*	it('calls svjInject', () => {
        const spy = sinon.spy(Layout.prototype, 'svgInject')
        const wrapper = mount(<Layout />)
        expect(spy.calledOnce).toEqual(true)
    })*!/
})*/
