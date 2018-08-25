"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var storage_1 = require("tools/storage");
var const_1 = require("../../const");
var classNames = require("classnames");
var CustomSteps = /** @class */ (function (_super) {
    __extends(CustomSteps, _super);
    function CustomSteps() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomSteps.prototype.logOut = function () {
        storage_1.storage.remove('token', { path: '/' });
        storage_1.storage.remove('program', { path: '/' });
        storage_1.storage.remove('promoName', { path: '/' });
        this.props.changeStep(const_1.Steps.one);
    };
    CustomSteps.prototype.renderProgramName = function () {
        var choosenProgram = this.props.choosenProgram;
        var programName = 'Регистрация';
        if (choosenProgram) {
            if (choosenProgram % const_1.ProgramNum.count == 1) {
                programName = const_1.ProgramsName.hero;
            }
            if (choosenProgram % const_1.ProgramNum.count == 2) {
                programName = const_1.ProgramsName.mother;
            }
            if (choosenProgram % const_1.ProgramNum.count == 3) {
                programName = const_1.ProgramsName.extreme;
            }
            if (choosenProgram % const_1.ProgramNum.count == 0) {
                programName = const_1.ProgramsName.tomorrow;
            }
        }
        return programName;
    };
    CustomSteps.prototype.renderHeader = function () {
        var _a = this.props, programName = _a.programName, choosenProgram = _a.choosenProgram;
        return (<div className={classNames('entry__header', {
            'entry__header--colorful g-hero': programName === const_1.Programs.hero ||
                choosenProgram % const_1.ProgramNum.count == const_1.ProgramNum.hero,
            'entry__header--colorful g-mather': programName === const_1.Programs.mother ||
                choosenProgram % const_1.ProgramNum.count == const_1.ProgramNum.mother,
            'entry__header--colorful g-extreme': programName === const_1.Programs.extreme ||
                choosenProgram % const_1.ProgramNum.count == const_1.ProgramNum.extreme,
            'entry__header--colorful g-tomorrow': programName === const_1.Programs.tomorrow ||
                choosenProgram && choosenProgram % const_1.ProgramNum.count == const_1.ProgramNum.tomorrow,
        })}>
        <h2 className='entry__title entry__title--auth text-center '>
          {this.renderProgramName()}
        </h2>
      </div>);
    };
    CustomSteps.prototype.render = function () {
        return <div></div>;
    };
    return CustomSteps;
}(React.Component));
exports.default = CustomSteps;
