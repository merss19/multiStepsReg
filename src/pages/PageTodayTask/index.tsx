import * as React from 'react';
import { Link } from 'react-router-dom';
import {Button, ButtonTypes} from 'components/Button';
import {storage} from 'tools/storage'
import {RouteProps, withRouter} from 'react-router';
import {Header} from "components/Header/main";
import {LayoutHOC} from "components/HOC/LayoutHOC";

interface OwnProps extends RouteProps{}
class PageTodayTask extends React.Component<{}, {}> {

	render() {
		return (
    <Header />
		);
	}
}

export default LayoutHOC({type: 'main'})(withRouter(PageTodayTask));