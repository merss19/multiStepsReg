"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var enzyme_1 = require("enzyme");
var main_1 = require("../main");
var React = require("react");
var enzyme_to_json_1 = require("enzyme-to-json");
var sinon = require("sinon");
var enzyme_2 = require("enzyme");
var Adapter = require("enzyme-adapter-react-16");
var const_1 = require("../const");
var index_1 = require("../../../tools/utils/index");
var Step1_1 = require("../containers/Step1");
var Step2_1 = require("../containers/Step2");
var Step3_1 = require("../containers/Step3");
var Step4_1 = require("../containers/Step4");
var index_2 = require("../../../components/LogoLink/index");
//const store = configureStore();
enzyme_2.configure({ adapter: new Adapter() });
var changeStep, getPrograms, userCreate, setProgramName, setToken, isFetching, isLoad, isError, step, match, location, history;
var start = function () {
    beforeEach(function () {
        changeStep = jest.fn(),
            getPrograms = jest.fn(),
            userCreate = jest.fn(),
            setProgramName = jest.fn(),
            setToken = jest.fn(),
            isFetching = false,
            isLoad = false,
            isError = false,
            step = const_1.Steps.one,
            match = {
                isExact: true,
                params: {},
                path: "/task",
                url: "/task"
            },
            location = {},
            history = {
                replace: jest.fn()
            };
    });
    var props = {
        getPrograms: getPrograms,
        userCreate: userCreate,
        changeStep: changeStep,
        setProgramName: setProgramName,
        setToken: setToken,
        step: step,
        isFetching: isFetching,
        isLoad: isLoad,
        isError: isError,
        match: match,
        location: location,
        history: history
    };
    var buildComponent = function () {
        return enzyme_1.shallow(<main_1.SignUpComponent {...props}/>);
    };
    return {
        props: props,
        buildComponent: buildComponent
    };
};
describe('Component SignUp', function () {
    var component;
    start();
    beforeEach(function () {
        component = start().buildComponent();
    });
    it('renders component', function () {
        expect(component).toHaveLength(1);
    });
    /*  it('renders component Mount', () => {
        const component = start().buildComponentMount();
        expect(component).toHaveLength(1);
      });*/
    it('renders correctly', function () {
        var tree = enzyme_to_json_1.default(component);
        expect(tree).toMatchSnapshot();
    });
    describe('Test props', function () {
        it('pass prop program', function () {
            expect(component.instance().props.changeStep).toBe(start().props.changeStep);
            expect(component.instance().props.userCreate).toBe(start().props.userCreate);
            expect(component.instance().props.setProgramName).toBe(start().props.setProgramName);
        });
    });
    describe('Test componentWillMount', function () {
        it('componentWillMount, token=test', function () {
            location = {
                search: '?token=test'
            };
            component = start().buildComponent();
            expect(changeStep).not.toHaveBeenCalled();
            expect(setProgramName).not.toHaveBeenCalled();
        });
        it('componentWillMount, step=1', function () {
            location = {
                search: '?step=1'
            };
            component = start().buildComponent();
            var query = index_1.queryParse(component.instance().props.location.search);
            expect(changeStep).toHaveBeenCalledWith(parseInt(query.step));
            expect(setProgramName).not.toHaveBeenCalled();
        });
        it('componentWillMount, step=5', function () {
            location = {
                search: '?step=5'
            };
            component = start().buildComponent();
            var query = index_1.queryParse(component.instance().props.location.search);
            expect(changeStep).not.toHaveBeenCalled();
            expect(setProgramName).not.toHaveBeenCalled();
        });
        it('componentWillMount, name=hero', function () {
            location = {
                search: '?name=hero'
            };
            component = start().buildComponent();
            var query = index_1.queryParse(component.instance().props.location.search);
            expect(changeStep).not.toHaveBeenCalled();
            expect(setProgramName).toHaveBeenCalledWith(query.name);
        });
        it('componentWillMount, name=hero2', function () {
            location = {
                search: '?name=hero2'
            };
            component = start().buildComponent();
            var query = index_1.queryParse(component.instance().props.location.search);
            expect(changeStep).not.toHaveBeenCalled();
            expect(setProgramName).not.toHaveBeenCalled();
        });
        it('componentWillMount, step=1&name=hero', function () {
            location = {
                search: '?step=1&name=hero'
            };
            component = start().buildComponent();
            var query = index_1.queryParse(component.instance().props.location.search);
            expect(changeStep).toHaveBeenCalledWith(parseInt(query.step));
            expect(setProgramName).toHaveBeenCalledWith(query.name);
        });
    });
    it('Test shouldComponentUpdate', function () {
        var instance = component.instance();
        step = const_1.Steps.two;
        var props = __assign({}, start().props, { step: step });
        var shouldUpdate = instance.shouldComponentUpdate(props);
        expect(shouldUpdate).toBe(true);
    });
    describe('Test renderContent', function () {
        it('Steps.one', function () {
            expect(component.find(Step1_1.StepOne).exists()).toBe(true);
            expect(component.find(Step2_1.StepTwo).exists()).toBe(false);
            expect(component.find(Step3_1.StepThree).exists()).toBe(false);
            expect(component.find(Step4_1.StepFour).exists()).toBe(false);
        });
        it('Steps.two', function () {
            step = const_1.Steps.two;
            component.setProps({ step: step });
            expect(component.find(Step1_1.StepOne).exists()).toBe(false);
            expect(component.find(Step2_1.StepTwo).exists()).toBe(true);
            expect(component.find(Step3_1.StepThree).exists()).toBe(false);
            expect(component.find(Step4_1.StepFour).exists()).toBe(false);
        });
        it('Steps.three', function () {
            step = const_1.Steps.three;
            component.setProps({ step: step });
            expect(component.find(Step1_1.StepOne).exists()).toBe(false);
            expect(component.find(Step2_1.StepTwo).exists()).toBe(false);
            expect(component.find(Step3_1.StepThree).exists()).toBe(true);
            expect(component.find(Step4_1.StepFour).exists()).toBe(false);
        });
        it('Steps.four', function () {
            step = const_1.Steps.four;
            component.setProps({ step: step });
            expect(component.find(Step1_1.StepOne).exists()).toBe(false);
            expect(component.find(Step2_1.StepTwo).exists()).toBe(false);
            expect(component.find(Step3_1.StepThree).exists()).toBe(false);
            expect(component.find(Step4_1.StepFour).exists()).toBe(true);
            step = 5;
            component.setProps({ step: step });
            expect(component.find(Step1_1.StepOne).exists()).toBe(false);
            expect(component.find(Step2_1.StepTwo).exists()).toBe(false);
            expect(component.find(Step3_1.StepThree).exists()).toBe(false);
            expect(component.find(Step4_1.StepFour).exists()).toBe(true);
        });
    });
    describe('Test render()', function () {
        it('render LogoLink', function () {
            expect(component.find(index_2.default).exists()).toBe(true);
        });
        it('pass prop step', function () {
            expect(component.instance().props.step).toBe(start().props.step);
            expect(component.find('.entry-step__no').text()).toBe('#' + start().props.step);
        });
        it('call renderContent', function () {
            var spy = sinon.spy(main_1.SignUpComponent.prototype, 'renderContent');
            component = start().buildComponent();
            expect(spy.called).toBe(true);
        });
    });
});
