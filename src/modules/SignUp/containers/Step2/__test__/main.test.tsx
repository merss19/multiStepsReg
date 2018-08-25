import {shallow, mount} from 'enzyme';
import {StepTwoComponent, StepTwo} from '../main';
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
  setChoosenProgram,
  setPackageType,
  getPackage,
  paymentCreate,
  setPromo,
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
  signUpData,
  dataRes,
  match,
  location,
  callback,
  history;
const start = () => {
  beforeEach(() => {
    changeStep = jest.fn(),
      getPrograms = jest.fn(),
      callback = jest.fn(),
      paymentCreate = jest.fn((payload, callback) => callback())
    setProgramName = jest.fn(),
      setToken = jest.fn(),
      handleSubmit = jest.fn((callback) => callback()),
      toggleModal = jest.fn(),
      setError = jest.fn(),
      setChoosenProgram = jest.fn(() => true),
      setPackageType = jest.fn(),
      getPackage = jest.fn(),
      //paymentCreate = jest.fn(),
      setPromo = jest.fn(),
      isFetching = false,
      isLoad = false,
      isError = false,
      errMsg = 'error',
      step = Steps.one,
      choosenPackageType = 1,
      choosenProgram = 0,
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
    getPrograms: getPrograms,
    userCreate: userCreate,
    handleSubmit: handleSubmit,
    changeStep: changeStep,
    setProgramName: setProgramName,
    setToken: setToken,
    toggleModal: toggleModal,
    setError: setError,
    setChoosenProgram: setChoosenProgram,
    setPackageType: setPackageType,
    getPackage: getPackage,
    paymentCreate: paymentCreate,
    setPromo: setPromo,
    step: step,
    choosenPackageType: choosenPackageType,
    choosenProgram: choosenProgram,
    promo: promo,
    currentPackage: currentPackage,
    packages: packages,
    promoError: promoError,
    errMsg: errMsg,
    programs: programs,
    isFetching: isFetching,
    isLoad: isLoad,
    isError: isError,
    match: match,
    location: location,
    history: history
  };
  const buildComponent = () => {
    return shallow(<StepTwoComponent {...props}/>)
  };
  const buildComponentMount = () => {
    return mount(
      <Provider store={store}>
        <Router>
          <StepTwo {...props}/>
        </Router>
      </Provider>)
  };
  return {
    buildComponentMount,
    props,
    buildComponent
  }
};
describe('Component StepTwo', () => {
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
  it('getPackage', () => {
    expect(getPackage).toHaveBeenCalled()
    expect(setChoosenProgram).toHaveBeenCalledWith(1)
  });
  it('setChoosenProgram do not call', () => {
    choosenProgram = 6;
    component = start().buildComponent();
    //component.setProps({choosenProgram})
    expect(setChoosenProgram).toHaveBeenCalledWith(1)
  });
  it('Test componentWillMount', () => {
    expect(getPrograms).toHaveBeenCalled();
  });
  it('getPromo, promoText === null', () => {
    const component = start().buildComponent();
    const instance = component.instance() as StepTwoComponent;
    instance.getPromo();
    expect(instance.getPromo()).toBeUndefined()
  });
  it('getPromo, promoText !== null', () => {
    const component = start().buildComponent();
    const instance = component.instance() as StepTwoComponent;
    instance.promoText = {
      value: 'test'
    };
    instance.getPromo();
    expect(getPackage).toHaveBeenCalledWith('test', true)
    expect(setPromo).toHaveBeenCalledWith('test')
  });
  it('paymentCreate', () => {
    storage.save('token', 'test');
    const component = start().buildComponent();
    const instance = component.instance() as StepTwoComponent;
    instance.paymentCreate();
    const cb = sinon.spy();
    const payload = {
      authToken: 'test',
      data: {
        program: 0,
        package: 1,
      }
    }
    expect(paymentCreate).toHaveBeenCalled();
    //expect(paymentCreate).toHaveBeenCalledWith(payload, cb);
  });
  describe('Test shouldComponentUpdate', () => {
    it('step', () => {
      const instance = component.instance() as StepTwoComponent;
      step = Steps.two;
      let props = {
        ...start().props,
        step: step
      };
      const shouldUpdate = instance.shouldComponentUpdate(props);
      expect(shouldUpdate).toBe(true)
    });
    it('packages', () => {
      const instance = component.instance() as StepTwoComponent;
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
        }
      ]);
      let props = {
        ...start().props,
        packages: packages
      };
      const shouldUpdate = instance.shouldComponentUpdate(props);
      expect(shouldUpdate).toBe(true)
    });
    it('choosenProgram', () => {
      const instance = component.instance() as StepTwoComponent;
      choosenProgram = 3;
      let props = {
        ...start().props,
        choosenProgram: choosenProgram
      };
      const shouldUpdate = instance.shouldComponentUpdate(props);
      expect(shouldUpdate).toBe(true)
    });
    it('choosenPackageType', () => {
      const instance = component.instance() as StepTwoComponent;
      choosenPackageType = 3;
      let props = {
        ...start().props,
        choosenPackageType: choosenPackageType
      };
      const shouldUpdate = instance.shouldComponentUpdate(props);
      expect(shouldUpdate).toBe(true)
    });
    it('promo', () => {
      const instance = component.instance() as StepTwoComponent;
      promo = 'tele2';
      let props = {
        ...start().props,
        promo: promo
      };
      const shouldUpdate = instance.shouldComponentUpdate(props);
      expect(shouldUpdate).toBe(true)
    });
    it('promoError', () => {
      const instance = component.instance() as StepTwoComponent;
      promoError = 'tele2';
      let props = {
        ...start().props,
        promoError: promoError
      };
      const shouldUpdate = instance.shouldComponentUpdate(props);
      expect(shouldUpdate).toBe(true)
    });
    it('currentPackage', () => {
      const instance = component.instance() as StepTwoComponent;
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
  it('call resultAction', () => {
    const instance = component.instance() as StepTwoComponent;
    instance.resultAction();
    expect(changeStep).toHaveBeenCalledWith(Steps.three);
    expect(parseInt(storage.load('program'))).toBe(choosenProgram);
    storage.remove('program');
  });
  it('call renderPackages', () => {
    const instance = component.instance() as StepTwoComponent;
    //console.log(component.debug())
    const li = component.find('ul').at(1).find('li').at(0);
    li.simulate('click');
    expect(setPackageType).toHaveBeenCalled();
    expect(component.find('ul').at(1).find('li')).toHaveLength(5);

  });
  it('call renderPrograms', () => {
    const instance = component.instance() as StepTwoComponent;
    //console.log(component.debug())
    expect(component.find('ul').at(0).find('li')).toHaveLength(4);
    expect(component.find('.is-active .g-hero').exists()).toBe(true);
    expect(component.find('.is-active .g-mather').exists()).toBe(false);
    expect(component.find('.is-active .g-extreme').exists()).toBe(false);
    expect(component.find('.is-active .g-tomorrow').exists()).toBe(false);
  });
  it('call renderPrograms, is-active - g-mather', () => {
    programs = programs.map(item => {
      if(item.get('id') === 1){
        return item.set('isActive', false)
      }
      if(item.get('id') === 2){
        return item.set('isActive', true)
      }
      return item;
    });
    const component = start().buildComponent();
    const li = component.find('.g-mather');
    li.simulate('click')
    expect(setChoosenProgram).toHaveBeenCalled();
    expect(component.find('.is-active .g-hero').exists()).toBe(false);
    expect(component.find('.is-active .g-mather').exists()).toBe(true);
    expect(component.find('.is-active .g-extreme').exists()).toBe(false);
    expect(component.find('.is-active .g-tomorrow').exists()).toBe(false);
  });
  it('call renderPrograms, is-active - g-extreme', () => {
    programs = programs.map(item => {
      if(item.get('id') === 1){
        return item.set('isActive', false)
      }
      if(item.get('id') === 3){
        return item.set('isActive', true)
      }
      return item;
    });
    const component = start().buildComponent();
    const li = component.find('.g-extreme');
    li.simulate('click')
    expect(setChoosenProgram).toHaveBeenCalled();
    expect(component.find('.is-active .g-hero').exists()).toBe(false);
    expect(component.find('.is-active .g-mather').exists()).toBe(false);
    expect(component.find('.is-active .g-extreme').exists()).toBe(true);
    expect(component.find('.is-active .g-tomorrow').exists()).toBe(false);
  });
  it('call renderPrograms, is-active - g-tomorrow', () => {
    programs = programs.map(item => {
      if(item.get('id') === 1){
        return item.set('isActive', false)
      }
      if(item.get('id') === 4){
        return item.set('isActive', true)
      }
      return item;
    });
    const component = start().buildComponent();
    const li = component.find('.g-tomorrow');
    li.simulate('click')
    expect(setChoosenProgram).toHaveBeenCalled();
    expect(component.find('.is-active .g-hero').exists()).toBe(false);
    expect(component.find('.is-active .g-mather').exists()).toBe(false);
    expect(component.find('.is-active .g-extreme').exists()).toBe(false);
    expect(component.find('.is-active .g-tomorrow').exists()).toBe(true);
  });
  it('call renderPrograms, programs === null', () => {
    programs = null
    const component = start().buildComponent();
    const instance = component.instance() as StepTwoComponent;
    expect(instance.renderPrograms()).toEqual(<div>Нет программ</div>);
  });
  describe('call render()', () => {
    it('call renderHeader', () => {
      const spy = sinon.spy(StepTwoComponent.prototype, 'renderHeader');
      const component = start().buildComponent();
      expect(spy.called).toBe(true);
    });
    it('call renderPackages', () => {
      const spy = sinon.spy(StepTwoComponent.prototype, 'renderPackages');
      const component = start().buildComponent();
      expect(spy.called).toBe(true);
    });
    it('call renderPrograms', () => {
      const spy = sinon.spy(StepTwoComponent.prototype, 'renderPrograms');
      const component = start().buildComponent();
      expect(spy.called).toBe(true);
    });
    it('render currentPackage', () => {
      const component = start().buildComponent();
      const price = component.find('.entry-program-price').text();
      expect(price).toBe(start().props.currentPackage.get('cost') + ' руб');
    });
    it('test input promo', () => {
      // const component = start().buildComponentMount();
      // const instance = component.instance() as StepTwoComponent;
      //const promo = component.find('input[name="promo"]');
      //console.log(component.debug())
      //console.log('promoooo')
      //console.log(component.find('input[name="promo"]').instance())
      //promo.simulate('focus');
      // promo.simulate('change', {target: {value: 'testPromo'}});
      // promo.simulate('blur');
      // console.log(instance.promoText)
      //expect(promo.props().value).toBe('testPromo');
    });
    it('render promo button', () => {
      const button = component.find(Button).at(0)
      expect(button.exists()).toBe(true);
      expect(button.props().type).toBe('button');
      expect(button.props().styleBtn).toBe(ButtonTypes.info);
      expect(button.props().wide).toBe(false);
    });
    it('click promo Button', () => {
      const spy = sinon.spy(StepTwoComponent.prototype, 'getPromo');
      const button = component.find(Button).at(0);
      button.simulate('click');
      expect(spy.called).toBe(true);
    });
    it('render next button', () => {
      const button = component.find(Button).at(1)
      expect(button.exists()).toBe(true);
      expect(button.props().type).toBe('button');
      expect(button.props().styleBtn).toBe(ButtonTypes.success);
      expect(button.props().wide).toBe(true);
    });
    it('click next Button', () => {
      const spy = sinon.spy(StepTwoComponent.prototype, 'paymentCreate');
      const button = component.find(Button).at(1);
      button.simulate('click');
      expect(spy.called).toBe(true);
    });
    it('click Link', () => {
      const spy = sinon.spy(StepTwoComponent.prototype, 'logOut');
      const button = component.find('Link');
      button.simulate('click');
      expect(spy.called).toBe(true);
    });
  })
});


