import { UNIQUE_CONSTRAINT_ERROR_CODE } from '../core/constants';
import { getCurrentIsoDate } from '../core/helpers';
import { ITransaction, TransactionType } from '../core/types';
import * as transactionRepository from '../db/repositories/transactionRepository';

const DAILY_BONUS_AMOUNT = 1000;

export const findUserTransactions = async (userId: string): Promise<ITransaction[]> => {
  return transactionRepository.findUserTransactions(userId);
}

export const addTransaction = async (transactionPayload: Partial<ITransaction>): Promise<ITransaction> => {
  return transactionRepository.addTransaction(transactionPayload);
}

export const findTransaction = async (query: Partial<ITransaction>): Promise<ITransaction> => {
  return transactionRepository.findTransaction(query);
}

export const applyDailyBonus = async (userId: string): Promise<void> => {
  const currentIsoDate = getCurrentIsoDate();
  const dailyBonusTransaction = { userId, dateIssued: currentIsoDate, type: TransactionType.DAILY_BONUS };
  const currentDateBonusTransaction = await findTransaction(dailyBonusTransaction);

  if (!currentDateBonusTransaction) {
    try {
      await addTransaction({...dailyBonusTransaction, amount: DAILY_BONUS_AMOUNT});
    } catch (err) {
      if (err.code === UNIQUE_CONSTRAINT_ERROR_CODE) {
        console.error(err);
      } else {
        throw err;
      }
    }
  }
}

export const getTransactions = () => {
  return transactionRepository.getTransactions();
}
