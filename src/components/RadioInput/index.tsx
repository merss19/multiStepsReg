import * as React from 'react';
import { WrappedFieldProps } from 'redux-form';
import * as classNames from 'classnames';

interface OwnProps extends WrappedFieldProps<{}> {
  name: string
  title: string
  value: string
}

class RadioInput extends React.Component<OwnProps, {}> {
  render() {
    const {input, title, name, value, meta: {touched, error}} = this.props;
    return (
      <span className={classNames('radio', {'input--error': touched && !!error})}>
        <label
          className='radio__label'
          htmlFor={value}>
          <input
            {...input}
            className='radio__field'
            id={value}
            type='radio'
            name={name}
          />
          <span className='radio__ph'/>
          <span>{title}</span>
        </label>
        {touched && error && <p className='input__alert'>{error}</p>}
			   </span>
    );
  }
}

export default RadioInput;