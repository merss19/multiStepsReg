import * as React from 'react';
import {Field, reduxForm, FormProps} from 'redux-form';
import {Link} from 'react-router-dom';
import {RestoreFormData} from '../../interfaces';
import {Button, ButtonTypes} from 'components/Button';
import InputText from 'components/InputText';
import * as formValidations from 'tools/validations';

interface OwnProps extends FormProps<RestoreFormData, {}, {}> {
  onSubmit: (values: RestoreFormData) => void
}

export class PasswordRestoreForm extends React.PureComponent<OwnProps, {}> {

  render() {
    const {handleSubmit, onSubmit} = this.props;
    return (
      <div className='entry__inner'>
        <div className='entry__header'>
          <h2 className='entry__title text-center'>Восстановление пароля</h2>
        </div>
        <form onSubmit={handleSubmit!(onSubmit)} className='entry__box'>
          <Field name='pass' id='pass' placeholder='Новый пароль' component={InputText}/>
          <Field name='passAgain' id='passAgain' placeholder='Новый пароль повторно' component={InputText}/>

          <Button
            styleBtn={ButtonTypes.info}
            type='submit'
            wide={true}
          >
            Восстановить пароль
          </Button>
          <ul className='entry__link text-center'>
            <li className='entry-nav__item'>
              <Link to='/signup'>Регистрация</Link>
            </li>
          </ul>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'RestoreForm',
  validate: formValidations.validatePasswordRestore
})(PasswordRestoreForm);