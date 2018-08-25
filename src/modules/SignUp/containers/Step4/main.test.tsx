import {shallow, mount} from 'enzyme';
import {StepFour} from './main';
import * as React from 'react';
import toJson from 'enzyme-to-json';
import * as sinon from 'sinon';
import {Provider} from 'react-redux';
import configureStore from '../../../../store';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import {configure} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import {storage} from '../../../../tools/storage/index';
import {Steps} from '../../const';
import {Button, ButtonTypes} from "../../../../components/Button/button";
import * as Immutable from 'immutable';

const store = configureStore();
configure({adapter: new Adapter()});

let
  match,
  location,
  changeStep,
  history;
const start = () => {
  beforeEach(() => {
    changeStep = jest.fn(),
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
    match: match,
    changeStep: changeStep,
    location: location,
    history: history
  };
  const buildComponent = () => {
    return shallow(<StepFour {...props}/>)
  };
  const buildComponentMount = () => {
    return mount(
      <Provider store={store}>
        <Router>
          <StepFour {...props}/>
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
  it('click Link', () => {
    const spy = sinon.spy(StepFour.prototype, 'logOut');
    const button = component.find('Link');
    button.simulate('click');
    expect(spy.called).toBe(true);
  });
});


