import {shallow, mount} from 'enzyme';
import {ProtectedRouteComponent, ProtectedRoute} from '../main';
import * as React from 'react';
import toJson from 'enzyme-to-json';
import * as sinon from 'sinon';
import {Provider} from 'react-redux';
import configureStore from '../../../store';
import {BrowserRouter as Router} from 'react-router-dom';
import {CustomModal, ModalTypes} from '../../CustomModal';

const store = configureStore();
import TodayTask from '../../../pages/PageTodayTask';
import {configure} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import {storage} from "../../../tools/storage/index";
import {Steps} from "../../SignUp/const";


configure({adapter: new Adapter()});
let data = {
  paidState: 2,
  program: 11,
  isFirstEdit: false,
  emailConfirmed: true,
  authToken: 'qweqwe'
};
let payload = {
  email: 'test@email.ru'
};
let changeStep,
  toggleModal,
  checkAuth,
  renderModal,
  isFetching,
  isLoad,
  isError,
  isAuth,
  errMsg,
  user,
  match,
  location,
  component,
  history;
const start = () => {
  beforeEach(() => {
    changeStep = jest.fn(),
      toggleModal = jest.fn(),
      checkAuth = jest.fn(),
      renderModal = jest.fn(),
      component = TodayTask,
      isFetching = false,
      isLoad = false,
      isAuth = false,
      isError = false,
      user = {},
      errMsg = 'Ошибка',
      match = {
        isExact: true,
        params:{},
        path:"/task",
        url:"/task"
      },
      location = {},
      history = {
        replace: jest.fn()
      }
  });
  const props = {
    toggleModal: toggleModal,
    isFetching: isFetching,
    checkAuth: checkAuth,
    changeStep: changeStep,
    renderModal: renderModal,
    component: component,
    user: user,
    isAuth: isAuth,
    isLoad: isLoad,
    isError: isError,
    errMsg: errMsg,
    match: match,
    location: location,
    history: history
  };
  const buildComponent = () => {
    return shallow(<ProtectedRouteComponent {...props}/>)
  };
  const buildComponentMount = () => {
    return mount(
      <Provider store={store}>
        <Router>
          <ProtectedRouteComponent {...props}/>
        </Router>
      </Provider>)
  };
  return {
    buildComponentMount,
    props,
    buildComponent
  }
};
describe('Component ProtectedRoute', () => {
  start();
  it('renders component', () => {
    const component = start().buildComponent();
    expect(component).toHaveLength(1);
  });
  it('renders component Mount', () => {
    const component = start().buildComponentMount();
    expect(component).toHaveLength(1);
  });
  it('renders correctly', () => {
    const tree = toJson(start().buildComponent());
    expect(tree).toMatchSnapshot();
  });
  it('call checkAuth', () => {
    const component = start().buildComponent();
    expect(checkAuth).toHaveBeenCalled();
  });
  it('test leave method', () => {
    const component = start().buildComponent();
    const instance = component.instance() as ProtectedRouteComponent;
    instance.leave();
    expect(toggleModal).toHaveBeenCalledWith(false);
    expect(history.replace).toHaveBeenCalledWith('/');
    expect(storage.load('token')).toBeUndefined();
    expect(storage.load('txId')).toBeUndefined();
    expect(storage.load('program')).toBeUndefined();
    expect(storage.load('packageType')).toBeUndefined();
    expect(storage.load('promoName')).toBeUndefined();
  });
  it('test modalClick method', () => {
    const component = start().buildComponent();
    const instance = component.instance() as ProtectedRouteComponent;
    instance.modalClick();
    expect(toggleModal).toHaveBeenCalledWith(false);
    expect(history.replace).toHaveBeenCalledWith('/');
  });
  it('pass prop component ', () => {
    const component = start().buildComponent();
    expect(component.instance().props.component).toBe(start().props.component)
  });
  it('call clickHandler ', () => {
    const spy = sinon.spy(ProtectedRouteComponent.prototype, 'modalClick');
    const component = start().buildComponent();
    const instance = component.instance() as ProtectedRouteComponent;
    instance.clickHandler();
    expect(spy.called).toEqual(false);
    isError = true;
    component.setProps({isError:isError})
    instance.clickHandler();
    expect(spy.called).toEqual(true);
  });
  it('call renderModal, isAuth === false', () => {
    const props = {
      history: history,
      location: location,
      match: match
    };
    const spy = sinon.spy(ProtectedRouteComponent.prototype, 'renderModal');
    const component = start().buildComponent();
    const instance = component.instance() as ProtectedRouteComponent;
    instance.renderRoute(props);
    expect(spy.calledWith(ModalTypes.info)).toEqual(true);
  });
  it('call renderContent, isAuth === true', () => {
    isAuth = true;
    const props = {
      history: history,
      location: location,
      match: match
    };
    const spy = sinon.spy(ProtectedRouteComponent.prototype, 'renderContent');
    const component = start().buildComponent();
    const instance = component.instance() as ProtectedRouteComponent;
    instance.renderRoute(props);
    expect(spy.calledWith(props)).toEqual(true);
  });
  describe('componentWillReceiveProps', () => {
    start();
    it('do not call toggleModal', () => {
      const component = start().buildComponent();
      expect(toggleModal).not.toHaveBeenCalled()
      isLoad = true;
      isFetching = false;
      component.setProps({isLoad:isLoad, isFetching:isFetching});
      expect(toggleModal).not.toHaveBeenCalled();
    });
    it('call toggleModal isFetching = true', () => {
      const component = start().buildComponent();
      isFetching = true;
      component.setProps({isFetching: isFetching});
      expect(toggleModal).toHaveBeenCalledWith(true)
    });
    it('call toggleModal isError = true', () => {
      const component = start().buildComponent();
      isError = true;
      component.setProps({isError: isError});
      expect(toggleModal).toHaveBeenCalledWith(true)
    });
    it('call toggleModal with false', () => {
      const component = start().buildComponent();
      isError = true;
      isFetching = true;
      component.setProps({isError: isError, isFetching: isFetching});
      expect(toggleModal).toHaveBeenCalledWith(true);
      isError = false;
      isFetching = false;
      component.setProps({isError: isError, isFetching: isFetching});
      expect(toggleModal).toHaveBeenCalledWith(false);
    });
  });
  describe('test checkAuth method', () => {
    start();
    it('call submitCb, paidState !== 0', () => {
      const component = start().buildComponent();
      const instance = component.instance() as ProtectedRouteComponent;
      instance.checkAuth(data);
      expect(parseInt(storage.load('userProgram'))).toBe(data.program);
    });
    it('call submitCb, paidState === 2', () => {
      const component = start().buildComponent();
      const instance = component.instance() as ProtectedRouteComponent;
      instance.checkAuth(data);
      expect(changeStep).toHaveBeenCalledWith(Steps.four);
      expect(history.replace).toHaveBeenCalledWith('/signup');
    });
    it('call submitCb, paidState !== 2', () => {
      const component = start().buildComponent();
      const instance = component.instance() as ProtectedRouteComponent;
      data.paidState = 1;
      instance.checkAuth(data);
      expect(history.replace).toHaveBeenCalledWith('/task');
    });
    it('call submitCb, isFirstEdit === true', () => {
      const component = start().buildComponent();
      const instance = component.instance() as ProtectedRouteComponent;
      data.isFirstEdit = true;
      instance.checkAuth(data);
      expect(history.replace).toHaveBeenCalledWith('/profile');
    });
    it('call submitCb, isFirstEdit !== true', () => {
      const component = start().buildComponent();
      const instance = component.instance() as ProtectedRouteComponent;
      data.isFirstEdit = false;
      instance.checkAuth(data);
      expect(history.replace).toHaveBeenCalledWith('/task');
    });
    it('call submitCb, emailConfirmed === false', () => {
      data.emailConfirmed = false;
      data.isFirstEdit = false;
      data.paidState = 1;
      const component = start().buildComponent();
      const instance = component.instance() as ProtectedRouteComponent;
      instance.checkAuth(data);
      expect(history.replace).not.toHaveBeenCalled();
      expect(changeStep).not.toHaveBeenCalled();
    });
    it('call submitCb, !data.program', () => {
      const component = start().buildComponent();
      const instance = component.instance() as ProtectedRouteComponent;
      data.paidState = 0;
      data.program = null;
      instance.checkAuth(data);
      expect(changeStep).toHaveBeenCalledWith(Steps.two);

    });
    it('call submitCb, paidState === 0', () => {
      const component = start().buildComponent();
      const instance = component.instance() as ProtectedRouteComponent;
      data.paidState = 0;
      data.isFirstEdit = true;
      data.program = 11;
      instance.checkAuth(data);
      expect(changeStep).toHaveBeenCalledWith(Steps.four);
    })
  });
});


