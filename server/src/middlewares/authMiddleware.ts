import { NextFunction, Request, Response } from 'express';

import { getUserInfo } from '../services/authService';

export const authMiddleware = async (request: Request, response: Response, next: NextFunction) => {
  const authHeader = request.headers.authorization;

  try {
    request.loggedInUser = await getUserInfo(authHeader);
    next();
  } catch(err) {
    response.status(401).send({error: 'Unauthorized'});
  }
}
