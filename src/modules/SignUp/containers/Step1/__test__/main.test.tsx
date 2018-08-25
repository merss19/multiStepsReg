import {shallow, mount} from 'enzyme';
import StepOneReduxForm, {StepOneComponent, StepOne} from '../main';
import * as React from 'react';
import toJson from 'enzyme-to-json';
import * as sinon from 'sinon';
import {Provider} from 'react-redux';
import configureStore from '../../../../../store';
import {BrowserRouter as Router} from 'react-router-dom';
import {configure} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import {storage} from '../../../../../tools/storage/index';
import {Steps} from '../../../const';
import {Button, ButtonTypes} from "../../../../../components/Button/button";
import * as Immutable from 'immutable';

const store = configureStore();
configure({adapter: new Adapter()});
let data = [
  {
    id: 1,
    name: 'hero',
    isActive: true
  },
  {
    id: 2,
    name: 'mother',
    isActive: false
  },
  {
    id: 3,
    name: 'extreme',
    isActive: false
  },
  {
    id: 4,
    name: 'tomorrow',
    isActive: false
  }
];

let changeStep,
  getPrograms,
  userCreate,
  setProgramName,
  handleSubmit,
  setToken,
  toggleModal,
  setError,
  isFetching,
  isLoad,
  isError,
  step,
  errMsg,
  signUpData,
  dataRes,
  match,
  location,
  history;
const start = () => {
  beforeEach(() => {
    changeStep = jest.fn(),
      getPrograms = jest.fn(),
      userCreate = jest.fn((data, callback) => callback()),
      setProgramName = jest.fn(),
      setToken = jest.fn(),
      handleSubmit = jest.fn((callback) => callback()),
      toggleModal = jest.fn(),
      setError = jest.fn(),
      isFetching = false,
      isLoad = false,
      isError = false,
      errMsg = 'error',
      step = Steps.one,
      dataRes = {
        authToken: 'qweqwe',
        promoName: 'tele2'
      },
      signUpData = {
        email: 'mail@mail.ru',
        password: 'qweqwe',
        passwordAgain: 'qweqwe',
        gender: 'male',
      },
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
    handleSubmit: handleSubmit,
    changeStep: changeStep,
    setProgramName: setProgramName,
    setToken: setToken,
    toggleModal: toggleModal,
    setError: setError,
    step: step,
    errMsg: errMsg,
    isFetching: isFetching,
    isLoad: isLoad,
    isError: isError,
    match: match,
    location: location,
    history: history
  };
  const buildComponent = () => {
    return shallow(<StepOneComponent {...props}/>)
  };
  const buildComponentMount = () => {
    return mount(
      <Provider store={store}>
        <Router>
          <StepOneReduxForm {...props}/>
        </Router>
      </Provider>)
  };
  return {
    buildComponentMount,
    props,
    buildComponent
  }
};
describe('Component StepOne', () => {
  let component;
  start();
  beforeEach(() => {
    component = start().buildComponent();
  });
  it('renders component', () => {
    expect(component).toHaveLength(1);
  });
  it('renders component Mount', () => {
    const component = start().buildComponentMount();
    expect(component).toHaveLength(1);
  });
  it('renders correctly', () => {
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
  describe('Test shouldComponentUpdate', () => {
    it('step', () => {
      const instance = component.instance() as StepOneComponent;
      step = Steps.two;
      let props = {
        ...start().props,
        step: step
      };
      const shouldUpdate = instance.shouldComponentUpdate(props);
      expect(shouldUpdate).toBe(true)
    });
 /*   it('isFetching', () => {
      const instance = component.instance() as StepOneComponent;
      isFetching = true;
      let props = {
        ...start().props,
        isFetching: isFetching
      };
      const shouldUpdate = instance.shouldComponentUpdate(props);
      expect(shouldUpdate).toBe(true)
    });
    it('isError', () => {
      const instance = component.instance() as StepOneComponent;
      isError = true;
      let props = {
        ...start().props,
        isError: isError
      };
      const shouldUpdate = instance.shouldComponentUpdate(props);
      expect(shouldUpdate).toBe(true)
    });
    it('errMsg', () => {
      const instance = component.instance() as StepOneComponent;
      errMsg = 'test';
      let props = {
        ...start().props,
        errMsg: errMsg
      };
      const shouldUpdate = instance.shouldComponentUpdate(props);
      expect(shouldUpdate).toBe(true)
    });*/
  });
  it('call onSubmit', () => {
    const spy = sinon.spy(StepOneComponent.prototype, 'resultAction');
    const component = start().buildComponent();
    const instance = component.instance() as StepOneComponent;
    instance.onSubmit(signUpData);
    const cb = jest.fn(() => true);
    expect(userCreate).toHaveBeenCalled();
    component.instance().props.userCreate(signUpData, cb);
    expect(spy.called).toBe(true);
  });
  it('call resultAction, dataRes.authToken !== null', () => {
    const instance = component.instance() as StepOneComponent;
    instance.resultAction(dataRes);
    expect(setToken).toHaveBeenCalledWith(dataRes.authToken);
    expect(changeStep).toHaveBeenCalledWith(Steps.two);
    expect(storage.load('token')).toBe(dataRes.authToken);
    expect(storage.load('promoName')).toBe(dataRes.promoName);
    storage.remove('token');
    storage.remove('promoName');
  });
  it('call resultAction, dataRes.authToken === null', () => {
    dataRes = {
      authToken: null,
      promoName: 'tele2'
    };
    const instance = component.instance() as StepOneComponent;
    instance.resultAction(dataRes);
    expect(setToken).not.toHaveBeenCalled();
    expect(changeStep).not.toHaveBeenCalled();
    expect(storage.load('token')).toBeUndefined();
    expect(storage.load('promoName')).toBeUndefined();
  });
  describe('call render()', () => {
    it('call renderHeader', () => {
      const spy = sinon.spy(StepOneComponent.prototype, 'renderHeader');
      const component = start().buildComponent();
      expect(spy.called).toBe(true);
    });
    it('render button', () => {
      const component = start().buildComponent();
      const button = component.find(Button)
      expect(button.exists()).toBe(true);
      expect(button.props().type).toBe('submit');
      expect(button.props().styleBtn).toBe(ButtonTypes.info);
      expect(button.props().wide).toBe(true);
    });
    it('render Fields', () => {
      const component = start().buildComponent();
      const email = component.find('Field[name="email"]');
      const password = component.find('Field[name="password"]');
      const passwordAgain = component.find('Field[name="passwordAgain"]');
      const gender = component.find('Field[name="gender"]');
      const accept = component.find('Field[name="accept"]');
      expect(email.exists()).toBe(true);
      expect(password.exists()).toBe(true);
      expect(accept.exists()).toBe(true);
      expect(passwordAgain.exists()).toBe(true);
      expect(gender).toHaveLength(2);
    });
    it('click Button', () => {
      const component = start().buildComponent();
      component.find('form').simulate('submit')
      expect(component.instance().props.handleSubmit).toHaveBeenCalled()
    });
  });
});


