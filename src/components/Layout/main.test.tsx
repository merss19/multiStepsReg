import {shallow, mount} from 'enzyme'
import Layout from './main'
import * as React from 'react'
import toJson from 'enzyme-to-json'
import Background from '../Background'
import LogoLink from '../LogoLink'
import * as sinon from 'sinon'
import {configure} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import {Loader} from '../Loader/index';
import {Header} from '../Header/main';

configure({adapter: new Adapter()});
/*process.env.NODE_ENV = 'test'*/
let notLogo;
let type;
const start = () => {
  beforeEach(() => {
    notLogo = false;
    type = 'signUp';
  });
  const props = {
    notLogo: notLogo,
    type: type
  };
  const buildComponent = () => {
    return shallow(<Layout {...props}><Loader /></Layout>)
  };
  return {
    props,
    buildComponent
  }
};
describe('Component Layout', () => {
  it('renders component', () => {
    const component = start().buildComponent();
    expect(component).toHaveLength(1);
  });
  it('renders correctly', () => {
    const tree = toJson(start().buildComponent());
    expect(tree).toMatchSnapshot();
  });
  it('check prop notLogo', () => {
    const component = start().buildComponent();
    expect(component.find('.entry-header').exists()).toBe(true);
    expect(component.find(LogoLink).exists()).toBe(true);
    notLogo = true;
    component.setProps({notLogo: notLogo});
    expect(component.find('.entry-header').exists()).toBe(false);
    expect(component.find(LogoLink).exists()).toBe(false);
    notLogo = undefined;
    component.setProps({notLogo: notLogo});
    expect(component.find('.entry-header').exists()).toBe(true);
    expect(component.find(LogoLink).exists()).toBe(true);
  });
  it('renders the Background', () => {
    const component = start().buildComponent();
    expect(component.find(Background).exists()).toBe(true);
  });
  it('render children component', () => {
    const component = start().buildComponent();
    expect(component.find(Loader).exists()).toBe(true);
  });
  it('render Header', () => {
    type = 'main';
    const component = start().buildComponent();
    expect(component.find(Header).exists()).toBe(true);
  });
  it('call svgInject', () => {
    const spy = sinon.spy(Layout.prototype, 'svgInject');
    const component = start().buildComponent();
    expect(spy.calledOnce).toEqual(true);
  });
});
/*
describe('Component Layout DOM', () => {
	const component = mount(<Layout>
		<div>test</div>
	</Layout>)
	it('children component defined', () => {
		expect(component.props().children).toBeDefined()
	})
	it('do not render logo', () => {
		const component = mount(<Layout notLogo={true} />)
		expect(component.find(LogoLink).exists()).toBe(false)
	})
	it('calls componentDidMount', () => {
		const spy = sinon.spy(Layout.prototype, 'componentDidMount')
		const wrapper = mount(<Layout />)
		expect(spy.calledOnce).toEqual(true)
	})
/!*	it('calls svjInject', () => {
		const spy = sinon.spy(Layout.prototype, 'svgInject')
		const wrapper = mount(<Layout />)
		expect(spy.calledOnce).toEqual(true)
	})*!/
})*/
