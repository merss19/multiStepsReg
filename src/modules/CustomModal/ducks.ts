import {StateModal, Action} from './interfaces';
import * as Immutable from 'immutable';
import {makeActionCreator} from 'tools/utils';

export const moduleName = 'modal';
// Constant
export const TOGGLE_MODAL = `${moduleName}/TOGGLE_MODAL`;

// Action Creators
export const toggleModal = makeActionCreator<boolean>(TOGGLE_MODAL , 'data');

// Reducer
const initialState: StateModal = {
  isOpen: false
};
export const initialStateImmutable = Immutable.fromJS(initialState);

export default (state = initialStateImmutable, action: Action) => {
  switch (action.type) {
    case TOGGLE_MODAL:
      return state.merge({
        isOpen: action.data
      });
    default:
      return state;
  }
}