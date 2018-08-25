import configureStore from '../../../store';
import {
  selectToken,
  selectResultText,
  selectResultCode,
  selectErrorMessage
} from '../selectors';

const store = configureStore();

describe('test selectors', () => {
  const state = store.getState();
  const token = state.passwordRestore.getIn(['data', 'token']);
  const resultText = state.passwordRestore.getIn(['data', 'user', 'resultText']);
  const resultCode = state.passwordRestore.getIn(['data', 'user', 'resultCode']);
  const errorMessage = state.passwordRestore.getIn(['data', 'user', 'errorMessage']);

  it('selectResultText', () => {
    expect(selectResultText(state)).toBe(resultText);
  });
  it('selectResultCode', () => {
    expect(selectResultCode(state)).toBe(resultCode);
  });
  it('selectErrorMessage', () => {
    expect(selectErrorMessage(state)).toBe(errorMessage);
  });
  it('selectToken', () => {
    expect(selectToken(state)).toBe(token);
  });
});