import * as React from 'react'
import {storage} from 'tools/storage'
import {Steps, Programs, ProgramsName, ProgramNum} from '../../const'
import * as classNames from 'classnames'
import {RouteComponentProps} from "react-router";

export interface CustomStepsProps extends RouteComponentProps<string> {
  changeStep?: (data: Steps) => void
  programName?: string
  choosenProgram?: number
}

export default class CustomSteps<P extends CustomStepsProps> extends React.Component<P, {}> {

  logOut() {
    storage.remove('token', {path: '/'});
    storage.remove('program', {path: '/'});
    storage.remove('promoName', {path: '/'});
    this.props.changeStep(Steps.one)
  }

  renderProgramName() {
    const {choosenProgram} = this.props;
    let programName: string = 'Регистрация';
    if (choosenProgram) {
      if (choosenProgram % ProgramNum.count == 1) {
        programName = ProgramsName.hero;
      }
      if (choosenProgram % ProgramNum.count == 2) {
        programName = ProgramsName.mother;
      }
      if (choosenProgram % ProgramNum.count == 3) {
        programName = ProgramsName.extreme;
      }
      if (choosenProgram % ProgramNum.count == 0) {
        programName = ProgramsName.tomorrow;
      }
    }
    return programName;
  }

  renderHeader() {
    const {programName, choosenProgram} = this.props;
    return (
      <div className={classNames('entry__header', {
        'entry__header--colorful g-hero':
          programName === Programs.hero ||
          choosenProgram % ProgramNum.count == ProgramNum.hero,
        'entry__header--colorful g-mather':
          programName === Programs.mother ||
          choosenProgram % ProgramNum.count == ProgramNum.mother,
        'entry__header--colorful g-extreme':
          programName === Programs.extreme ||
          choosenProgram % ProgramNum.count == ProgramNum.extreme,
        'entry__header--colorful g-tomorrow':
          programName === Programs.tomorrow ||
          choosenProgram && choosenProgram % ProgramNum.count == ProgramNum.tomorrow,
      })}>
        <h2 className='entry__title entry__title--auth text-center '>
          {this.renderProgramName()}
        </h2>
      </div>
    )
  }

  render(){
    return <div></div>;
  }
}