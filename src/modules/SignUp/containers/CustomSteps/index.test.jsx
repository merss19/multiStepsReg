"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enzyme_1 = require("enzyme");
var index_1 = require("./index");
var React = require("react");
var sinon = require("sinon");
var store_1 = require("../../../../store");
var enzyme_2 = require("enzyme");
var Adapter = require("enzyme-adapter-react-16");
var index_2 = require("../../../../tools/storage/index");
var const_1 = require("../../const");
var store = store_1.default();
enzyme_2.configure({ adapter: new Adapter() });
var changeStep;
var programName;
var choosenProgram;
var start = function () {
    beforeEach(function () {
        changeStep = jest.fn(),
            programName = '',
            choosenProgram = 0;
    });
    var props = {
        changeStep: changeStep,
        programName: programName,
        choosenProgram: choosenProgram
    };
    var buildComponent = function () {
        return enzyme_1.shallow(<index_1.default {...props}/>);
    };
    return {
        props: props,
        buildComponent: buildComponent
    };
};
describe('Component CustomSteps', function () {
    var component;
    start();
    beforeEach(function () {
        component = start().buildComponent();
    });
    it('call logOut', function () {
        var component = start().buildComponent();
        var instance = component.instance();
        instance.logOut();
        expect(changeStep).toHaveBeenCalledWith(const_1.Steps.one);
        expect(index_2.storage.load('token')).toBeUndefined();
        expect(index_2.storage.load('promoName')).toBeUndefined();
        expect(index_2.storage.load('program')).toBeUndefined();
    });
    it('call renderProgramName', function () {
        var component = start().buildComponent();
        var instance = component.instance();
        var programName = instance.renderProgramName();
        var header = instance.renderHeader();
        expect(programName).toBe('Регистрация');
        choosenProgram = 5;
        component.setProps({ choosenProgram: choosenProgram });
        programName = instance.renderProgramName();
        header = instance.renderHeader();
        expect(programName).toBe(const_1.ProgramsName.hero);
        expect(header.props.className).toBe('entry__header entry__header--colorful g-hero');
        choosenProgram = 6;
        component.setProps({ choosenProgram: choosenProgram });
        programName = instance.renderProgramName();
        header = instance.renderHeader();
        expect(programName).toBe(const_1.ProgramsName.mother);
        expect(header.props.className).toBe('entry__header entry__header--colorful g-mather');
        choosenProgram = 7;
        component.setProps({ choosenProgram: choosenProgram });
        programName = instance.renderProgramName();
        header = instance.renderHeader();
        expect(programName).toBe(const_1.ProgramsName.extreme);
        expect(header.props.className).toBe('entry__header entry__header--colorful g-extreme');
        choosenProgram = 8;
        component.setProps({ choosenProgram: choosenProgram });
        programName = instance.renderProgramName();
        header = instance.renderHeader();
        expect(programName).toBe(const_1.ProgramsName.tomorrow);
        expect(header.props.className).toBe('entry__header entry__header--colorful g-tomorrow');
    });
    describe('call renderHeader', function () {
        it('call renderProgramName', function () {
            var spy = sinon.spy(index_1.default.prototype, 'renderProgramName');
            var component = start().buildComponent();
            var instance = component.instance();
            instance.renderHeader();
            expect(spy.called).toBe(true);
        });
        it('pass prop programName', function () {
            var instance = component.instance();
            var header = instance.renderHeader();
            expect(header.props.className).toBe('entry__header');
            programName = const_1.Programs.hero;
            component.setProps({ programName: programName });
            header = instance.renderHeader();
            expect(header.props.className).toBe('entry__header entry__header--colorful g-hero');
            programName = const_1.Programs.mother;
            component.setProps({ programName: programName });
            header = instance.renderHeader();
            expect(header.props.className).toBe('entry__header entry__header--colorful g-mather');
            programName = const_1.Programs.extreme;
            component.setProps({ programName: programName });
            header = instance.renderHeader();
            expect(header.props.className).toBe('entry__header entry__header--colorful g-extreme');
            programName = const_1.Programs.tomorrow;
            component.setProps({ programName: programName });
            header = instance.renderHeader();
            expect(header.props.className).toBe('entry__header entry__header--colorful g-tomorrow');
        });
    });
});
