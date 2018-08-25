import * as React from 'react';
import {connect} from 'react-redux';
import {Field, FormProps, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {setError, userCreate, moduleName, subModuleName} from './ducks';
import {asyncValidate} from './api';
import InputText from 'components/InputText';
import RadioInput from 'components/RadioInput';
import CheckboxInput from 'components/CheckboxInput';
import {SignUpFormData} from '../../interfaces';
import {Button, ButtonTypes} from 'components/Button';
import {storage} from 'tools/storage';
import {Steps} from '../../const';
import CustomSteps, {CustomStepsProps} from '../CustomSteps';
import {toggleModal} from "modules/CustomModal";
import {setToken} from 'modules/Login/ducks'
import * as formValidations from 'tools/validations'
import {modalHOC} from "components/HOC/ModalHOC";

interface OwnProps extends CustomStepsProps, FormProps<{}, {}, {}> {
  changeStep: (data: Steps) => void
  step: Steps
}

type ConnectedState = {
  isFetching: boolean
  isError: boolean
  errMsg: string
}
type ConnectedDispatch = {
  getPrograms(): void
  setToken(token: string): void
  toggleModal(data: boolean): void
  setError(data: boolean): any
  userCreate(data: SignUpFormData, cb: (data: any) => void): any
}

type Props = OwnProps & ConnectedDispatch;

export class StepOneComponent extends CustomSteps<Props> {

  shouldComponentUpdate(nextProps: Props) {
    return (
      nextProps.step !== this.props.step
    );
  }

  onSubmit(data: SignUpFormData) {
    this.props.userCreate(data, (data) => this.resultAction(data));
  }

  resultAction(data: any): void {
    const {changeStep, setToken} = this.props;
    if (data && data.authToken) {
      setToken(data.authToken);
      storage.save('token', data.authToken,
        {path: '/', maxAge: 60 * 60 * 24 * 365 * 10});
      storage.save('promoName', data.promoName,
        {path: '/', maxAge: 60 * 60 * 24 * 365 * 10});
      changeStep(Steps.two);
    }
  }

  render() {
    const {handleSubmit} = this.props;
    return (
      <div>
        {this.renderHeader()}
        <form className='entry__box' onSubmit={handleSubmit((data: any) => this.onSubmit(data))}>
          <Field
            name='email'
            placeholder='Ваш e-mail'
            type='text'
            component={InputText}
          />
          <Field
            name='password'
            placeholder='Ваш пароль'
            type='password'
            component={InputText}
          />
          <Field
            name='passwordAgain'
            placeholder='Пароль повторно'
            type='password'
            component={InputText}
          />

          <div className='gender'>
            <div className='gender__group'>
              <p className='gender__title'>Ваш пол:</p>
              <Field
                name='gender'
                id='male'
                value='male'
                type='radio'
                title='Мужчина'
                validate={formValidations.validateGender}
                component={RadioInput}
              />
              <Field
                name='gender'
                id='female'
                value='female'
                type='radio'
                title='Женщина'
                validate={formValidations.validateGender}
                component={RadioInput}
              />
            </div>
            <hr className='gender__hr'/>
          </div>

          <div className='checkboxes'>
            <Field
              name='accept'
              title='Принять условия '
              id='accept'
              component={CheckboxInput}/>
          </div>

          <Button
            type='submit'
            styleBtn={ButtonTypes.info}
            wide={true}
          >
            Зарегистрироваться
          </Button>


          <div className='entry__link text-center mtb20'>
            <div className='entry-nav__item'>
              <Link to='/'>Войти</Link>
            </div>
            <div className='entry-nav__item'>
              <Link to='/restore'>Забыли пароль?</Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export const StepOne = connect(null, {
  toggleModal,
  setError,
  userCreate,
  setToken
})(StepOneComponent);

export default modalHOC(reduxForm({
  form: 'StepOne',
  validate: formValidations.validateSignUp,
  asyncValidate,
  asyncBlurFields: ['email']
})(StepOne), moduleName, subModuleName);