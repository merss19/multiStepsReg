import {createSelector} from 'reselect';
import {moduleName, subModuleName as subModuleNameOne} from './containers/Step1/ducks';
import {subModuleName as subModuleNameTwo} from './containers/Step2/ducks';
import {subModuleName as subModuleNameThree} from './containers/Step3/ducks';
import {fetchDucks} from 'modules/FetchDucks'

let stateOne = (state: any) => state[moduleName].get(subModuleNameOne);
let stateTwo = (state: any) => state[moduleName].get(subModuleNameTwo);
let stateThree = (state: any) => state[moduleName].get(subModuleNameThree);


const step = createSelector(stateOne, state => state.getIn(['data', 'step']));
const genderError = createSelector(stateOne, state => state.getIn(['data', 'genderError']));
const userProfile = createSelector(stateOne, state => state.getIn(['data', 'userProfile']));
const programName = createSelector(stateOne, state => state.getIn(['data', 'programName']));
const choosenProgram = createSelector(stateTwo, state => {
  return state.getIn(['data', 'choosenProgram']);
});
const choosenPackageType = createSelector(stateTwo, state => state.getIn(['data', 'choosenPackageType']));
const packages = createSelector(stateTwo, state => state.getIn(['data', 'packages']));
const programs = createSelector(stateTwo, state => state.getIn(['data', 'programs']));
const promo = createSelector(stateTwo, state => state.getIn(['data', 'promo']));
const promoError = createSelector(stateTwo, state => state.getIn(['data', 'promoError']));
const payment = createSelector(stateTwo, state => state.getIn(['data', 'payment']));
const payInfo = createSelector(stateThree, state => state.getIn(['data', 'payInfo']));

export const selectProgramName = createSelector(
  programName,
  (programName) => programName
);

export const selectUserProfile = createSelector(
  userProfile,
  (userProfile) => userProfile
);
export const selectStep = createSelector(
  step,
  (step) => step
);

export const selectPromoError = createSelector(
  promoError,
  (promoError) => promoError
);
export const selectPromo = createSelector(
  promo,
  (promo) => promo
);

export const selectPackages = createSelector(
  packages,
  choosenPackageType,
  (packages, choosenPackageType) => {
    if (!packages.size) {
      return null;
    }
    packages = packages.map((pt: any) => {
      if (pt.get('id') == choosenPackageType) {
        return pt.set('isActive', true);
      }
      return pt;
    });
    return packages;
  }
);

export const selectChoosenProgram = createSelector(
  choosenProgram,
  (choosenProgram) => choosenProgram
);
export const selectPrograms = createSelector(
  programs,
  choosenProgram,
  (programs, choosenProgram) => {
    console.log('!programs.size')
    console.log(!programs.size)
    if (!programs.size) {
      console.log('!programs.size22')
      return null;
    }
    programs = programs.map((program: any) => {
      if (choosenProgram == 0) {
        if (program.get('id') % 4 == 1) {
          return program.set('isActive', true);
        }
      }
      if (program.get('id') == choosenProgram) {
        return program.set('isActive', true);
      }
      return program;
    });
    return programs;
  }
);
export const selectPackage = createSelector(
  choosenPackageType,
  packages,
  (choosenPackageType, packages) => {
    if (!packages.size) {
      return null;
    }
    let packageItem;
    packages.forEach((item: any) => {
      if (item.get('id') == choosenPackageType) {
        packageItem = item;
      }
    });
    return packageItem;
  }
);
export const selectPackageType = createSelector(
  choosenPackageType,
  (choosenPackageType) => choosenPackageType
);

export const selectPayInfo = createSelector(
  payInfo,
  (payInfo) =>payInfo
);
