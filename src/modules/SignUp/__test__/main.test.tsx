import {shallow, mount} from 'enzyme';
import {SignUpComponent, SignUp} from '../main';
import * as React from 'react';
import toJson from 'enzyme-to-json';
import * as sinon from 'sinon';
import {Provider} from 'react-redux';
import configureStore from '../../../store';
import {BrowserRouter as Router} from 'react-router-dom';
import {CustomModal, ModalTypes} from '../../CustomModal';
import TodayTask from '../../../pages/PageTodayTask';
import {configure} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import {storage} from '../../../tools/storage/index';
import {Steps} from '../const';
import {queryParse} from '../../../tools/utils/index';
import {StepOne} from '../containers/Step1';
import {StepTwo} from '../containers/Step2';
import {StepThree} from '../containers/Step3';
import {StepFour} from '../containers/Step4';
import LogoLink from "../../../components/LogoLink/index";
import * as Immutable from 'immutable';

//const store = configureStore();
configure({adapter: new Adapter()});
let changeStep,
  getPrograms,
  userCreate,
  setProgramName,
  setToken,
  isFetching,
  isLoad,
  isError,
  step,
  match,
  location,
  history;
const start = () => {
  beforeEach(() => {
    changeStep = jest.fn(),
      getPrograms = jest.fn(),
      userCreate = jest.fn(),
      setProgramName = jest.fn(),
      setToken = jest.fn(),
      isFetching = false,
      isLoad = false,
      isError = false,
      step = Steps.one,
      match = {
        isExact: true,
        params: {},
        path: "/task",
        url: "/task"
      },
      location = {},
      history = {
        replace: jest.fn()
      }
  });
  const props = {
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
  const buildComponent = () => {
    return shallow(<SignUpComponent {...props}/>)
  };
  return {
    props,
    buildComponent
  }
};
describe('Component SignUp', () => {
  let component;
  start();
  beforeEach(() => {
    component = start().buildComponent();
  });
  it('renders component', () => {
    expect(component).toHaveLength(1);
  });
  /*  it('renders component Mount', () => {
      const component = start().buildComponentMount();
      expect(component).toHaveLength(1);
    });*/
  it('renders correctly', () => {
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
  describe('Test props', () => {
    it('pass prop program', () => {
      expect(component.instance().props.changeStep).toBe(start().props.changeStep);
      expect(component.instance().props.userCreate).toBe(start().props.userCreate);
      expect(component.instance().props.setProgramName).toBe(start().props.setProgramName);
    });
  });
  describe('Test componentWillMount', () => {
    it('componentWillMount, token=test', () => {
      location = {
        search: '?token=test'
      };
      component = start().buildComponent();
      expect(changeStep).not.toHaveBeenCalled();
      expect(setProgramName).not.toHaveBeenCalled();
    });
    it('componentWillMount, step=1', () => {
      location = {
        search: '?step=1'
      };
      component = start().buildComponent();
      let query: any = queryParse(component.instance().props.location.search);
      expect(changeStep).toHaveBeenCalledWith(parseInt(query.step));
      expect(setProgramName).not.toHaveBeenCalled();
    });
    it('componentWillMount, step=5', () => {
      location = {
        search: '?step=5'
      };
      component = start().buildComponent();
      let query: any = queryParse(component.instance().props.location.search);
      expect(changeStep).not.toHaveBeenCalled();
      expect(setProgramName).not.toHaveBeenCalled();
    });
    it('componentWillMount, name=hero', () => {
      location = {
        search: '?name=hero'
      };
      component = start().buildComponent();
      let query: any = queryParse(component.instance().props.location.search);
      expect(changeStep).not.toHaveBeenCalled();
      expect(setProgramName).toHaveBeenCalledWith(query.name);
    });
    it('componentWillMount, name=hero2', () => {
      location = {
        search: '?name=hero2'
      };
      component = start().buildComponent();
      let query: any = queryParse(component.instance().props.location.search);
      expect(changeStep).not.toHaveBeenCalled();
      expect(setProgramName).not.toHaveBeenCalled();
    });
    it('componentWillMount, step=1&name=hero', () => {
      location = {
        search: '?step=1&name=hero'
      };
      component = start().buildComponent();
      let query: any = queryParse(component.instance().props.location.search);
      expect(changeStep).toHaveBeenCalledWith(parseInt(query.step));
      expect(setProgramName).toHaveBeenCalledWith(query.name);
    });
  });
  it('Test shouldComponentUpdate', () => {
    const instance = component.instance() as SignUpComponent;
    step = Steps.two;
    let props = {
      ...start().props,
      step:step
    };
    const shouldUpdate = instance.shouldComponentUpdate(props);
    expect(shouldUpdate).toBe(true)
  });
  describe('Test renderContent', () => {
    it('Steps.one', () => {
      expect(component.find(StepOne).exists()).toBe(true);
      expect(component.find(StepTwo).exists()).toBe(false);
      expect(component.find(StepThree).exists()).toBe(false);
      expect(component.find(StepFour).exists()).toBe(false);
    });
    it('Steps.two', () => {
      step = Steps.two;
      component.setProps({step: step});
      expect(component.find(StepOne).exists()).toBe(false);
      expect(component.find(StepTwo).exists()).toBe(true);
      expect(component.find(StepThree).exists()).toBe(false);
      expect(component.find(StepFour).exists()).toBe(false);
    });
    it('Steps.three', () => {
      step = Steps.three;
      component.setProps({step: step});
      expect(component.find(StepOne).exists()).toBe(false);
      expect(component.find(StepTwo).exists()).toBe(false);
      expect(component.find(StepThree).exists()).toBe(true);
      expect(component.find(StepFour).exists()).toBe(false);
    });
    it('Steps.four', () => {
      step = Steps.four;
      component.setProps({step: step});
      expect(component.find(StepOne).exists()).toBe(false);
      expect(component.find(StepTwo).exists()).toBe(false);
      expect(component.find(StepThree).exists()).toBe(false);
      expect(component.find(StepFour).exists()).toBe(true);
      step = 5;
      component.setProps({step: step});
      expect(component.find(StepOne).exists()).toBe(false);
      expect(component.find(StepTwo).exists()).toBe(false);
      expect(component.find(StepThree).exists()).toBe(false);
      expect(component.find(StepFour).exists()).toBe(true);
    });
  });
  describe('Test render()', () => {
    it('render LogoLink', () => {
      expect(component.find(LogoLink).exists()).toBe(true);
    });
    it('pass prop step', () => {
      expect(component.instance().props.step).toBe(start().props.step);
      expect(component.find('.entry-step__no').text()).toBe('#' + start().props.step);
    });
    it('call renderContent', () => {
      const spy = sinon.spy(SignUpComponent.prototype, 'renderContent');
      component = start().buildComponent();
      expect(spy.called).toBe(true);
    });
  });
});


