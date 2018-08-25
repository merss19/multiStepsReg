import {shallow} from 'enzyme';
import {Loader} from './index';
import * as React from 'react';
import toJson from 'enzyme-to-json';
import {configure} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});
let text;
let isError;
const start = () => {
  beforeEach(() => {
    text = 'Подождите',
      isError = false
  });
  const props = {
    text: text,
    isError: isError
  };
  const buildComponent = () => {
    return shallow(<Loader {...props}/>)
  };
  return {
    props,
    buildComponent
  }
};
describe('Component Loader', () => {
  it('renders component', () => {
    const component = start().buildComponent();
    expect(component).toHaveLength(1);
  });
  it('renders correctly', () => {
    const tree = toJson(start().buildComponent());
    expect(tree).toMatchSnapshot();
  });
  it('render loader', () => {
    const component = start().buildComponent();
    expect(component.find('.loader')).toHaveLength(1);
    expect(component.find('.loading__desc')).toHaveLength(0);
  });
  it('render text', () => {
    isError = true;
    const component = start().buildComponent();
    expect(component.find('h2').text()).toEqual(start().props.text);
    expect(component.find('.loading__desc')).toHaveLength(1);
    expect(component.find('.loader')).toHaveLength(0);
    text = undefined;
    component.setProps({text: text});
    expect(component.find('h2').text()).toEqual('Загружается');
  });
});
