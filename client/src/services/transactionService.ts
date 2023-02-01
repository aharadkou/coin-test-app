import { TRANSACTIONS_URL } from '../config';
import { IUser } from '../types/IUser';
import { getToken } from './tokenService';

export const applyDailyBonus = () => fetch(`${TRANSACTIONS_URL}/daily-bonus`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken()}`
  },
});

export const addTransaction = async (user: IUser, amount: number) => fetch(TRANSACTIONS_URL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken()}`
  },
  body: JSON.stringify({
    userId: user.id,
    amount,
  })
});
