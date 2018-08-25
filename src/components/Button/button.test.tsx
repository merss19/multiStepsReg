import {shallow, mount} from 'enzyme';
import {Button, ButtonTypes} from './index';
import * as React from 'react';
import toJson from 'enzyme-to-json';
import * as sinon from 'sinon';
import {configure} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

let styleBtn;
let onClick;
let type;
let wide;
let prefix;
const start = () => {
  beforeEach(() => {
    styleBtn = ButtonTypes.error,
    onClick = jest.fn(),
    type = 'submit',
    wide = true,
    prefix = 'btn-group'
  });
  const props = {
    styleBtn: styleBtn,
    onClick: onClick,
    type: type,
    wide: wide,
    prefix: prefix
  };
  const buildComponent = () => {
    return shallow(<Button {...props}>Продолжить</Button>)
  };
  return {
    props,
    buildComponent
  }
};
describe('Component Button', () => {
  it('renders component', () => {
    const component = start().buildComponent();
    expect(component).toHaveLength(1);
  });
  it('renders correctly', () => {
    const tree = toJson(start().buildComponent());
    expect(tree).toMatchSnapshot();
  })
});
describe('Component Button render props', () => {
  it('render prefix(main class)', () => {
    const component = start().buildComponent();
    expect(component.find('.' + start().props.prefix)).toHaveLength(1);
  });
  it('render styleBtn class', () => {
    const component = start().buildComponent();
    expect(component.find('.' + start().props.prefix + '--' + start().props.styleBtn)).toHaveLength(1);
  });
  it('render type', () => {
    const component = start().buildComponent();
    expect(component.props().type).toEqual('submit');
  });
  it('render wide', () => {
    const component = start().buildComponent();
    expect(component.find('.wide')).toHaveLength(1);
  });
  it('render children', () => {
    const component = start().buildComponent();
    expect(component.props().children).toEqual('Продолжить');
  });
  it('simulate click', () => {
    //const onButtonClick = sinon.spy();
    const component = start().buildComponent();
    component.find('button').simulate('click');
    expect(onClick).toHaveBeenCalled();
  });
  it('check defaultProps', () => {
      styleBtn = undefined;
      type = undefined;
      wide = undefined;
      prefix = undefined;
    const component = start().buildComponent();
    expect(component.find('.btn')).toHaveLength(1);
    expect(component.props().type).toEqual('button');
    expect(component.find('.wide')).toHaveLength(0);
    expect(component.find('.btn' + '--' + ButtonTypes.info)).toHaveLength(1);
  });
  it('check ButtonTypes', () => {
    prefix = 'btn';
    const component = start().buildComponent();
    console.log(component.debug());
    expect(component.find('.btn--error').exists()).toEqual(true);
    styleBtn = ButtonTypes.info;
    component.setProps({styleBtn: styleBtn});
    expect(component.find('.btn--secondary').exists()).toEqual(true);
    styleBtn = ButtonTypes.success;
    component.setProps({styleBtn: styleBtn});
    expect(component.find('.btn--primary').exists()).toEqual(true);
  });
});

