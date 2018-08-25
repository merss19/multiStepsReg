import * as ducks from '../ducks';
import * as Immutable from 'immutable';
import {Steps} from "../../../const";

const data = {
  pass: 'sdfsdf',
  passAgain: 'sdfsdf',
  tokenPassword: 'qwe123qweqwe'
};
const cb = (data: any) => console.log(data);
const programs = {test:'test'};

describe('actions creator', () => {
  it('userCreate', () => {
    const data = {
      email: 'mail@mail.ru'
    };
    const expectedAction = {
      type: ducks.USER_CREATE,
      data,
      cb
    };
    expect(ducks.userCreate(data, cb)).toEqual(expectedAction)
  });
  it('changeStep', () => {
    const expectedAction = {
      type: ducks.CHANGE_STEP,
      data
    };
    expect(ducks.changeStep(data)).toEqual(expectedAction)
  });
  it('setProgramName', () => {
    const expectedAction = {
      type: ducks.SET_PROGRAM_NAME,
      data
    };
    expect(ducks.setProgramName(data)).toEqual(expectedAction)
  });
});

describe('reducer', () => {
  it('should return the initial state', () => {
    expect(ducks.data(undefined, {type: 'test'})).toEqual(ducks.initialStateImmutable)
  });
  it('case SET_PROGRAM_NAME', () => {
    expect(ducks.data(ducks.initialStateImmutable, ducks.setProgramName('hero')))
      .toEqual(Immutable.fromJS({
        step: Steps.one,
        programName: 'hero',
        userProfile: {}
      })
    )
  });
  it('case CHANGE_STEP', () => {
    expect(ducks.data(ducks.initialStateImmutable, ducks.changeStep(Steps.two)))
      .toEqual(Immutable.fromJS({
          step: Steps.two,
          programName: '',
          userProfile: {}
        })
      )
  });
});