import {selectUser, selectIsAuth} from '../selectors';
import configureStore from '../../../store';
const store = configureStore();

describe('test selectors', () => {
  const state = store.getState();
  const user = state['auth'].getIn(['data', 'user']);
  const isAuth = state['auth'].getIn(['data', 'isAuth']);
  it('selectUser', () => {
    expect(selectUser(state)).toBe(user);
  });
  it('selectIsAuth', () => {
    expect(selectIsAuth(state)).toBe(isAuth);
  });
});