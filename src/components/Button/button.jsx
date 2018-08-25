"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var classNames = require("classnames");
var ButtonTypes;
(function (ButtonTypes) {
    ButtonTypes["info"] = "secondary";
    ButtonTypes["error"] = "error";
    ButtonTypes["success"] = "primary";
})(ButtonTypes = exports.ButtonTypes || (exports.ButtonTypes = {}));
exports.Button = function (_a) {
    var children = _a.children, onClick = _a.onClick, type = _a.type, styleBtn = _a.styleBtn, wide = _a.wide, prefix = _a.prefix;
    var classes = classNames(prefix, (_b = {},
        _b[prefix + "--" + styleBtn] = true,
        _b['wide'] = wide,
        _b));
    return (<button type={type} className={classes} onClick={onClick}>
      {children}
    </button>);
    var _b;
};
exports.Button.defaultProps = {
    styleBtn: ButtonTypes.info,
    type: 'button',
    wide: false,
    prefix: 'btn'
};
