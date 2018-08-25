import * as ducks from '../ducks';
import * as Immutable from 'immutable';

const payInfo = {
  test: 'test'
};
const cb = (data: any) => console.log(data);

describe('actions creator', () => {
  it('paymentManual', () => {
    const data = 'tele2';
    const expectedAction = {
      type: ducks.PAYMENT_MANUAL,
      data,
      cb
    };
    expect(ducks.paymentManual(data, cb)).toEqual(expectedAction)
  });
  it('paymentInfo', () => {
    const data = 'asdasd'
    const expectedAction = {
      type: ducks.PAYMENT_INFO,
      data
    };
    expect(ducks.paymentInfo(data)).toEqual(expectedAction)
  });
});

describe('reducer', () => {
  it('should return the initial state', () => {
    expect(ducks.data(undefined, {type: 'test'})).toEqual(ducks.initialStateImmutable)
  });
  it('case SUCCESS', () => {
    expect(ducks.data(ducks.initialStateImmutable, ducks.success('PAYMENT_MANUAL', payInfo, 'payInfo')))
      .toEqual(Immutable.fromJS({
        payInfo: payInfo
        })
      )
  });
});