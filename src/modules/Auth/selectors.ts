import {createSelector} from 'reselect';
import {moduleName} from './ducks';
import {fetchDucks} from 'modules/FetchDucks';

export const {
  selectIsFetching,
  selectIsLoad,
  selectErrMsg,
  selectIsError
} = fetchDucks(moduleName)

let state = (state: any) => state[moduleName];

const isAuth = createSelector(state, state => state.getIn(['data', 'isAuth']));
const user = createSelector(state, state => state.getIn(['data', 'user']));

export const selectUser = createSelector(
  user,
  (user) => {
    return user;
  }
);
export const selectIsAuth = createSelector(
  isAuth,
  (isAuth) => {
    return isAuth;
  }
);
