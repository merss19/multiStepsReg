import {makeActionCreator} from "tools/utils";
const data = [
  {programs:1},
  {programs:2},
];

describe('test makeActionCreator', () => {
  it('Create action from constans', () => {
    const REQUEST = `login/REQUEST`;
    const request = makeActionCreator(REQUEST);
    const expectedAction = {
      type: REQUEST
    };
    expect(typeof request).toEqual('function');
    expect(request()).toEqual(expectedAction);
  });
  it('Create action from constans + customAction', () => {
    const REQUEST = `login/REQUEST`;
    const request = makeActionCreator(REQUEST, 'action');
    const customAction = 'GET_PROGRAMS';
    const expectedAction = {
      type: REQUEST + '/' + customAction
    };
    expect(request(customAction)).toEqual(expectedAction);
  });
  it('Create action from constans + data', () => {
    const SUCCESS = `login/SUCCESS`;
    const request = makeActionCreator(SUCCESS, 'action', 'data', 'field');
    const customAction = 'GET_PROGRAMS';
    const field = 'programs';
    const expectedAction = {
      type: SUCCESS + '/' + customAction,
      data,
      field
    };
    expect(request(customAction, data, field)).toEqual(expectedAction);
  });
  it('Create action from constans + flg', () => {
    const GET_PROGRAMS = `login/GET_PROGRAMS`;
    const request = makeActionCreator(GET_PROGRAMS, 'data', 'flg');
    const flg = true;
    const expectedAction = {
      type: GET_PROGRAMS,
      data,
      flg
    };
    expect(request(data, flg)).toEqual(expectedAction);
  });
  it('Create action from constans + callBack', () => {
    const GET_PROGRAMS = `login/GET_PROGRAMS`;
    const request = makeActionCreator(GET_PROGRAMS, 'data', 'cb');
    const cb = (data: any) => console.log(data);
    const expectedAction = {
      type: GET_PROGRAMS,
      data,
      cb
    };
    expect(request(data, cb)).toEqual(expectedAction);
  });
});