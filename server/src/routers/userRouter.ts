import express, { Request, Response } from 'express';
import fetch from 'node-fetch';

import { AUTH_APP_API_URL } from '../core/constants';
import { IUser, UserRole } from '../core/types';
import { getTransactions } from '../db/repositories/transactionRepository';
import { authMiddleware } from '../middlewares/authMiddleware';

const userRouter = express.Router();

userRouter.get('/', authMiddleware, async (request: Request, response: Response) => {
  const authHeader = request.headers.authorization;

  if (request.loggedInUser?.role !== UserRole.ADMIN) {
    return response.status(403).send({error: 'No access!'});
  }

  const usersResponse = await fetch(`${AUTH_APP_API_URL}/api/users`, {
    headers: {
      'Authorization': authHeader,
    },
  })
  const users: IUser[] = await usersResponse.json();


  const usersWithoutAdmin = users.filter(user => user.id !== request.loggedInUser?.id);

  const transactions = await getTransactions();
  const usersWithTransactions = usersWithoutAdmin.map((user) => ({...user, transactions: transactions.filter(transaction => transaction.userId === user.id)}));

  response.json(usersWithTransactions);
});


export default userRouter;