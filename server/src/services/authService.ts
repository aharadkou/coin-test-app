import fetch from 'node-fetch';
import { AUTH_APP_API_URL } from '../core/constants';

export const getUserInfo = async (authToken: string) => {
  const userInfoResponse = await fetch(`${AUTH_APP_API_URL}/api/auth/user-info`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': authToken,
    }
  });

  return userInfoResponse.json();
}
