import * as ducks from '../ducks';
import * as Immutable from 'immutable';

const data = {test: 'test'};
const cb = (data: any) => console.log(data);
const token = 'test';
const profile={test:'test'};

describe('actions creator', () => {
  it('setToken', () => {
    const expectedAction = {
      type: ducks.SET_TOKEN,
      data
    };
    expect(ducks.setToken(data)).toEqual(expectedAction)
  });
  it('submitLogin', () => {
    const expectedAction = {
      type: ducks.SUBMIT_LOGIN,
      data,
      cb
    };
    expect(ducks.submitLogin(data, cb)).toEqual(expectedAction)
  })
});

describe('reducer', () => {
  it('should return the initial state', () => {
    expect(ducks.data(undefined, {type: 'test'})).toEqual(ducks.initialStateImmutable)
  });
  it('case SUCCESS', () => {
    expect(ducks.data(ducks.initialStateImmutable, ducks.success('GET_PROFILE', profile, 'profile')))
      .toEqual(Immutable.fromJS({
          authToken: '',
          profile: profile,
          errMsg: ''
        })
      )
  });
  it('case SET_TOKEN', () => {
    expect(ducks.data(ducks.initialStateImmutable, ducks.setToken(token)))
      .toEqual(Immutable.fromJS({
        authToken: token,
        profile: {},
        errMsg: ''
      })
    )
  });
});