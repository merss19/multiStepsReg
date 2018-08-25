import {createSelector} from 'reselect';
import {moduleName} from './ducks';
import {fetchDucks} from 'modules/FetchDucks';

export const {
  selectIsFetching,
  selectIsLoad,
  selectErrMsg,
  selectIsError
} = fetchDucks(moduleName);

let state = (state: any) => state[moduleName];

const profile = createSelector(state, state => {
  return state.getIn(['data', 'profile'])
});
const authToken = createSelector(state, state => state.getIn(['data', 'authToken']));

export const selectAuthToken = createSelector(
  authToken,
  (authToken) => {
    return authToken
  }
);

export const selectProfile = createSelector(
  profile,
  (profile) => {
    return profile
  }
);
