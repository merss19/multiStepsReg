import {ModalType} from './interfaces';
import {ModalTypes} from './const';
import CustomModal from './main';
import modalReducer, {toggleModal, moduleName} from './ducks';

export {CustomModal, modalReducer, toggleModal, moduleName, ModalType, ModalTypes};