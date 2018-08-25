import {apiData} from 'tools/api';
import {SignUpFormData} from '../../interfaces';
import * as fetch from 'isomorphic-fetch';

export const fetchUserCreate = (data: SignUpFormData): Promise<any> => {
  const options = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(data)
  };

  return fetch(apiData.userCreate, options);

};

export const asyncValidate = (values: any) => {
  return fetch(apiData.userCheck, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({email: values.email})
  })
    .then(response => response.json())
    .then(json => {
      if (json.data) {
        throw {email: 'Такой email уже существует'};
      }
    });
};