import * as slcts from '../selectors';
import configureStore from '../../../store';
import * as ducksTwo from '../containers/Step2/ducks';
import * as ducksOne from '../containers/Step1/ducks';
import * as Immutable from 'immutable';

const store = configureStore();
let pr = Immutable.fromJS([
  {
    id: 1,
    name: 'hero',
    isActive: true
  },
  {
    id: 2,
    name: 'mother',
    isActive: false
  },
  {
    id: 3,
    name: 'extreme',
    isActive: false
  },
  {
    id: 4,
    name: 'tomorrow',
    isActive: false
  }
]);
let pack = Immutable.fromJS([
  {
    name: '1 человек',
    isActive: false,
    id: 1
  },
  {
    name: '2 человек',
    isActive: false,
    id: 2
  },
  {
    name: '1 ЧЕЛОВЕК + ФИТНЕС-БРАСЛЕТ',
    isActive: false,
    id: 3
  },
  {
    name: '1 ЧЕЛОВЕК + КОВРИК',
    isActive: false,
    id: 4
  },
  {
    name: '3 человек',
    isActive: false,
    id: 5
  }
]);
describe('test selectors', () => {
  const state = store.getState();
  const step = state['signUp'].getIn(['stepOne', 'data', 'step']);
  const isTest = state['signUp'].getIn(['stepOne', 'data', 'isTest']);
  const isTele2 = state['signUp'].getIn(['stepOne', 'data', 'isTele2']);
  const isInfoBlock = state['signUp'].getIn(['stepOne', 'data', 'isInfoBlock']);
  const isGeneral = state['signUp'].getIn(['stepOne', 'data', 'isGeneral']);
  const genderError = state['signUp'].getIn(['stepOne', 'data', 'genderError']);
  const programs = state['signUp'].getIn(['stepTwo', 'data', 'programs']);
  const userProfile = state['signUp'].getIn(['stepOne', 'data', 'userProfile']);
  const programName = state['signUp'].getIn(['stepOne', 'data', 'programName']);
  const choosenProgram = state['signUp'].getIn(['stepTwo', 'data', 'choosenProgram']);
  const choosenPackageType = state['signUp'].getIn(['stepTwo', 'data', 'choosenPackageType']);
  const packages = state['signUp'].getIn(['stepTwo', 'data', 'packages']);
  const promo = state['signUp'].getIn(['stepTwo', 'data', 'promo']);
  const promoError = state['signUp'].getIn(['stepTwo', 'data', 'promoError']);
  const payment = state['signUp'].getIn(['stepTwo', 'data', 'payment']);
  const payInfo = state['signUp'].getIn(['stepThree', 'data', 'payInfo']);
  it('selectProgramName', () => {
    expect(slcts.selectProgramName(state)).toEqual(programName);
  });
  it('selectUserProfile', () => {
    expect(slcts.selectUserProfile(state)).toEqual(userProfile);
  });
  it('selectStep', () => {
    expect(slcts.selectStep(state)).toEqual(step);
  });
  it('selectPromoError', () => {
    expect(slcts.selectPromoError(state)).toEqual(promoError);
  });
  it('selectPromo', () => {
    expect(slcts.selectPromo(state)).toEqual(promo);
  });
  it('selectChoosenProgram', () => {
    expect(slcts.selectChoosenProgram(state)).toEqual(choosenProgram);
  });
  it('selectPackageType', () => {
    expect(slcts.selectPackageType(state)).toEqual(choosenPackageType);
  });
  it('selectPayInfo', () => {
    expect(slcts.selectPayInfo(state)).toEqual(payInfo);
  });
  it('selectPackages', () => {
    let choosenPackageType = store.getState().signUp.getIn(['stepTwo','data','choosenPackageType']);
    store.dispatch(ducksTwo.success(ducksTwo.GET_PACKAGE, pack, 'packages'));
    const newPack = pack.map((pt: any) => {
      if (pt.get('id') == choosenPackageType) {
        return pt.set('isActive', true);
      }
      return pt;
    });
    expect(slcts.selectPackages(store.getState())).toEqual(newPack);
    store.dispatch(ducksTwo.success(ducksTwo.GET_PACKAGE, {}, 'packages'));
    expect(slcts.selectPackages(store.getState())).toBeNull();
  });
  it('selectPackage', () => {
    let choosenPackageType = store.getState().signUp.getIn(['stepTwo','data','choosenPackageType']);
    store.dispatch(ducksTwo.success(ducksTwo.GET_PACKAGE, pack, 'packages'));
    let pkg;
    pack.forEach((item: any) => {
      if (item.get('id') == choosenPackageType) {
        pkg = item;
      }
    });
    expect(slcts.selectPackage(store.getState())).toEqual(pkg);
    store.dispatch(ducksTwo.success(ducksTwo.GET_PACKAGE, {}, 'packages'));
    expect(slcts.selectPackages(store.getState())).toBeNull();
  });
  it('selectPrograms', () => {
    let choosenProgram = store.getState().signUp.getIn(['stepTwo','data','choosenProgram']);
    store.dispatch(ducksTwo.success(ducksTwo.GET_PROGRAMS, pr, 'programs'));
    let programs = pr.map((program: any) => {
      if (program.get('id') % 4 == 1) {
        return program.set('isActive', true);
      }
      return program;
    });
    expect(slcts.selectPrograms(store.getState())).toEqual(programs);
    store.dispatch(ducksTwo.setChoosenProgram(3));
    choosenProgram = store.getState().signUp.getIn(['stepTwo','data','choosenProgram']);
    programs = pr.map((program: any) => {
      if (program.get('id') == choosenProgram) {
        return program.set('isActive', true);
      }
      return program;
    });
    expect(slcts.selectPrograms(store.getState())).toEqual(programs);
    store.dispatch(ducksTwo.success(ducksTwo.GET_PROGRAMS, [], 'programs'));
    expect(slcts.selectPrograms(store.getState())).toBe(Immutable.fromJS([]));
  });
});