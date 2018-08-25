export interface LoginFormData {
  email: string,
  password: string
}

export interface StateLogin {
  readonly authToken: string,
  readonly profile: object,
  readonly errMsg: string
}

export interface AuthenticateFb {
  token: string
  userId: string
}
