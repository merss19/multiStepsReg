"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enzyme_1 = require("enzyme");
var main_1 = require("./main");
var Button_1 = require("../../../../components/Button");
var React = require("react");
var enzyme_to_json_1 = require("enzyme-to-json");
var JSDOM = require('jsdom').JSDOM;
var dom = new JSDOM("\n<!doctype html>\n<html>\n  <body>\n    <script type=\"text/javascript\" src=\"https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.8&appId=602675109923486\"></script>\n      <script>\n      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?\n      n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;\n      n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;\n      t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,\n      document,'script','https://connect.facebook.net/en_US/fbevents.js');\n      fbq('init', '1443501655955659');\n      // fbq.disablePushState = true;\n    </script>\n    <script>document.body.appendChild(document.createElement(\"h2\"));</script>\n  </body>\n</html>", { runScripts: "dangerously" });
var window = dom.window;
var enzyme_2 = require("enzyme");
var Adapter = require("enzyme-adapter-react-16");
enzyme_2.configure({ adapter: new Adapter() });
var props = {
    onSubmit: jest.fn(),
    handleSubmit: jest.fn()
};
describe('Component LoginForm', function () {
    var component = enzyme_1.shallow(<main_1.LoginForm {...props}/>);
    it('renders component', function () {
        expect(component).toHaveLength(1);
    });
    it('renders correctly', function () {
        var tree = enzyme_to_json_1.default(enzyme_1.shallow(<main_1.LoginForm {...props}/>));
        expect(tree).toMatchSnapshot();
    });
    it('pass prop onSubmit', function () {
        expect(component.instance().props.onSubmit).toBe(props.onSubmit);
    });
    it('call handleSubmit', function () {
        component.find(Button_1.Button).simulate('click');
        expect(props.handleSubmit).toHaveBeenCalledWith(props.onSubmit);
    });
});
