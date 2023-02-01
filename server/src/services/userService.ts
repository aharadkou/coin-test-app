import fetch from 'node-fetch';

import { AUTH_APP_API_URL } from '../core/constants';
import { addTransactionToUsers, removeUser } from '../core/helpers';
import { IUser } from '../core/types';
import { getTransactions } from './transactionSerivce';

export const getUsers = async (excludeUserId: string, authToken: string): Promise<IUser[]> => {
  const usersResponse = await fetch(`${AUTH_APP_API_URL}/api/users`, {
    headers: {
      'Authorization': authToken,
    },
  });

  const users: IUser[] = await usersResponse.json();
  const usersWithoutExcluded = removeUser(users, excludeUserId);

  const transactions = await getTransactions();
  const usersWithTransactions = addTransactionToUsers(usersWithoutExcluded, transactions);

  return usersWithTransactions;
}
