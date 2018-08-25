import {shallow, mount} from 'enzyme';
import {Login, LoginComponent} from '../main';
import * as React from 'react';
import toJson from 'enzyme-to-json';
import * as sinon from 'sinon';
import {Provider} from 'react-redux';
import configureStore from '../../../store';
import {BrowserRouter as Router} from 'react-router-dom';
import {configure} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import {Steps} from "../../SignUp/const";
import {storage} from "../../../tools/storage/index";

const store = configureStore();
configure({adapter: new Adapter()});

let data = {
  paidState: 2,
  program: 11,
  isFirstEdit: false,
  authToken: 'qweqwe'
};
let payload = {
  email: 'test@email.ru',
  password: 'qweqwe'
};
describe('Component LoginForm', () => {
  let changeStep,
    submitLogin,
    toggleModal,
    setToken,
    setError,
    isFetching,
    isLoad,
    isError,
    errMsg,
    profile,
    match,
    location,
    history;
  beforeEach(() => {
    changeStep = jest.fn(),
      submitLogin = jest.fn(),
      toggleModal = jest.fn(),
      setToken = jest.fn(),
      setError = jest.fn(),
      isFetching = false,
      isLoad = false,
      isError = false,
      errMsg = 'Ошибка',
      profile = {},
      match = {},
      location = {},
      history = {
        replace: jest.fn()
      }
  });
  const buildComponent = () => {
    const props = {
      changeStep: changeStep,
      submitLogin: submitLogin,
      toggleModal: toggleModal,
      setToken: setToken,
      setError: setError,
      isFetching: isFetching,
      isLoad: isLoad,
      isError: isError,
      errMsg: errMsg,
      profile: profile,
      match: match,
      location: location,
      history: history
    };
    return shallow(<LoginComponent {...props}/>)
  };
  const buildComponentMount = () => {
    const props = {
      changeStep: changeStep,
      submitLogin: submitLogin,
      toggleModal: toggleModal,
      isFetching: isFetching,
      isLoad: isLoad,
      isError: isError,
      profile: profile
    };
    return mount(
      <Provider store={store}>
        <Router>
          <Login {...props}/>
        </Router>
      </Provider>)
  };
  const spy = sinon.spy(Login.prototype, 'componentWillReceiveProps');
  it('renders component', () => {
    const component = buildComponent()
    expect(component).toHaveLength(1);
  });
  it('renders correctly', () => {
    const tree = toJson(buildComponent());
    expect(tree).toMatchSnapshot();
  });
  it('renders component Mount', () => {
    const component = buildComponentMount();
    expect(component).toHaveLength(1);
  });
  it('do not call toggleModal', () => {
    const component = buildComponent();
    expect(toggleModal).not.toHaveBeenCalled()
    isLoad = true;
    isFetching = false;
    component.setProps({isLoad:isLoad, isFetching:isFetching});
    expect(toggleModal).not.toHaveBeenCalled();
  });
  it('call toggleModal isFetching = true', () => {
    const component = buildComponent();
    isFetching = true;
    component.setProps({isFetching: isFetching});
    expect(toggleModal).toHaveBeenCalledWith(true);
  });
  it('call toggleModal isError = true', () => {
    const component = buildComponent();
    isError = true;
    component.setProps({isError: isError});
    expect(toggleModal).toHaveBeenCalledWith(true)
  });
  it('call setError', () => {
    const component = buildComponent();
    const instance = component.instance() as LoginComponent;
    instance.setError();
    expect(setError).toHaveBeenCalledWith(false);
  });
  it('call submitCb - call submitLogin', () => {
    const component = buildComponent();
    const instance = component.instance() as LoginComponent;
    instance.onSubmit(payload);
    expect(submitLogin).toHaveBeenCalled();
  });
  it('call submitCb, paidState !== 0', () => {
    const component = buildComponent();
    const instance = component.instance() as LoginComponent;
    instance.submitCb(data);
    expect(changeStep).toHaveBeenCalledWith(Steps.four);
    expect(setToken).toHaveBeenCalledWith(data.authToken);
    expect(storage.load('token')).toBe(data.authToken);
    expect(parseInt(storage.load('userProgram'))).toBe(data.program);
  });
  it('call submitCb, paidState === 2', () => {
    const component = buildComponent();
    const instance = component.instance() as LoginComponent;
    instance.submitCb(data);
    expect(changeStep).toHaveBeenCalledWith(Steps.four);
  });
  it('call submitCb, paidState !== 2', () => {
    const component = buildComponent();
    const instance = component.instance() as LoginComponent;
    data.paidState = 1;
    instance.submitCb(data);
    expect(history.replace).toHaveBeenCalledWith('/task');
  });
  it('call submitCb, isFirstEdit === true', () => {
    const component = buildComponent();
    const instance = component.instance() as LoginComponent;
    data.isFirstEdit = true;
    instance.submitCb(data);
    expect(history.replace).toHaveBeenCalledWith('/profile');
  });
  it('call submitCb, isFirstEdit !== true', () => {
    const component = buildComponent();
    const instance = component.instance() as LoginComponent;
    data.isFirstEdit = false;
    instance.submitCb(data);
    expect(history.replace).toHaveBeenCalledWith('/task');
  });
  it('call submitCb, !data.program', () => {
    const component = buildComponent();
    const instance = component.instance() as LoginComponent;
    data.paidState = 0;
    data.program = null;
    instance.submitCb(data);
    expect(history.replace).toHaveBeenCalledWith('/signup');
    expect(changeStep).toHaveBeenCalledWith(Steps.two);
    expect(storage.load('token')).toBe(data.authToken);
  });
  it('call submitCb, paidState === 0', () => {
    const component = buildComponent();
    const instance = component.instance() as LoginComponent;
    data.paidState = 0;
    data.isFirstEdit = true;
    data.program = 11;
    instance.submitCb(data);
    expect(history.replace).toHaveBeenCalledWith('/signup');
    expect(changeStep).toHaveBeenCalledWith(Steps.three);
    expect(storage.load('token')).toBe(data.authToken);
  })
});


