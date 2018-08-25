import * as React from 'react';
import { Link } from 'react-router-dom';
import {Button, ButtonTypes} from 'components/Button';
import {storage} from 'tools/storage'
import {RouteProps} from 'react-router';
import {Header} from 'components/Header';
import {LayoutHOC} from 'components/HOC/LayoutHOC';

class PageProfile extends React.Component<RouteProps, {}> {

	render() {
		return (
			<Header />
		);
	}
}

export default LayoutHOC({type: 'main'})(PageProfile);