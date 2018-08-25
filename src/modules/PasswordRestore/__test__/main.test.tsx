import {shallow, mount} from 'enzyme';
import {PasswordRestoreComponent, PasswordRestore} from '../main';
import PasswordForgetForm from '../components/PasswordForgetForm';
import PasswordRestoreForm from '../components/PasswordRestoreForm';
import * as React from 'react';
import toJson from 'enzyme-to-json';
import * as sinon from 'sinon';
import {Provider} from 'react-redux';
import configureStore from '../../../store';
import {BrowserRouter as Router} from 'react-router-dom';
import {ModalTypes} from '../../CustomModal';
import {configure} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import {queryParse} from "../../../tools/utils/index";

const store = configureStore();
configure({adapter: new Adapter()});

let data = {
  pass: 'qeqwe',
  passAgain: 'qweqwe',
  tokenPassword: 'asdasdasdasd'
};
let payload = {
  email: 'test@email.ru'
};
let changeStep,
  submitLogin,
  toggleModal,
  onSubmit,
  submitPassword,
  submitRestore,
  setRestoreToken,
  setToken,
  setError,
  isFetching,
  isLoad,
  isError,
  errMsg,
  token,
  resultText,
  resultCode,
  errorMessage,
  match,
  location,
  history;
const start = () => {
  beforeEach(() => {
    changeStep = jest.fn(),
      toggleModal = jest.fn(),
      setToken = jest.fn(),
      onSubmit = jest.fn(),
      submitPassword = jest.fn(),
      submitRestore = jest.fn(),
      setRestoreToken = jest.fn(),
      isFetching = false,
      isLoad = false,
      isError = false,
      errMsg = 'Ошибка',
      token = 'token',
      resultText = 'resultText',
      resultCode = 1,
      errorMessage = 'errorMessage',
      match = {},
      location = {
        search: ''
      };
    history = {
      replace: jest.fn()
    }
  });
  const props = {
    submitPassword: submitPassword,
    submitRestore: submitRestore,
    setRestoreToken: setRestoreToken,
    toggleModal: toggleModal,
    setToken: setToken,
    setError: setError,
    isFetching: isFetching,
    isLoad: isLoad,
    isError: isError,
    errMsg: errMsg,
    match: match,
    location: location,
    history: history,
    token: token,
    resultText: resultText,
    resultCode: resultCode,
    errorMessage: errorMessage
  };
  const buildComponent = () => {
    return shallow(<PasswordRestoreComponent {...props}/>)
  };
  const buildComponentMount = () => {
    return mount(
      <Provider store={store}>
        <Router>
          <PasswordRestore {...props}/>
        </Router>
      </Provider>)
  };
  return {
    buildComponentMount,
    buildComponent
  }
};
describe('Component PasswordRestore', () => {
  start();
  it('renders component', () => {
    const component = start().buildComponent();
    expect(component).toHaveLength(1);
  });
  it('renders correctly', () => {
    const tree = toJson(start().buildComponent());
    expect(tree).toMatchSnapshot();
  });
  it('renders component Mount', () => {
    const component = start().buildComponentMount();
    expect(component).toHaveLength(1);
  });
  it('call setRestoreToken,  location.search === null', () => {
    const component = start().buildComponent();
    let query: any = queryParse(component.instance().props.location.search);
    expect(query).toBeNull();
    expect(setRestoreToken).not.toHaveBeenCalled();
  });
  it('call setRestoreToken, location.search !== null', () => {
    location = {
      search: '?token=asdasd'
    };
    const component = start().buildComponent();
    let query: any = queryParse(component.instance().props.location.search);
    expect(setRestoreToken).toHaveBeenCalledWith(query.token);
  });
  it('call setRestoreToken, location.search === null', () => {
    location = {
      search: '?token'
    };
    const component = start().buildComponent();
    let query: any = queryParse(component.instance().props.location.search);
    expect(query.token).toBeUndefined();
    expect(setRestoreToken).not.toHaveBeenCalled();
  });
  it('call onSubmit - call submitPassword', () => {
    const component = start().buildComponent();
    const instance = component.instance() as PasswordRestoreComponent;
    instance.onSubmit(payload);
    expect(submitPassword).toHaveBeenCalledWith(payload);
  });
  it('call onSubmitRestore - call submitRestore', () => {
    const component = start().buildComponent();
    const instance = component.instance() as PasswordRestoreComponent;
    instance.onSubmitRestore(data);
    expect(submitRestore).toHaveBeenCalledWith(data);
  });
  it('render PasswordRestoreForm', () => {
    const component = start().buildComponent();
    expect(component.find(PasswordRestoreForm)).toHaveLength(1);
    expect(component.find(PasswordForgetForm)).toHaveLength(0);
  });
  it('render PasswordForgetForm', () => {
    token = null;
    const component = start().buildComponent();
    expect(component.find(PasswordForgetForm)).toHaveLength(1);
    expect(component.find(PasswordRestoreForm)).toHaveLength(0);
  });
  it('call clickHandler', () => {
    const component = start().buildComponent();
    const spy = sinon.spy(PasswordRestoreComponent.prototype, 'setModal');
    const instance = component.instance() as PasswordRestoreComponent;
    instance.clickHandler();
    expect(spy.called).toEqual(true)
  });
  it('call clickHandler - do not call location.replace(): modal!== success', () => {
    const component = start().buildComponent();
    const instance = component.instance() as PasswordRestoreComponent;
    instance.clickHandler();
    expect(history.replace).not.toHaveBeenCalled();
  });
  it('call clickHandler - do not call location.replace(): modal === error', () => {
    isError = true;
    const component = start().buildComponent();
    const instance = component.instance() as PasswordRestoreComponent;
    instance.clickHandler();
    expect(history.replace).not.toHaveBeenCalled();
  });
  it('call clickHandler - do not call location.replace(): token = null', () => {
    isLoad = true;
    token = null;
    const component = start().buildComponent();
    const instance = component.instance() as PasswordRestoreComponent;
    instance.clickHandler();
    expect(history.replace).not.toHaveBeenCalled();
  });
  it('call clickHandler - call location.replace(): modal === success', () => {
    isLoad = true;
    const component = start().buildComponent();
    const instance = component.instance() as PasswordRestoreComponent;
    instance.clickHandler();
    expect(history.replace).toHaveBeenCalledWith('/');
  });
  describe('componentWillReceiveProps', () => {
    start();
    it('do not call toggleModal', () => {
      const component = start().buildComponent();
      expect(toggleModal).not.toHaveBeenCalled();
      token = 'error';
      isFetching = false;
      component.setProps({token: token, isFetching: isFetching});
      expect(toggleModal).not.toHaveBeenCalled();
    });
    it('call toggleModal isFetching = true', () => {
      const component = start().buildComponent();
      isFetching = true;
      component.setProps({isFetching: isFetching});
      expect(toggleModal).toHaveBeenCalledWith(true);
    });
    it('call toggleModal isLoad = true', () => {
      const component = start().buildComponent();
      isLoad = true;
      component.setProps({isLoad: isLoad});
      expect(toggleModal).toHaveBeenCalledWith(true);
    });
    it('call toggleModal isError = true', () => {
      const component = start().buildComponent();
      isError = true;
      component.setProps({isError: isError});
      expect(toggleModal).toHaveBeenCalledWith(true);
    });
  });
  describe('setModal', () => {
    start();
    it('modal === ModalTypes.info', () => {
      const component = start().buildComponent();
      const instance = component.instance() as PasswordRestoreComponent;
      const modal = instance.setModal();
      expect(modal).toBe(ModalTypes.info);
    });
    it('modal === ModalTypes.error', () => {
      isError = true;
      const component = start().buildComponent();
      const instance = component.instance() as PasswordRestoreComponent;
      const modal = instance.setModal();
      expect(modal).toBe(ModalTypes.error);
    });
    it('modal === ModalTypes.success', () => {
      isLoad = true;
      const component = start().buildComponent();
      const instance = component.instance() as PasswordRestoreComponent;
      const modal = instance.setModal();
      expect(modal).toBe(ModalTypes.success);
    });
    it('modal !== ModalTypes.success', () => {
      isLoad = true;
      resultCode = 32;
      const component = start().buildComponent();
      const instance = component.instance() as PasswordRestoreComponent;
      const modal = instance.setModal();
      expect(modal).toBe(ModalTypes.info);
    });
  })
});


