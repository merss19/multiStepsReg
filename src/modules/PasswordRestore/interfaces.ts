export interface PasswordFormData {
  email: string
}

export interface RestoreFormData {
  pass: string
  passAgain: string
  tokenPassword?: string
}

export interface StateProfilePassword {
  readonly user: any,
  readonly token: string
  readonly restore: any
}