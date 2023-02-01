import { IUser } from '../types/IUser';
import { getTransactionAmountSum } from './transactionHelpers';

export const updateUsersBalance = (users: IUser[]) => users.map(user =>({...user, balance: getTransactionAmountSum(user.transactions)}));

export const updateUserBalance = (users: IUser[], userToUpdate: IUser, balanceDiff: number) => users.map(
  user =>({...user, ...(userToUpdate.id === user.id && {balance: user.balance + balanceDiff})})
)