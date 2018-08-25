"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enzyme_1 = require("enzyme");
var index_1 = require("./index");
var React = require("react");
var enzyme_to_json_1 = require("enzyme-to-json");
var enzyme_2 = require("enzyme");
var Adapter = require("enzyme-adapter-react-16");
var storage_1 = require("../../tools/storage");
enzyme_2.configure({ adapter: new Adapter() });
storage_1.storage.save('token', 'testToken', { path: '/', maxAge: 60 * 60 * 24 * 365 * 10 });
describe('Component Loader', function () {
    var component = enzyme_1.shallow(<index_1.default />);
    it('renders component', function () {
        expect(component).toHaveLength(1);
    });
    it('renders correctly', function () {
        var tree = enzyme_to_json_1.default(enzyme_1.shallow(<index_1.default />));
        expect(tree).toMatchSnapshot();
    });
    it('simulate click', function () {
        var token = storage_1.storage.load('token');
        expect(token).toBe('testToken');
        component.find('Link').simulate('click');
        var tokenRemove = storage_1.storage.load('token');
        expect(tokenRemove).toBe(undefined);
    });
});
