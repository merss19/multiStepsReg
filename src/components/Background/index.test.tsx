import {shallow} from 'enzyme';
import Background from './index';
import * as React from 'react';
import toJson from 'enzyme-to-json';
import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Component Background', () => {
	const component = shallow(<Background/>);
	it('renders component', () => {
		expect(component).toHaveLength(1);
	});
	it('renders correctly', () => {
		const tree = toJson(shallow(<Background/>));
		expect(tree).toMatchSnapshot();
	})
});
