import express, { Response, Request } from 'express';

import { getCurrentIsoDate } from '../core/helpers';
import { TransactionType, UserRole } from '../core/types';
import { addTransaction, findTransaction } from '../db/repositories/transactionRepository';
import { authMiddleware } from '../middlewares/authMiddleware';

const DAILY_BONUS_AMOUNT = 1000;

const transactionRouter = express.Router();

transactionRouter.post('/', authMiddleware, async (request: Request, response: Response) => {
  const { amount, userId } = request.body;
  const loggedInUser = request.loggedInUser;

  if (loggedInUser.role !== UserRole.ADMIN) {
    return response.sendStatus(403).send({error: 'No access!'});
  }

  const transactionToAdd = {amount, userId, dateIssued: getCurrentIsoDate(), type: TransactionType.MANUAL };

  await addTransaction(transactionToAdd);

  response.sendStatus(200);
});

transactionRouter.post('/daily-bonus', authMiddleware, async (request: Request, response: Response) => {
  const loggedInUser = request.loggedInUser;

  //TODO: move to service layer
  const currentIsoDate = getCurrentIsoDate();
  const dailyBonusTransaction = { userId: loggedInUser.id, dateIssued: currentIsoDate, type: TransactionType.DAILY_BONUS };
  const currentDateBonusTransaction = await findTransaction(dailyBonusTransaction);
  if (!currentDateBonusTransaction) {
    await addTransaction({...dailyBonusTransaction, amount: DAILY_BONUS_AMOUNT});
  }

  response.sendStatus(200);
});

export default transactionRouter;