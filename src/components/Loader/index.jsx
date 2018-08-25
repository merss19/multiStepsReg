"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Button_1 = require("components/Button");
var react_router_dom_1 = require("react-router-dom");
exports.Loader = function (_a) {
    var text = _a.text, isError = _a.isError;
    return (<div className='loading text-center'>
      {isError ?
        <div className='loading__desc text-center pt20'>
          <h2 className='pb20'>{text}</h2>
          <div className='pt10 pb10'>
            <p>Что-то пошло не так.</p>
            <p>Напишите нам в чат тех поддержки!</p>
          </div>

          <Button_1.Button type='button' styleBtn={Button_1.ButtonTypes.info}>
            <react_router_dom_1.Link to="/">Продолжить</react_router_dom_1.Link>
          </Button_1.Button>
        </div>
        :
            <div className='loader loader--main'/>}
    </div>);
};
exports.Loader.defaultProps = {
    text: 'Загружается',
};
