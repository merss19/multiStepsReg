import * as ducks from '../ducks';
import * as Immutable from 'immutable';

const data = {
  pass: 'sdfsdf',
  passAgain: 'sdfsdf',
  tokenPassword: 'qwe123qweqwe'
};
const restore = {test:'test'};

describe('actions creator', () => {
  it('submitRestore', () => {
    const expectedAction = {
      type: ducks.SUBMIT_RESTORE,
      data
    };
    expect(ducks.submitRestore(data)).toEqual(expectedAction)
  });
  it('submitPassword', () => {
    const data = {
      email: 'mail@mail.ru'
    };
    const expectedAction = {
      type: ducks.SUBMIT_PASSWORD,
      data
    };
    expect(ducks.submitPassword(data)).toEqual(expectedAction)
  });
  it('setRestoreToken', () => {
    const data = 'token';
    const expectedAction = {
      type: ducks.SET_RESTORE_TOKEN,
      data
    };
    expect(ducks.setRestoreToken(data)).toEqual(expectedAction)
  })
});

describe('reducer', () => {
  it('should return the initial state', () => {
    expect(ducks.data(undefined, {type: 'test'})).toEqual(ducks.initialStateImmutable)
  });
  it('case SUCCESS', () => {
    expect(ducks.data(ducks.initialStateImmutable, ducks.success('SUBMIT_RESTORE', restore, 'restore')))
      .toEqual(Immutable.fromJS({
        token: null,
        user: {},
        restore: restore,
        })
      )
  });
  it('case SET_RESTORE_TOKEN', () => {
    expect(ducks.data(ducks.initialStateImmutable, ducks.setRestoreToken('token')))
      .toEqual(Immutable.fromJS({
        token: 'token',
        user: {},
        restore: {}
      })
    )
  });
});