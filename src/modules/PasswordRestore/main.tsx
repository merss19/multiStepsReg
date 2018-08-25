import * as React from 'react';
import {connect} from 'react-redux';
import {withRouter, RouteComponentProps} from 'react-router';
import PasswordForgetForm from './components/PasswordForgetForm';
import PasswordRestoreForm from './components/PasswordRestoreForm';
import {PasswordFormData, RestoreFormData} from './interfaces';
import {submitPassword, submitRestore, setRestoreToken} from './ducks';
import {CustomModal, toggleModal, ModalType, ModalTypes} from '../CustomModal';
import {LayoutHOC} from 'components/HOC/LayoutHOC';
import {queryParse} from "tools/utils";

import {
  selectIsFetching,
  selectIsLoad,
  selectToken,
  selectIsError,
  selectResultText,
  selectErrorMessage,
  selectResultCode
} from './selectors';


type OwnProps = {}

type ConnectedDispatch = {
  submitPassword(data: PasswordFormData): void
  submitRestore(data: RestoreFormData): void
  toggleModal(isOpen: boolean): void
  setRestoreToken(data: string): void
}
type ConnectedState = {
  isFetching: boolean
  isLoad: boolean
  isError: boolean
  resultText: string
  token: string
  resultCode: number
  errorMessage: string
}
const mapStateToProps = (state: any, OwnProps: OwnProps): ConnectedState => ({
  isFetching: selectIsFetching(state),
  token: selectToken(state),
  isLoad: selectIsLoad(state),
  isError: selectIsError(state),
  resultText: selectResultText(state),
  resultCode: selectResultCode(state),
  errorMessage: selectErrorMessage(state)
});
type props = RouteComponentProps<string> & ConnectedState & ConnectedDispatch & OwnProps;

export class PasswordRestoreComponent extends React.PureComponent<props, {}> {

  componentWillMount() {
    const {location, setRestoreToken} = this.props;
    let query: any = {};

    if(location.search){
      console.log('111111111111111111')
      query = queryParse(location.search);
      if(query.token){
        console.log('222222222222222222222')
        setRestoreToken(query.token);
      }
    }
  }

  componentWillReceiveProps(nextProps: props) {
    if (
      nextProps.isFetching !== this.props.isFetching ||
      nextProps.isError !== this.props.isError ||
      nextProps.isLoad !== this.props.isLoad) {
      const isOpen: boolean = nextProps.isFetching || nextProps.isError || nextProps.isLoad;
      this.props.toggleModal(isOpen);
    }
  }

  onSubmit(data: PasswordFormData) {
    const {submitPassword} = this.props;
    submitPassword(data);
  }

  onSubmitRestore(data: RestoreFormData) {
    const {submitRestore, token} = this.props;
    data.tokenPassword = token;
    submitRestore(data);
  }

  setModal() {
    const {isLoad, isError, resultCode} = this.props;
    let modal: ModalType = ModalTypes.info;

    if (isError) {
      modal = ModalTypes.error;
    }
    if (isLoad) {
      if (resultCode === 1) {
        modal = ModalTypes.success;
      }
    }
    return modal;
  }

  clickHandler() {
    const {token, history} = this.props;
    const modal: ModalType = this.setModal();
   // console.log('clickkkkkkkkkkk')
   // console.log(token && modal === ModalTypes.success)
    if (token && modal === ModalTypes.success) {
      console.log('!!!!!!')
      history.replace('/')
    }
  }

  render() {
    const {
      isFetching,
      token,
      isError,
      resultText,
      errorMessage
    } = this.props;
    const modal: ModalType = this.setModal();
    const text: string = isError ? errorMessage : resultText;

    return (
      <div className='entry--min'>
        {!token
          ?
          <PasswordForgetForm onSubmit={this.onSubmit.bind(this)}/>
          :
          <PasswordRestoreForm onSubmit={this.onSubmitRestore.bind(this)}/>
        }
        <CustomModal
          modal={modal}
          resultText={text}
          clickHandler={this.clickHandler.bind(this)}
          isLoader={isFetching}
        />
      </div>
    )
  }
}

export const PasswordRestore = connect(mapStateToProps, {
  submitPassword,
  submitRestore,
  setRestoreToken,
  toggleModal
})(PasswordRestoreComponent);

export default LayoutHOC()(withRouter(PasswordRestore));