const api = 'https://api.todayme.ru/api'

export const apiData = {
  sendRestorePassword: `${api}/user/user-sendRestorePassword`,
  approveRestorePassword: `${api}/user/user-approveRestorePassword`,
  authenticate: `${api}/user/authenticate`,
  userCreate: `${api}/user/user-create`,
  userCheck: `${api}/user/user-check`,
  userGet: `${api}/user/user-get`,
  packageGet: `${api}/day/package-get`,
  userUpdate: `${api}/user/user-update`,
  paymentCreate: `${api}/payment/payment-create`,
  paymentGetInfo: `${api}/payment/payment-get-info`,
  paymentSetpaidManual: `${api}/payment/payment-setpaid-manual`,
  programGet: `${api}/day/program-get`,
  authenticateSocial: `${api}/user/authenticate-social`
};

export function callApi(api: Promise<any>): any {
  return api
    .then(response => {
        return response.json().then((json: any) => {
            return {json, response}
          }
        )
      }
    ).then(({json, response}) => {
      if (response.status !== 200) {
        return Promise.reject(response)
      }
      return json
    })
    .then(
      json => {
        return json
      },
      error => {
        return {error: error.message || 'Возникла ошибка'}
      }
    )
}
