const isDev = process.env.NODE_ENV === 'development';
export const BASE_URL = isDev ? 'http://localhost:4000/api' : '/api';

export const TRANSACTIONS_URL = `${BASE_URL}/transactions`;
export const USER_INFO_URL = `${BASE_URL}/auth/user-info`;
export const USERS_URL = `${BASE_URL}/users`;

export const AUTH_APP_UI_URL = process.env.AUTH_APP_UI_URL || 'http://localhost:3000';
