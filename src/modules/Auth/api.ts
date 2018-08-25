import {apiData} from 'tools/api';

export const fetchUserGet = (token: string): Promise<any> => {
  const payload = {
    authToken: token,
    data: {}
  }
  const options = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(payload)
  };
  return fetch(apiData.userGet, options);
};