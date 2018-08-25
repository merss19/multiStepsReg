import * as React from 'react';
import {WrappedFieldProps} from 'redux-form';
import {Link} from 'react-router-dom';

interface OwnProps extends WrappedFieldProps<{}> {
  id: string
  title: string
}

class CheckboxInput extends React.Component<OwnProps, {}> {
  render() {
    const {input, title, id, meta: {touched, error}} = this.props;
    return (
      <div className='checkboxes__item'>
				<span className='checkbox'>
					<label className='checkbox__label' htmlFor={id}>
						<input
        {...input}
        className='checkbox__field'
        checked={input.value}
        id={id}
        type='checkbox'
      />
						<span className='checkbox__ph'>
						<svg className='svg ico-tick'>
							<use xlinkHref='#ico-tick'/>
						</svg>
				 </span>
					<div className='checkbox__group'>
						<span className='checkbox__title'>{title}</span>
							<Link
         target='_blank'
         className='checkbox__link'
         to='http://todayme.ru/dogovor-oferty#.WGFQqrZ95E4'
       >
								оферты
							</Link>
							<span className='checkbox__divider'>и</span>
							<Link
         target='_blank'
         className='checkbox__link'
         to='https://todayme.ru/rules.pdf'
       >
								правил
							</Link>
					</div>
				</label>
				</span>
        {touched && error && <span className='checkbox__error'>{error}</span>}
      </div>

    )
  }
}

export default CheckboxInput;