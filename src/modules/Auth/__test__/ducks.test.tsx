import * as ducks from '../ducks';
import * as Immutable from 'immutable';

const data = {test: 'test'};
const cb = (data: any) => console.log(data);
const cbFail = (data: any) => console.log(data);
const isAuth = false;
const user={test:'test'};

describe('actions creator', () => {
  it('checkAuth', () => {
    const expectedAction = {
      type: ducks.CHECK_AUTH,
      cb,
      cbFail
    };
    expect(ducks.checkAuth(cb, cbFail)).toEqual(expectedAction)
  });
  it('setAuth', () => {
    const expectedAction = {
      type: ducks.SET_AUTH,
      data
    };
    expect(ducks.setAuth(data)).toEqual(expectedAction)
  })
});

describe('reducer', () => {
  it('should return the initial state', () => {
    expect(ducks.data(undefined, {type: 'test'})).toEqual(ducks.initialStateImmutable)
  });
  it('case SUCCESS', () => {
    expect(ducks.data(ducks.initialStateImmutable, ducks.success('CHECK_AUTH', user, 'user')))
      .toEqual(Immutable.fromJS({
        user: user,
        isAuth: false,
        errMsg: ''
        })
      )
  });
  it('case SET_AUTH', () => {
    expect(ducks.data(ducks.initialStateImmutable, ducks.setAuth(isAuth)))
      .toEqual(Immutable.fromJS({
        user: {},
        isAuth: isAuth,
        errMsg: ''
      })
    )
  });
});