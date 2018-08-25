import * as Immutable from 'immutable';
import {fetchDucks} from './index'
import configureStore from '../../store';

const store = configureStore();
let {
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
} = fetchDucks('signUp', 'stepOne');
describe('actions creators', () => {
  const GET_PROGRAMS = 'signUp/stepOne/GET_PROGRAMS';
  it('request', () => {
    const expectedAction = {
      type: REQUEST + '/GET_PROGRAMS'
    };
    expect(request(GET_PROGRAMS)).toEqual(expectedAction)
  });
  it('success', () => {
    const data = {
      test: 'test'
    };
    const field = 'programs';
    const expectedAction = {
      type: SUCCESS + '/GET_PROGRAMS',
      data,
      field
    };
    expect(success(GET_PROGRAMS, data, 'programs')).toEqual(expectedAction)
  });
  it('failure', () => {
    const data = 'error';
    const expectedAction = {
      type: FAILURE + '/GET_PROGRAMS',
      data
    };
    expect(failure(GET_PROGRAMS, data)).toEqual(expectedAction)
  });
  it('setError', () => {
    const data = true;
    const expectedAction = {
      type: SET_ERROR,
      data
    };
    expect(setError(data)).toEqual(expectedAction)
  });
});

describe('reducer', () => {
  it('should return the initial state', () => {
    expect(loading(undefined, {type: 'test'})).toEqual(initialStateImmutable)
  });
  it('case REQUEST', () => {
    expect(loading(initialStateImmutable, request()))
      .toEqual(Immutable.fromJS({
        isFetching: true,
        isLoad: false,
        isError: false,
        errMsg: ''
        })
      )
  });
  it('case SUCCESS', () => {
    const profile = {
      test: 'test'
    };
    expect(loading(initialStateImmutable, success('GET_PROFILE', profile, 'profile')))
      .toEqual(Immutable.fromJS({
        isFetching: false,
        isLoad: true,
        isError: false,
        errMsg: ''
        })
      )
  });
  it('case FAILURE', () => {
    const error = 'error';
    expect(loading(initialStateImmutable, failure('GET_PROFILE', error, 'profile')))
      .toEqual(Immutable.fromJS({
        isFetching: false,
        isLoad: false,
        isError: true,
        errMsg: error
        })
      )
  });
  it('case SET_ERROR', () => {
    const data = true;
    expect(loading(initialStateImmutable, setError(data)))
      .toEqual(Immutable.fromJS({
        isFetching: false,
        isLoad: false,
        isError: data,
        errMsg: ''
      })
    )
  });
});
describe('selectorsr', () => {
  const state = store.getState()
  const isFetching = state.signUp.getIn(['stepOne','loading', 'isFetching']);
  const isLoad = state.signUp.getIn(['stepOne', 'loading', 'isLoad']);
  const isError = state.signUp.getIn(['stepOne', 'loading', 'isError']);
  const errMsg = state.signUp.getIn(['stepOne', 'loading', 'errMsg']);

  it('selectIsFetching', () => {
    expect(selectIsFetching(state)).toEqual(isFetching);
  });
  it(' selectIsLoad', () => {
    expect(selectIsLoad(state)).toEqual(isLoad);
  });
  it('selectIsError', () => {
    expect(selectIsError(state)).toEqual(isError);
  });
  it('selectErrMsg', () => {
    expect(selectErrMsg(state)).toEqual(errMsg);
  });

});
