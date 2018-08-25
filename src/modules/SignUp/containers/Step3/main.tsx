import * as React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import CustomSteps, {CustomStepsProps} from '../CustomSteps';
import {Steps, ProgramNum} from '../../const'
import {Button, ButtonTypes} from 'components/Button'
import * as shortid from 'shortid'
import * as md5 from 'md5'
import {selectAuthToken} from 'modules/Login';
import {fetchDucks} from 'modules/FetchDucks';
import {modalHOC} from 'components/HOC/ModalHOC';
import {
  paymentInfo,
  paymentManual,
  moduleName,
  subModuleName
} from './ducks';

import {
  selectChoosenProgram,
  selectPackage,
  selectPayInfo
} from '../../selectors';

interface OwnProps extends CustomStepsProps {
  changeStep: (data: number) => void
  step: Steps
}
const {
  selectIsFetching,
  selectIsLoad,
  selectIsError,
  selectErrMsg
} = fetchDucks(moduleName, subModuleName);

export type ConnectedState = {
  authToken: string
  choosenProgram: number
  currentPackage: any
  payInfo: any
}

type ConnectedDispatch = {
  paymentInfo(data: string): void
  paymentManual(data: string, cb: (data: boolean) => void): void
}

const mapStateToProps = (state: any): ConnectedState => ({
  authToken: selectAuthToken(state),
  currentPackage: selectPackage(state),
  choosenProgram: selectChoosenProgram(state),
  payInfo: selectPayInfo(state)
});
type Props = OwnProps & ConnectedDispatch & ConnectedState

export class StepThreeComponent extends CustomSteps<Props> {

  yandex: any;
  robokassa: any;

  componentWillMount() {
    const {authToken, paymentInfo} = this.props;
    paymentInfo(authToken);
  }
  shouldComponentUpdate(nextProps:Props){
    return (
      nextProps.step !== this.props.step
      ||  nextProps.authToken !== this.props.authToken
      ||  nextProps.choosenProgram !== this.props.choosenProgram
      ||  nextProps.payInfo !== this.props.payInfo
      ||  nextProps.currentPackage !== this.props.currentPackage
    );
  }

  payManual() {
    const {paymentManual, payInfo, changeStep} = this.props;
    paymentManual(payInfo.get('txId'), (data) => {
      changeStep(Steps.four);
    })
  }

  back(e: any) {
    const {changeStep} = this.props;
    changeStep(Steps.two);
  }

  renderContent() {
    const {payInfo, changeStep} = this.props;
    if (payInfo.get('amount') !== 0) {
      if (payInfo.get('isPaid')) {
        return (
          <div className='entry__box'>
            <div className='entry-ico-box'>
              <img className='entry-ico-box__img' src={'/img/ico-success.svg'} alt=""/>
              <p className='entry-ico-box__title'>Оплачен!</p>
            </div>

            <Button
              type={'button'}
              styleBtn={ButtonTypes.info}
              wide={true}
            >
              <Link to="/profile">Продолжить</Link>
            </Button>
          </div>
        );
      } else {
        return (
          <div className='entry__box'>
            <h3 className='text-center mtb20'>Выберите способ оплаты:</h3>
            <ul className='options--with-img wide mb20'>
              <li className='options__item'>
                <form
                  id='yaForm'
                  ref={(el) => this.yandex = el}
                  action='https://money.yandex.ru/eshop.xml'
                  className='form-pay'
                  target='_blank'
                  method='POST'
                >
                  <input name='shopId' defaultValue='' type='hidden'/>
                  <input name='scid' defaultValue='' type='hidden'/>
                  <input name='customerNumber' defaultValue={'HertysKJ'} type='hidden'/>
                  <input name='sum' defaultValue={payInfo.get('amount')} type='hidden'/>
                  <input name='orderNumber' defaultValue={payInfo.get('txId')} type='hidden'/>
                  <input name='paymentType' defaultValue='' type='hidden'/>
                  <div
                    className='form-pay__submit'
                    onClick={() => {
                      this.yandex.submit()
                    }}
                  >
                    <img
                      className='ico-yandexkassa mt5'
                      src={process.env.PUBLIC_URL + '/img/png/pay/yandexkassa.png'}
                      alt=''
                    />
                  </div>

                </form>
              </li>
              <li className='options__item'>
                <form
                  id='robokassaForm'
                  action='https://auth.robokassa.ru/Merchant/Index.aspx'
                  ref={(el) => this.robokassa = el}
                  className='form-pay'
                  target='_blank'
                  method='POST'
                >
                  <input type='hidden' name='MrchLogin' defaultValue=''/>
                  <input type='hidden' name='OutSum' defaultValue={payInfo.get('amount')}/>
                  <input type='hidden' name='Desc' defaultValue='Text description'/>
                  <input
                    type='hidden'
                    name='SignatureValue'
                    defaultValue=''
                  />
                  <input type='hidden' name='shp_txid' defaultValue={payInfo.get('txId')}/>
                  <input type='hidden' name='Culture' defaultValue='ru'/>
                  <div
                    className='form-pay__submit'
                    onClick={() => {
                      this.robokassa.submit()
                    }}
                  >
                    <img
                      className='ico-robokassa mt20'
                      src={'/img/png/pay/robokassa.png'} alt=''
                    />
                  </div>

                </form>
              </li>
            </ul>

            <ul className='entry-nav'>
              <li className='entry-nav__item'>
                <a href='#' className='entry-nav__link' onClick={e => {
                  this.back(e)
                }}>Вернуться на шаг назад</a>
              </li>
            </ul>

            <ul className='entry-nav'>
              <li className='entry-nav__item'>
                <Link to='/' onClick={() => this.logOut()}>Выйти</Link>
              </li>
            </ul>
          </div>
        );
      }
    } else {
      return (
        <div className='entry__box'>
          <div className='entry-ico-box '>
            <img
              className='entry-ico-box__img'
              src='/assets/img/svg/ico-freebie.svg' alt=''
            />
            <p className='entry-ico-box__title'>Халява!</p>
          </div>
          <Button
            onClick={() => this.payManual()}
            type={'button'}
            styleBtn={ButtonTypes.info}
            wide={true}
          >
            Продолжить
          </Button>
        </div>
      );
    }

  }

  renderPrice() {
    const {payInfo} = this.props;
    if (!payInfo.get('isPaid')) {
      return (
        <p className='entry-program-price highlight md30'>
          {payInfo.get('amount')} руб.
        </p>
      );
    }
    return null;
  }

  render() {
    const {
      choosenProgram,
      currentPackage,
    } = this.props;
    return (
      <div>
        {this.renderHeader()}
        {choosenProgram % ProgramNum.count !== 0 && <p className='entry-packet-name'>{currentPackage.get('name')}</p>}
        {this.renderPrice()}
        {this.renderContent()}
      </div>
    );
  }
}

export const StepThree = connect(mapStateToProps, {
  paymentInfo,
  paymentManual
})(StepThreeComponent);
export default modalHOC(StepThree, moduleName, subModuleName);
