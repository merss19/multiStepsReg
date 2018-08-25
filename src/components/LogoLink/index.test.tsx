import {shallow, mount} from 'enzyme';
import LogoLink from './index';
import * as React from 'react';
import toJson from 'enzyme-to-json';
import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import {storage} from '../../tools/storage';

configure({ adapter: new Adapter() });
storage.save('token', 'testToken',
	{ path: '/', maxAge: 60 * 60 * 24 * 365 * 10});
describe('Component Loader', () => {
	const component = shallow(<LogoLink />);
	it('renders component', () => {
		expect(component).toHaveLength(1);
	});
	it('renders correctly', () => {
		const tree = toJson(shallow(<LogoLink />));
		expect(tree).toMatchSnapshot();
	});
	it('simulate click', () => {
		const token = storage.load('token');
		expect(token).toBe('testToken');
		component.find('Link').simulate('click');
		const tokenRemove = storage.load('token');
		expect(tokenRemove).toBe(undefined);
	});
});