import {shallow} from 'enzyme'
import {PasswordForgetForm} from './main'
import * as React from 'react'
import toJson from 'enzyme-to-json'
import {Button} from '../../../../components/Button';
import {configure} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

let onSubmit;
let handleSubmit;
const start = () => {
  beforeEach(() => {
    onSubmit = jest.fn(),
    handleSubmit = jest.fn()
  });
  const props = {
    onSubmit: onSubmit,
    handleSubmit: handleSubmit
  };
  const buildComponent = () => {
    return shallow(<PasswordForgetForm {...props}/>)
  };
  return {
    buildComponent,
    props
  }
};
describe('Component PasswordForgetForm', () => {
  start();
  it('renders component', () => {
    const component = start().buildComponent();
    expect(component).toHaveLength(1);
  });
  it('renders correctly', () => {
    const component = start().buildComponent();
    const tree = toJson(start().buildComponent());
    expect(tree).toMatchSnapshot();
  });
  it('pass prop onSubmit', () => {
    const component = start().buildComponent();
    expect(component.instance().props.onSubmit).toBe(start().props.onSubmit)
  });
  it('call handleSubmit', () => {
    const component = start().buildComponent();
    component.find(Button).simulate('click');
    expect(start().props.handleSubmit).toHaveBeenCalledWith(start().props.onSubmit)
  })
});


