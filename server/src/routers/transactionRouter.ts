import express, { Response, Request } from 'express';

import { NO_ACCESS_ERROR } from '../core/constants';
import { getCurrentIsoDate } from '../core/helpers';
import { TransactionType, UserRole } from '../core/types';
import { authMiddleware } from '../middlewares/authMiddleware';
import { addTransaction, applyDailyBonus } from '../services/transactionSerivce';

const transactionRouter = express.Router();

transactionRouter.post('/', authMiddleware, async (request: Request, response: Response) => {
  const { amount, userId } = request.body;
  const loggedInUser = request.loggedInUser;

  if (loggedInUser.role !== UserRole.ADMIN) {
    return response.sendStatus(403).send({error: NO_ACCESS_ERROR});
  }

  const transactionToAdd = {amount, userId, dateIssued: getCurrentIsoDate(), type: TransactionType.MANUAL };

  await addTransaction(transactionToAdd);

  response.sendStatus(200);
});

transactionRouter.post('/daily-bonus', authMiddleware, async (request: Request, response: Response) => {
  const loggedInUser = request.loggedInUser;

  if (!request.loggedInUser) {
    return response.status(403).send({error: NO_ACCESS_ERROR});
  }

  await applyDailyBonus(loggedInUser.id);

  response.sendStatus(200);
});

export default transactionRouter;