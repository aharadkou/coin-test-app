import express, { Request, Response } from 'express';

import { UserRole } from '../core/types';
import { authMiddleware } from '../middlewares/authMiddleware';
import { getUsers } from '../services/userService';
import { NO_ACCESS_ERROR } from '../core/constants';

const userRouter = express.Router();

userRouter.get('/', authMiddleware, async (request: Request, response: Response) => {
  const authHeader = request.headers.authorization;

  if (!request.loggedInUser || request.loggedInUser.role !== UserRole.ADMIN) {
    return response.status(403).send({error: NO_ACCESS_ERROR});
  }

  const users = await getUsers(request.loggedInUser.id, authHeader);

  response.json(users);
});


export default userRouter;