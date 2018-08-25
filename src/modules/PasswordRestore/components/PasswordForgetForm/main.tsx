import * as React from 'react';
import {Field, reduxForm, FormProps} from 'redux-form';
import {Link} from 'react-router-dom';
import {PasswordFormData} from '../../interfaces';
import {Button, ButtonTypes} from 'components/Button';
import InputText from 'components/InputText';
import * as formValidations from 'tools/validations';

interface OwnProps extends FormProps<PasswordFormData, {}, {}> {
  onSubmit: (values: PasswordFormData) => void
}

export class PasswordForgetForm extends React.PureComponent<OwnProps, {}> {

  render() {
    const {handleSubmit, onSubmit} = this.props;
    return (
      <div className='entry__inner'>
        <div className='entry__header'>
          <h2 className='entry__title text-center'>Восстановление пароля</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='entry__box'>
          <Field
            name='email'
            id='email'
            placeholder='Ваш email'
            component={InputText}
          />
          <Button
            styleBtn={ButtonTypes.success}
            type='submit'
            wide={true}
          >
            Восстановить пароль
          </Button>
          <ul className='entry__link text-center'>
            <li className='entry-nav__item'>
              <Link to='/'>Вход в кабинет</Link>
            </li>
          </ul>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'PasswordForm',
  validate: formValidations.validateForgetPassword
})(PasswordForgetForm);