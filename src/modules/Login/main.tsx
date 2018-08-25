import * as React from 'react';
import {connect} from 'react-redux';
import {LoginForm} from './containers/LoginForm';
import {submitLogin, setToken, setError} from './ducks';
import {LoginFormData} from './interfaces';
import {withRouter, RouteComponentProps} from 'react-router'
import {CustomModal, toggleModal, ModalTypes} from '../CustomModal';
import {LayoutHOC} from 'components/HOC/LayoutHOC';
import {storage} from 'tools/storage';
import {changeStep, Steps} from '../SignUp';


import {
  selectIsFetching,
  selectIsLoad,
  selectProfile,
  selectErrMsg,
  selectIsError
} from './selectors'

type ConnectedDispatch = {
  changeStep: (data: Steps) => void
  submitLogin(data: LoginFormData, cb: (data: any) => void): void
  toggleModal(data: boolean): void
  setToken(toket: string): void
  setError(data: boolean): any
}
type ConnectedState = {
  isFetching: boolean
  isLoad: boolean
  isError: boolean
  errMsg: string,
  profile: any
}
const mapStateToProps = (state: any): ConnectedState => ({
  isFetching: selectIsFetching(state),
  isLoad: selectIsLoad(state),
  isError: selectIsError(state),
  errMsg: selectErrMsg(state),
  profile: selectProfile(state)
});

type props = RouteComponentProps<string> & ConnectedDispatch & ConnectedState;

export class LoginComponent extends React.Component<props, any> {

  componentWillReceiveProps(nextProps: props) {
    if (nextProps.isFetching !== this.props.isFetching || nextProps.isError !== this.props.isError) {
      const isOpen: boolean = nextProps.isFetching || nextProps.isError;
      this.props.toggleModal(isOpen);
    }
  }
  onSubmit(data: LoginFormData) {
    this.props.submitLogin(data, (data) => this.submitCb(data));
  }

  submitCb(data: any): void {
    const {changeStep, setToken, history} = this.props;
    if (data && data.paidState !== 0) {
      setToken(data.authToken);
      storage.save('token', data.authToken, {path: '/', maxAge: 60 * 60 * 24 * 365 * 10});
      storage.save(
        'userProgram', data.program, {path: '/', maxAge: 60 * 60 * 24 * 365 * 10}
      );
      if (data.paidState === 2) {
        changeStep(Steps.four);
      } else if (data.isFirstEdit) {
        history.replace('/profile');
      } else {
        history.replace('/task');
      }
    } else if (!data.program) {
      storage.save('token', data.authToken, {path: '/', maxAge: 60 * 60 * 24 * 365 * 10});
      changeStep(Steps.two);
      history.replace('/signup');
    } else {
      storage.save('token', data.authToken, {path: '/', maxAge: 60 * 60 * 24 * 365 * 10});
      changeStep(Steps.three);
      history.replace('/signup');
    }
  }

  setError(){
    this.props.setError(false)
  }

  render() {
    const {isFetching, errMsg} = this.props;
    return (
      <LoginForm onSubmit={this.onSubmit.bind(this)}>
        <CustomModal
          modal={ModalTypes.error}
          resultText={errMsg}
          isLoader={isFetching}
          clickHandler={this.setError.bind(this)}
        />
      </LoginForm>
    );
  }
}

export const Login = connect(mapStateToProps, {
  submitLogin,
  changeStep,
  setToken,
  setError,
  toggleModal
})(LoginComponent);
export default LayoutHOC()(withRouter(Login));