import {createSelector} from 'reselect'
import {fetchDucks} from "modules/FetchDucks";
import {moduleName} from './ducks';

export const {
  selectIsFetching,
  selectIsLoad,
  selectErrMsg,
  selectIsError
} = fetchDucks(moduleName);


let state = (state: any) => state[moduleName];

const resultText = createSelector(state, state => state.getIn(['data', 'user', 'resultText']));
const resultCode = createSelector(state, state => state.getIn(['data', 'user', 'resultCode']));
const errorMessage = createSelector(state, state => state.getIn(['data', 'user', 'errorMessage']));
const token = createSelector(state, state => state.getIn(['data', 'token']));

export const selectToken = createSelector(
  token,
  (token) => {
    return token
  }
);
export const selectResultText = createSelector(
  resultText,
  (resultText) => {
    return resultText
  }
);
export const selectResultCode = createSelector(
  resultCode,
  (resultCode) => {
    return resultCode
  }
);
export const selectErrorMessage = createSelector(
  errorMessage,
  (errorMessage) => {
    return errorMessage
  }
);
