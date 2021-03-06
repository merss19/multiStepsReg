import {apiData} from 'tools/api';
import {Payment} from '../../interfaces';
import * as fetch from 'isomorphic-fetch';

export const fetchGetPackage = (data?: string): Promise<any> => {
  const payload = data ? {promoName: data} : {};
  const options = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(payload)
  };
  return fetch(apiData.packageGet, options);
};
export const fetchUserUpdate = (data: Payment): Promise<any> => {
  const options = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(data)
  };
  return fetch(apiData.userUpdate, options);
};
export const fetchPaymentCreate = (data: Payment): Promise<any> => {
  const options = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(data)
  };
  return fetch(apiData.paymentCreate, options);
};
export const fetchGetPrograms = (): Promise<any> => {
  const options = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({})
  };

  return fetch(apiData.programGet, options);
};
