import { SortOrder } from 'mongoose';
import { ITransaction } from '../../core/types';
import { TransactionModel } from '../models/transactionModel';

const TRANSACTION_SORT_ORDER: {[key: string]: SortOrder} = { dateIssued: 1, _id: 1 };

export const getTransactions = () => {
  return TransactionModel.find().sort(TRANSACTION_SORT_ORDER);
}

export const addTransaction = async (transactionPayload: Partial<ITransaction>) => {
  const inserted = await TransactionModel.collection.insertOne(transactionPayload);

  return TransactionModel.findById(inserted.insertedId)
}

export const findTransaction = async (query: Partial<ITransaction>) => {
  return TransactionModel.findOne(query);
}

export const findUserTransactions = async (userId: string) => {
  return TransactionModel.find({userId}).sort(TRANSACTION_SORT_ORDER);
}