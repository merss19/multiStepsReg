import {shallow, mount} from 'enzyme';
import CustomSteps from './index';
import * as React from 'react';
import toJson from 'enzyme-to-json';
import * as sinon from 'sinon';
import {Provider} from 'react-redux';
import configureStore from '../../../../store';
import {BrowserRouter as Router} from 'react-router-dom';
import {configure} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import {storage} from '../../../../tools/storage/index';
import {Programs, ProgramsName, Steps} from '../../const';
import {Button, ButtonTypes} from "../../../../components/Button/button";
import {Field} from "redux-form";
import * as fetchMock from "fetch-mock";

const store = configureStore();
configure({adapter: new Adapter()});

let changeStep;
let programName;
let choosenProgram;
const start = () => {
  beforeEach(() => {
    changeStep = jest.fn(),
      programName = '',
      choosenProgram = 0
  });
  const props = {
    changeStep: changeStep,
    programName: programName,
    choosenProgram: choosenProgram
  };
  const buildComponent = () => {
    return shallow(<CustomSteps {...props}/>)
  };
  return {
    props,
    buildComponent
  }
};
describe('Component CustomSteps', () => {
  let component;
  start();
  beforeEach(() => {
    component = start().buildComponent();
  });
  it('call logOut', () => {
    const component = start().buildComponent();
    const instance = component.instance() as CustomSteps<any>;
    instance.logOut();
    expect(changeStep).toHaveBeenCalledWith(Steps.one);
    expect(storage.load('token')).toBeUndefined();
    expect(storage.load('promoName')).toBeUndefined();
    expect(storage.load('program')).toBeUndefined();
  });
  it('call renderProgramName', () => {
    const component = start().buildComponent();
    const instance = component.instance() as CustomSteps<any>;
    let programName = instance.renderProgramName();
    let header = instance.renderHeader();
    expect(programName).toBe('Регистрация');
    choosenProgram = 5;
    component.setProps({choosenProgram: choosenProgram});
    programName = instance.renderProgramName();
    header = instance.renderHeader();
    expect(programName).toBe(ProgramsName.hero);
    expect(header.props.className).toBe('entry__header entry__header--colorful g-hero');
    choosenProgram = 6;
    component.setProps({choosenProgram: choosenProgram});
    programName = instance.renderProgramName();
    header = instance.renderHeader();
    expect(programName).toBe(ProgramsName.mother);
    expect(header.props.className).toBe('entry__header entry__header--colorful g-mather');
    choosenProgram = 7;
    component.setProps({choosenProgram: choosenProgram});
    programName = instance.renderProgramName();
    header = instance.renderHeader();
    expect(programName).toBe(ProgramsName.extreme);
    expect(header.props.className).toBe('entry__header entry__header--colorful g-extreme');
    choosenProgram = 8;
    component.setProps({choosenProgram: choosenProgram});
    programName = instance.renderProgramName();
    header = instance.renderHeader();
    expect(programName).toBe(ProgramsName.tomorrow);
    expect(header.props.className).toBe('entry__header entry__header--colorful g-tomorrow');
  });
  describe('call renderHeader', () => {
    it('call renderProgramName', () => {
      const spy = sinon.spy(CustomSteps.prototype, 'renderProgramName');
      const component = start().buildComponent();
      const instance = component.instance() as CustomSteps<any>;
      instance.renderHeader();
      expect(spy.called).toBe(true);
    });
    it('pass prop programName', () => {
      const instance = component.instance() as CustomSteps<any>;
      let header = instance.renderHeader();
      expect(header.props.className).toBe('entry__header');
      programName = Programs.hero;
      component.setProps({programName: programName});
      header = instance.renderHeader();
      expect(header.props.className).toBe('entry__header entry__header--colorful g-hero');
      programName = Programs.mother;
      component.setProps({programName: programName});
      header = instance.renderHeader();
      expect(header.props.className).toBe('entry__header entry__header--colorful g-mather');
      programName = Programs.extreme;
      component.setProps({programName: programName});
      header = instance.renderHeader();
      expect(header.props.className).toBe('entry__header entry__header--colorful g-extreme');
      programName = Programs.tomorrow;
      component.setProps({programName: programName});
      header = instance.renderHeader();
      expect(header.props.className).toBe('entry__header entry__header--colorful g-tomorrow');
    });
  });
});


