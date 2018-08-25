import {selectAuthToken, selectProfile} from '../selectors'
import configureStore from '../../../store';
const store = configureStore();

describe('test selectors', () => {
  const state = store.getState();
  const authToken = state.login.getIn(['data', 'authToken']);
  const profile = state.login.getIn(['data', 'profile']);

  it('selectAuthToken', () => {
    expect(selectAuthToken(state)).toBe(authToken);
  });
  it('selectProfile', () => {
    expect(selectProfile(state)).toBe(profile);
  });
});