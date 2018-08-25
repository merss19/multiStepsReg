import {shallow} from 'enzyme';
import {NoMatch} from './index';
import * as React from 'react';
import toJson from 'enzyme-to-json';
import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Component Loader', () => {
	const component = shallow(<NoMatch />);
	it('renders component', () => {
		expect(component).toHaveLength(1);
	});
	it('renders correctly', () => {
		const tree = toJson(shallow(<NoMatch />));
		expect(tree).toMatchSnapshot();
	});
});
