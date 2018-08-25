import {shallow, mount} from 'enzyme';
import RadioInput from './index';
import * as React from 'react';
import toJson from 'enzyme-to-json';
import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

let props = {
	name: 'gender',
	id: 'gender1',
	title: 'Мужчина',
		value: 'male',
	meta: {
		touched: true,
		error: 'Пол должен быть заполнен',
		asyncValidating: false,
		autofilled: false,
		invalid: false,
		pristine: false,
		dirty: false,
		dispatch: (fn: any) => fn,
		valid: false
	},
};
describe('Component RadioInput', () => {
	const component = shallow(<RadioInput {...props}/>);
	it('renders component', () => {
		expect(component).toHaveLength(1);
	});
	it('renders correctly', () => {
		const tree = toJson(shallow(<RadioInput {...props}/>));
		expect(tree).toMatchSnapshot();
	})
});

describe('Component RadioInput DOM', () => {
	const component = mount(<RadioInput {...props}/>);
	describe('render props', () => {
		it('render name', () => {
			expect(component.props().name).toBe(props.name);
		});
		it('render id', () => {
			expect(component.props().id).toBe(props.id);
		});
		it('render title', () => {
			expect(component.props().title).toBe(props.title);
		});
		it('do not calls setRadioError, touched = false', () => {
			let props2 = {
				name: 'gender',
				id: 'gender1',
				title: 'Мужчина',
				setRadioError: jest.fn(),
				removeRadioError: jest.fn(),
				meta: {
					touched: false,
					error: 'Пол должен быть заполнен',
					asyncValidating: false,
					autofilled: false,
					invalid: false,
					pristine: false,
					dirty: false,
					dispatch: (fn: any) => fn,
					valid: false
				},
			};
			component.setProps({props2});
			expect(props2.setRadioError).not.toHaveBeenCalled();
		});
		it('calls removeRadioError, error = ""', () => {
			let props3 = {
				name: 'gender',
				id: 'gender1',
				title: 'Мужчина',
				setRadioError: jest.fn(),
				removeRadioError: jest.fn(),
				meta: {
					touched: true,
					error: '',
					asyncValidating: false,
					autofilled: false,
					invalid: false,
					pristine: false,
					dirty: false,
					dispatch: (fn: any) => fn,
					valid: false
				},
			};
			component.setProps({ props3});
			expect(props3.removeRadioError).not.toHaveBeenCalled();
			expect(props3.setRadioError).not.toHaveBeenCalled();
		})
	})
});
