import * as ducks from '../ducks';
import * as Immutable from 'immutable';

const packages = {
  pass: 'sdfsdf',
  passAgain: 'sdfsdf',
  tokenPassword: 'qwe123qweqwe'
};
const cb = (data: any) => console.log(data);
const flg = true;

describe('actions creator', () => {
  it('getPrograms', () => {
    const expectedAction = {
      type: ducks.GET_PROGRAMS
    };
    expect(ducks.getPrograms()).toEqual(expectedAction)
  });
  it('getPackage', () => {
    const data = 'tele2';
    const expectedAction = {
      type: ducks.GET_PACKAGE,
      data,
      flg
    };
    expect(ducks.getPackage(data, flg)).toEqual(expectedAction)
  });
  it('paymentCreate', () => {
    const data = {
      email: 'mail@mail.ru'
    };
    const expectedAction = {
      type: ducks.PAYMENT_CREATE,
      data,
      cb
    };
    expect(ducks.paymentCreate(data, cb)).toEqual(expectedAction)
  });
  it('setPromo', () => {
    const data = 'tele2';
    const expectedAction = {
      type: ducks.SET_PROMO,
      data
    };
    expect(ducks.setPromo(data)).toEqual(expectedAction)
  });
  it('setChoosenProgram', () => {
    const data = 17;
    const expectedAction = {
      type: ducks.CHOOSEN_PROGRAM,
      data
    };
    expect(ducks.setChoosenProgram(data)).toEqual(expectedAction)
  });
  it('setPackageType', () => {
    const data = 1;
    const expectedAction = {
      type: ducks.SET_PACKAGE_TYPE,
      data
    };
    expect(ducks.setPackageType(data)).toEqual(expectedAction)
  });
});

describe('reducer', () => {
  it('should return the initial state', () => {
    expect(ducks.data(undefined, {type: 'test'})).toEqual(ducks.initialStateImmutable)
  });
  it('case SUCCESS', () => {
    expect(ducks.data(ducks.initialStateImmutable, ducks.success('GET_PACKAGE', packages, 'packages')))
      .toEqual(Immutable.fromJS({
          choosenProgram: 0,
          choosenPackageType: 1,
          packages:  packages,
          programs: [],
          promo: '',
          promoError: '',
          payment: {}
        })
      )
  });
  it('case CHOOSEN_PROGRAM', () => {
    expect(ducks.data(ducks.initialStateImmutable, ducks.setChoosenProgram(17)))
      .toEqual(Immutable.fromJS({
        choosenProgram: 17,
        choosenPackageType: 1,
        packages: [],
        programs: [],
        promo: '',
        promoError: '',
        payment: {}
      })
    )
  });
  it('case SET_PACKAGE_TYPE', () => {
    expect(ducks.data(ducks.initialStateImmutable, ducks.setPackageType(1)))
      .toEqual(Immutable.fromJS({
        choosenProgram: 0,
        choosenPackageType: 1,
        packages: [],
        programs: [],
        promo: '',
        promoError: '',
        payment: {}
        })
      )
  });
  it('case SET_PROMO', () => {
    expect(ducks.data(ducks.initialStateImmutable, ducks.setPromo('tele2')))
      .toEqual(Immutable.fromJS({
          choosenProgram: 0,
          choosenPackageType: 1,
          packages: [],
          programs: [],
          promo: 'tele2',
          promoError: '',
          payment: {}
        })
      )
  });
  it('case PROMO_ERROR', () => {
    expect(ducks.data(ducks.initialStateImmutable, ducks.promoError('error')))
      .toEqual(Immutable.fromJS({
          choosenProgram: 0,
          choosenPackageType: 1,
          packages: [],
          programs: [],
          promo: '',
          promoError: 'error',
          payment: {}
        })
      )
  });
});