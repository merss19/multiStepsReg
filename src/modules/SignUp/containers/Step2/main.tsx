import * as React from 'react';
import {connect} from 'react-redux';
import {FormProps} from 'redux-form';
import CustomSteps, {CustomStepsProps} from '../CustomSteps';
import {Link} from 'react-router-dom';
import * as classNames from 'classnames';
import {storage} from 'tools/storage';
import {Steps, ProgramNum} from '../../const';
import {Program} from '../../interfaces';
import {Payment} from '../../interfaces';
import {Button, ButtonTypes} from 'components/Button';
import {toggleModal} from 'modules/CustomModal';
import {modalHOC} from 'components/HOC/ModalHOC';
import {
  setChoosenProgram,
  setPackageType,
  getPackage,
  getPrograms,
  setPromo,
  paymentCreate,
  moduleName,
  subModuleName
} from './ducks';
import {
  selectChoosenProgram,
  selectPromoError,
  selectPackageType,
  selectPackages,
  selectPrograms,
  selectPromo,
  selectPackage
} from '../../selectors';

interface OwnProps extends CustomStepsProps, FormProps<{}, {}, {}> {
  changeStep: (data: number) => void
  step: Steps
}

type ConnectedState = {
  choosenPackageType: number
  choosenProgram?: number
  packages: any
  currentPackage: any
  promo: string
  programs: Program[]
  promoError: string
}

type ConnectedDispatch = {
  setChoosenProgram(data: number): void
  setPackageType(data: number): void
  getPackage(data?: string): void
  getPrograms(): void
  paymentCreate(data: Payment, cb: () => void): void
  setPromo(data: string): void
  toggleModal(data: boolean): void
}

const mapStateToProps = (state: any): ConnectedState => ({
  programs: selectPrograms(state),
  choosenProgram: selectChoosenProgram(state),
  choosenPackageType: selectPackageType(state),
  packages: selectPackages(state),
  promo: selectPromo(state),
  currentPackage: selectPackage(state),
  promoError: selectPromoError(state)
});
type Props = OwnProps & ConnectedDispatch & ConnectedState

export class StepTwoComponent extends CustomSteps<Props> {

  promoText: any;

  componentWillMount() {
    const {programs, getPrograms, packages, setChoosenProgram, choosenProgram, getPackage} = this.props;
    if(!packages){
      getPackage();
    }
    if(!programs){
      getPrograms();
    }
  }
  componentWillReceiveProps(nextProps: Props){
    const {programs, choosenProgram, setChoosenProgram} = this.props
    if(nextProps.programs){
      if (!choosenProgram) {
        if(nextProps.programs){
          nextProps.programs.map((program: any) => {
            if (program.get('id') % ProgramNum.count === ProgramNum.hero) {
              setChoosenProgram(program.get('id'));
            }
          })
        }
      }
    }
  }
  shouldComponentUpdate(nextProps:Props){
    return (
      nextProps.step !== this.props.step
      ||  nextProps.packages !== this.props.packages
      ||  nextProps.programs !== this.props.programs
      ||  nextProps.choosenProgram !== this.props.choosenProgram
      ||  nextProps.choosenPackageType !== this.props.choosenPackageType
      ||  nextProps.promo !== this.props.promo
      ||  nextProps.currentPackage !== this.props.currentPackage
      ||  nextProps.promoError!== this.props.promoError
    );
  }

  getPromo() {
    const {getPackage, setPromo} = this.props;
    if (!this.promoText || !this.promoText.value.length) {
      return;
    }
    getPackage(this.promoText.value);
    setPromo(this.promoText.value);
  }

  paymentCreate() {
    const {choosenProgram, choosenPackageType, paymentCreate, promo} = this.props;
    let payload: Payment = {
      authToken: storage.load('token'),
      data: {
        program: choosenProgram,
        package: choosenPackageType,
        promoName:  promo
      }
    };
    paymentCreate(payload, () => this.resultAction());
  }

  resultAction() {
    const {changeStep, choosenProgram} = this.props;
    storage.save('program', choosenProgram,
      {path: '/', maxAge: 60 * 60 * 24 * 365 * 10});
    changeStep(Steps.three);
  }

  renderPrograms() {
    const {programs, setChoosenProgram} = this.props;
    if (!programs) {
      return <div>Нет программ</div>;
    } else {
      return (
        programs.map((program: any) => (
          <li key={program.get('id')}
              onClick={() =>{setChoosenProgram(program.get('id'))}}
              className={classNames('options__item', {
                'is-active': program.get('isActive'),
                'g-hero': program.get('id') % ProgramNum.count == ProgramNum.hero,
                'g-mather': program.get('id') % ProgramNum.count == ProgramNum.mother,
                'g-extreme': program.get('id') % ProgramNum.count == ProgramNum.extreme,
                'g-tomorrow': program.get('id') % ProgramNum.count == ProgramNum.tomorrow,
              })}
          >
            {program.get('name')}
          </li>)
        ))
    }
  }
  renderPackages() {
    const {packages, setPackageType} = this.props;
    if (!packages) {
      return null;
    }
    return (
      packages.map((pckg: any) => {
        return (
          <li
            key={pckg.get('id')}
            className={classNames('options__item', {
              'is-active': pckg.get('isActive')
            })}
            onClick={() => setPackageType(pckg.get('id'))}
          >
            {pckg.get('name')}
          </li>);
      })
    )
  }

  render() {
    const {currentPackage} = this.props;
    return (
      <div>
        {this.renderHeader()}
        <div className='entry__box'>
          <ul className='options options--white wide mb30'>
            {this.renderPrograms()}
          </ul>
          <ul className='options options--white options--types wide mt30'>
            {this.renderPackages()}
          </ul>
        </div>
        <div className='entry__box'>
          <div className='entry-program-price'>{currentPackage ? currentPackage.get('cost') + ' руб' : ''}</div>
          <div className='input--btn'>
            <input
              ref={input => this.promoText = input}
              type='text'
              name='promo'
              className='input__field'
              placeholder='Eсть промокод, вводи'
            />
            <Button
              onClick={() => this.getPromo()}
              type='button'
              styleBtn={ButtonTypes.info}
            >
              Применить
            </Button>
          </div>
          <Button
            onClick={() => this.paymentCreate()}
            type='button'
            styleBtn={ButtonTypes.success}
            wide={true}
          >
            Далее
          </Button>
        </div>

        <div className='entry__link text-center'>
          <div className='entry-nav__item'>
            <Link to='/' onClick={() => this.logOut()}>Выйти</Link>
          </div>
        </div>
      </div>);
  }
}

export const StepTwo = connect(
  mapStateToProps, {
    setChoosenProgram,
    setPackageType,
    toggleModal,
    paymentCreate,
    setPromo,
    getPackage,
    getPrograms
  })(StepTwoComponent);

export default modalHOC(StepTwo, moduleName, subModuleName);

