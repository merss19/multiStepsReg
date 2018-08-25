import {shallow, mount} from 'enzyme';
import {StepThreeComponent, StepThree} from '../main';
import * as React from 'react';
import toJson from 'enzyme-to-json';
import * as sinon from 'sinon';
import {Provider} from 'react-redux';
import configureStore from '../../../../../store';
import {BrowserRouter as Router, Link} from 'react-router-dom';
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
  handleSubmit,
  setToken,
  toggleModal,
  setPackageType,
  authToken,
  payInfo,
  paymentInfo,
  paymentManual,
  setError,
  isFetching,
  isLoad,
  isError,
  step,
  errMsg,
  programs,
  choosenPackageType,
  choosenProgram,
  packages,
  currentPackage,
  promo,
  promoError,
  match,
  location,
  callback,
  history;
const start = () => {
  beforeEach(() => {
    changeStep = jest.fn(),
    callback = jest.fn(),
    paymentManual = jest.fn((payload, callback) => callback())
    setToken = jest.fn(),
    handleSubmit = jest.fn((callback) => callback()),
    toggleModal = jest.fn(),
    setError = jest.fn(),
    paymentInfo = jest.fn(),
    authToken = 'test',
    payInfo = Immutable.fromJS({
      txId: 'qweqwe',
      isPaid: true,
      amount: 3000
    }),
    isFetching = false,
    isLoad = false,
    isError = false,
    errMsg = 'error',
    step = Steps.one,
    packages = Immutable.fromJS([
        {
          name: '1 человек',
          isActive: false,
          id: 1
        },
        {
          name: '2 человек',
          isActive: false,
          id: 2
        },
        {
          name: '1 ЧЕЛОВЕК + ФИТНЕС-БРАСЛЕТ',
          isActive: false,
          id: 3
        },
        {
          name: '1 ЧЕЛОВЕК + КОВРИК',
          isActive: false,
          id: 4
        },
        {
          name: '3 человек',
          isActive: false,
          id: 5
        },
      ]) ,
      currentPackage = Immutable.fromJS({
        cost: 3000,
        name: '1 человек',
        isActive: true,
        id: 1
      }),
      promo = '',
      promoError = '',
      programs = Immutable.fromJS(data),
      /*signUpData = {
        email: 'mail@mail.ru',
        password: 'qweqwe',
        passwordAgain: 'qweqwe',
        gender: 'male',
      },*/
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
    handleSubmit: handleSubmit,
    changeStep: changeStep,
    paymentInfo: paymentInfo,
    paymentManual: paymentManual,
    toggleModal: toggleModal,
    setError: setError,
    authToken: authToken,
    payInfo: payInfo,
    setPackageType: setPackageType,
    step: step,
    choosenPackageType: choosenPackageType,
    choosenProgram: choosenProgram,
    currentPackage: currentPackage,
    errMsg: errMsg,
    isFetching: isFetching,
    isLoad: isLoad,
    isError: isError,
    match: match,
    location: location,
    history: history
  };
  const buildComponent = () => {
    return shallow(<StepThreeComponent {...props}/>)
  };
  const buildComponentMount = () => {
    return mount(
      <Provider store={store}>
        <Router>
          <StepThree {...props}/>
        </Router>
      </Provider>)
  };
  return {
    buildComponentMount,
    props,
    buildComponent
  }
};
describe('Component StepThree', () => {
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
  it('call paymentInfo', () => {
    component = start().buildComponent();
    expect(paymentInfo).toHaveBeenCalled()
  });
  it('call payManual', () => {
    const component = start().buildComponent();
    const instance = component.instance() as StepThreeComponent;
    instance.payManual();
    expect(paymentManual).toHaveBeenCalled();
    //expect(paymentCreate).toHaveBeenCalledWith(payload, cb);
  });
  it('call back', () => {
    const component = start().buildComponent();
    const instance = component.instance() as StepThreeComponent;
    const e = {
      preventDefault: () => true
    }
    instance.back(e);
    expect(changeStep).toHaveBeenCalledWith(Steps.two);
  });
  describe('Call renderContent', () => {
    it('amount !== 0, isPaid === true', () => {
      const component = start().buildComponent();
      expect(component.find('.entry-ico-box__title').text()).toBe('Оплачен!')
      expect(component.find(Button).exists()).toBe(true)
    });
    it('amount !== 0, isPaid === false', () => {
      payInfo = Immutable.fromJS({
        txId: 'qweqwe',
        isPaid: false,
        amount: 3000
      });
      const component = start().buildComponent();
      expect(component.find('.form-pay')).toHaveLength(2);
      expect(component.find('.entry-nav')).toHaveLength(2);
      expect(component.find(Button).exists()).toBe(false)
    });
    it('amount === 0', () => {
      payInfo = Immutable.fromJS({
        txId: 'qweqwe',
        isPaid: false,
        amount: 0
      });
      const component = start().buildComponent();
      console.log('step333')
      console.log(component.find('.entry-ico-box__img').prop('src'))
      expect(component.find('.entry-ico-box__title').text()).toBe('Халява!')
      //expect(component.find('.entry-nav')).toHaveLength(2);
      expect(component.find('.entry-ico-box__title').text()).toBe('Халява!')
      expect(component.find(Button).exists()).toBe(true)
      expect(component.find('.entry-ico-box__img').prop('src')).toBe('/assets/img/svg/ico-freebie.svg')
    });
  });
  it('call renderPrice, isPaid === true', () => {
    const component = start().buildComponent();
    const instance = component.instance() as StepThreeComponent;
    instance.renderPrice();
    expect(component.find('.entry-program-price')).toHaveLength(0);
  });
  it('call renderPrice, isPaid === false', () => {
    payInfo = Immutable.fromJS({
      txId: 'qweqwe',
      isPaid: false,
      amount: 3000
    });
    const component = start().buildComponent();
    const instance = component.instance() as StepThreeComponent;
    instance.renderPrice();
    expect(component.find('.entry-program-price')).toHaveLength(1);
    expect(component.find('.entry-program-price').text()).toBe(start().props.payInfo.get('amount') + ' руб.');
  });
  it('click back', () => {
    payInfo = Immutable.fromJS({
      txId: 'qweqwe',
      isPaid: false,
      amount: 3000
    });
    const component = start().buildComponent();
    const spy = sinon.spy(StepThreeComponent.prototype, 'back');
    const button = component.find('.entry-nav').at(0).find('.entry-nav__link');
    button.simulate('click');
    expect(spy.called).toBe(true);
  });
  it('click logOut', () => {
    payInfo = Immutable.fromJS({
      txId: 'qweqwe',
      isPaid: false,
      amount: 3000
    });
    const component = start().buildComponent();
    const spy = sinon.spy(StepThreeComponent.prototype, 'logOut');
    const button = component.find('.entry-nav').at(1).find(Link);
    button.simulate('click');
    expect(spy.called).toBe(true);
  });
  it('click payManual', () => {
    payInfo = Immutable.fromJS({
      txId: 'qweqwe',
      isPaid: false,
      amount: 0
    });
    const component = start().buildComponent();
    const spy = sinon.spy(StepThreeComponent.prototype, 'payManual');
    const button = component.find(Button);
    button.simulate('click');
    expect(spy.called).toBe(true);
  });
  describe('Test shouldComponentUpdate', () => {
    it('step', () => {
      const instance = component.instance() as StepThreeComponent;
      step = Steps.three;
      let props = {
        ...start().props,
        step: step
      };
      const shouldUpdate = instance.shouldComponentUpdate(props);
      expect(shouldUpdate).toBe(true)
    });
    it('authToken', () => {
      const instance = component.instance() as StepThreeComponent;
      authToken = 'qwerty';
      let props = {
        ...start().props,
        authToken: authToken
      };
      const shouldUpdate = instance.shouldComponentUpdate(props);
      expect(shouldUpdate).toBe(true)
    });
    it('payInfo', () => {
      const instance = component.instance() as StepThreeComponent;
      payInfo = {
        txId: 'qweqwe',
        test: {}
      };
      let props = {
        ...start().props,
        payInfo: payInfo
      };
      const shouldUpdate = instance.shouldComponentUpdate(props);
      expect(shouldUpdate).toBe(true)
    });
    it('choosenProgram', () => {
      const instance = component.instance() as StepThreeComponent;
      choosenProgram = 3;
      let props = {
        ...start().props,
        choosenProgram: choosenProgram
      };
      const shouldUpdate = instance.shouldComponentUpdate(props);
      expect(shouldUpdate).toBe(true)
    });
    it('currentPackage', () => {
      const instance = component.instance() as StepThreeComponent;
      currentPackage = Immutable.fromJS({
        name: '2 человек',
        isActive: true,
        id: 2
      });
      let props = {
        ...start().props,
        currentPackage: currentPackage
      };
      const shouldUpdate = instance.shouldComponentUpdate(props);
      expect(shouldUpdate).toBe(true)
    });
  });
});


