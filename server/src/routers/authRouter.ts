import express, { Request, Response } from 'express';
import { findUserTransactions } from '../db/repositories/transactionRepository';
import { authMiddleware } from '../middlewares/authMiddleware';

const userRouter = express.Router();

userRouter.get('/user-info', authMiddleware, async (request: Request, response: Response) => {
  const loggedInUser = request.loggedInUser;

  loggedInUser.transactions = await findUserTransactions(loggedInUser.id);

  response.json({
    ...loggedInUser,
    transactions: await findUserTransactions(loggedInUser.id)
  });
});


export default userRouter;