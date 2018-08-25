import {shallow} from 'enzyme';
import CheckboxInput from './index';
import * as React from 'react';
import toJson from 'enzyme-to-json';

import {configure} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

let props = {
  id: 'offert',
  title: 'Оферта',
  meta: {
    touched: true,
    error: 'Email должен быть заполнен',
    asyncValidating: false,
    autofilled: false,
    invalid: false,
    pristine: false,
    dirty: false,
    dispatch: (fn: any) => fn,
    valid: false
  },
};
let id;
let title;
let touched;
let value;
const start = () => {
  beforeEach(() => {
    id = 'offert',
    title = 'Оферта',
    touched = false,
    value = ''
  });
  const props = {
    id: id,
    title: title,
    input: {
      name: 'accept',
      onBlur:jest.fn(),
      onChange:jest.fn(),
      onDragStart:jest.fn(),
      onDrop:jest.fn(),
      onFocus:jest.fn(),
      value: value
    },
    meta: {
      touched: touched,
      error: 'Email должен быть заполнен',
      asyncValidating: false,
      autofilled: false,
      invalid: false,
      pristine: false,
      dirty: false,
      dispatch: (fn: any) => fn,
      valid: false
    }
  };
  const buildComponent = () => {
    return shallow(<CheckboxInput {...props} />)
  };
  return {
    props,
    buildComponent
  }
};
describe('Component CheckboxInput', () => {
  it('renders component', () => {
    const component = start().buildComponent();
    expect(component).toHaveLength(1);
  });
  it('renders correctly', () => {
    const tree = toJson(start().buildComponent());
    expect(tree).toMatchSnapshot();
  });
  it('renders title', () => {
    const component = start().buildComponent();
    expect(component.find('.checkbox__title').text()).toBe(start().props.title);
    expect(component.find('.checkbox__error').exists()).toBe(false);
  });
  it('renders id', () => {
    const component = start().buildComponent();
    expect(component.find('.checkbox__label').props().htmlFor).toBe(start().props.id);
    expect(component.find('.checkbox__field').props().id).toBe(start().props.id);
  });
  describe('Render error', () => {
    it('render error', () => {
      touched= true;
      const component = start().buildComponent();
      expect(component.find('.checkbox__error').exists()).toBe(true);
      expect(component.find('.checkbox__error').text()).toEqual(start().props.meta.error);
    });
  });
});