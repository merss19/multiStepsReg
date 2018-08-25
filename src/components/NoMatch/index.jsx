"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Button_1 = require("components/Button");
var react_router_dom_1 = require("react-router-dom");
var LayoutHOC_1 = require("components/HOC/LayoutHOC");
exports.NoMatch = function () {
    return (<div className='entry entry--min'>
      <div className='entry__inner text-center '>
        <h2 className="pt10 pb10">Ничего не найдено</h2>
        <Button_1.Button type='button' styleBtn={Button_1.ButtonTypes.info}>
          <react_router_dom_1.Link to="/">Продолжить</react_router_dom_1.Link>
        </Button_1.Button>
      </div>
    </div>);
};
exports.default = LayoutHOC_1.LayoutHOC()(exports.NoMatch);
