"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enzyme_1 = require("enzyme");
var main_1 = require("./main");
var React = require("react");
var enzyme_to_json_1 = require("enzyme-to-json");
var enzyme_2 = require("enzyme");
var Adapter = require("enzyme-adapter-react-16");
var button_1 = require("../Button/button");
var sinon = require("sinon");
var index_1 = require("../../tools/storage/index");
var react_router_dom_1 = require("react-router-dom");
enzyme_2.configure({ adapter: new Adapter() });
var start = function () {
    var buildComponent = function () {
        return enzyme_1.shallow(<main_1.Header />);
    };
    return {
        buildComponent: buildComponent
    };
};
describe('Component Header', function () {
    it('renders component', function () {
        var component = start().buildComponent();
        expect(component).toHaveLength(1);
    });
    it('renders correctly', function () {
        var tree = enzyme_to_json_1.default(start().buildComponent());
        expect(tree).toMatchSnapshot();
    });
    it('render Button', function () {
        var component = start().buildComponent();
        expect(component.find(button_1.Button)).toHaveLength(1);
    });
    it('click Button', function () {
        var spy = sinon.spy(main_1.Header.prototype, 'logOut');
        var component = start().buildComponent();
        var button = component.find(react_router_dom_1.Link);
        button.simulate('click');
        expect(spy.called).toBe(true);
    });
    it('call logOut', function () {
        index_1.storage.save('token', 'test');
        index_1.storage.save('promoName', 'tele2');
        index_1.storage.save('program', 'hero');
        index_1.storage.saveState('auth', 'sdfsdf');
        var component = start().buildComponent();
        var instance = component.instance();
        instance.logOut();
        expect(index_1.storage.load('token')).toBeUndefined();
        expect(index_1.storage.load('program')).toBeUndefined();
        expect(index_1.storage.load('promoName')).toBeUndefined();
        expect(index_1.storage.loadState('auth')).toBeUndefined();
    });
});
