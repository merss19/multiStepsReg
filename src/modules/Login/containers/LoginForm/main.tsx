import * as React from 'react';
import {Field, FormProps, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import InputText from 'components/InputText';
import {Button, ButtonTypes} from 'components/Button/';
import * as formValidations from 'tools/validations';

interface LoginFormData {
  email: string
  password: string
}

interface OwnProps extends FormProps<LoginFormData, {}, {}> {
  onSubmit: (values: LoginFormData) => void
}

export class LoginForm extends React.PureComponent<OwnProps, {}> {
  render() {
    const {handleSubmit, onSubmit} = this.props;
    return (
      <div className='entry entry--min'>
        <div className='entry__inner'>

          <div className='entry__header'>
            <h2 className='entry__title text-center'>Вход в Личный кабинет</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className='entry__box'>
            <Field name='email'
                   placeholder='Ваш e-mail'
                   type='email'
                   component={InputText}
            />
            <Field name='password'
                   placeholder='Ваш пароль'
                   type='password'
                   component={InputText}
            />

            <Button
              type='submit'
              styleBtn={ButtonTypes.info}
              wide={true}
            >
              Войти
            </Button>

            <ul className='entry-nav mtb20'>
              <li className='entry-nav__item'>
                <Link to='/signup'>Регистрация</Link>
              </li>
              <li className='entry-nav__item'>
                <Link to='/restore'>Забыли пароль?</Link>
              </li>
            </ul>

          </form>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'LoginFormm',
  validate: formValidations.validateLogin
})(LoginForm);
