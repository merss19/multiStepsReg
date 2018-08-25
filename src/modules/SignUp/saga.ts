import {all, fork} from "redux-saga/effects";
import {StepOneSaga} from "./containers/Step1";
import {StepTwoSaga} from "./containers/Step2";
import {stepThreeSaga} from "./containers/Step3";

export default function* signUpModuleSaga() {
  yield all([
    fork(StepOneSaga),
    fork(StepTwoSaga),
    fork(stepThreeSaga)
  ])
}