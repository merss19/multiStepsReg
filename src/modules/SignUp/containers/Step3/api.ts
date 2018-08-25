import {apiData} from 'tools/api';
import {storage} from 'tools/storage';
import * as fetch from 'isomorphic-fetch';

export const fetchPaymentInfo = (authToken: string): Promise<any> => {
  const payload = {
    authToken: authToken || storage.load('token'),
    data: {take: 1}
  };
  const options = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(payload)
  };
  return fetch(apiData.paymentGetInfo, options);
};

export const fetchPaymentManual = (txId: string): Promise<any> => {
  const payload = {
    authToken: storage.load('token'),
    data: {txId: txId}
  };
  const options = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(payload)
  };
  return fetch(apiData.paymentSetpaidManual, options);
};