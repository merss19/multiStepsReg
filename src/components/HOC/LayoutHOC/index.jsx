"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Layout_1 = require("components/Layout");
var React = require("react");
exports.LayoutHOC = function (overrideProps) { return function (Component) { return function (props) {
    return (<Layout_1.Layout {...props} {...overrideProps}>
      <Component />
    </Layout_1.Layout>);
}; }; };
