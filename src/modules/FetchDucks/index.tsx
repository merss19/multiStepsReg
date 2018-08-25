import {makeActionCreator} from 'tools/utils';
import * as Immutable from 'immutable';
import {createSelector} from 'reselect';
import {Actions} from 'interfaces';

interface StateFetch {
  isFetching: boolean,
  isLoad: boolean,
  isError: boolean,
  errMsg: string,
  items?: any
}

export function fetchDucks(moduleName: string, subModuleName?: string) {

  const module = subModuleName ? `${moduleName}/${subModuleName}` : `${moduleName}`;

  const REQUEST = `${module}/REQUEST`;
  const SUCCESS = `${module}/SUCCESS`;
  const FAILURE = `${module}/ERROR`;
  const SET_ERROR = `${module}/SET_ERROR`;

  const request = makeActionCreator(REQUEST, 'action');
  const success = makeActionCreator(SUCCESS, 'action', 'data', 'field');
  const failure = makeActionCreator(FAILURE, 'action', 'data');
  const setError = makeActionCreator(SET_ERROR, 'data');

  const initialState: StateFetch = {
    isFetching: false,
    isLoad: false,
    isError: false,
    errMsg: ''
    //item: {}
  };

  // Reducer
  const initialStateImmutable = Immutable.fromJS(initialState);

  const loading = (state = initialStateImmutable, action: Actions) => {
    if (~action.type.indexOf(REQUEST)) {
      return state.merge({
        isFetching: true,
        isError: false,
        isLoad: false
      });
    }
    if (~action.type.indexOf(SUCCESS)) {
      return state.merge({
        isFetching: false,
        isLoad: true,
        isError: false
      });
    }
    if (~action.type.indexOf(FAILURE)) {
      return state.merge({
        isFetching: false,
        isLoad: false,
        isError: true,
        errMsg: action.data
      });
    }
    switch (action.type) {
      case SET_ERROR:
        return state.set('isError', action.data);
      default:
        return state;
    }
  };

  //selectors
  let state = (state: any) => state[moduleName];
  if (subModuleName) {
    state = (state: any) => state[moduleName].get(subModuleName);
  }
  const isFetching = createSelector(state, state => {
    return state.getIn(['loading', 'isFetching'])
  });
  const isLoad = createSelector(state, state => state.getIn(['loading', 'isLoad']));
  const isError = createSelector(state, state => state.getIn(['loading', 'isError']));
  const errMsg = createSelector(state, state => state.getIn(['loading', 'errMsg']));

  const selectErrMsg = createSelector(
    errMsg,
    (errMsg) => {
      return errMsg
    }
  );
  const selectIsFetching = createSelector(
    isFetching,
    (isFetching) => {
      return isFetching
    }
  );
  const selectIsLoad = createSelector(
    isLoad,
    (isLoad) => {
      return isLoad
    }
  );
  const selectIsError = createSelector(
    isError,
    (isError) => {
      return isError
    }
  );


  return {
    REQUEST,
    SUCCESS,
    FAILURE,
    SET_ERROR,
    request,
    success,
    failure,
    setError,
    loading,
    initialStateImmutable,
    selectIsFetching,
    selectIsLoad,
    selectIsError,
    selectErrMsg
  }
}


