import { USER_INFO_URL } from '../config';
import { getToken } from './tokenService';

export const getUserInfo = async () => {
  const userInfoResponse = await fetch(USER_INFO_URL, {
    headers: {
     'Content-Type': 'application/json',
     'Authorization': `Bearer ${getToken()}`
    },
  });

  return userInfoResponse.json();
};

