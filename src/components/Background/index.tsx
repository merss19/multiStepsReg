import * as React from 'react';
import {bg} from './data';

const Background: React.SFC<{}> = () => {
		return (
			<div className='entry__bg'>
				{bg}
			</div>
		)
};

export default Background;