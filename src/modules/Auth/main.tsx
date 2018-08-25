import * as React from 'react';
import {connect} from 'react-redux';
import {RouteProps, RouteComponentProps, withRouter} from 'react-router';
import {Route} from 'react-router-dom';
import {checkAuth} from './ducks'
import {CustomModal, toggleModal, ModalTypes, ModalType} from 'modules/CustomModal';
import {changeStep, Steps} from 'modules/SignUp';
import {storage} from 'tools/storage';
import {
  selectIsFetching,
  selectIsLoad,
  selectUser,
  selectIsAuth,
  selectErrMsg,
  selectIsError
} from './selectors'

type ConnectedDispatch = {
  checkAuth(cb: (data?: any) => void, cbFail: () => void): void
  toggleModal(data: boolean): void
  changeStep: (data: Steps) => void
}

interface OwnProps extends RouteProps {
}

type ConnectedState = {
  isFetching: boolean
  isLoad: boolean
  isError: boolean
  isAuth: boolean
  errMsg: string
  user: any
}

const mapStateToProps = (state: any, ownProps: OwnProps): ConnectedState => ({
  isFetching: selectIsFetching(state),
  isLoad: selectIsLoad(state),
  isAuth: selectIsAuth(state),
  isError: selectIsError(state),
  errMsg: selectErrMsg(state),
  user: selectUser(state)
});
type Props = RouteComponentProps<string> & OwnProps & ConnectedDispatch & ConnectedState;

export class ProtectedRouteComponent extends React.Component<Props, {}> {

  componentWillMount() {
    const {checkAuth} = this.props;
    checkAuth((data) => this.checkAuth(data), () => this.leave());
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.isFetching !== this.props.isFetching ||
        nextProps.isError !== this.props.isError) {
      const isOpen: boolean = nextProps.isFetching || nextProps.isError;
      this.props.toggleModal(isOpen);
    }
  }

  leave() {
    const {history, toggleModal} = this.props;
    toggleModal(false);
    storage.remove('token', {path: '/'});
    storage.remove('txId', {path: '/'});
    storage.remove('program', {path: '/'});
    storage.remove('packageType', {path: '/'});
    storage.remove('promoName', {path: '/'});
    history.replace('/');
  }

  checkAuth(data: any) : void {
    const {changeStep, history} = this.props;
    if (data.paidState !== 0) {
      storage.save('userProgram', data.program, {path: '/', maxAge: 60 * 60 * 24 * 365 * 10});
      if (data.paidState === 2) {
        changeStep(Steps.four);
        history.replace('/signup');
      } else if (data.isFirstEdit) {
        history.replace('/profile');
      } else if (!data.emailConfirmed) {
        return null;
      } else {
        history.replace('/task');
      }
    } else if (!data.program) {
      changeStep(Steps.two);
    } else {
      changeStep(Steps.four);
    }
  }

  modalClick(): void {
    const {history, toggleModal} = this.props;
    toggleModal(false);
    history.replace('/');
  }

  clickHandler(){
    const {isError} = this.props
    if(!isError ){
      return null
    }
    return this.modalClick()
  }


  renderModal(modal:ModalType){
    const {isFetching, errMsg, isError} = this.props
    return(
      <CustomModal
        modal={modal}
        resultText={errMsg}
        clickHandler={this.clickHandler.bind(this)}
        isLoader={isFetching}
      />)
  }

  renderContent(props: any){
    const {component: ProtectedComponent, isFetching, errMsg} = this.props
    return(
      <div>
        <ProtectedComponent {...props}/>
        {this.renderModal(ModalTypes.error)}
      </div>)
  }

  renderRoute(props: any){
    const {isAuth} = this.props;
    return(
      <div>
        {isAuth ?
          this.renderContent(props) :
          this.renderModal(ModalTypes.info)
        }
      </div>)
  }

  render() {
    const {component: ProtectedComponent, isAuth, isError, isFetching, errMsg, ...rest} = this.props;
    return (
      <Route {...rest} render={props => {
        return this.renderRoute(props);
      }
      }/>
      )
  }
}


export const ProtectedRoute = connect(
  mapStateToProps,
  {
    checkAuth,
    changeStep,
    toggleModal
  })(ProtectedRouteComponent)


export default withRouter(ProtectedRoute);

