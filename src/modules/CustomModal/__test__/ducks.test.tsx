import reducer, * as ducks from '../ducks';
import * as Immutable from 'immutable';

const data = false;
describe('actions creator', () => {
  it('toggleModal', () => {
    const expectedAction = {
      type: ducks.TOGGLE_MODAL,
      data
    };
    expect(ducks.toggleModal(data)).toEqual(expectedAction)
  });
});

describe('reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {type: 'test'})).toEqual(ducks.initialStateImmutable)
  });
  it('case TOGGLE_MODAL', () => {
    expect(reducer(ducks.initialStateImmutable, ducks.toggleModal(data)))
      .toEqual(Immutable.fromJS({
        isOpen: data
      })
    )
  });
});