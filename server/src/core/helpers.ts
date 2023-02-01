import { ITransaction, IUser } from "./types";

export const getCurrentIsoDate = (): string => new Date().toISOString().substring(0, 10);

export const removeUser = (users: IUser[], userId: string): IUser[] => users.filter(user => user.id !== userId);

export const addTransactionToUsers = (users: IUser[], transactions: ITransaction[]): IUser[] =>
  users.map((user) => ({...user, transactions: transactions.filter(transaction => transaction.userId === user.id)}));
