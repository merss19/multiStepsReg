import {shallow, mount} from 'enzyme'
import {CustomModalComponent} from '../main'
import {Loader} from '../../../components/Loader'
import {Button, ButtonTypes} from '../../../components/Button'
import * as React from 'react'
import toJson from 'enzyme-to-json'
import * as sinon from 'sinon'
import {ModalTypes} from '../const'
import {configure} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import {Provider} from 'react-redux'
import configureStore from '../../../store'
import {BrowserRouter as Router} from 'react-router-dom';
import {Motion, spring, presets} from 'react-motion';

const store = configureStore();
configure({adapter: new Adapter()});

let isLoader;
let resultText;
let modal;
let clickHandler;
let toggleModal;
let isOpen;
const start = () => {
  beforeEach(() => {
      clickHandler = jest.fn(),
      toggleModal = jest.fn(),
      isLoader = false,
      resultText = 'test',
      isOpen = false,
      modal = ModalTypes.info
  });
  const props = {
    toggleModal: toggleModal,
    clickHandler: clickHandler,
    isLoader: isLoader,
    resultText: resultText,
    isOpen: isOpen,
    modal : modal
  };
  const buildComponent = () => {
    return shallow(<CustomModalComponent {...props}/>)
  };
  const buildComponentMount = () => {
    return mount(
      <Provider store={store}>
        <Router>
          <CustomModalComponent {...props}/>
        </Router>
      </Provider>)
  };
  return {
    buildComponentMount,
    props,
    buildComponent
  }
};
describe('Component CustomModalComponent', () => {
  start();
  it('renders component', () => {
    const component = start().buildComponent();
    expect(component).toHaveLength(1);
  });
  it('renders correctly', () => {
    const tree = toJson(start().buildComponent());
    expect(tree).toMatchSnapshot();
  });
  it('check isOpen', () => {
    const component = start().buildComponent();
    expect(component.instance().props.isOpen).toBe(start().props.isOpen)
  });
  it('call setBtn', () => {
    const component = start().buildComponent();
    const instance = component.instance() as CustomModalComponent;
    let btn = instance.setBtn();
    expect(btn).toBe(ButtonTypes.info);
    modal = ModalTypes.success;
    component.setProps({modal: modal});
    btn = instance.setBtn();
    expect(btn).toBe(ButtonTypes.success);
    modal = ModalTypes.error;
    component.setProps({modal: modal});
    btn = instance.setBtn();
    expect(btn).toBe(ButtonTypes.error);
    modal = ModalTypes.loading;
    component.setProps({modal: modal});
    btn = instance.setBtn();
    expect(btn).toBe(ButtonTypes.info);
  });
  it('call renderContent', () => {
    const spy = sinon.spy(CustomModalComponent.prototype, 'setBtn');
    const component = start().buildComponent();
    const instance = component.instance() as CustomModalComponent;
    instance.renderContent();
    const resultText = component.find(Motion).dive().find('.modal__title').text();
    expect(spy.called).toEqual(true);
    expect(component.find(Motion)).toHaveLength(1);
    expect(resultText).toEqual(start().props.resultText);
    expect(component.find(Loader)).toHaveLength(0);
    expect(instance.props.isLoader).toBe(start().props.isLoader)
    isLoader = true;
    component.setProps({isLoader: isLoader});
    instance.renderContent();
    expect(component.find(Motion)).toHaveLength(0);
    expect(component.find(Loader)).toHaveLength(1);
    expect(instance.props.isLoader).toBe(start().props.isLoader)
  });
  it('call closeModal', () => {
    const component = start().buildComponent();
    const instance = component.instance() as CustomModalComponent;
    instance.closeModal();
    expect(toggleModal).toHaveBeenCalledWith(false);
    expect(clickHandler).toHaveBeenCalled();
    clickHandler = null;
    component.setProps({clickHandler: clickHandler});
    expect(instance.closeModal()).toBeUndefined();
  });
  it('check close modal', () => {
    const component = start().buildComponent();
    component.find(Motion).dive().find(Button).simulate('click');
    expect(toggleModal).toHaveBeenCalledWith(false);
    expect(clickHandler).toHaveBeenCalled();
  });
});