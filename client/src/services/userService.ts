import { USERS_URL } from '../config';
import { getToken } from './tokenService';

export const getUsers = async () => {
  const usersResponse = await fetch(USERS_URL, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    }
  });

  return usersResponse.json();
};
