import {shallow} from 'enzyme';
import {Header} from './main';
import * as React from 'react';
import toJson from 'enzyme-to-json';
import {configure} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import {Button} from "../Button/button";
import * as sinon from 'sinon';
import {storage} from "../../tools/storage/index";
import {Link} from "react-router-dom";

configure({adapter: new Adapter()});

const start = () => {

  const buildComponent = () => {
    return shallow(<Header />)
  };
  return {
    buildComponent
  }
};
describe('Component Header', () => {
  it('renders component', () => {
    const component = start().buildComponent();
    expect(component).toHaveLength(1);
  });
  it('renders correctly', () => {
    const tree = toJson(start().buildComponent());
    expect(tree).toMatchSnapshot();
  });
  it('render Button', () => {
    const component = start().buildComponent();
    expect(component.find(Button)).toHaveLength(1);
  });
  it('click Button', () => {
    const spy = sinon.spy(Header.prototype, 'logOut');
    const component = start().buildComponent();
    const button = component.find(Link);
    button.simulate('click');
    expect(spy.called).toBe(true);
  });
  it('call logOut', () => {
    storage.save('token', 'test');
    storage.save('promoName', 'tele2');
    storage.save('program', 'hero');
    storage.saveState('auth', 'sdfsdf');
    const component = start().buildComponent();
    const instance = component.instance() as Header;
    instance.logOut();
    expect(storage.load('token')).toBeUndefined();
    expect(storage.load('program')).toBeUndefined();
    expect(storage.load('promoName')).toBeUndefined();
    expect(storage.loadState('auth')).toBeUndefined();
  });
});
