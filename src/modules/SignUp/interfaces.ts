import {Steps} from './const';
export type Step = Steps.one | Steps.two | Steps.three | Steps.four;

export interface Program {
  id: number,
  name: string,
  isActive?: boolean
}

export interface PackageType {
  name: string,
  isActive: boolean,
  id: number
}

export interface StepOne {
  readonly step: Step
  readonly programName: string
  readonly userProfile: any
}

export interface StepTwo {
  readonly choosenProgram: number | null
  readonly choosenPackageType: number
  readonly packages: PackageType[]
  readonly programs: any
  readonly promo: string
  readonly promoError: string
  readonly payment: any
}

export interface SignUpFormData {
  email: string
  password: string
  passwordAgain: string
  gender: string
}


export interface Payment {
  authToken: string
  data: {
    program: number
    package: number
    promoName?: string
    isShare?: boolean
  }
}

export interface StepThree {
  readonly payInfo: any
}