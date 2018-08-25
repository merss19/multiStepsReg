import * as React from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router';
import {changeStep, userCreate, setProgramName} from './containers/Step1';
import LogoLink from 'components/LogoLink';
import {StepOne} from './containers/Step1';
import {StepTwo} from './containers/Step2';
import {StepThree} from './containers/Step3';
import {StepFour} from './containers/Step4';
import {Programs, Steps} from './const'
import {isInEnum, queryParse} from 'tools/utils';
import {Step} from 'modules/SignUp/interfaces';
import {
  selectStep
} from './selectors';
import {LayoutHOC} from 'components/HOC/LayoutHOC';

interface SignUpFormData {
  email: string
  password: string
  passwordAgain: string
}

interface OwnProps {
}

type ConnectedState = {
  step: Step
}

type ConnectedDispatch = {
  changeStep(data: Steps): void
  userCreate(data: SignUpFormData, cb: () => void): void
  setProgramName(data: string): void
}

const mapStateToProps = (state: any, ownProps: OwnProps): ConnectedState => ({
  step: selectStep(state)
});
type Props = RouteComponentProps<string> & OwnProps & ConnectedState & ConnectedDispatch;

export class SignUpComponent extends React.Component<Props, {}> {

  componentWillMount() {
    const {changeStep, setProgramName, location} = this.props;
    const query: any = queryParse(location.search);
    if (query && query.step) {
      if(isInEnum(Steps, query.step)){
        changeStep(parseInt(query.step));
      }
    }
    if (query && query.name) {
      if(isInEnum(Programs, query.name)){
        setProgramName(query.name);
      }
    }
  }

  shouldComponentUpdate(nextProps: Props) {
    return nextProps.step !== this.props.step;
  }

  renderContent(): any {
    const {...props} = this.props;
    switch (this.props.step) {
      case Steps.one:
        return <StepOne  {...props}/>;
      case Steps.two:
        return <StepTwo {...props}/>;
      case Steps.three:
        return <StepThree {...props}/>;
      case Steps.four:
        return <StepFour {...props}/>;
      default:
        return <StepFour {...props}/>;
    }
  }

  render() {
    const {step} = this.props;
    return (
      <div className='layout layout--entry'>
        <div className='grid entry-header'>
          <div className='1/4--desk grid__cell todayme-logo'>
            <LogoLink/>
          </div>
          <div className='2/4--desk grid__cell text-center'>
            <div className='entry-step'>
              <span className='entry-step__title'>Шаг</span>
              <span className='entry-step__no'>#{step}</span>
              <span className='entry-step__go-to'>из 4</span>
            </div>
          </div>
        </div>

        <div className='entry entry--min'>
          <div className='entry__inner'>
            {this.renderContent()}
          </div>
        </div>
      </div>
    );
  }
}

export const SignUp = connect(
  mapStateToProps,
  {changeStep, userCreate, setProgramName}
)(SignUpComponent);
export default LayoutHOC({notLogo: true})(withRouter(SignUp));