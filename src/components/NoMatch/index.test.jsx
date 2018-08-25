"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enzyme_1 = require("enzyme");
var index_1 = require("./index");
var React = require("react");
var enzyme_to_json_1 = require("enzyme-to-json");
var enzyme_2 = require("enzyme");
var Adapter = require("enzyme-adapter-react-16");
enzyme_2.configure({ adapter: new Adapter() });
describe('Component Loader', function () {
    var component = enzyme_1.shallow(<index_1.NoMatch />);
    it('renders component', function () {
        expect(component).toHaveLength(1);
    });
    it('renders correctly', function () {
        var tree = enzyme_to_json_1.default(enzyme_1.shallow(<index_1.NoMatch />));
        expect(tree).toMatchSnapshot();
    });
});
