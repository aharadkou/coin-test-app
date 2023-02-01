import { model, Schema } from 'mongoose';
import { ITransaction, TransactionType } from '../../core/types';

const TransactionSchema = new Schema<ITransaction>({
  type: String,
  amount: Number,
  dateIssued: String,
  userId: String
});

TransactionSchema.index({
  userId: 1,
  dateIssued: 1,
  type: 1,
}, { unique: true, partialFilterExpression: { type: { $eq: TransactionType.DAILY_BONUS } } })
  
TransactionSchema.virtual('id').get(function(){
  return this._id.toHexString();
});

TransactionSchema.set('toJSON', {
  virtuals: true
});

export const TransactionModel = model('TransactionModel', TransactionSchema);
