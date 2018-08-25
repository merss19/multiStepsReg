import {selectIsOpen} from '../selectors';
import configureStore from '../../../store';
const store = configureStore();

describe('test selectors', () => {
  const state = store.getState();
  const isOpen = state.modal.get('isOpen');
  it('selectIsOpen', () => {
    expect(selectIsOpen(state)).toBe(isOpen);
  });
});