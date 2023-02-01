import express, { Request, Response } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { findUserTransactions } from '../services/transactionSerivce';

const userRouter = express.Router();

userRouter.get('/user-info', authMiddleware, async (request: Request, response: Response) => {
  const loggedInUser = request.loggedInUser;

  response.json({
    ...loggedInUser,
    transactions: await findUserTransactions(loggedInUser.id)
  });
});


export default userRouter;