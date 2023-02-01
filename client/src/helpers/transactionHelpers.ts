import { ITransaction } from '../types/ITransaction';

export const getTransactionAmountSum = (transactions: ITransaction[]): number => transactions.reduce((total, transaction) => total + transaction.amount, 0)

export const findLastBonusTransaction = (transactions: ITransaction[]): ITransaction => [...transactions].reverse().find(transaction => transaction.type === 'DAILY_BONUS');