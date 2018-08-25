export interface Actions {
  type: string,
  data?: any,
  field?: string,
  flg?: boolean,
  cb?: (data?: any) => void,
  cbFail?:(data?: any) => void,
}